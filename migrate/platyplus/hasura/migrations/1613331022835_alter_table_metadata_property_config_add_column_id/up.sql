CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "metadata"."property_config" ADD COLUMN "id" uuid NOT NULL DEFAULT gen_random_uuid();
