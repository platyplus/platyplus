-- TODO do NOT include 'platyplus' and 'auth' schemas in platyplus.tables, primary keys and foreign keys
create schema "platyplus";
CREATE TABLE "platyplus"."tables" (
	"id" text NOT NULL,
	"updated_at" timestamptz NOT NULL DEFAULT now(),
	"deleted" boolean NOT NULL DEFAULT true,
	"metadata" jsonb NOT NULL DEFAULT '{}',
	PRIMARY KEY ("id")
);
CREATE OR REPLACE FUNCTION "platyplus"."set_current_timestamp_updated_at"() RETURNS TRIGGER AS $$
DECLARE _new record;
BEGIN _new := NEW;
_new."updated_at" = NOW();
RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_platyplus_tables_updated_at" BEFORE
UPDATE ON "platyplus"."tables" FOR EACH ROW EXECUTE PROCEDURE "platyplus"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_platyplus_tables_updated_at" ON "platyplus"."tables" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE OR REPLACE FUNCTION platyplus.monitor_metadata() RETURNS trigger LANGUAGE plpgsql AS $function$ begin -- TODO won't work with multiple databases
	CREATE TEMP TABLE new_tables on commit drop AS
SELECT concat(
		value->'table'->>'schema',
		'.',
		value->'table'->>'name'
	) as id,
	value->'table'->>'schema' as schema,
	value
FROM jsonb_path_query(
		new.metadata::jsonb,
		'$.sources[*] ? (@.name=="default") .tables[*]'
	) as value;
CREATE TEMP TABLE old_tables on commit drop AS
SELECT concat(
		value->'table'->>'schema',
		'.',
		value->'table'->>'name'
	) as id,
	value->'table'->>'schema' as schema,
	value
FROM jsonb_path_query(
		old.metadata::jsonb,
		'$.sources[*] ? (@.name=="default") .tables[*]'
	) as value;
-- mark untracked tables as deleted
UPDATE platyplus.TABLES
SET deleted = true
FROM (
		select o.*
		from old_tables o
			left join new_tables n on (o.id = n.id)
		where (
				n.id is null
				and not n.schema in ('auth', 'platyplus')
			)
	) AS subquery
WHERE platyplus.TABLES.id = subquery.id
	and platyplus.TABLES.deleted = false;
-- update existing tables and mark them as tracked (non-deleted)
UPDATE platyplus.TABLES
SET metadata = subquery.value,
	deleted = false
FROM (
		select *
		from new_tables n
	) AS subquery
WHERE platyplus.TABLES.id = subquery.id
	and platyplus.TABLES.deleted = true;
-- update tracked tables with metadata changes
UPDATE platyplus.TABLES
SET metadata = subquery.value,
	updated_at = default
FROM (
		select n.*
		from old_tables o
			inner join new_tables n on (o.id = n.id)
		where not (
				o.value::text = n.value::text
				or n.schema in ('auth', 'platyplus')
			)
	) AS subquery
WHERE platyplus.TABLES.id = subquery.id;
-- create missing records of tracked tables
insert into platyplus.TABLES(id, metadata, deleted) (
		select n.id,
			n.value,
			false
		from new_tables n
			left join platyplus.TABLES o on (o.id = n.id)
		where (
				o.id is null
				and not n.schema in ('auth', 'platyplus')
			)
	);
RETURN new;
END;
$function$;
CREATE TRIGGER platyplus_check_update
AFTER
UPDATE ON hdb_catalog.hdb_metadata FOR EACH ROW EXECUTE PROCEDURE platyplus.MONITOR_METADATA();
CREATE OR REPLACE FUNCTION platyplus.monitor_table_update() RETURNS event_trigger LANGUAGE plpgsql AS $function$
DECLARE obj record;
BEGIN FOR obj IN
SELECT *
FROM pg_event_trigger_ddl_commands()
WHERE schema_name NOT IN ('auth', 'platyplus')
	and object_type = 'table' LOOP
update platyplus.tables
set updated_at = default
where id = concat(obj.object_identity)
	and deleted = false;
END LOOP;
END;
$function$;
CREATE EVENT TRIGGER platyplus_update_table ON ddl_command_end
WHEN TAG IN ('ALTER TABLE') EXECUTE FUNCTION platyplus.monitor_table_update();
CREATE OR REPLACE FUNCTION platyplus.monitor_table_drop() RETURNS event_trigger LANGUAGE plpgsql AS $function$
DECLARE obj record;
BEGIN FOR obj IN
SELECT *
FROM pg_event_trigger_dropped_objects()
WHERE schema_name NOT IN ('auth', 'platyplus')
	and object_type = 'table' LOOP
update platyplus.tables
set deleted = true,
	metadata = DEFAULT
where id = concat(obj.object_identity)
	and deleted = false;
END LOOP;
END;
$function$;
CREATE EVENT TRIGGER platyplus_table_drop ON sql_drop EXECUTE FUNCTION platyplus.monitor_table_drop();