INSERT INTO metadata.table_config ("table_id", "order") VALUES('public.visite', '["visit_date","lab_tests","patient","test","muac"]'::jsonb) ON CONFLICT ON CONSTRAINT table_config_table_id_key DO UPDATE SET "order" = '["visit_date","lab_tests","patient","test","muac"]'::jsonb;
INSERT INTO metadata.property_config ("property_id", "table_id", "property_name", "component", "title", "icon") VALUES('public.visite.lab_tests', 'public.visite', 'lab_tests', 'default', 'Tests de labo', 'flask') ON CONFLICT ON CONSTRAINT property_config_property_id_key DO UPDATE SET "component" = 'default', "title" = 'Tests de labo', "icon" = 'flask';
