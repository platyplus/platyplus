CREATE OR REPLACE VIEW "metadata"."foreign_key_constraint" AS 
 SELECT hdb_foreign_key_constraint.table_schema,
    hdb_foreign_key_constraint.table_name,
    hdb_foreign_key_constraint.constraint_name,
    hdb_foreign_key_constraint.constraint_oid,
    hdb_foreign_key_constraint.ref_table_table_schema,
    hdb_foreign_key_constraint.ref_table,
    hdb_foreign_key_constraint.column_mapping,
    hdb_foreign_key_constraint.on_update,
    hdb_foreign_key_constraint.on_delete,
    hdb_foreign_key_constraint.columns,
    hdb_foreign_key_constraint.ref_columns,
    table_schema || '.' || table_name || '.' || constraint_name AS id,
    ref_table_table_schema || '.' || ref_table AS ref_id,
    table_schema || '.' || table_name  AS table_id
   FROM hdb_catalog.hdb_foreign_key_constraint;
