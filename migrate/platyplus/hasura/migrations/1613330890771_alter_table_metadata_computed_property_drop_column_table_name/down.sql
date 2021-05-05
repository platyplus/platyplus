ALTER TABLE "metadata"."computed_property" ADD COLUMN "table_name" text;
ALTER TABLE "metadata"."computed_property" ALTER COLUMN "table_name" DROP NOT NULL;
