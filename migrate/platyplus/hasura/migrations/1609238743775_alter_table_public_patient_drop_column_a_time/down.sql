ALTER TABLE "public"."patient" ADD COLUMN "a_time" timetz;
ALTER TABLE "public"."patient" ALTER COLUMN "a_time" DROP NOT NULL;
ALTER TABLE "public"."patient" ALTER COLUMN "a_time" SET DEFAULT now();
