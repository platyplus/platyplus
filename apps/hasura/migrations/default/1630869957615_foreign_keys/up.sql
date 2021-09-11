-- TODO rewrite this query (with same output) as it is a bit scrappy
create or replace view platyplus.foreign_keys as
SELECT l."from",
	l."to",
	l."constraint",
	rc.update_rule,
	rc.delete_rule,
	jsonb_object_agg(l.column_name, l.ref_column_name) AS mapping
FROM (
		SELECT concat(tc.table_schema, '.', tc.table_name) AS "from",
			tc.constraint_name AS "constraint",
			concat(ccu.table_schema, '.', ccu.table_name) AS "to",
			kcu.column_name,
			ccu.column_name AS ref_column_name
		FROM (
				(
					information_schema.table_constraints tc
					JOIN information_schema.key_column_usage kcu ON (
						(
							(
								(tc.constraint_name)::name = (kcu.constraint_name)::name
							)
							AND (
								(tc.table_schema)::name = (kcu.table_schema)::name
							)
						)
					)
				)
				JOIN information_schema.constraint_column_usage ccu ON (
					(
						(
							(ccu.constraint_name)::name = (tc.constraint_name)::name
						)
						AND (
							(ccu.table_schema)::name = (tc.table_schema)::name
						)
					)
				)
			)
		WHERE (
				(
					NOT (
						(tc.table_schema)::name = ANY (
							ARRAY ['hdb_catalog'::name, 'information_schema'::name, 'pg_catalog'::name, 'platyplus'::name]
						)
					)
				)
				AND (
					(tc.constraint_type)::text = 'FOREIGN KEY'::text
				)
			)
	) l,
	information_schema.referential_constraints rc
where l.constraint = rc.constraint_name
GROUP BY l."from",
	l."to",
	rc.update_rule,
	rc.delete_rule,
	l."constraint";