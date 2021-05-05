alter table "metadata"."property_config" add column table_id text GENERATED ALWAYS AS (table_schema ||'.' || table_name) STORED;
