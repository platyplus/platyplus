CREATE OR REPLACE VIEW "metadata"."index" AS 
 SELECT pg_indexes.schemaname AS table_schema,
    pg_indexes.tablename AS table_name,
    pg_indexes.indexname AS index_name,
    (pg_indexes.indexname)::text AS id,
    (((pg_indexes.schemaname)::text || '.'::text) || (pg_indexes.tablename)::text) AS table_id
   FROM pg_indexes;
