CREATE TABLE "platyplus"."property_config" (
  "id" text NOT NULL,
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted" boolean NOT NULL DEFAULT false,
  "table_id" text NOT NULL,
  "property_name" text NOT NULL,
  "component" text,
  "json_schema" jsonb,
  "icon" text,
  "title" text,
  "description" text,
  PRIMARY KEY ("id")
);
CREATE OR REPLACE FUNCTION "platyplus"."set_current_timestamp_updated_at"() RETURNS TRIGGER AS $$
DECLARE _new record;
BEGIN _new := NEW;
_new."updated_at" = NOW();
RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_platyplus_property_config_updated_at" BEFORE
UPDATE ON "platyplus"."property_config" FOR EACH ROW EXECUTE PROCEDURE "platyplus"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_platyplus_property_config_updated_at" ON "platyplus"."property_config" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;