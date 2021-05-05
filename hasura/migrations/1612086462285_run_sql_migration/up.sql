create view metadata.index as SELECT
    schemaname as schema_name,
    tablename as table_name,
    indexname as index_name
FROM
    pg_indexes;
