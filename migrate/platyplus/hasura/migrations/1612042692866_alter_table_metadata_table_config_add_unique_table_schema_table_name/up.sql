alter table "metadata"."table_config" add constraint "table_config_table_schema_table_name_key" unique ("table_schema", "table_name");
