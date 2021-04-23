alter table "metadata"."computed_property" drop constraint "computed_property_pkey";
alter table "metadata"."computed_property"
    add constraint "computed_property_pkey" 
    primary key ( "table_name", "table_schema", "name" );
