alter table "metadata"."computed_property" add column id text GENERATED ALWAYS AS (table_schema ||'.' || table_name || '.' || name) STORED;
alter table "metadata"."computed_property" add column table_id text GENERATED ALWAYS AS (table_schema ||'.' || table_name ) STORED;
