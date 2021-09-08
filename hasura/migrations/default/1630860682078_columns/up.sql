create or replace view "platyplus"."columns" as
select concat(table_schema, '.', table_name) as table_id,
	column_name as name,
	ordinal_position as position,
	column_default as default,
	case
		when is_nullable = 'YES' then true
		else false
	end as nullable,
	data_type,
	udt_name,
	character_maximum_length,
	numeric_precision,
	case
		when is_generated = 'NEVER' then false
		else true
	end as is_generated,
	generation_expression
from information_schema.columns
where not table_schema in (
		'hdb_catalog',
		'information_schema',
		'pg_catalog',
		'platyplus',
		'auth'
	)