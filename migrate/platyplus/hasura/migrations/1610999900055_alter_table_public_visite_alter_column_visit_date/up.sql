ALTER TABLE ONLY "public"."visite" ALTER COLUMN "visit_date" SET DEFAULT now();
ALTER TABLE "public"."visite" ALTER COLUMN "visit_date" SET NOT NULL;
