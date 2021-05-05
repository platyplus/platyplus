ALTER TABLE "metadata"."table_config" ADD COLUMN "id" text;
ALTER TABLE "metadata"."table_config" ALTER COLUMN "id" DROP NOT NULL;
