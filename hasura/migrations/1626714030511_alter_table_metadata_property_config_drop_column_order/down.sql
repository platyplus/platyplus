ALTER TABLE "metadata"."property_config" ADD COLUMN "order" int4;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "order" DROP NOT NULL;
ALTER TABLE "metadata"."property_config" ALTER COLUMN "order" SET DEFAULT 2147483647;
