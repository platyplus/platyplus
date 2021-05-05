create view metadata.index_columns as select
    ns.nspname as table_schema,
    t.relname as table_name,
    i.relname as index_name,
    a.attname as column_name
from
    pg_class t,
    pg_class i,
    pg_index ix,
    pg_attribute a,
    pg_namespace ns
where
    t.oid = ix.indrelid
    and i.oid = ix.indexrelid
    and a.attrelid = t.oid
    and a.attnum = ANY(ix.indkey)
    and t.relkind = 'r'
    and ns.oid = t.relnamespace
order by
    t.relname,
    i.relname;
    --relnamespace
--select * from pg_namespace;
