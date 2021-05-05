CREATE OR REPLACE VIEW "metadata"."index" AS 
 SELECT pg_indexes.schemaname AS table_schema,
    pg_indexes.tablename AS table_name,
    pg_indexes.indexname AS index_name
   FROM pg_indexes;
