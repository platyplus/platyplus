drop view metadata.primary_key;
create view metadata.primary_key as select p.table_schema, p.table_name, p.constraint_name from hdb_catalog.hdb_primary_key p;
