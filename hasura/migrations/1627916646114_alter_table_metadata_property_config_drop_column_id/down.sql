ALTER TABLE "metadata"."property_config" ADD COLUMN "id" uuid;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "id" DROP NOT NULL;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
