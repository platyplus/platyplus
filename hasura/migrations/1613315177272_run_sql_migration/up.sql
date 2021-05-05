CREATE OR REPLACE VIEW "metadata"."role" AS 
 SELECT hdb_role.role_name, hdb_role.role_name as id
   FROM hdb_catalog.hdb_role;
