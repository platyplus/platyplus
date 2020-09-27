alter table area_of_interest drop column tiles_count;
alter table area_of_interest ADD column IF NOT EXISTS tiles_count 
   integer
   NOT NULL
   GENERATED ALWAYS AS
   (JSONB_ARRAY_LENGTH(xyz_coordinates)) STORED;
