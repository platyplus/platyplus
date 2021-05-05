CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "metadata"."computed_property" ADD COLUMN "id" uuid NOT NULL DEFAULT gen_random_uuid();
