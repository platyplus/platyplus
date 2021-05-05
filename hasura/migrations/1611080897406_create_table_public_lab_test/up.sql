CREATE TABLE "public"."lab_test"("id" serial NOT NULL, "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "name" text NOT NULL, PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_lab_test_updated_at"
BEFORE UPDATE ON "public"."lab_test"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_lab_test_updated_at" ON "public"."lab_test" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
