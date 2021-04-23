CREATE OR REPLACE VIEW "metadata"."table_info" AS 
 SELECT tables.table_catalog,
    tables.table_schema,
    tables.table_name,
    tables.table_type,
    tables.self_referencing_column_name,
    tables.reference_generation,
    tables.user_defined_type_catalog,
    tables.user_defined_type_schema,
    tables.user_defined_type_name,
    tables.is_insertable_into,
    tables.is_typed,
    tables.commit_action,
    (tables.table_catalog || '.' || ((tables.table_schema)::text || '.'::text) || (tables.table_name)::text) AS id,
    (((tables.table_schema)::text || '.'::text) || (tables.table_name)::text) AS table_id
   FROM information_schema.tables;
