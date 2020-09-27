CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."tile_provider"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "url" text NOT NULL, PRIMARY KEY ("id") );
