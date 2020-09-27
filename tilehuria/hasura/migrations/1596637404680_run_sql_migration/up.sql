alter table area_of_interest
ADD COLUMN tiles_count numeric GENERATED ALWAYS AS (jsonb_array_length(xyz_coordinates)) STORED;
