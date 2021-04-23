DROP TRIGGER IF EXISTS "set_metadata_table_config_updated_at" ON "metadata"."table_config";
ALTER TABLE "metadata"."table_config" DROP COLUMN "updated_at";
