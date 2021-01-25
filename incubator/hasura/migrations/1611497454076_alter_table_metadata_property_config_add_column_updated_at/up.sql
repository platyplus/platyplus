ALTER TABLE "metadata"."property_config" ADD COLUMN "updated_at" timestamptz NULL DEFAULT now();

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
CREATE TRIGGER "set_metadata_property_config_updated_at"
BEFORE UPDATE ON "metadata"."property_config"
FOR EACH ROW
EXECUTE PROCEDURE "metadata"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_metadata_property_config_updated_at" ON "metadata"."property_config" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
