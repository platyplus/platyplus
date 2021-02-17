CREATE OR REPLACE VIEW "metadata"."check_constraint" AS 
 SELECT hdb_check_constraint.table_schema,
    hdb_check_constraint.table_name,
    hdb_check_constraint.constraint_name,
    hdb_check_constraint."check",
    hdb_check_constraint.table_schema || '.' || hdb_check_constraint.table_name as id
   FROM hdb_catalog.hdb_check_constraint;
