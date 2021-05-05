ALTER TABLE "metadata"."table_config" ADD COLUMN "table_name" text;
ALTER TABLE "metadata"."table_config" ALTER COLUMN "table_name" DROP NOT NULL;
