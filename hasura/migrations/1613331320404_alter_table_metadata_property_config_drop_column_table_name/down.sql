ALTER TABLE "metadata"."property_config" ADD COLUMN "table_name" text;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "table_name" DROP NOT NULL;
