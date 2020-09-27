alter table "public"."tile_set" drop constraint "tile_set_area_of_interest_id_fkey",
             add constraint "tile_set_area_of_interest_id_fkey"
             foreign key ("area_of_interest_id")
             references "public"."area_of_interest"
             ("id") on update set null on delete set null;
