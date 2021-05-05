CREATE OR REPLACE VIEW "metadata"."relationship" AS 
 SELECT hdb_relationship.table_schema,
    hdb_relationship.table_name,
    hdb_relationship.rel_name,
    hdb_relationship.rel_type,
    hdb_relationship.rel_def,
    hdb_relationship.comment,
    hdb_relationship.is_system_defined,
    table_schema|| '.' || table_name AS table_id,
    table_schema|| '.' || table_name || '.' || rel_name AS id
   FROM hdb_catalog.hdb_relationship;
