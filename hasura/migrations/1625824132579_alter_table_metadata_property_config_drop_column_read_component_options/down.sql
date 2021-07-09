ALTER TABLE "metadata"."property_config" ADD COLUMN "read_component_options" jsonb;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "read_component_options" DROP NOT NULL;
