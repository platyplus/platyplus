ALTER TABLE "metadata"."property_config" ADD COLUMN "table_id" text;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "table_id" DROP NOT NULL;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "table_id" SET DEFAULT ((table_schema || '.'::text) || table_name);
