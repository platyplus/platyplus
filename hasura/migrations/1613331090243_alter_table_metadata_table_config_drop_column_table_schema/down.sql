ALTER TABLE "metadata"."table_config" ADD COLUMN "table_schema" text;
ALTER TABLE "metadata"."table_config" ALTER COLUMN "table_schema" DROP NOT NULL;
ALTER TABLE "metadata"."table_config" ADD CONSTRAINT table_config_table_schema_table_name_key UNIQUE (table_schema, table_name);
