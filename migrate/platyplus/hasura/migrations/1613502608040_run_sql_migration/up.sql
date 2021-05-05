CREATE OR REPLACE VIEW "metadata"."view_info" AS 
 SELECT views.table_catalog,
    views.table_schema,
    views.table_name,
    views.view_definition,
    views.check_option,
    views.is_updatable,
    views.is_insertable_into,
    views.is_trigger_updatable,
    views.is_trigger_deletable,
    views.is_trigger_insertable_into,
    (views.table_catalog || '.'|| ((views.table_schema)::text || '.'::text) || (views.table_name)::text) AS id,
    (((views.table_schema)::text || '.'::text) || (views.table_name)::text) AS table_id
   FROM information_schema.views;
