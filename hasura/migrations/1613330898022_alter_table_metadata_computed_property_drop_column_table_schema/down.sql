ALTER TABLE "metadata"."computed_property" ADD COLUMN "table_schema" text;
ALTER TABLE "metadata"."computed_property" ALTER COLUMN "table_schema" DROP NOT NULL;
