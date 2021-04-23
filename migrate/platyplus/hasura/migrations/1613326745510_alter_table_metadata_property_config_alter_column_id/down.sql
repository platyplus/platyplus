ALTER TABLE "metadata"."property_config" ALTER COLUMN "id" TYPE uuid;
ALTER TABLE ONLY "metadata"."property_config" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
