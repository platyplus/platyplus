ALTER TABLE "metadata"."property_config" ADD COLUMN "id" text;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "id" DROP NOT NULL;
