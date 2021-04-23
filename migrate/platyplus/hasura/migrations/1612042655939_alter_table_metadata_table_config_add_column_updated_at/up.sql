ALTER TABLE "metadata"."table_config" ADD COLUMN "updated_at" timestamptz NOT NULL DEFAULT now();

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
CREATE TRIGGER "set_metadata_table_config_updated_at"
BEFORE UPDATE ON "metadata"."table_config"
FOR EACH ROW
EXECUTE PROCEDURE "metadata"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_metadata_table_config_updated_at" ON "metadata"."table_config" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
