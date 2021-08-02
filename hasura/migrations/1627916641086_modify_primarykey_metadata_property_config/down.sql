alter table "metadata"."property_config" drop constraint "property_config_pkey";
alter table "metadata"."property_config"
    add constraint "property_config_pkey" 
    primary key ( "id" );
