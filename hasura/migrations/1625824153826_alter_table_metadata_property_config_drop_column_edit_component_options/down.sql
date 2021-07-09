ALTER TABLE "metadata"."property_config" ADD COLUMN "edit_component_options" jsonb;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "edit_component_options" DROP NOT NULL;
