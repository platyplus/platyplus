DROP TRIGGER IF EXISTS "set_public_visite_updated_at" ON "public"."visite";
ALTER TABLE "public"."visite" DROP COLUMN "updated_at";
