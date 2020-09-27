CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."tile_set"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "area_of_interest_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("area_of_interest_id") REFERENCES "public"."area_of_interest"("id") ON UPDATE restrict ON DELETE restrict);
