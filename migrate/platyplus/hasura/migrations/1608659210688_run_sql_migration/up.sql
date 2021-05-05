create view metadata.permission_select_columns as
SELECT
  t.table_schema,
  t.table_name,
  t.role_name,
  btrim((elem.value) :: text, '"' :: text) AS column_name
FROM
  hdb_catalog.hdb_permission_agg t,
  LATERAL json_array_elements(t.permissions->'select'->'columns') elem(value);
  
create view metadata.permission_update_columns as
SELECT
  t.table_schema,
  t.table_name,
  t.role_name,
  btrim((elem.value) :: text, '"' :: text) AS column_name
FROM
  hdb_catalog.hdb_permission_agg t,
  LATERAL json_array_elements(t.permissions->'update'->'columns') elem(value);
  
  create view metadata.permission_insert_columns as
SELECT
  t.table_schema,
  t.table_name,
  t.role_name,
  btrim((elem.value) :: text, '"' :: text) AS column_name
FROM
  hdb_catalog.hdb_permission_agg t,
  LATERAL json_array_elements(t.permissions->'insert'->'columns') elem(value);
