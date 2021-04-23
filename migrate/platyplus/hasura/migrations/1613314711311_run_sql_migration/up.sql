CREATE OR REPLACE VIEW "metadata"."permission_select_columns" AS 
 SELECT t.table_schema,
    t.table_name,
    t.role_name,
    btrim((elem.value)::text, '"'::text) AS column_name,
    table_schema|| '.' || table_name AS table_id,
    table_schema|| '.' || table_name || '.'|| btrim((elem.value)::text, '"'::text) AS column_id,
    table_schema|| '.' || table_name || '.'|| role_name || '.' || btrim((elem.value)::text, '"'::text) AS id
   FROM hdb_catalog.hdb_permission_agg t,
    LATERAL json_array_elements(((t.permissions -> 'select'::text) -> 'columns'::text)) elem(value);
