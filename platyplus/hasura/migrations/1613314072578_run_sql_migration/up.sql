CREATE OR REPLACE VIEW "metadata"."computed_field" AS 
 SELECT hdb_computed_field.table_schema,
    hdb_computed_field.table_name,
    hdb_computed_field.computed_field_name,
    hdb_computed_field.definition,
    hdb_computed_field.comment,
    table_schema || '.' || table_name || '.' || computed_field_name AS id,
    table_schema || '.' || table_name  AS table_id
   FROM hdb_catalog.hdb_computed_field;
