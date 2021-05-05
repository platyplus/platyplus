alter table "metadata"."table_config" add foreign key ("default_view") references "metadata"."view_type"("name") on update restrict on delete restrict;
