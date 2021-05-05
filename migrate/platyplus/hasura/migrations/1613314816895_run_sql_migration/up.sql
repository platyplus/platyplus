CREATE OR REPLACE VIEW "metadata"."primary_key_column" AS 
 SELECT t.constraint_name,
    t.table_schema,
    t.table_name,
    btrim((elem.value)::text, '"'::text) AS column_name,
    table_schema|| '.' || table_name AS table_id,
    table_schema|| '.' || table_name || '.' || btrim((elem.value)::text, '"'::text)  AS column_id,
    constraint_name as id
   FROM hdb_catalog.hdb_primary_key t,
    LATERAL json_array_elements(t.columns) elem(value);
