drop event trigger platyplus_abort_ddl;
drop function platyplus.monitor_table_events;
drop trigger platyplus_check_update on hdb_catalog.hdb_metadata;
drop function platyplus.monitor_metadata;
drop trigger set_platyplus_tables_updated_at on platyplus.tables;
drop function platyplus.set_current_timestamp_updated_at;
drop TABLE platyplus.tables;
drop schema platyplus;