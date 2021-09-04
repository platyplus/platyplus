create schema "platyplus";
CREATE TABLE "platyplus"."tables" (
	"id" text NOT NULL,
	"updated_at" timestamptz NOT NULL DEFAULT now(),
	"deleted" boolean NOT NULL DEFAULT true,
	"metadata" jsonb NOT NULL DEFAULT '{}',
	"schema" jsonb NOT NULL DEFAULT '{}',
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
		'default.',
		value->'table'->>'schema',
		'.',
		value->'table'->>'name'
	) as id,
	value
FROM jsonb_path_query(
		new.metadata::jsonb,
		'$.sources[*] ? (@.name=="default") .tables[*]'
	) as value;
CREATE TEMP TABLE old_tables on commit drop AS
SELECT concat(
		'default.',
		value->'table'->>'schema',
		'.',
		value->'table'->>'name'
	) as id,
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
		where (n.id is null)
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
SET metadata = subquery.value
FROM (
		select n.*
		from old_tables o
			inner join new_tables n on (o.id = n.id)
		where (
				not(
					o.value @> n.value
					AND o.value <@ n.value
				)
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
		where (o.id is null)
	);
RETURN new;
END;
$function$;
CREATE TRIGGER platyplus_check_update
AFTER
UPDATE ON hdb_catalog.hdb_metadata FOR EACH ROW EXECUTE PROCEDURE platyplus.MONITOR_METADATA();
CREATE OR REPLACE FUNCTION platyplus.monitor_table_events() RETURNS event_trigger LANGUAGE plpgsql AS $function$
DECLARE obj record;
BEGIN FOR obj IN
SELECT *
FROM pg_event_trigger_ddl_commands() LOOP
insert into platyplus.tables
values (concat('default.', obj.object_identity)) ON CONFLICT ON CONSTRAINT metadata_pkey DO
UPDATE
SET id = concat('default.', obj.object_identity);
END LOOP;
END;
$function$;
CREATE EVENT TRIGGER platyplus_abort_ddl ON ddl_command_end
WHEN TAG IN ('CREATE TABLE', 'ALTER TABLE') EXECUTE FUNCTION platyplus.monitor_table_events();