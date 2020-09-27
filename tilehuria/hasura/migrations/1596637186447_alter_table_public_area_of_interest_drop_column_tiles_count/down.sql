ALTER TABLE "public"."area_of_interest" ADD COLUMN "tiles_count" int4;
ALTER TABLE "public"."area_of_interest" ALTER COLUMN "tiles_count" DROP NOT NULL;
ALTER TABLE "public"."area_of_interest" ALTER COLUMN "tiles_count" SET DEFAULT jsonb_array_length(xyz_coordinates);
