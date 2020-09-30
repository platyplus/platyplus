CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."area_of_interest"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "source" jsonb NOT NULL, "xyz_coordinates" jsonb, PRIMARY KEY ("id") );
