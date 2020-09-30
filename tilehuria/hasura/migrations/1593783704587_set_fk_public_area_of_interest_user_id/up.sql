alter table "public"."area_of_interest" drop constraint "area_of_interest_user_id_fkey",
             add constraint "area_of_interest_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update restrict on delete restrict;
