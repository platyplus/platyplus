ALTER TABLE "metadata"."property_config" ADD COLUMN "read_component" text;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "read_component" DROP NOT NULL;
