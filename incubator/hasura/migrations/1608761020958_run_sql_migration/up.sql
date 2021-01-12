create view metadata.relationship_mapping as SELECT
    r.table_schema,
    r.table_name,
    r.rel_name,
    r.rel_type,
    COALESCE(
        btrim((r.rel_def::json -> 'manual_configuration'  -> 'remote_table' -> 'schema') :: text, '"' :: text),
        flat.ref_schema,
        btrim((r.rel_def::json -> 'foreign_key_constraint_on'  -> 'table' -> 'schema') :: text, '"' :: text)
        ) AS remote_schema_name,
    COALESCE(
        btrim((r.rel_def::json -> 'manual_configuration'  -> 'remote_table' -> 'name') :: text, '"' :: text),
        flat.ref_table,
        btrim((r.rel_def::json -> 'foreign_key_constraint_on'  -> 'table' -> 'name') :: text, '"' :: text)
        ) AS remote_table_name,
    COALESCE(
        manual.key,
        flat.from_column,
        pk.column_name
    ) as column_name,
    COALESCE(
        btrim((manual.value::json) :: text, '"' :: text),
        flat.to_column,
        btrim((r.rel_def::json -> 'foreign_key_constraint_on'  -> 'column') :: text, '"' :: text)
    ) as remote_column_name
FROM
  hdb_catalog.hdb_relationship r
    left join (
        select
            fk.table_schema,
            fk.table_name,
            fk.constraint_name,
            fk.ref_table_table_schema as ref_schema,
            fk.ref_table,
            js.key as from_column,
            btrim(js.value :: text, '"' :: text) as to_column
        from hdb_catalog.hdb_foreign_key_constraint fk, json_each(fk.column_mapping) as js
    ) flat
    ON btrim((r.rel_def::json -> 'foreign_key_constraint_on') :: text, '"' :: text) = flat.from_column
        AND r.table_schema = flat.table_schema
        AND r.table_name = flat.table_name
    left join (
        SELECT rr.*, js.key, js.value
        FROM hdb_catalog.hdb_relationship rr, json_each(rr.rel_def ::json -> 'manual_configuration' -> 'column_mapping') as js
    ) manual
    ON
        r.table_schema = manual.table_schema
        AND r.table_name = manual.table_name
        AND r.rel_name = manual.rel_name
    LEFT JOIN metadata.primary_key_column pk
    ON r.table_schema = pk.table_schema
        AND r.table_name = pk.table_name;
