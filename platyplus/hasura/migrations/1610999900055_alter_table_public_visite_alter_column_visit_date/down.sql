ALTER TABLE ONLY "public"."visite" ALTER COLUMN "visit_date" DROP DEFAULT;
ALTER TABLE "public"."visite" ALTER COLUMN "visit_date" DROP NOT NULL;
