CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."visite"("id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") );
