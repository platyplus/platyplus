CREATE OR REPLACE VIEW "metadata"."table" AS 
 SELECT hdb_table.table_schema,
    hdb_table.table_name,
    hdb_table.configuration,
    hdb_table.is_system_defined,
    hdb_table.is_enum,
    (((hdb_table.table_schema)::text || '.'::text) || (hdb_table.table_name)::text) AS id,
    false AS deleted,
    to_timestamp(0) AS updated_at
   FROM hdb_catalog.hdb_table
  WHERE (hdb_table.is_system_defined = false);
