drop view "metadata"."relationship";
CREATE
OR REPLACE VIEW "metadata"."relationship" AS
SELECT r.table_schema,
    (((((r.table_schema)::text || '.'::text) || (r.table_name)::text) || '.'::text) || r.rel_name) AS id,
    (((r.table_schema)::text || '.'::text) || (r.table_name)::text) AS table_id,
    COALESCE(
    replace(
      (r.rel_def-> 'manual_configuration'-> 'remote_table' -> 'schema')::text || '.' || (r.rel_def-> 'manual_configuration'-> 'remote_table' -> 'name')::text,
        
      '"', ''
    ),
    flat.ref_schema || '.' || flat.ref_table,
    replace(
      (r.rel_def-> 'foreign_key_constraint_on' -> 'table' -> 'schema' ) :: text || '.' || (r.rel_def-> 'foreign_key_constraint_on'-> 'table' -> 'name')::text,
      '"', ''
    )
  ) AS remote_table_id,
    r.table_name,
    r.rel_name,
    r.rel_type,
    r.rel_def,
    r.comment,
    r.is_system_defined
   FROM hdb_catalog.hdb_relationship r
   LEFT JOIN (
          SELECT
            fk.table_schema,
            fk.table_name,
            fk.constraint_name,
            fk.ref_table_table_schema AS ref_schema,
            fk.ref_table,
            js.key AS from_column,
            btrim((js.value) :: text, '"' :: text) AS to_column
          FROM
            hdb_catalog.hdb_foreign_key_constraint fk,
            LATERAL json_each(fk.column_mapping) js(key, value)
        ) flat ON (
          (
            (
              btrim(
                (
                  (
                    (r.rel_def) :: json -> 'foreign_key_constraint_on' :: text
                  )
                ) :: text,
                '"' :: text
              ) = flat.from_column
            )
            AND (r.table_schema = flat.table_schema)
            AND (r.table_name = flat.table_name)
          )
        );
