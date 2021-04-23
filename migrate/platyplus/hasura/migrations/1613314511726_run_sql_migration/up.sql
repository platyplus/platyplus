CREATE OR REPLACE VIEW "metadata"."index_column" AS 
 SELECT ns.nspname AS table_schema,
    t.relname AS table_name,
    i.relname AS index_name,
    a.attname AS column_name,
    (((ns.nspname)::text || '.'::text) || (t.relname)::text) AS table_id,
    (((((ns.nspname)::text || '.'::text) || (t.relname)::text) || '.'::text) || (a.attname)::text) AS column_id,
    (i.relname)::text AS index_id,
    (((((((ns.nspname)::text || '.'::text) || (t.relname)::text) || '.'::text) || (i.relname)::text) || '.'::text) || (a.attname)::text) AS id
   FROM pg_class t,
    pg_class i,
    pg_index ix,
    pg_attribute a,
    pg_namespace ns
  WHERE ((t.oid = ix.indrelid) AND (i.oid = ix.indexrelid) AND (a.attrelid = t.oid) AND (a.attnum = ANY ((ix.indkey)::smallint[])) AND (t.relkind = 'r'::"char") AND (ns.oid = t.relnamespace))
  ORDER BY t.relname, i.relname;
