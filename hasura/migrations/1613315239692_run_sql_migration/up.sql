CREATE OR REPLACE VIEW "metadata"."unique_constraint" AS 
 SELECT hdb_unique_constraint.table_name,
    hdb_unique_constraint.table_schema,
    hdb_unique_constraint.constraint_name,
    hdb_unique_constraint.columns,
    constraint_name as id
   FROM hdb_catalog.hdb_unique_constraint;
