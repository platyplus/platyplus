DROP TRIGGER IF EXISTS "set_metadata_property_config_updated_at" ON "metadata"."property_config";
ALTER TABLE "metadata"."property_config" DROP COLUMN "updated_at";
