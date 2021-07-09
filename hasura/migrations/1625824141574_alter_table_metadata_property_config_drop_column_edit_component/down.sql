ALTER TABLE "metadata"."property_config" ADD COLUMN "edit_component" text;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "edit_component" DROP NOT NULL;
