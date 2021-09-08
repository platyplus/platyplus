create or replace view platyplus.foreign_keys as
select l.from,
	l.to,
	l.constraint,
	jsonb_object_agg(column_name, ref_column_name) as mapping
from (
		select concat(tc.table_schema, '.', tc.table_name) as
		from,
			tc.constraint_name as constraint,
			concat(ccu.table_schema, '.', ccu.table_name) as to,
			kcu.column_name,
			ccu.column_name as ref_column_name
		from information_schema.table_constraints as tc
			join information_schema.key_column_usage as kcu on tc.constraint_name = kcu.constraint_name
			and tc.table_schema = kcu.table_schema
			join information_schema.constraint_column_usage as ccu on ccu.constraint_name = tc.constraint_name
			and ccu.table_schema = tc.table_schema
		where not tc.table_schema in (
				'hdb_catalog',
				'information_schema',
				'pg_catalog',
				'platyplus'
			)
			and tc.constraint_type = 'FOREIGN KEY'
	) l
group by l.from,
	l.to,
	l.constraint;