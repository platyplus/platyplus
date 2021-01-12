alter table "public"."visite"
           add constraint "visite_patient_id_fkey"
           foreign key ("patient_id")
           references "public"."patient"
           ("id") on update restrict on delete restrict;
