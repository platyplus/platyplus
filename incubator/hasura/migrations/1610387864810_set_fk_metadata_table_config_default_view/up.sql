alter table "metadata"."table_config"
           add constraint "table_config_default_view_fkey"
           foreign key ("default_view")
           references "metadata"."view_type"
           ("name") on update restrict on delete restrict;
