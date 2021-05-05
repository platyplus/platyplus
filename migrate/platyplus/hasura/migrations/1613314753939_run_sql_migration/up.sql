CREATE OR REPLACE VIEW "metadata"."primary_key" AS 
 SELECT p.table_schema,
    p.table_name,
    p.constraint_name,
    table_schema|| '.' || table_name AS table_id,
    constraint_name AS id
   FROM hdb_catalog.hdb_primary_key p;
