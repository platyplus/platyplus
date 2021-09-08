create or replace view platyplus.indexes as select 
    q.table_id,
    q.name,
    jsonb_agg(q.column) as columns
from 
(SELECT 
concat(s.nspname, '.', t.relname) as table_id,
    i.relname as name,
    a.attname as column
    
        FROM
    pg_class t,
    pg_namespace s,
    pg_class i,
    pg_index ix,
    pg_attribute a
where
    t.oid = ix.indrelid
    and i.oid = ix.indexrelid
    and s.oid = i.relnamespace
    and a.attrelid = t.oid
    and a.attnum = ANY(ix.indkey)
    and t.relkind = 'r'
    and not s.nspname in ('hdb_catalog', 'auth', 'platyplus', 'pg_catalog')) q
    
group by table_id, name;
