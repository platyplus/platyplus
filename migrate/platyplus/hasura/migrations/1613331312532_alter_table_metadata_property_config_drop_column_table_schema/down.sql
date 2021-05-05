ALTER TABLE "metadata"."property_config" ADD COLUMN "table_schema" text;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "table_schema" DROP NOT NULL;
ALTER TABLE "metadata"."property_config" ADD CONSTRAINT property_config_table_schema_table_name_property_name_key UNIQUE (table_schema, table_name, property_name);
