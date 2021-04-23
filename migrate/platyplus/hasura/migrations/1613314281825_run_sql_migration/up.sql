CREATE OR REPLACE VIEW "metadata"."index" AS 
 SELECT pg_indexes.schemaname AS table_schema,
    pg_indexes.tablename AS table_name,
    pg_indexes.indexname AS index_name,
    pg_indexes.schemaname || '.' || tablename || '.' || indexname AS id,
    pg_indexes.schemaname || '.' || tablename  AS table_id
   FROM pg_indexes;
