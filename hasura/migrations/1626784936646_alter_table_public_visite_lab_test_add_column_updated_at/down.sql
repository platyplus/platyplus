DROP TRIGGER IF EXISTS "set_public_visite_lab_test_updated_at" ON "public"."visite_lab_test";
ALTER TABLE "public"."visite_lab_test" DROP COLUMN "updated_at";
