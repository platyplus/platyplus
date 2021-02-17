alter table "metadata"."property_config" add column column_id text GENERATED ALWAYS AS (table_schema ||'.' || table_name || '.' || property_name) STORED;
