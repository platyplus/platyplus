-- SELECT * FROM  hdb_catalog.hdb_primary_key t, json_array_elements(t.columns) ;
drop view metadata.primary_key_column;
create view metadata.primary_key_column as select t.constraint_name, t.table_schema, t.table_name, trim('"' FROM elem::text) as column
from hdb_catalog.hdb_primary_key t, json_array_elements(t.columns) elem;
