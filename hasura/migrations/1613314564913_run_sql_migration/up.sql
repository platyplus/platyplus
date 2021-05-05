CREATE OR REPLACE VIEW "metadata"."permission_agg" AS 
 SELECT hdb_permission_agg.table_schema,
    hdb_permission_agg.table_name,
    hdb_permission_agg.role_name,
    hdb_permission_agg.permissions,
    table_schema || '.' || table_name as table_id,
    table_schema || '.' || table_name || '.' || role_name as id
   FROM hdb_catalog.hdb_permission_agg;
