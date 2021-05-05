CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."patient" ADD COLUMN "an_uuid" uuid NULL DEFAULT gen_random_uuid();
