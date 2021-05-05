create schema metadata;
create view metadata.check_constraints as select * from hdb_catalog.hdb_check_constraint;
