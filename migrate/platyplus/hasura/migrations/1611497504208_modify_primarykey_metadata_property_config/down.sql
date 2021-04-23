alter table "metadata"."property_config" drop constraint "property_config_pkey";
alter table "metadata"."property_config"
    add constraint "property_config_pkey" 
    primary key ( "property_name", "table_name", "table_schema" );
