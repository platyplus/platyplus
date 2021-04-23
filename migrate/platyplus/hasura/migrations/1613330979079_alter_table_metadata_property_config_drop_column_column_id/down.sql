ALTER TABLE "metadata"."property_config" ADD COLUMN "column_id" text;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "column_id" DROP NOT NULL;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "column_id" SET DEFAULT ((((table_schema || '.'::text) || table_name) || '.'::text) || property_name);
