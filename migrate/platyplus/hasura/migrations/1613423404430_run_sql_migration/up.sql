CREATE OR REPLACE VIEW "metadata"."relationship_mapping" AS 
 SELECT r.table_schema,
    r.table_name,
    r.rel_name,
    COALESCE(btrim((((((r.rel_def)::json -> 'manual_configuration'::text) -> 'remote_table'::text) -> 'schema'::text))::text, '"'::text), flat.ref_schema, btrim((((((r.rel_def)::json -> 'foreign_key_constraint_on'::text) -> 'table'::text) -> 'schema'::text))::text, '"'::text)) AS remote_schema_name,
    COALESCE(btrim((((((r.rel_def)::json -> 'manual_configuration'::text) -> 'remote_table'::text) -> 'name'::text))::text, '"'::text), flat.ref_table, btrim((((((r.rel_def)::json -> 'foreign_key_constraint_on'::text) -> 'table'::text) -> 'name'::text))::text, '"'::text)) AS remote_table_name,
    COALESCE(manual.key, flat.from_column, pk.column_name) AS column_name,
    COALESCE(btrim((manual.value)::text, '"'::text), flat.to_column, btrim(((((r.rel_def)::json -> 'foreign_key_constraint_on'::text) -> 'column'::text))::text, '"'::text)) AS remote_column_name,
    (((r.table_schema)::text || '.'::text) || (r.table_name)::text) AS table_id,
    (((((r.table_schema)::text || '.'::text) || (r.table_name)::text) || '.'::text) || COALESCE(manual.key, flat.from_column, pk.column_name)) AS column_id,
    ((COALESCE(btrim((((((r.rel_def)::json -> 'manual_configuration'::text) -> 'remote_table'::text) -> 'schema'::text))::text, '"'::text), flat.ref_schema, btrim((((((r.rel_def)::json -> 'foreign_key_constraint_on'::text) -> 'table'::text) -> 'schema'::text))::text, '"'::text)) || '.'::text) || COALESCE(btrim((((((r.rel_def)::json -> 'manual_configuration'::text) -> 'remote_table'::text) -> 'name'::text))::text, '"'::text), flat.ref_table, btrim((((((r.rel_def)::json -> 'foreign_key_constraint_on'::text) -> 'table'::text) -> 'name'::text))::text, '"'::text))) AS remote_table_id,
    ((((COALESCE(btrim((((((r.rel_def)::json -> 'manual_configuration'::text) -> 'remote_table'::text) -> 'schema'::text))::text, '"'::text), flat.ref_schema, btrim((((((r.rel_def)::json -> 'foreign_key_constraint_on'::text) -> 'table'::text) -> 'schema'::text))::text, '"'::text)) || '.'::text) || COALESCE(btrim((((((r.rel_def)::json -> 'manual_configuration'::text) -> 'remote_table'::text) -> 'name'::text))::text, '"'::text), flat.ref_table, btrim((((((r.rel_def)::json -> 'foreign_key_constraint_on'::text) -> 'table'::text) -> 'name'::text))::text, '"'::text))) || '.'::text) || COALESCE(btrim((manual.value)::text, '"'::text), flat.to_column, btrim(((((r.rel_def)::json -> 'foreign_key_constraint_on'::text) -> 'column'::text))::text, '"'::text))) AS remote_column_id,
    (((((((r.table_schema)::text || '.'::text) || (r.table_name)::text) || '.'::text) || r.rel_name) || '.'::text) || COALESCE(manual.key, flat.from_column, pk.column_name)) AS id,
    (((((((r.table_schema)::text || '.'::text) || (r.table_name)::text) || '.'::text) || r.rel_name)))  AS relationship_id
   FROM (((hdb_catalog.hdb_relationship r
     LEFT JOIN ( SELECT fk.table_schema,
            fk.table_name,
            fk.constraint_name,
            fk.ref_table_table_schema AS ref_schema,
            fk.ref_table,
            js.key AS from_column,
            btrim((js.value)::text, '"'::text) AS to_column
           FROM hdb_catalog.hdb_foreign_key_constraint fk,
            LATERAL json_each(fk.column_mapping) js(key, value)) flat ON (((btrim((((r.rel_def)::json -> 'foreign_key_constraint_on'::text))::text, '"'::text) = flat.from_column) AND (r.table_schema = flat.table_schema) AND (r.table_name = flat.table_name))))
     LEFT JOIN ( SELECT rr.table_schema,
            rr.table_name,
            rr.rel_name,
            rr.rel_type,
            rr.rel_def,
            rr.comment,
            rr.is_system_defined,
            js.key,
            js.value
           FROM hdb_catalog.hdb_relationship rr,
            LATERAL json_each((((rr.rel_def)::json -> 'manual_configuration'::text) -> 'column_mapping'::text)) js(key, value)) manual ON (((r.table_schema = manual.table_schema) AND (r.table_name = manual.table_name) AND (r.rel_name = manual.rel_name))))
     LEFT JOIN metadata.primary_key_column pk ON (((r.table_schema = (pk.table_schema)::name) AND (r.table_name = (pk.table_name)::name))));
