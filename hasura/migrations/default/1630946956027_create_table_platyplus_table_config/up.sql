CREATE TABLE "platyplus"."table_config" (
  "id" text NOT NULL,
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted" boolean NOT NULL DEFAULT false,
  "component" text,
  "description" text,
  "document_label" text,
  "document_title" text,
  "document_component" text,
  "icon" text,
  "order" jsonb DEFAULT '[]',
  "title" text,
  PRIMARY KEY ("id")
);
CREATE OR REPLACE FUNCTION "platyplus"."set_current_timestamp_updated_at"() RETURNS TRIGGER AS $$
DECLARE _new record;
BEGIN _new := NEW;
_new."updated_at" = NOW();
RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_platyplus_table_config_updated_at" BEFORE
UPDATE ON "platyplus"."table_config" FOR EACH ROW EXECUTE PROCEDURE "platyplus"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_platyplus_table_config_updated_at" ON "platyplus"."table_config" IS 'trigger to set value of column "updated_at" to current timestamp on row update';