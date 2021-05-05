ALTER TABLE "metadata"."computed_property" ADD COLUMN "id" text;
ALTER TABLE "metadata"."computed_property" ALTER COLUMN "id" DROP NOT NULL;
ALTER TABLE "metadata"."computed_property" ALTER COLUMN "id" SET DEFAULT ((((table_schema || '.'::text) || table_name) || '.'::text) || name);
