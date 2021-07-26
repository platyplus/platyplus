CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "metadata"."app_config"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "updated_at" timestamptz NOT NULL DEFAULT now(), "menu_order" jsonb NOT NULL DEFAULT '[]'::jsonb, PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "metadata"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_metadata_app_config_updated_at"
BEFORE UPDATE ON "metadata"."app_config"
FOR EACH ROW
EXECUTE PROCEDURE "metadata"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_metadata_app_config_updated_at" ON "metadata"."app_config" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
