alter table "public"."tile_set"
           add constraint "tile_set_tile_provider_id_fkey"
           foreign key ("tile_provider_id")
           references "public"."tile_provider"
           ("id") on update restrict on delete restrict;
