"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata_Table_Config_Constraint = exports.Metadata_Schema_Info_Select_Column = exports.Metadata_Role_Select_Column = exports.Metadata_Relationship_Select_Column = exports.Metadata_Relationship_Mapping_Select_Column = exports.Metadata_Property_Config_Update_Column = exports.Metadata_Property_Config_Select_Column = exports.Metadata_Property_Config_Constraint = exports.Metadata_Primary_Key_Select_Column = exports.Metadata_Primary_Key_Column_Select_Column = exports.Metadata_Permission_Update_Columns_Select_Column = exports.Metadata_Permission_Select_Columns_Select_Column = exports.Metadata_Permission_Insert_Columns_Select_Column = exports.Metadata_Permission_Agg_Select_Column = exports.Metadata_Index_Select_Column = exports.Metadata_Index_Column_Select_Column = exports.Metadata_Function_Select_Column = exports.Metadata_Function_Agg_Select_Column = exports.Metadata_Foreign_Key_Constraint_Select_Column = exports.Metadata_Custom_Type_Select_Column = exports.Metadata_Computed_Property_Update_Column = exports.Metadata_Computed_Property_Select_Column = exports.Metadata_Computed_Property_Constraint = exports.Metadata_Computed_Field_Select_Column = exports.Metadata_Column_Info_Select_Column = exports.Metadata_Check_Constraint_Select_Column = exports.Lab_Test_Update_Column = exports.Lab_Test_Select_Column = exports.Lab_Test_Constraint = exports.Drug_Update_Column = exports.Drug_Select_Column = exports.Drug_Constraint = exports.Auth_Roles_Update_Column = exports.Auth_Roles_Select_Column = exports.Auth_Roles_Constraint = exports.Auth_Refresh_Tokens_Update_Column = exports.Auth_Refresh_Tokens_Select_Column = exports.Auth_Refresh_Tokens_Constraint = exports.Auth_Providers_Update_Column = exports.Auth_Providers_Select_Column = exports.Auth_Providers_Constraint = exports.Auth_Accounts_Update_Column = exports.Auth_Accounts_Select_Column = exports.Auth_Accounts_Constraint = exports.Auth_Account_Roles_Update_Column = exports.Auth_Account_Roles_Select_Column = exports.Auth_Account_Roles_Constraint = exports.Auth_Account_Providers_Update_Column = exports.Auth_Account_Providers_Select_Column = exports.Auth_Account_Providers_Constraint = void 0;
exports.getSdk = exports.MetadataDocument = exports.TableFragmentDoc = exports.ColumnFragmentDoc = exports.CoreTableFragmentDoc = exports.Visite_Update_Column = exports.Visite_Select_Column = exports.Visite_Constraint = exports.Users_Update_Column = exports.Users_Select_Column = exports.Users_Constraint = exports.Patient_Update_Column = exports.Patient_Select_Column = exports.Patient_Constraint = exports.Order_By = exports.Metadata_View_Info_Select_Column = exports.Metadata_Unique_Constraint_Select_Column = exports.Metadata_Table_Select_Column = exports.Metadata_Table_Info_Select_Column = exports.Metadata_Table_Config_Update_Column = exports.Metadata_Table_Config_Select_Column = void 0;
const graphql_1 = require("graphql");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
var Auth_Account_Providers_Constraint;
(function (Auth_Account_Providers_Constraint) {
    Auth_Account_Providers_Constraint["AccountProvidersAccountIdAuthProviderKey"] = "account_providers_account_id_auth_provider_key";
    Auth_Account_Providers_Constraint["AccountProvidersAuthProviderAuthProviderUniqueIdKey"] = "account_providers_auth_provider_auth_provider_unique_id_key";
    Auth_Account_Providers_Constraint["AccountProvidersPkey"] = "account_providers_pkey";
})(Auth_Account_Providers_Constraint = exports.Auth_Account_Providers_Constraint || (exports.Auth_Account_Providers_Constraint = {}));
var Auth_Account_Providers_Select_Column;
(function (Auth_Account_Providers_Select_Column) {
    Auth_Account_Providers_Select_Column["AccountId"] = "account_id";
    Auth_Account_Providers_Select_Column["AuthProvider"] = "auth_provider";
    Auth_Account_Providers_Select_Column["AuthProviderUniqueId"] = "auth_provider_unique_id";
    Auth_Account_Providers_Select_Column["CreatedAt"] = "created_at";
    Auth_Account_Providers_Select_Column["Id"] = "id";
    Auth_Account_Providers_Select_Column["UpdatedAt"] = "updated_at";
})(Auth_Account_Providers_Select_Column = exports.Auth_Account_Providers_Select_Column || (exports.Auth_Account_Providers_Select_Column = {}));
var Auth_Account_Providers_Update_Column;
(function (Auth_Account_Providers_Update_Column) {
    Auth_Account_Providers_Update_Column["AccountId"] = "account_id";
    Auth_Account_Providers_Update_Column["AuthProvider"] = "auth_provider";
    Auth_Account_Providers_Update_Column["AuthProviderUniqueId"] = "auth_provider_unique_id";
    Auth_Account_Providers_Update_Column["CreatedAt"] = "created_at";
    Auth_Account_Providers_Update_Column["Id"] = "id";
    Auth_Account_Providers_Update_Column["UpdatedAt"] = "updated_at";
})(Auth_Account_Providers_Update_Column = exports.Auth_Account_Providers_Update_Column || (exports.Auth_Account_Providers_Update_Column = {}));
var Auth_Account_Roles_Constraint;
(function (Auth_Account_Roles_Constraint) {
    Auth_Account_Roles_Constraint["AccountRolesPkey"] = "account_roles_pkey";
    Auth_Account_Roles_Constraint["UserRolesAccountIdRoleKey"] = "user_roles_account_id_role_key";
})(Auth_Account_Roles_Constraint = exports.Auth_Account_Roles_Constraint || (exports.Auth_Account_Roles_Constraint = {}));
var Auth_Account_Roles_Select_Column;
(function (Auth_Account_Roles_Select_Column) {
    Auth_Account_Roles_Select_Column["AccountId"] = "account_id";
    Auth_Account_Roles_Select_Column["CreatedAt"] = "created_at";
    Auth_Account_Roles_Select_Column["Id"] = "id";
    Auth_Account_Roles_Select_Column["Role"] = "role";
})(Auth_Account_Roles_Select_Column = exports.Auth_Account_Roles_Select_Column || (exports.Auth_Account_Roles_Select_Column = {}));
var Auth_Account_Roles_Update_Column;
(function (Auth_Account_Roles_Update_Column) {
    Auth_Account_Roles_Update_Column["AccountId"] = "account_id";
    Auth_Account_Roles_Update_Column["CreatedAt"] = "created_at";
    Auth_Account_Roles_Update_Column["Id"] = "id";
    Auth_Account_Roles_Update_Column["Role"] = "role";
})(Auth_Account_Roles_Update_Column = exports.Auth_Account_Roles_Update_Column || (exports.Auth_Account_Roles_Update_Column = {}));
var Auth_Accounts_Constraint;
(function (Auth_Accounts_Constraint) {
    Auth_Accounts_Constraint["AccountsEmailKey"] = "accounts_email_key";
    Auth_Accounts_Constraint["AccountsNewEmailKey"] = "accounts_new_email_key";
    Auth_Accounts_Constraint["AccountsPkey"] = "accounts_pkey";
    Auth_Accounts_Constraint["AccountsUserIdKey"] = "accounts_user_id_key";
})(Auth_Accounts_Constraint = exports.Auth_Accounts_Constraint || (exports.Auth_Accounts_Constraint = {}));
var Auth_Accounts_Select_Column;
(function (Auth_Accounts_Select_Column) {
    Auth_Accounts_Select_Column["Active"] = "active";
    Auth_Accounts_Select_Column["CreatedAt"] = "created_at";
    Auth_Accounts_Select_Column["CustomRegisterData"] = "custom_register_data";
    Auth_Accounts_Select_Column["DefaultRole"] = "default_role";
    Auth_Accounts_Select_Column["Email"] = "email";
    Auth_Accounts_Select_Column["Id"] = "id";
    Auth_Accounts_Select_Column["IsAnonymous"] = "is_anonymous";
    Auth_Accounts_Select_Column["MfaEnabled"] = "mfa_enabled";
    Auth_Accounts_Select_Column["NewEmail"] = "new_email";
    Auth_Accounts_Select_Column["OtpSecret"] = "otp_secret";
    Auth_Accounts_Select_Column["PasswordHash"] = "password_hash";
    Auth_Accounts_Select_Column["Ticket"] = "ticket";
    Auth_Accounts_Select_Column["TicketExpiresAt"] = "ticket_expires_at";
    Auth_Accounts_Select_Column["UpdatedAt"] = "updated_at";
    Auth_Accounts_Select_Column["UserId"] = "user_id";
})(Auth_Accounts_Select_Column = exports.Auth_Accounts_Select_Column || (exports.Auth_Accounts_Select_Column = {}));
var Auth_Accounts_Update_Column;
(function (Auth_Accounts_Update_Column) {
    Auth_Accounts_Update_Column["Active"] = "active";
    Auth_Accounts_Update_Column["CreatedAt"] = "created_at";
    Auth_Accounts_Update_Column["CustomRegisterData"] = "custom_register_data";
    Auth_Accounts_Update_Column["DefaultRole"] = "default_role";
    Auth_Accounts_Update_Column["Email"] = "email";
    Auth_Accounts_Update_Column["Id"] = "id";
    Auth_Accounts_Update_Column["IsAnonymous"] = "is_anonymous";
    Auth_Accounts_Update_Column["MfaEnabled"] = "mfa_enabled";
    Auth_Accounts_Update_Column["NewEmail"] = "new_email";
    Auth_Accounts_Update_Column["OtpSecret"] = "otp_secret";
    Auth_Accounts_Update_Column["PasswordHash"] = "password_hash";
    Auth_Accounts_Update_Column["Ticket"] = "ticket";
    Auth_Accounts_Update_Column["TicketExpiresAt"] = "ticket_expires_at";
    Auth_Accounts_Update_Column["UpdatedAt"] = "updated_at";
    Auth_Accounts_Update_Column["UserId"] = "user_id";
})(Auth_Accounts_Update_Column = exports.Auth_Accounts_Update_Column || (exports.Auth_Accounts_Update_Column = {}));
var Auth_Providers_Constraint;
(function (Auth_Providers_Constraint) {
    Auth_Providers_Constraint["ProvidersPkey"] = "providers_pkey";
})(Auth_Providers_Constraint = exports.Auth_Providers_Constraint || (exports.Auth_Providers_Constraint = {}));
var Auth_Providers_Select_Column;
(function (Auth_Providers_Select_Column) {
    Auth_Providers_Select_Column["Provider"] = "provider";
})(Auth_Providers_Select_Column = exports.Auth_Providers_Select_Column || (exports.Auth_Providers_Select_Column = {}));
var Auth_Providers_Update_Column;
(function (Auth_Providers_Update_Column) {
    Auth_Providers_Update_Column["Provider"] = "provider";
})(Auth_Providers_Update_Column = exports.Auth_Providers_Update_Column || (exports.Auth_Providers_Update_Column = {}));
var Auth_Refresh_Tokens_Constraint;
(function (Auth_Refresh_Tokens_Constraint) {
    Auth_Refresh_Tokens_Constraint["RefreshTokensPkey"] = "refresh_tokens_pkey";
})(Auth_Refresh_Tokens_Constraint = exports.Auth_Refresh_Tokens_Constraint || (exports.Auth_Refresh_Tokens_Constraint = {}));
var Auth_Refresh_Tokens_Select_Column;
(function (Auth_Refresh_Tokens_Select_Column) {
    Auth_Refresh_Tokens_Select_Column["AccountId"] = "account_id";
    Auth_Refresh_Tokens_Select_Column["CreatedAt"] = "created_at";
    Auth_Refresh_Tokens_Select_Column["ExpiresAt"] = "expires_at";
    Auth_Refresh_Tokens_Select_Column["RefreshToken"] = "refresh_token";
})(Auth_Refresh_Tokens_Select_Column = exports.Auth_Refresh_Tokens_Select_Column || (exports.Auth_Refresh_Tokens_Select_Column = {}));
var Auth_Refresh_Tokens_Update_Column;
(function (Auth_Refresh_Tokens_Update_Column) {
    Auth_Refresh_Tokens_Update_Column["AccountId"] = "account_id";
    Auth_Refresh_Tokens_Update_Column["CreatedAt"] = "created_at";
    Auth_Refresh_Tokens_Update_Column["ExpiresAt"] = "expires_at";
    Auth_Refresh_Tokens_Update_Column["RefreshToken"] = "refresh_token";
})(Auth_Refresh_Tokens_Update_Column = exports.Auth_Refresh_Tokens_Update_Column || (exports.Auth_Refresh_Tokens_Update_Column = {}));
var Auth_Roles_Constraint;
(function (Auth_Roles_Constraint) {
    Auth_Roles_Constraint["RolesPkey"] = "roles_pkey";
})(Auth_Roles_Constraint = exports.Auth_Roles_Constraint || (exports.Auth_Roles_Constraint = {}));
var Auth_Roles_Select_Column;
(function (Auth_Roles_Select_Column) {
    Auth_Roles_Select_Column["Role"] = "role";
})(Auth_Roles_Select_Column = exports.Auth_Roles_Select_Column || (exports.Auth_Roles_Select_Column = {}));
var Auth_Roles_Update_Column;
(function (Auth_Roles_Update_Column) {
    Auth_Roles_Update_Column["Role"] = "role";
})(Auth_Roles_Update_Column = exports.Auth_Roles_Update_Column || (exports.Auth_Roles_Update_Column = {}));
var Drug_Constraint;
(function (Drug_Constraint) {
    Drug_Constraint["DrugPkey"] = "drug_pkey";
})(Drug_Constraint = exports.Drug_Constraint || (exports.Drug_Constraint = {}));
var Drug_Select_Column;
(function (Drug_Select_Column) {
    Drug_Select_Column["Id"] = "id";
    Drug_Select_Column["Name"] = "name";
    Drug_Select_Column["UpdatedAt"] = "updated_at";
})(Drug_Select_Column = exports.Drug_Select_Column || (exports.Drug_Select_Column = {}));
var Drug_Update_Column;
(function (Drug_Update_Column) {
    Drug_Update_Column["Id"] = "id";
    Drug_Update_Column["Name"] = "name";
    Drug_Update_Column["UpdatedAt"] = "updated_at";
})(Drug_Update_Column = exports.Drug_Update_Column || (exports.Drug_Update_Column = {}));
var Lab_Test_Constraint;
(function (Lab_Test_Constraint) {
    Lab_Test_Constraint["LabTestPkey"] = "lab_test_pkey";
})(Lab_Test_Constraint = exports.Lab_Test_Constraint || (exports.Lab_Test_Constraint = {}));
var Lab_Test_Select_Column;
(function (Lab_Test_Select_Column) {
    Lab_Test_Select_Column["Deleted"] = "deleted";
    Lab_Test_Select_Column["Id"] = "id";
    Lab_Test_Select_Column["Name"] = "name";
    Lab_Test_Select_Column["UpdatedAt"] = "updated_at";
})(Lab_Test_Select_Column = exports.Lab_Test_Select_Column || (exports.Lab_Test_Select_Column = {}));
var Lab_Test_Update_Column;
(function (Lab_Test_Update_Column) {
    Lab_Test_Update_Column["Deleted"] = "deleted";
    Lab_Test_Update_Column["Id"] = "id";
    Lab_Test_Update_Column["Name"] = "name";
    Lab_Test_Update_Column["UpdatedAt"] = "updated_at";
})(Lab_Test_Update_Column = exports.Lab_Test_Update_Column || (exports.Lab_Test_Update_Column = {}));
var Metadata_Check_Constraint_Select_Column;
(function (Metadata_Check_Constraint_Select_Column) {
    Metadata_Check_Constraint_Select_Column["Check"] = "check";
    Metadata_Check_Constraint_Select_Column["ConstraintName"] = "constraint_name";
    Metadata_Check_Constraint_Select_Column["Id"] = "id";
    Metadata_Check_Constraint_Select_Column["TableId"] = "table_id";
    Metadata_Check_Constraint_Select_Column["TableName"] = "table_name";
    Metadata_Check_Constraint_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Check_Constraint_Select_Column = exports.Metadata_Check_Constraint_Select_Column || (exports.Metadata_Check_Constraint_Select_Column = {}));
var Metadata_Column_Info_Select_Column;
(function (Metadata_Column_Info_Select_Column) {
    Metadata_Column_Info_Select_Column["CharacterMaximumLength"] = "character_maximum_length";
    Metadata_Column_Info_Select_Column["CharacterOctetLength"] = "character_octet_length";
    Metadata_Column_Info_Select_Column["CharacterSetCatalog"] = "character_set_catalog";
    Metadata_Column_Info_Select_Column["CharacterSetName"] = "character_set_name";
    Metadata_Column_Info_Select_Column["CharacterSetSchema"] = "character_set_schema";
    Metadata_Column_Info_Select_Column["CollationCatalog"] = "collation_catalog";
    Metadata_Column_Info_Select_Column["CollationName"] = "collation_name";
    Metadata_Column_Info_Select_Column["CollationSchema"] = "collation_schema";
    Metadata_Column_Info_Select_Column["ColumnDefault"] = "column_default";
    Metadata_Column_Info_Select_Column["ColumnName"] = "column_name";
    Metadata_Column_Info_Select_Column["DataType"] = "data_type";
    Metadata_Column_Info_Select_Column["DatetimePrecision"] = "datetime_precision";
    Metadata_Column_Info_Select_Column["DomainCatalog"] = "domain_catalog";
    Metadata_Column_Info_Select_Column["DomainName"] = "domain_name";
    Metadata_Column_Info_Select_Column["DomainSchema"] = "domain_schema";
    Metadata_Column_Info_Select_Column["DtdIdentifier"] = "dtd_identifier";
    Metadata_Column_Info_Select_Column["GenerationExpression"] = "generation_expression";
    Metadata_Column_Info_Select_Column["Id"] = "id";
    Metadata_Column_Info_Select_Column["IdentityCycle"] = "identity_cycle";
    Metadata_Column_Info_Select_Column["IdentityGeneration"] = "identity_generation";
    Metadata_Column_Info_Select_Column["IdentityIncrement"] = "identity_increment";
    Metadata_Column_Info_Select_Column["IdentityMaximum"] = "identity_maximum";
    Metadata_Column_Info_Select_Column["IdentityMinimum"] = "identity_minimum";
    Metadata_Column_Info_Select_Column["IdentityStart"] = "identity_start";
    Metadata_Column_Info_Select_Column["IntervalPrecision"] = "interval_precision";
    Metadata_Column_Info_Select_Column["IntervalType"] = "interval_type";
    Metadata_Column_Info_Select_Column["IsGenerated"] = "is_generated";
    Metadata_Column_Info_Select_Column["IsIdentity"] = "is_identity";
    Metadata_Column_Info_Select_Column["IsNullable"] = "is_nullable";
    Metadata_Column_Info_Select_Column["IsSelfReferencing"] = "is_self_referencing";
    Metadata_Column_Info_Select_Column["IsUpdatable"] = "is_updatable";
    Metadata_Column_Info_Select_Column["MaximumCardinality"] = "maximum_cardinality";
    Metadata_Column_Info_Select_Column["NumericPrecision"] = "numeric_precision";
    Metadata_Column_Info_Select_Column["NumericPrecisionRadix"] = "numeric_precision_radix";
    Metadata_Column_Info_Select_Column["NumericScale"] = "numeric_scale";
    Metadata_Column_Info_Select_Column["OrdinalPosition"] = "ordinal_position";
    Metadata_Column_Info_Select_Column["ScopeCatalog"] = "scope_catalog";
    Metadata_Column_Info_Select_Column["ScopeName"] = "scope_name";
    Metadata_Column_Info_Select_Column["ScopeSchema"] = "scope_schema";
    Metadata_Column_Info_Select_Column["TableCatalog"] = "table_catalog";
    Metadata_Column_Info_Select_Column["TableId"] = "table_id";
    Metadata_Column_Info_Select_Column["TableName"] = "table_name";
    Metadata_Column_Info_Select_Column["TableSchema"] = "table_schema";
    Metadata_Column_Info_Select_Column["UdtCatalog"] = "udt_catalog";
    Metadata_Column_Info_Select_Column["UdtName"] = "udt_name";
    Metadata_Column_Info_Select_Column["UdtSchema"] = "udt_schema";
})(Metadata_Column_Info_Select_Column = exports.Metadata_Column_Info_Select_Column || (exports.Metadata_Column_Info_Select_Column = {}));
var Metadata_Computed_Field_Select_Column;
(function (Metadata_Computed_Field_Select_Column) {
    Metadata_Computed_Field_Select_Column["Comment"] = "comment";
    Metadata_Computed_Field_Select_Column["ComputedFieldName"] = "computed_field_name";
    Metadata_Computed_Field_Select_Column["Definition"] = "definition";
    Metadata_Computed_Field_Select_Column["Id"] = "id";
    Metadata_Computed_Field_Select_Column["TableId"] = "table_id";
    Metadata_Computed_Field_Select_Column["TableName"] = "table_name";
    Metadata_Computed_Field_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Computed_Field_Select_Column = exports.Metadata_Computed_Field_Select_Column || (exports.Metadata_Computed_Field_Select_Column = {}));
var Metadata_Computed_Property_Constraint;
(function (Metadata_Computed_Property_Constraint) {
    Metadata_Computed_Property_Constraint["ComputedPropertyPkey"] = "computed_property_pkey";
})(Metadata_Computed_Property_Constraint = exports.Metadata_Computed_Property_Constraint || (exports.Metadata_Computed_Property_Constraint = {}));
var Metadata_Computed_Property_Select_Column;
(function (Metadata_Computed_Property_Select_Column) {
    Metadata_Computed_Property_Select_Column["Id"] = "id";
    Metadata_Computed_Property_Select_Column["Name"] = "name";
    Metadata_Computed_Property_Select_Column["Nullable"] = "nullable";
    Metadata_Computed_Property_Select_Column["TableId"] = "table_id";
    Metadata_Computed_Property_Select_Column["Template"] = "template";
    Metadata_Computed_Property_Select_Column["Transformation"] = "transformation";
    Metadata_Computed_Property_Select_Column["Type"] = "type";
})(Metadata_Computed_Property_Select_Column = exports.Metadata_Computed_Property_Select_Column || (exports.Metadata_Computed_Property_Select_Column = {}));
var Metadata_Computed_Property_Update_Column;
(function (Metadata_Computed_Property_Update_Column) {
    Metadata_Computed_Property_Update_Column["Id"] = "id";
    Metadata_Computed_Property_Update_Column["Name"] = "name";
    Metadata_Computed_Property_Update_Column["Nullable"] = "nullable";
    Metadata_Computed_Property_Update_Column["TableId"] = "table_id";
    Metadata_Computed_Property_Update_Column["Template"] = "template";
    Metadata_Computed_Property_Update_Column["Transformation"] = "transformation";
    Metadata_Computed_Property_Update_Column["Type"] = "type";
})(Metadata_Computed_Property_Update_Column = exports.Metadata_Computed_Property_Update_Column || (exports.Metadata_Computed_Property_Update_Column = {}));
var Metadata_Custom_Type_Select_Column;
(function (Metadata_Custom_Type_Select_Column) {
    Metadata_Custom_Type_Select_Column["CustomTypes"] = "custom_types";
})(Metadata_Custom_Type_Select_Column = exports.Metadata_Custom_Type_Select_Column || (exports.Metadata_Custom_Type_Select_Column = {}));
var Metadata_Foreign_Key_Constraint_Select_Column;
(function (Metadata_Foreign_Key_Constraint_Select_Column) {
    Metadata_Foreign_Key_Constraint_Select_Column["ColumnMapping"] = "column_mapping";
    Metadata_Foreign_Key_Constraint_Select_Column["Columns"] = "columns";
    Metadata_Foreign_Key_Constraint_Select_Column["ConstraintName"] = "constraint_name";
    Metadata_Foreign_Key_Constraint_Select_Column["ConstraintOid"] = "constraint_oid";
    Metadata_Foreign_Key_Constraint_Select_Column["Id"] = "id";
    Metadata_Foreign_Key_Constraint_Select_Column["OnDelete"] = "on_delete";
    Metadata_Foreign_Key_Constraint_Select_Column["OnUpdate"] = "on_update";
    Metadata_Foreign_Key_Constraint_Select_Column["RefColumns"] = "ref_columns";
    Metadata_Foreign_Key_Constraint_Select_Column["RefId"] = "ref_id";
    Metadata_Foreign_Key_Constraint_Select_Column["RefTable"] = "ref_table";
    Metadata_Foreign_Key_Constraint_Select_Column["RefTableTableSchema"] = "ref_table_table_schema";
    Metadata_Foreign_Key_Constraint_Select_Column["TableId"] = "table_id";
    Metadata_Foreign_Key_Constraint_Select_Column["TableName"] = "table_name";
    Metadata_Foreign_Key_Constraint_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Foreign_Key_Constraint_Select_Column = exports.Metadata_Foreign_Key_Constraint_Select_Column || (exports.Metadata_Foreign_Key_Constraint_Select_Column = {}));
var Metadata_Function_Agg_Select_Column;
(function (Metadata_Function_Agg_Select_Column) {
    Metadata_Function_Agg_Select_Column["DefaultArgs"] = "default_args";
    Metadata_Function_Agg_Select_Column["Description"] = "description";
    Metadata_Function_Agg_Select_Column["FunctionDefinition"] = "function_definition";
    Metadata_Function_Agg_Select_Column["FunctionName"] = "function_name";
    Metadata_Function_Agg_Select_Column["FunctionOid"] = "function_oid";
    Metadata_Function_Agg_Select_Column["FunctionSchema"] = "function_schema";
    Metadata_Function_Agg_Select_Column["FunctionType"] = "function_type";
    Metadata_Function_Agg_Select_Column["HasVariadic"] = "has_variadic";
    Metadata_Function_Agg_Select_Column["InputArgNames"] = "input_arg_names";
    Metadata_Function_Agg_Select_Column["InputArgTypes"] = "input_arg_types";
    Metadata_Function_Agg_Select_Column["ReturnTypeName"] = "return_type_name";
    Metadata_Function_Agg_Select_Column["ReturnTypeSchema"] = "return_type_schema";
    Metadata_Function_Agg_Select_Column["ReturnTypeType"] = "return_type_type";
    Metadata_Function_Agg_Select_Column["ReturnsSet"] = "returns_set";
})(Metadata_Function_Agg_Select_Column = exports.Metadata_Function_Agg_Select_Column || (exports.Metadata_Function_Agg_Select_Column = {}));
var Metadata_Function_Select_Column;
(function (Metadata_Function_Select_Column) {
    Metadata_Function_Select_Column["Configuration"] = "configuration";
    Metadata_Function_Select_Column["FunctionName"] = "function_name";
    Metadata_Function_Select_Column["FunctionSchema"] = "function_schema";
    Metadata_Function_Select_Column["IsSystemDefined"] = "is_system_defined";
})(Metadata_Function_Select_Column = exports.Metadata_Function_Select_Column || (exports.Metadata_Function_Select_Column = {}));
var Metadata_Index_Column_Select_Column;
(function (Metadata_Index_Column_Select_Column) {
    Metadata_Index_Column_Select_Column["ColumnId"] = "column_id";
    Metadata_Index_Column_Select_Column["ColumnName"] = "column_name";
    Metadata_Index_Column_Select_Column["Id"] = "id";
    Metadata_Index_Column_Select_Column["IndexId"] = "index_id";
    Metadata_Index_Column_Select_Column["IndexName"] = "index_name";
    Metadata_Index_Column_Select_Column["TableId"] = "table_id";
    Metadata_Index_Column_Select_Column["TableName"] = "table_name";
    Metadata_Index_Column_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Index_Column_Select_Column = exports.Metadata_Index_Column_Select_Column || (exports.Metadata_Index_Column_Select_Column = {}));
var Metadata_Index_Select_Column;
(function (Metadata_Index_Select_Column) {
    Metadata_Index_Select_Column["Id"] = "id";
    Metadata_Index_Select_Column["IndexName"] = "index_name";
    Metadata_Index_Select_Column["TableId"] = "table_id";
    Metadata_Index_Select_Column["TableName"] = "table_name";
    Metadata_Index_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Index_Select_Column = exports.Metadata_Index_Select_Column || (exports.Metadata_Index_Select_Column = {}));
var Metadata_Permission_Agg_Select_Column;
(function (Metadata_Permission_Agg_Select_Column) {
    Metadata_Permission_Agg_Select_Column["Id"] = "id";
    Metadata_Permission_Agg_Select_Column["Permissions"] = "permissions";
    Metadata_Permission_Agg_Select_Column["RoleName"] = "role_name";
    Metadata_Permission_Agg_Select_Column["TableId"] = "table_id";
    Metadata_Permission_Agg_Select_Column["TableName"] = "table_name";
    Metadata_Permission_Agg_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Permission_Agg_Select_Column = exports.Metadata_Permission_Agg_Select_Column || (exports.Metadata_Permission_Agg_Select_Column = {}));
var Metadata_Permission_Insert_Columns_Select_Column;
(function (Metadata_Permission_Insert_Columns_Select_Column) {
    Metadata_Permission_Insert_Columns_Select_Column["ColumnId"] = "column_id";
    Metadata_Permission_Insert_Columns_Select_Column["ColumnName"] = "column_name";
    Metadata_Permission_Insert_Columns_Select_Column["Id"] = "id";
    Metadata_Permission_Insert_Columns_Select_Column["RoleName"] = "role_name";
    Metadata_Permission_Insert_Columns_Select_Column["TableId"] = "table_id";
    Metadata_Permission_Insert_Columns_Select_Column["TableName"] = "table_name";
    Metadata_Permission_Insert_Columns_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Permission_Insert_Columns_Select_Column = exports.Metadata_Permission_Insert_Columns_Select_Column || (exports.Metadata_Permission_Insert_Columns_Select_Column = {}));
var Metadata_Permission_Select_Columns_Select_Column;
(function (Metadata_Permission_Select_Columns_Select_Column) {
    Metadata_Permission_Select_Columns_Select_Column["ColumnId"] = "column_id";
    Metadata_Permission_Select_Columns_Select_Column["ColumnName"] = "column_name";
    Metadata_Permission_Select_Columns_Select_Column["Id"] = "id";
    Metadata_Permission_Select_Columns_Select_Column["RoleName"] = "role_name";
    Metadata_Permission_Select_Columns_Select_Column["TableId"] = "table_id";
    Metadata_Permission_Select_Columns_Select_Column["TableName"] = "table_name";
    Metadata_Permission_Select_Columns_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Permission_Select_Columns_Select_Column = exports.Metadata_Permission_Select_Columns_Select_Column || (exports.Metadata_Permission_Select_Columns_Select_Column = {}));
var Metadata_Permission_Update_Columns_Select_Column;
(function (Metadata_Permission_Update_Columns_Select_Column) {
    Metadata_Permission_Update_Columns_Select_Column["ColumnId"] = "column_id";
    Metadata_Permission_Update_Columns_Select_Column["ColumnName"] = "column_name";
    Metadata_Permission_Update_Columns_Select_Column["Id"] = "id";
    Metadata_Permission_Update_Columns_Select_Column["RoleName"] = "role_name";
    Metadata_Permission_Update_Columns_Select_Column["TableId"] = "table_id";
    Metadata_Permission_Update_Columns_Select_Column["TableName"] = "table_name";
    Metadata_Permission_Update_Columns_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Permission_Update_Columns_Select_Column = exports.Metadata_Permission_Update_Columns_Select_Column || (exports.Metadata_Permission_Update_Columns_Select_Column = {}));
var Metadata_Primary_Key_Column_Select_Column;
(function (Metadata_Primary_Key_Column_Select_Column) {
    Metadata_Primary_Key_Column_Select_Column["ColumnId"] = "column_id";
    Metadata_Primary_Key_Column_Select_Column["ColumnName"] = "column_name";
    Metadata_Primary_Key_Column_Select_Column["ConstraintName"] = "constraint_name";
    Metadata_Primary_Key_Column_Select_Column["Id"] = "id";
    Metadata_Primary_Key_Column_Select_Column["TableId"] = "table_id";
    Metadata_Primary_Key_Column_Select_Column["TableName"] = "table_name";
    Metadata_Primary_Key_Column_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Primary_Key_Column_Select_Column = exports.Metadata_Primary_Key_Column_Select_Column || (exports.Metadata_Primary_Key_Column_Select_Column = {}));
var Metadata_Primary_Key_Select_Column;
(function (Metadata_Primary_Key_Select_Column) {
    Metadata_Primary_Key_Select_Column["ConstraintName"] = "constraint_name";
    Metadata_Primary_Key_Select_Column["Id"] = "id";
    Metadata_Primary_Key_Select_Column["TableId"] = "table_id";
    Metadata_Primary_Key_Select_Column["TableName"] = "table_name";
    Metadata_Primary_Key_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Primary_Key_Select_Column = exports.Metadata_Primary_Key_Select_Column || (exports.Metadata_Primary_Key_Select_Column = {}));
var Metadata_Property_Config_Constraint;
(function (Metadata_Property_Config_Constraint) {
    Metadata_Property_Config_Constraint["PropertyConfigPkey"] = "property_config_pkey";
})(Metadata_Property_Config_Constraint = exports.Metadata_Property_Config_Constraint || (exports.Metadata_Property_Config_Constraint = {}));
var Metadata_Property_Config_Select_Column;
(function (Metadata_Property_Config_Select_Column) {
    Metadata_Property_Config_Select_Column["Deleted"] = "deleted";
    Metadata_Property_Config_Select_Column["Description"] = "description";
    Metadata_Property_Config_Select_Column["EditComponent"] = "edit_component";
    Metadata_Property_Config_Select_Column["EditComponentOptions"] = "edit_component_options";
    Metadata_Property_Config_Select_Column["Icon"] = "icon";
    Metadata_Property_Config_Select_Column["Id"] = "id";
    Metadata_Property_Config_Select_Column["JsonSchema"] = "json_schema";
    Metadata_Property_Config_Select_Column["Order"] = "order";
    Metadata_Property_Config_Select_Column["PropertyId"] = "property_id";
    Metadata_Property_Config_Select_Column["PropertyName"] = "property_name";
    Metadata_Property_Config_Select_Column["ReadComponent"] = "read_component";
    Metadata_Property_Config_Select_Column["ReadComponentOptions"] = "read_component_options";
    Metadata_Property_Config_Select_Column["TableId"] = "table_id";
    Metadata_Property_Config_Select_Column["Title"] = "title";
    Metadata_Property_Config_Select_Column["UpdatedAt"] = "updated_at";
})(Metadata_Property_Config_Select_Column = exports.Metadata_Property_Config_Select_Column || (exports.Metadata_Property_Config_Select_Column = {}));
var Metadata_Property_Config_Update_Column;
(function (Metadata_Property_Config_Update_Column) {
    Metadata_Property_Config_Update_Column["Deleted"] = "deleted";
    Metadata_Property_Config_Update_Column["Description"] = "description";
    Metadata_Property_Config_Update_Column["EditComponent"] = "edit_component";
    Metadata_Property_Config_Update_Column["EditComponentOptions"] = "edit_component_options";
    Metadata_Property_Config_Update_Column["Icon"] = "icon";
    Metadata_Property_Config_Update_Column["Id"] = "id";
    Metadata_Property_Config_Update_Column["JsonSchema"] = "json_schema";
    Metadata_Property_Config_Update_Column["Order"] = "order";
    Metadata_Property_Config_Update_Column["PropertyId"] = "property_id";
    Metadata_Property_Config_Update_Column["PropertyName"] = "property_name";
    Metadata_Property_Config_Update_Column["ReadComponent"] = "read_component";
    Metadata_Property_Config_Update_Column["ReadComponentOptions"] = "read_component_options";
    Metadata_Property_Config_Update_Column["TableId"] = "table_id";
    Metadata_Property_Config_Update_Column["Title"] = "title";
    Metadata_Property_Config_Update_Column["UpdatedAt"] = "updated_at";
})(Metadata_Property_Config_Update_Column = exports.Metadata_Property_Config_Update_Column || (exports.Metadata_Property_Config_Update_Column = {}));
var Metadata_Relationship_Mapping_Select_Column;
(function (Metadata_Relationship_Mapping_Select_Column) {
    Metadata_Relationship_Mapping_Select_Column["ColumnId"] = "column_id";
    Metadata_Relationship_Mapping_Select_Column["ColumnName"] = "column_name";
    Metadata_Relationship_Mapping_Select_Column["Id"] = "id";
    Metadata_Relationship_Mapping_Select_Column["RelName"] = "rel_name";
    Metadata_Relationship_Mapping_Select_Column["RemoteColumnId"] = "remote_column_id";
    Metadata_Relationship_Mapping_Select_Column["RemoteColumnName"] = "remote_column_name";
    Metadata_Relationship_Mapping_Select_Column["RemoteSchemaName"] = "remote_schema_name";
    Metadata_Relationship_Mapping_Select_Column["RemoteTableId"] = "remote_table_id";
    Metadata_Relationship_Mapping_Select_Column["RemoteTableName"] = "remote_table_name";
    Metadata_Relationship_Mapping_Select_Column["TableId"] = "table_id";
    Metadata_Relationship_Mapping_Select_Column["TableName"] = "table_name";
    Metadata_Relationship_Mapping_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Relationship_Mapping_Select_Column = exports.Metadata_Relationship_Mapping_Select_Column || (exports.Metadata_Relationship_Mapping_Select_Column = {}));
var Metadata_Relationship_Select_Column;
(function (Metadata_Relationship_Select_Column) {
    Metadata_Relationship_Select_Column["Comment"] = "comment";
    Metadata_Relationship_Select_Column["Id"] = "id";
    Metadata_Relationship_Select_Column["IsSystemDefined"] = "is_system_defined";
    Metadata_Relationship_Select_Column["RelDef"] = "rel_def";
    Metadata_Relationship_Select_Column["RelName"] = "rel_name";
    Metadata_Relationship_Select_Column["RelType"] = "rel_type";
    Metadata_Relationship_Select_Column["TableId"] = "table_id";
    Metadata_Relationship_Select_Column["TableName"] = "table_name";
    Metadata_Relationship_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Relationship_Select_Column = exports.Metadata_Relationship_Select_Column || (exports.Metadata_Relationship_Select_Column = {}));
var Metadata_Role_Select_Column;
(function (Metadata_Role_Select_Column) {
    Metadata_Role_Select_Column["Id"] = "id";
    Metadata_Role_Select_Column["RoleName"] = "role_name";
})(Metadata_Role_Select_Column = exports.Metadata_Role_Select_Column || (exports.Metadata_Role_Select_Column = {}));
var Metadata_Schema_Info_Select_Column;
(function (Metadata_Schema_Info_Select_Column) {
    Metadata_Schema_Info_Select_Column["CatalogName"] = "catalog_name";
    Metadata_Schema_Info_Select_Column["DefaultCharacterSetCatalog"] = "default_character_set_catalog";
    Metadata_Schema_Info_Select_Column["DefaultCharacterSetName"] = "default_character_set_name";
    Metadata_Schema_Info_Select_Column["DefaultCharacterSetSchema"] = "default_character_set_schema";
    Metadata_Schema_Info_Select_Column["SchemaName"] = "schema_name";
    Metadata_Schema_Info_Select_Column["SchemaOwner"] = "schema_owner";
    Metadata_Schema_Info_Select_Column["SqlPath"] = "sql_path";
})(Metadata_Schema_Info_Select_Column = exports.Metadata_Schema_Info_Select_Column || (exports.Metadata_Schema_Info_Select_Column = {}));
var Metadata_Table_Config_Constraint;
(function (Metadata_Table_Config_Constraint) {
    Metadata_Table_Config_Constraint["TableConfigPkey"] = "table_config_pkey";
})(Metadata_Table_Config_Constraint = exports.Metadata_Table_Config_Constraint || (exports.Metadata_Table_Config_Constraint = {}));
var Metadata_Table_Config_Select_Column;
(function (Metadata_Table_Config_Select_Column) {
    Metadata_Table_Config_Select_Column["Component"] = "component";
    Metadata_Table_Config_Select_Column["Deleted"] = "deleted";
    Metadata_Table_Config_Select_Column["Description"] = "description";
    Metadata_Table_Config_Select_Column["DocumentLabel"] = "document_label";
    Metadata_Table_Config_Select_Column["DocumentTitle"] = "document_title";
    Metadata_Table_Config_Select_Column["Icon"] = "icon";
    Metadata_Table_Config_Select_Column["Id"] = "id";
    Metadata_Table_Config_Select_Column["TableId"] = "table_id";
    Metadata_Table_Config_Select_Column["Title"] = "title";
    Metadata_Table_Config_Select_Column["UpdatedAt"] = "updated_at";
})(Metadata_Table_Config_Select_Column = exports.Metadata_Table_Config_Select_Column || (exports.Metadata_Table_Config_Select_Column = {}));
var Metadata_Table_Config_Update_Column;
(function (Metadata_Table_Config_Update_Column) {
    Metadata_Table_Config_Update_Column["Component"] = "component";
    Metadata_Table_Config_Update_Column["Deleted"] = "deleted";
    Metadata_Table_Config_Update_Column["Description"] = "description";
    Metadata_Table_Config_Update_Column["DocumentLabel"] = "document_label";
    Metadata_Table_Config_Update_Column["DocumentTitle"] = "document_title";
    Metadata_Table_Config_Update_Column["Icon"] = "icon";
    Metadata_Table_Config_Update_Column["Id"] = "id";
    Metadata_Table_Config_Update_Column["TableId"] = "table_id";
    Metadata_Table_Config_Update_Column["Title"] = "title";
    Metadata_Table_Config_Update_Column["UpdatedAt"] = "updated_at";
})(Metadata_Table_Config_Update_Column = exports.Metadata_Table_Config_Update_Column || (exports.Metadata_Table_Config_Update_Column = {}));
var Metadata_Table_Info_Select_Column;
(function (Metadata_Table_Info_Select_Column) {
    Metadata_Table_Info_Select_Column["CommitAction"] = "commit_action";
    Metadata_Table_Info_Select_Column["Id"] = "id";
    Metadata_Table_Info_Select_Column["IsInsertableInto"] = "is_insertable_into";
    Metadata_Table_Info_Select_Column["IsTyped"] = "is_typed";
    Metadata_Table_Info_Select_Column["ReferenceGeneration"] = "reference_generation";
    Metadata_Table_Info_Select_Column["SelfReferencingColumnName"] = "self_referencing_column_name";
    Metadata_Table_Info_Select_Column["TableCatalog"] = "table_catalog";
    Metadata_Table_Info_Select_Column["TableName"] = "table_name";
    Metadata_Table_Info_Select_Column["TableSchema"] = "table_schema";
    Metadata_Table_Info_Select_Column["TableType"] = "table_type";
    Metadata_Table_Info_Select_Column["UserDefinedTypeCatalog"] = "user_defined_type_catalog";
    Metadata_Table_Info_Select_Column["UserDefinedTypeName"] = "user_defined_type_name";
    Metadata_Table_Info_Select_Column["UserDefinedTypeSchema"] = "user_defined_type_schema";
})(Metadata_Table_Info_Select_Column = exports.Metadata_Table_Info_Select_Column || (exports.Metadata_Table_Info_Select_Column = {}));
var Metadata_Table_Select_Column;
(function (Metadata_Table_Select_Column) {
    Metadata_Table_Select_Column["Configuration"] = "configuration";
    Metadata_Table_Select_Column["Deleted"] = "deleted";
    Metadata_Table_Select_Column["Id"] = "id";
    Metadata_Table_Select_Column["IsEnum"] = "is_enum";
    Metadata_Table_Select_Column["IsSystemDefined"] = "is_system_defined";
    Metadata_Table_Select_Column["TableName"] = "table_name";
    Metadata_Table_Select_Column["TableSchema"] = "table_schema";
    Metadata_Table_Select_Column["UpdatedAt"] = "updated_at";
})(Metadata_Table_Select_Column = exports.Metadata_Table_Select_Column || (exports.Metadata_Table_Select_Column = {}));
var Metadata_Unique_Constraint_Select_Column;
(function (Metadata_Unique_Constraint_Select_Column) {
    Metadata_Unique_Constraint_Select_Column["Columns"] = "columns";
    Metadata_Unique_Constraint_Select_Column["ConstraintName"] = "constraint_name";
    Metadata_Unique_Constraint_Select_Column["Id"] = "id";
    Metadata_Unique_Constraint_Select_Column["TableName"] = "table_name";
    Metadata_Unique_Constraint_Select_Column["TableSchema"] = "table_schema";
})(Metadata_Unique_Constraint_Select_Column = exports.Metadata_Unique_Constraint_Select_Column || (exports.Metadata_Unique_Constraint_Select_Column = {}));
var Metadata_View_Info_Select_Column;
(function (Metadata_View_Info_Select_Column) {
    Metadata_View_Info_Select_Column["CheckOption"] = "check_option";
    Metadata_View_Info_Select_Column["Id"] = "id";
    Metadata_View_Info_Select_Column["IsInsertableInto"] = "is_insertable_into";
    Metadata_View_Info_Select_Column["IsTriggerDeletable"] = "is_trigger_deletable";
    Metadata_View_Info_Select_Column["IsTriggerInsertableInto"] = "is_trigger_insertable_into";
    Metadata_View_Info_Select_Column["IsTriggerUpdatable"] = "is_trigger_updatable";
    Metadata_View_Info_Select_Column["IsUpdatable"] = "is_updatable";
    Metadata_View_Info_Select_Column["TableCatalog"] = "table_catalog";
    Metadata_View_Info_Select_Column["TableName"] = "table_name";
    Metadata_View_Info_Select_Column["TableSchema"] = "table_schema";
    Metadata_View_Info_Select_Column["ViewDefinition"] = "view_definition";
})(Metadata_View_Info_Select_Column = exports.Metadata_View_Info_Select_Column || (exports.Metadata_View_Info_Select_Column = {}));
var Order_By;
(function (Order_By) {
    Order_By["Asc"] = "asc";
    Order_By["AscNullsFirst"] = "asc_nulls_first";
    Order_By["AscNullsLast"] = "asc_nulls_last";
    Order_By["Desc"] = "desc";
    Order_By["DescNullsFirst"] = "desc_nulls_first";
    Order_By["DescNullsLast"] = "desc_nulls_last";
})(Order_By = exports.Order_By || (exports.Order_By = {}));
var Patient_Constraint;
(function (Patient_Constraint) {
    Patient_Constraint["PatientPkey"] = "patient_pkey";
})(Patient_Constraint = exports.Patient_Constraint || (exports.Patient_Constraint = {}));
var Patient_Select_Column;
(function (Patient_Select_Column) {
    Patient_Select_Column["ABigint"] = "a_bigint";
    Patient_Select_Column["ABoolean"] = "a_boolean";
    Patient_Select_Column["ACitext"] = "a_citext";
    Patient_Select_Column["ADate"] = "a_date";
    Patient_Select_Column["AJsonb"] = "a_jsonb";
    Patient_Select_Column["ANumeric"] = "a_numeric";
    Patient_Select_Column["AReal"] = "a_real";
    Patient_Select_Column["AnInteger"] = "an_integer";
    Patient_Select_Column["AnUuid"] = "an_uuid";
    Patient_Select_Column["Deleted"] = "deleted";
    Patient_Select_Column["Id"] = "id";
    Patient_Select_Column["Name"] = "name";
    Patient_Select_Column["UpdatedAt"] = "updated_at";
})(Patient_Select_Column = exports.Patient_Select_Column || (exports.Patient_Select_Column = {}));
var Patient_Update_Column;
(function (Patient_Update_Column) {
    Patient_Update_Column["ABigint"] = "a_bigint";
    Patient_Update_Column["ABoolean"] = "a_boolean";
    Patient_Update_Column["ACitext"] = "a_citext";
    Patient_Update_Column["ADate"] = "a_date";
    Patient_Update_Column["AJsonb"] = "a_jsonb";
    Patient_Update_Column["ANumeric"] = "a_numeric";
    Patient_Update_Column["AReal"] = "a_real";
    Patient_Update_Column["AnInteger"] = "an_integer";
    Patient_Update_Column["AnUuid"] = "an_uuid";
    Patient_Update_Column["Deleted"] = "deleted";
    Patient_Update_Column["Id"] = "id";
    Patient_Update_Column["Name"] = "name";
    Patient_Update_Column["UpdatedAt"] = "updated_at";
})(Patient_Update_Column = exports.Patient_Update_Column || (exports.Patient_Update_Column = {}));
var Users_Constraint;
(function (Users_Constraint) {
    Users_Constraint["UsersPkey"] = "users_pkey";
})(Users_Constraint = exports.Users_Constraint || (exports.Users_Constraint = {}));
var Users_Select_Column;
(function (Users_Select_Column) {
    Users_Select_Column["AvatarUrl"] = "avatar_url";
    Users_Select_Column["CreatedAt"] = "created_at";
    Users_Select_Column["Deleted"] = "deleted";
    Users_Select_Column["DisplayName"] = "display_name";
    Users_Select_Column["Id"] = "id";
    Users_Select_Column["UpdatedAt"] = "updated_at";
})(Users_Select_Column = exports.Users_Select_Column || (exports.Users_Select_Column = {}));
var Users_Update_Column;
(function (Users_Update_Column) {
    Users_Update_Column["AvatarUrl"] = "avatar_url";
    Users_Update_Column["CreatedAt"] = "created_at";
    Users_Update_Column["Deleted"] = "deleted";
    Users_Update_Column["DisplayName"] = "display_name";
    Users_Update_Column["Id"] = "id";
    Users_Update_Column["UpdatedAt"] = "updated_at";
})(Users_Update_Column = exports.Users_Update_Column || (exports.Users_Update_Column = {}));
var Visite_Constraint;
(function (Visite_Constraint) {
    Visite_Constraint["VisitePkey"] = "visite_pkey";
})(Visite_Constraint = exports.Visite_Constraint || (exports.Visite_Constraint = {}));
var Visite_Select_Column;
(function (Visite_Select_Column) {
    Visite_Select_Column["Deleted"] = "deleted";
    Visite_Select_Column["Id"] = "id";
    Visite_Select_Column["Muac"] = "muac";
    Visite_Select_Column["PatientId"] = "patient_id";
    Visite_Select_Column["Test"] = "test";
    Visite_Select_Column["UpdatedAt"] = "updated_at";
    Visite_Select_Column["VisitDate"] = "visit_date";
})(Visite_Select_Column = exports.Visite_Select_Column || (exports.Visite_Select_Column = {}));
var Visite_Update_Column;
(function (Visite_Update_Column) {
    Visite_Update_Column["Deleted"] = "deleted";
    Visite_Update_Column["Id"] = "id";
    Visite_Update_Column["Muac"] = "muac";
    Visite_Update_Column["PatientId"] = "patient_id";
    Visite_Update_Column["Test"] = "test";
    Visite_Update_Column["UpdatedAt"] = "updated_at";
    Visite_Update_Column["VisitDate"] = "visit_date";
})(Visite_Update_Column = exports.Visite_Update_Column || (exports.Visite_Update_Column = {}));
exports.CoreTableFragmentDoc = graphql_tag_1.default `
  fragment coreTable on metadata_table {
    table_name
    table_schema
  }
`;
exports.ColumnFragmentDoc = graphql_tag_1.default `
  fragment column on metadata_column_info {
    column_name
    udt_name
    is_nullable
  }
`;
exports.TableFragmentDoc = graphql_tag_1.default `
  fragment table on metadata_table {
    ...coreTable
    view {
      id
    }
    primaryKey {
      constraint_name
      columns {
        column_name
      }
    }
    indexes {
      index_name
      columns {
        column_name
      }
    }
    config {
      title
      description
      icon
      document_title
      document_label
      component
    }
    propertiesConfig(order_by: { order: asc }) {
      order
      property_name
      title
      description
      icon
      read_component
      read_component_options
      edit_component
      edit_component_options
    }
    computedProperties {
      name
      type
      nullable
      transformation
      template
    }
    canSelect_aggregate {
      aggregate {
        count
      }
    }
    canInsert_aggregate {
      aggregate {
        count
      }
    }
    canUpdate_aggregate {
      aggregate {
        count
      }
    }
    relationships {
      rel_name
      rel_type
      mapping {
        column {
          ...column
        }
        remoteTable {
          ...coreTable
        }
        remote_column_name
      }
    }
    columns {
      ...column
      primaryKey {
        constraint_name
      }
      canSelect {
        role_name
      }
      canInsert {
        role_name
      }
      canUpdate {
        role_name
      }
      config {
        json_schema
      }
    }
  }
  ${exports.CoreTableFragmentDoc}
  ${exports.ColumnFragmentDoc}
`;
exports.MetadataDocument = graphql_tag_1.default `
  query metadata {
    metadata_table(
      where: {
        _and: [
          { columns: { column_name: { _eq: "updated_at" } } }
          { columns: { column_name: { _eq: "id" } } }
          { columns: { column_name: { _eq: "deleted" } } }
        ]
      }
    ) {
      ...table
    }
  }
  ${exports.TableFragmentDoc}
`;
const defaultWrapper = sdkFunction => sdkFunction();
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        metadata(variables, requestHeaders) {
            return withWrapper(() => client.request(graphql_1.print(exports.MetadataDocument), variables, requestHeaders));
        }
    };
}
exports.getSdk = getSdk;
//# sourceMappingURL=index.js.map