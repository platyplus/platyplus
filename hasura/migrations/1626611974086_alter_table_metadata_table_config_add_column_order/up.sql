ALTER TABLE "metadata"."table_config" ADD COLUMN "order" jsonb NOT NULL DEFAULT '[]'::jsonb;
