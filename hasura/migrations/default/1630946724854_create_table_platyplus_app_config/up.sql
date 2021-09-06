CREATE TABLE "platyplus"."app_config" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "menu_order" jsonb NOT NULL DEFAULT '[]', PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "platyplus"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_platyplus_app_config_updated_at"
BEFORE UPDATE ON "platyplus"."app_config"
FOR EACH ROW
EXECUTE PROCEDURE "platyplus"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_platyplus_app_config_updated_at" ON "platyplus"."app_config" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
