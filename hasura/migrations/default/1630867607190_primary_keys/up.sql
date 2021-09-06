create or replace view platyplus.primary_keys as
select concat(cons.table_schema, '.', cons.table_name) as id,
	cons.constraint_name as constraint,
	jsonb_agg(col.column_name) as columns
from information_schema.table_constraints cons
	left join information_schema.constraint_column_usage col on (
		col.table_catalog = cons.table_catalog
		and col.table_schema = cons.table_schema
		and col.table_name = cons.table_name
		and col.constraint_name = cons.constraint_name
	)
where not cons.table_schema in (
		'hdb_catalog',
		'information_schema',
		'pg_catalog',
		'platyplus'
	)
	and cons.constraint_type = 'PRIMARY KEY'
group by cons.table_catalog,
	cons.table_schema,
	cons.table_name,
	cons.constraint_name;