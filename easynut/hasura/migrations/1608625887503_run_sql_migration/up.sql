-- SELECT * FROM  hdb_catalog.hdb_primary_key t, json_array_elements(t.columns) ;

create view metadata.primary_key_column as select t.constraint_name, trim('"' FROM elem::text) as column
from hdb_catalog.hdb_primary_key t, json_array_elements(t.columns) elem;
