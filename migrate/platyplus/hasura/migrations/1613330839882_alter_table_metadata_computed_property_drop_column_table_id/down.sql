ALTER TABLE "metadata"."computed_property" ADD COLUMN "table_id" text;
ALTER TABLE "metadata"."computed_property" ALTER COLUMN "table_id" DROP NOT NULL;
ALTER TABLE "metadata"."computed_property" ALTER COLUMN "table_id" SET DEFAULT ((table_schema || '.'::text) || table_name);
