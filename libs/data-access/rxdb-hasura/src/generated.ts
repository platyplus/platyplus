/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-unused-vars */
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  citext: string
  jsonb: Record<string, unknown>
  name: string
  timestamp: any
  timestamptz: Date
  uuid: string
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq: Maybe<Scalars['Boolean']>
  _gt: Maybe<Scalars['Boolean']>
  _gte: Maybe<Scalars['Boolean']>
  _in: Maybe<Array<Scalars['Boolean']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['Boolean']>
  _lte: Maybe<Scalars['Boolean']>
  _neq: Maybe<Scalars['Boolean']>
  _nin: Maybe<Array<Scalars['Boolean']>>
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq: Maybe<Scalars['Int']>
  _gt: Maybe<Scalars['Int']>
  _gte: Maybe<Scalars['Int']>
  _in: Maybe<Array<Scalars['Int']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['Int']>
  _lte: Maybe<Scalars['Int']>
  _neq: Maybe<Scalars['Int']>
  _nin: Maybe<Array<Scalars['Int']>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq: Maybe<Scalars['String']>
  _gt: Maybe<Scalars['String']>
  _gte: Maybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike: Maybe<Scalars['String']>
  _in: Maybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex: Maybe<Scalars['String']>
  _is_null: Maybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like: Maybe<Scalars['String']>
  _lt: Maybe<Scalars['String']>
  _lte: Maybe<Scalars['String']>
  _neq: Maybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike: Maybe<Scalars['String']>
  _nin: Maybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex: Maybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike: Maybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex: Maybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar: Maybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex: Maybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar: Maybe<Scalars['String']>
}

/** columns and relationships of "auth.account_providers" */
export type Auth_Account_Providers = {
  __typename?: 'auth_account_providers'
  /** An object relationship */
  account: Auth_Accounts
  account_id: Scalars['uuid']
  auth_provider: Scalars['String']
  auth_provider_unique_id: Scalars['String']
  created_at: Scalars['timestamptz']
  id: Scalars['uuid']
  /** An object relationship */
  provider: Auth_Providers
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "auth.account_providers" */
export type Auth_Account_Providers_Aggregate = {
  __typename?: 'auth_account_providers_aggregate'
  aggregate: Maybe<Auth_Account_Providers_Aggregate_Fields>
  nodes: Array<Auth_Account_Providers>
}

/** aggregate fields of "auth.account_providers" */
export type Auth_Account_Providers_Aggregate_Fields = {
  __typename?: 'auth_account_providers_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Auth_Account_Providers_Max_Fields>
  min: Maybe<Auth_Account_Providers_Min_Fields>
}

/** aggregate fields of "auth.account_providers" */
export type Auth_Account_Providers_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Account_Providers_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.account_providers" */
export type Auth_Account_Providers_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Account_Providers_Max_Order_By>
  min: Maybe<Auth_Account_Providers_Min_Order_By>
}

/** input type for inserting array relation for remote table "auth.account_providers" */
export type Auth_Account_Providers_Arr_Rel_Insert_Input = {
  data: Array<Auth_Account_Providers_Insert_Input>
  /** on conflict condition */
  on_conflict: Maybe<Auth_Account_Providers_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.account_providers". All fields are combined with a logical 'AND'. */
export type Auth_Account_Providers_Bool_Exp = {
  _and: Maybe<Array<Auth_Account_Providers_Bool_Exp>>
  _not: Maybe<Auth_Account_Providers_Bool_Exp>
  _or: Maybe<Array<Auth_Account_Providers_Bool_Exp>>
  account: Maybe<Auth_Accounts_Bool_Exp>
  account_id: Maybe<Uuid_Comparison_Exp>
  auth_provider: Maybe<String_Comparison_Exp>
  auth_provider_unique_id: Maybe<String_Comparison_Exp>
  created_at: Maybe<Timestamptz_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  provider: Maybe<Auth_Providers_Bool_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.account_providers" */
export enum Auth_Account_Providers_Constraint {
  /** unique or primary key constraint */
  AccountProvidersAccountIdAuthProviderKey = 'account_providers_account_id_auth_provider_key',
  /** unique or primary key constraint */
  AccountProvidersAuthProviderAuthProviderUniqueIdKey = 'account_providers_auth_provider_auth_provider_unique_id_key',
  /** unique or primary key constraint */
  AccountProvidersPkey = 'account_providers_pkey'
}

/** input type for inserting data into table "auth.account_providers" */
export type Auth_Account_Providers_Insert_Input = {
  account: Maybe<Auth_Accounts_Obj_Rel_Insert_Input>
  account_id: Maybe<Scalars['uuid']>
  auth_provider: Maybe<Scalars['String']>
  auth_provider_unique_id: Maybe<Scalars['String']>
  created_at: Maybe<Scalars['timestamptz']>
  id: Maybe<Scalars['uuid']>
  provider: Maybe<Auth_Providers_Obj_Rel_Insert_Input>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Auth_Account_Providers_Max_Fields = {
  __typename?: 'auth_account_providers_max_fields'
  account_id: Maybe<Scalars['uuid']>
  auth_provider: Maybe<Scalars['String']>
  auth_provider_unique_id: Maybe<Scalars['String']>
  created_at: Maybe<Scalars['timestamptz']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "auth.account_providers" */
export type Auth_Account_Providers_Max_Order_By = {
  account_id: Maybe<Order_By>
  auth_provider: Maybe<Order_By>
  auth_provider_unique_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Account_Providers_Min_Fields = {
  __typename?: 'auth_account_providers_min_fields'
  account_id: Maybe<Scalars['uuid']>
  auth_provider: Maybe<Scalars['String']>
  auth_provider_unique_id: Maybe<Scalars['String']>
  created_at: Maybe<Scalars['timestamptz']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "auth.account_providers" */
export type Auth_Account_Providers_Min_Order_By = {
  account_id: Maybe<Order_By>
  auth_provider: Maybe<Order_By>
  auth_provider_unique_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** response of any mutation on the table "auth.account_providers" */
export type Auth_Account_Providers_Mutation_Response = {
  __typename?: 'auth_account_providers_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Auth_Account_Providers>
}

/** on conflict condition type for table "auth.account_providers" */
export type Auth_Account_Providers_On_Conflict = {
  constraint: Auth_Account_Providers_Constraint
  update_columns: Array<Auth_Account_Providers_Update_Column>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** Ordering options when selecting data from "auth.account_providers". */
export type Auth_Account_Providers_Order_By = {
  account: Maybe<Auth_Accounts_Order_By>
  account_id: Maybe<Order_By>
  auth_provider: Maybe<Order_By>
  auth_provider_unique_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  id: Maybe<Order_By>
  provider: Maybe<Auth_Providers_Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: auth_account_providers */
export type Auth_Account_Providers_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "auth.account_providers" */
export enum Auth_Account_Providers_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  AuthProvider = 'auth_provider',
  /** column name */
  AuthProviderUniqueId = 'auth_provider_unique_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "auth.account_providers" */
export type Auth_Account_Providers_Set_Input = {
  account_id: Maybe<Scalars['uuid']>
  auth_provider: Maybe<Scalars['String']>
  auth_provider_unique_id: Maybe<Scalars['String']>
  created_at: Maybe<Scalars['timestamptz']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "auth.account_providers" */
export enum Auth_Account_Providers_Update_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  AuthProvider = 'auth_provider',
  /** column name */
  AuthProviderUniqueId = 'auth_provider_unique_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "auth.account_roles" */
export type Auth_Account_Roles = {
  __typename?: 'auth_account_roles'
  /** An object relationship */
  account: Auth_Accounts
  account_id: Scalars['uuid']
  created_at: Scalars['timestamptz']
  id: Scalars['uuid']
  role: Scalars['String']
  /** An object relationship */
  roleByRole: Auth_Roles
}

/** aggregated selection of "auth.account_roles" */
export type Auth_Account_Roles_Aggregate = {
  __typename?: 'auth_account_roles_aggregate'
  aggregate: Maybe<Auth_Account_Roles_Aggregate_Fields>
  nodes: Array<Auth_Account_Roles>
}

/** aggregate fields of "auth.account_roles" */
export type Auth_Account_Roles_Aggregate_Fields = {
  __typename?: 'auth_account_roles_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Auth_Account_Roles_Max_Fields>
  min: Maybe<Auth_Account_Roles_Min_Fields>
}

/** aggregate fields of "auth.account_roles" */
export type Auth_Account_Roles_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Account_Roles_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.account_roles" */
export type Auth_Account_Roles_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Account_Roles_Max_Order_By>
  min: Maybe<Auth_Account_Roles_Min_Order_By>
}

/** input type for inserting array relation for remote table "auth.account_roles" */
export type Auth_Account_Roles_Arr_Rel_Insert_Input = {
  data: Array<Auth_Account_Roles_Insert_Input>
  /** on conflict condition */
  on_conflict: Maybe<Auth_Account_Roles_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.account_roles". All fields are combined with a logical 'AND'. */
export type Auth_Account_Roles_Bool_Exp = {
  _and: Maybe<Array<Auth_Account_Roles_Bool_Exp>>
  _not: Maybe<Auth_Account_Roles_Bool_Exp>
  _or: Maybe<Array<Auth_Account_Roles_Bool_Exp>>
  account: Maybe<Auth_Accounts_Bool_Exp>
  account_id: Maybe<Uuid_Comparison_Exp>
  created_at: Maybe<Timestamptz_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  role: Maybe<String_Comparison_Exp>
  roleByRole: Maybe<Auth_Roles_Bool_Exp>
}

/** unique or primary key constraints on table "auth.account_roles" */
export enum Auth_Account_Roles_Constraint {
  /** unique or primary key constraint */
  AccountRolesPkey = 'account_roles_pkey',
  /** unique or primary key constraint */
  UserRolesAccountIdRoleKey = 'user_roles_account_id_role_key'
}

/** input type for inserting data into table "auth.account_roles" */
export type Auth_Account_Roles_Insert_Input = {
  account: Maybe<Auth_Accounts_Obj_Rel_Insert_Input>
  account_id: Maybe<Scalars['uuid']>
  created_at: Maybe<Scalars['timestamptz']>
  id: Maybe<Scalars['uuid']>
  role: Maybe<Scalars['String']>
  roleByRole: Maybe<Auth_Roles_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Auth_Account_Roles_Max_Fields = {
  __typename?: 'auth_account_roles_max_fields'
  account_id: Maybe<Scalars['uuid']>
  created_at: Maybe<Scalars['timestamptz']>
  id: Maybe<Scalars['uuid']>
  role: Maybe<Scalars['String']>
}

/** order by max() on columns of table "auth.account_roles" */
export type Auth_Account_Roles_Max_Order_By = {
  account_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  id: Maybe<Order_By>
  role: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Account_Roles_Min_Fields = {
  __typename?: 'auth_account_roles_min_fields'
  account_id: Maybe<Scalars['uuid']>
  created_at: Maybe<Scalars['timestamptz']>
  id: Maybe<Scalars['uuid']>
  role: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.account_roles" */
export type Auth_Account_Roles_Min_Order_By = {
  account_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  id: Maybe<Order_By>
  role: Maybe<Order_By>
}

/** response of any mutation on the table "auth.account_roles" */
export type Auth_Account_Roles_Mutation_Response = {
  __typename?: 'auth_account_roles_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Auth_Account_Roles>
}

/** on conflict condition type for table "auth.account_roles" */
export type Auth_Account_Roles_On_Conflict = {
  constraint: Auth_Account_Roles_Constraint
  update_columns: Array<Auth_Account_Roles_Update_Column>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** Ordering options when selecting data from "auth.account_roles". */
export type Auth_Account_Roles_Order_By = {
  account: Maybe<Auth_Accounts_Order_By>
  account_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  id: Maybe<Order_By>
  role: Maybe<Order_By>
  roleByRole: Maybe<Auth_Roles_Order_By>
}

/** primary key columns input for table: auth_account_roles */
export type Auth_Account_Roles_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "auth.account_roles" */
export enum Auth_Account_Roles_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "auth.account_roles" */
export type Auth_Account_Roles_Set_Input = {
  account_id: Maybe<Scalars['uuid']>
  created_at: Maybe<Scalars['timestamptz']>
  id: Maybe<Scalars['uuid']>
  role: Maybe<Scalars['String']>
}

/** update columns of table "auth.account_roles" */
export enum Auth_Account_Roles_Update_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role'
}

/** columns and relationships of "auth.accounts" */
export type Auth_Accounts = {
  __typename?: 'auth_accounts'
  /** An array relationship */
  account_providers: Array<Auth_Account_Providers>
  /** An aggregate relationship */
  account_providers_aggregate: Auth_Account_Providers_Aggregate
  /** An array relationship */
  account_roles: Array<Auth_Account_Roles>
  /** An aggregate relationship */
  account_roles_aggregate: Auth_Account_Roles_Aggregate
  active: Scalars['Boolean']
  created_at: Scalars['timestamptz']
  custom_register_data: Maybe<Scalars['jsonb']>
  default_role: Scalars['String']
  email: Maybe<Scalars['citext']>
  id: Scalars['uuid']
  is_anonymous: Scalars['Boolean']
  mfa_enabled: Scalars['Boolean']
  new_email: Maybe<Scalars['citext']>
  otp_secret: Maybe<Scalars['String']>
  password_hash: Maybe<Scalars['String']>
  /** An array relationship */
  refresh_tokens: Array<Auth_Refresh_Tokens>
  /** An aggregate relationship */
  refresh_tokens_aggregate: Auth_Refresh_Tokens_Aggregate
  /** An object relationship */
  role: Auth_Roles
  ticket: Scalars['uuid']
  ticket_expires_at: Scalars['timestamptz']
  updated_at: Scalars['timestamptz']
  /** An object relationship */
  user: Users
  user_id: Scalars['uuid']
}

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsAccount_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsAccount_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsAccount_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsAccount_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsCustom_Register_DataArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsRefresh_TokensArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

/** columns and relationships of "auth.accounts" */
export type Auth_AccountsRefresh_Tokens_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

/** aggregated selection of "auth.accounts" */
export type Auth_Accounts_Aggregate = {
  __typename?: 'auth_accounts_aggregate'
  aggregate: Maybe<Auth_Accounts_Aggregate_Fields>
  nodes: Array<Auth_Accounts>
}

/** aggregate fields of "auth.accounts" */
export type Auth_Accounts_Aggregate_Fields = {
  __typename?: 'auth_accounts_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Auth_Accounts_Max_Fields>
  min: Maybe<Auth_Accounts_Min_Fields>
}

/** aggregate fields of "auth.accounts" */
export type Auth_Accounts_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Accounts_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.accounts" */
export type Auth_Accounts_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Accounts_Max_Order_By>
  min: Maybe<Auth_Accounts_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Auth_Accounts_Append_Input = {
  custom_register_data: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "auth.accounts" */
export type Auth_Accounts_Arr_Rel_Insert_Input = {
  data: Array<Auth_Accounts_Insert_Input>
  /** on conflict condition */
  on_conflict: Maybe<Auth_Accounts_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.accounts". All fields are combined with a logical 'AND'. */
export type Auth_Accounts_Bool_Exp = {
  _and: Maybe<Array<Auth_Accounts_Bool_Exp>>
  _not: Maybe<Auth_Accounts_Bool_Exp>
  _or: Maybe<Array<Auth_Accounts_Bool_Exp>>
  account_providers: Maybe<Auth_Account_Providers_Bool_Exp>
  account_roles: Maybe<Auth_Account_Roles_Bool_Exp>
  active: Maybe<Boolean_Comparison_Exp>
  created_at: Maybe<Timestamptz_Comparison_Exp>
  custom_register_data: Maybe<Jsonb_Comparison_Exp>
  default_role: Maybe<String_Comparison_Exp>
  email: Maybe<Citext_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  is_anonymous: Maybe<Boolean_Comparison_Exp>
  mfa_enabled: Maybe<Boolean_Comparison_Exp>
  new_email: Maybe<Citext_Comparison_Exp>
  otp_secret: Maybe<String_Comparison_Exp>
  password_hash: Maybe<String_Comparison_Exp>
  refresh_tokens: Maybe<Auth_Refresh_Tokens_Bool_Exp>
  role: Maybe<Auth_Roles_Bool_Exp>
  ticket: Maybe<Uuid_Comparison_Exp>
  ticket_expires_at: Maybe<Timestamptz_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
  user: Maybe<Users_Bool_Exp>
  user_id: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.accounts" */
export enum Auth_Accounts_Constraint {
  /** unique or primary key constraint */
  AccountsEmailKey = 'accounts_email_key',
  /** unique or primary key constraint */
  AccountsNewEmailKey = 'accounts_new_email_key',
  /** unique or primary key constraint */
  AccountsPkey = 'accounts_pkey',
  /** unique or primary key constraint */
  AccountsUserIdKey = 'accounts_user_id_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Auth_Accounts_Delete_At_Path_Input = {
  custom_register_data: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Auth_Accounts_Delete_Elem_Input = {
  custom_register_data: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Auth_Accounts_Delete_Key_Input = {
  custom_register_data: Maybe<Scalars['String']>
}

/** input type for inserting data into table "auth.accounts" */
export type Auth_Accounts_Insert_Input = {
  account_providers: Maybe<Auth_Account_Providers_Arr_Rel_Insert_Input>
  account_roles: Maybe<Auth_Account_Roles_Arr_Rel_Insert_Input>
  active: Maybe<Scalars['Boolean']>
  created_at: Maybe<Scalars['timestamptz']>
  custom_register_data: Maybe<Scalars['jsonb']>
  default_role: Maybe<Scalars['String']>
  email: Maybe<Scalars['citext']>
  id: Maybe<Scalars['uuid']>
  is_anonymous: Maybe<Scalars['Boolean']>
  mfa_enabled: Maybe<Scalars['Boolean']>
  new_email: Maybe<Scalars['citext']>
  otp_secret: Maybe<Scalars['String']>
  password_hash: Maybe<Scalars['String']>
  refresh_tokens: Maybe<Auth_Refresh_Tokens_Arr_Rel_Insert_Input>
  role: Maybe<Auth_Roles_Obj_Rel_Insert_Input>
  ticket: Maybe<Scalars['uuid']>
  ticket_expires_at: Maybe<Scalars['timestamptz']>
  updated_at: Maybe<Scalars['timestamptz']>
  user: Maybe<Users_Obj_Rel_Insert_Input>
  user_id: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Auth_Accounts_Max_Fields = {
  __typename?: 'auth_accounts_max_fields'
  created_at: Maybe<Scalars['timestamptz']>
  default_role: Maybe<Scalars['String']>
  email: Maybe<Scalars['citext']>
  id: Maybe<Scalars['uuid']>
  new_email: Maybe<Scalars['citext']>
  otp_secret: Maybe<Scalars['String']>
  password_hash: Maybe<Scalars['String']>
  ticket: Maybe<Scalars['uuid']>
  ticket_expires_at: Maybe<Scalars['timestamptz']>
  updated_at: Maybe<Scalars['timestamptz']>
  user_id: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "auth.accounts" */
export type Auth_Accounts_Max_Order_By = {
  created_at: Maybe<Order_By>
  default_role: Maybe<Order_By>
  email: Maybe<Order_By>
  id: Maybe<Order_By>
  new_email: Maybe<Order_By>
  otp_secret: Maybe<Order_By>
  password_hash: Maybe<Order_By>
  ticket: Maybe<Order_By>
  ticket_expires_at: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  user_id: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Accounts_Min_Fields = {
  __typename?: 'auth_accounts_min_fields'
  created_at: Maybe<Scalars['timestamptz']>
  default_role: Maybe<Scalars['String']>
  email: Maybe<Scalars['citext']>
  id: Maybe<Scalars['uuid']>
  new_email: Maybe<Scalars['citext']>
  otp_secret: Maybe<Scalars['String']>
  password_hash: Maybe<Scalars['String']>
  ticket: Maybe<Scalars['uuid']>
  ticket_expires_at: Maybe<Scalars['timestamptz']>
  updated_at: Maybe<Scalars['timestamptz']>
  user_id: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "auth.accounts" */
export type Auth_Accounts_Min_Order_By = {
  created_at: Maybe<Order_By>
  default_role: Maybe<Order_By>
  email: Maybe<Order_By>
  id: Maybe<Order_By>
  new_email: Maybe<Order_By>
  otp_secret: Maybe<Order_By>
  password_hash: Maybe<Order_By>
  ticket: Maybe<Order_By>
  ticket_expires_at: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  user_id: Maybe<Order_By>
}

/** response of any mutation on the table "auth.accounts" */
export type Auth_Accounts_Mutation_Response = {
  __typename?: 'auth_accounts_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Auth_Accounts>
}

/** input type for inserting object relation for remote table "auth.accounts" */
export type Auth_Accounts_Obj_Rel_Insert_Input = {
  data: Auth_Accounts_Insert_Input
  /** on conflict condition */
  on_conflict: Maybe<Auth_Accounts_On_Conflict>
}

/** on conflict condition type for table "auth.accounts" */
export type Auth_Accounts_On_Conflict = {
  constraint: Auth_Accounts_Constraint
  update_columns: Array<Auth_Accounts_Update_Column>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

/** Ordering options when selecting data from "auth.accounts". */
export type Auth_Accounts_Order_By = {
  account_providers_aggregate: Maybe<Auth_Account_Providers_Aggregate_Order_By>
  account_roles_aggregate: Maybe<Auth_Account_Roles_Aggregate_Order_By>
  active: Maybe<Order_By>
  created_at: Maybe<Order_By>
  custom_register_data: Maybe<Order_By>
  default_role: Maybe<Order_By>
  email: Maybe<Order_By>
  id: Maybe<Order_By>
  is_anonymous: Maybe<Order_By>
  mfa_enabled: Maybe<Order_By>
  new_email: Maybe<Order_By>
  otp_secret: Maybe<Order_By>
  password_hash: Maybe<Order_By>
  refresh_tokens_aggregate: Maybe<Auth_Refresh_Tokens_Aggregate_Order_By>
  role: Maybe<Auth_Roles_Order_By>
  ticket: Maybe<Order_By>
  ticket_expires_at: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  user: Maybe<Users_Order_By>
  user_id: Maybe<Order_By>
}

/** primary key columns input for table: auth_accounts */
export type Auth_Accounts_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Auth_Accounts_Prepend_Input = {
  custom_register_data: Maybe<Scalars['jsonb']>
}

/** select columns of table "auth.accounts" */
export enum Auth_Accounts_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomRegisterData = 'custom_register_data',
  /** column name */
  DefaultRole = 'default_role',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'is_anonymous',
  /** column name */
  MfaEnabled = 'mfa_enabled',
  /** column name */
  NewEmail = 'new_email',
  /** column name */
  OtpSecret = 'otp_secret',
  /** column name */
  PasswordHash = 'password_hash',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticket_expires_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "auth.accounts" */
export type Auth_Accounts_Set_Input = {
  active: Maybe<Scalars['Boolean']>
  created_at: Maybe<Scalars['timestamptz']>
  custom_register_data: Maybe<Scalars['jsonb']>
  default_role: Maybe<Scalars['String']>
  email: Maybe<Scalars['citext']>
  id: Maybe<Scalars['uuid']>
  is_anonymous: Maybe<Scalars['Boolean']>
  mfa_enabled: Maybe<Scalars['Boolean']>
  new_email: Maybe<Scalars['citext']>
  otp_secret: Maybe<Scalars['String']>
  password_hash: Maybe<Scalars['String']>
  ticket: Maybe<Scalars['uuid']>
  ticket_expires_at: Maybe<Scalars['timestamptz']>
  updated_at: Maybe<Scalars['timestamptz']>
  user_id: Maybe<Scalars['uuid']>
}

/** update columns of table "auth.accounts" */
export enum Auth_Accounts_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CustomRegisterData = 'custom_register_data',
  /** column name */
  DefaultRole = 'default_role',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'is_anonymous',
  /** column name */
  MfaEnabled = 'mfa_enabled',
  /** column name */
  NewEmail = 'new_email',
  /** column name */
  OtpSecret = 'otp_secret',
  /** column name */
  PasswordHash = 'password_hash',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticket_expires_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "auth.migrations" */
export type Auth_Migrations = {
  __typename?: 'auth_migrations'
  executed_at: Maybe<Scalars['timestamp']>
  hash: Scalars['String']
  id: Scalars['Int']
  name: Scalars['String']
}

/** aggregated selection of "auth.migrations" */
export type Auth_Migrations_Aggregate = {
  __typename?: 'auth_migrations_aggregate'
  aggregate: Maybe<Auth_Migrations_Aggregate_Fields>
  nodes: Array<Auth_Migrations>
}

/** aggregate fields of "auth.migrations" */
export type Auth_Migrations_Aggregate_Fields = {
  __typename?: 'auth_migrations_aggregate_fields'
  avg: Maybe<Auth_Migrations_Avg_Fields>
  count: Scalars['Int']
  max: Maybe<Auth_Migrations_Max_Fields>
  min: Maybe<Auth_Migrations_Min_Fields>
  stddev: Maybe<Auth_Migrations_Stddev_Fields>
  stddev_pop: Maybe<Auth_Migrations_Stddev_Pop_Fields>
  stddev_samp: Maybe<Auth_Migrations_Stddev_Samp_Fields>
  sum: Maybe<Auth_Migrations_Sum_Fields>
  var_pop: Maybe<Auth_Migrations_Var_Pop_Fields>
  var_samp: Maybe<Auth_Migrations_Var_Samp_Fields>
  variance: Maybe<Auth_Migrations_Variance_Fields>
}

/** aggregate fields of "auth.migrations" */
export type Auth_Migrations_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Migrations_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Auth_Migrations_Avg_Fields = {
  __typename?: 'auth_migrations_avg_fields'
  id: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "auth.migrations". All fields are combined with a logical 'AND'. */
export type Auth_Migrations_Bool_Exp = {
  _and: Maybe<Array<Auth_Migrations_Bool_Exp>>
  _not: Maybe<Auth_Migrations_Bool_Exp>
  _or: Maybe<Array<Auth_Migrations_Bool_Exp>>
  executed_at: Maybe<Timestamp_Comparison_Exp>
  hash: Maybe<String_Comparison_Exp>
  id: Maybe<Int_Comparison_Exp>
  name: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.migrations" */
export enum Auth_Migrations_Constraint {
  /** unique or primary key constraint */
  MigrationsNameKey = 'migrations_name_key',
  /** unique or primary key constraint */
  MigrationsPkey = 'migrations_pkey'
}

/** input type for incrementing numeric columns in table "auth.migrations" */
export type Auth_Migrations_Inc_Input = {
  id: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "auth.migrations" */
export type Auth_Migrations_Insert_Input = {
  executed_at: Maybe<Scalars['timestamp']>
  hash: Maybe<Scalars['String']>
  id: Maybe<Scalars['Int']>
  name: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Auth_Migrations_Max_Fields = {
  __typename?: 'auth_migrations_max_fields'
  executed_at: Maybe<Scalars['timestamp']>
  hash: Maybe<Scalars['String']>
  id: Maybe<Scalars['Int']>
  name: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Auth_Migrations_Min_Fields = {
  __typename?: 'auth_migrations_min_fields'
  executed_at: Maybe<Scalars['timestamp']>
  hash: Maybe<Scalars['String']>
  id: Maybe<Scalars['Int']>
  name: Maybe<Scalars['String']>
}

/** response of any mutation on the table "auth.migrations" */
export type Auth_Migrations_Mutation_Response = {
  __typename?: 'auth_migrations_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Auth_Migrations>
}

/** on conflict condition type for table "auth.migrations" */
export type Auth_Migrations_On_Conflict = {
  constraint: Auth_Migrations_Constraint
  update_columns: Array<Auth_Migrations_Update_Column>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

/** Ordering options when selecting data from "auth.migrations". */
export type Auth_Migrations_Order_By = {
  executed_at: Maybe<Order_By>
  hash: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
}

/** primary key columns input for table: auth_migrations */
export type Auth_Migrations_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "auth.migrations" */
export enum Auth_Migrations_Select_Column {
  /** column name */
  ExecutedAt = 'executed_at',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "auth.migrations" */
export type Auth_Migrations_Set_Input = {
  executed_at: Maybe<Scalars['timestamp']>
  hash: Maybe<Scalars['String']>
  id: Maybe<Scalars['Int']>
  name: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Auth_Migrations_Stddev_Fields = {
  __typename?: 'auth_migrations_stddev_fields'
  id: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Auth_Migrations_Stddev_Pop_Fields = {
  __typename?: 'auth_migrations_stddev_pop_fields'
  id: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Auth_Migrations_Stddev_Samp_Fields = {
  __typename?: 'auth_migrations_stddev_samp_fields'
  id: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Auth_Migrations_Sum_Fields = {
  __typename?: 'auth_migrations_sum_fields'
  id: Maybe<Scalars['Int']>
}

/** update columns of table "auth.migrations" */
export enum Auth_Migrations_Update_Column {
  /** column name */
  ExecutedAt = 'executed_at',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Auth_Migrations_Var_Pop_Fields = {
  __typename?: 'auth_migrations_var_pop_fields'
  id: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Auth_Migrations_Var_Samp_Fields = {
  __typename?: 'auth_migrations_var_samp_fields'
  id: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Auth_Migrations_Variance_Fields = {
  __typename?: 'auth_migrations_variance_fields'
  id: Maybe<Scalars['Float']>
}

/** columns and relationships of "auth.providers" */
export type Auth_Providers = {
  __typename?: 'auth_providers'
  /** An array relationship */
  account_providers: Array<Auth_Account_Providers>
  /** An aggregate relationship */
  account_providers_aggregate: Auth_Account_Providers_Aggregate
  provider: Scalars['String']
}

/** columns and relationships of "auth.providers" */
export type Auth_ProvidersAccount_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** columns and relationships of "auth.providers" */
export type Auth_ProvidersAccount_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** aggregated selection of "auth.providers" */
export type Auth_Providers_Aggregate = {
  __typename?: 'auth_providers_aggregate'
  aggregate: Maybe<Auth_Providers_Aggregate_Fields>
  nodes: Array<Auth_Providers>
}

/** aggregate fields of "auth.providers" */
export type Auth_Providers_Aggregate_Fields = {
  __typename?: 'auth_providers_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Auth_Providers_Max_Fields>
  min: Maybe<Auth_Providers_Min_Fields>
}

/** aggregate fields of "auth.providers" */
export type Auth_Providers_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Providers_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export type Auth_Providers_Bool_Exp = {
  _and: Maybe<Array<Auth_Providers_Bool_Exp>>
  _not: Maybe<Auth_Providers_Bool_Exp>
  _or: Maybe<Array<Auth_Providers_Bool_Exp>>
  account_providers: Maybe<Auth_Account_Providers_Bool_Exp>
  provider: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.providers" */
export enum Auth_Providers_Constraint {
  /** unique or primary key constraint */
  ProvidersPkey = 'providers_pkey'
}

/** input type for inserting data into table "auth.providers" */
export type Auth_Providers_Insert_Input = {
  account_providers: Maybe<Auth_Account_Providers_Arr_Rel_Insert_Input>
  provider: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Auth_Providers_Max_Fields = {
  __typename?: 'auth_providers_max_fields'
  provider: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Auth_Providers_Min_Fields = {
  __typename?: 'auth_providers_min_fields'
  provider: Maybe<Scalars['String']>
}

/** response of any mutation on the table "auth.providers" */
export type Auth_Providers_Mutation_Response = {
  __typename?: 'auth_providers_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Auth_Providers>
}

/** input type for inserting object relation for remote table "auth.providers" */
export type Auth_Providers_Obj_Rel_Insert_Input = {
  data: Auth_Providers_Insert_Input
  /** on conflict condition */
  on_conflict: Maybe<Auth_Providers_On_Conflict>
}

/** on conflict condition type for table "auth.providers" */
export type Auth_Providers_On_Conflict = {
  constraint: Auth_Providers_Constraint
  update_columns: Array<Auth_Providers_Update_Column>
  where: Maybe<Auth_Providers_Bool_Exp>
}

/** Ordering options when selecting data from "auth.providers". */
export type Auth_Providers_Order_By = {
  account_providers_aggregate: Maybe<Auth_Account_Providers_Aggregate_Order_By>
  provider: Maybe<Order_By>
}

/** primary key columns input for table: auth_providers */
export type Auth_Providers_Pk_Columns_Input = {
  provider: Scalars['String']
}

/** select columns of table "auth.providers" */
export enum Auth_Providers_Select_Column {
  /** column name */
  Provider = 'provider'
}

/** input type for updating data in table "auth.providers" */
export type Auth_Providers_Set_Input = {
  provider: Maybe<Scalars['String']>
}

/** update columns of table "auth.providers" */
export enum Auth_Providers_Update_Column {
  /** column name */
  Provider = 'provider'
}

/** columns and relationships of "auth.refresh_tokens" */
export type Auth_Refresh_Tokens = {
  __typename?: 'auth_refresh_tokens'
  /** An object relationship */
  account: Auth_Accounts
  account_id: Scalars['uuid']
  created_at: Scalars['timestamptz']
  expires_at: Scalars['timestamptz']
  refresh_token: Scalars['uuid']
}

/** aggregated selection of "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Aggregate = {
  __typename?: 'auth_refresh_tokens_aggregate'
  aggregate: Maybe<Auth_Refresh_Tokens_Aggregate_Fields>
  nodes: Array<Auth_Refresh_Tokens>
}

/** aggregate fields of "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Aggregate_Fields = {
  __typename?: 'auth_refresh_tokens_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Auth_Refresh_Tokens_Max_Fields>
  min: Maybe<Auth_Refresh_Tokens_Min_Fields>
}

/** aggregate fields of "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Refresh_Tokens_Max_Order_By>
  min: Maybe<Auth_Refresh_Tokens_Min_Order_By>
}

/** input type for inserting array relation for remote table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Arr_Rel_Insert_Input = {
  data: Array<Auth_Refresh_Tokens_Insert_Input>
  /** on conflict condition */
  on_conflict: Maybe<Auth_Refresh_Tokens_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export type Auth_Refresh_Tokens_Bool_Exp = {
  _and: Maybe<Array<Auth_Refresh_Tokens_Bool_Exp>>
  _not: Maybe<Auth_Refresh_Tokens_Bool_Exp>
  _or: Maybe<Array<Auth_Refresh_Tokens_Bool_Exp>>
  account: Maybe<Auth_Accounts_Bool_Exp>
  account_id: Maybe<Uuid_Comparison_Exp>
  created_at: Maybe<Timestamptz_Comparison_Exp>
  expires_at: Maybe<Timestamptz_Comparison_Exp>
  refresh_token: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum Auth_Refresh_Tokens_Constraint {
  /** unique or primary key constraint */
  RefreshTokensPkey = 'refresh_tokens_pkey'
}

/** input type for inserting data into table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Insert_Input = {
  account: Maybe<Auth_Accounts_Obj_Rel_Insert_Input>
  account_id: Maybe<Scalars['uuid']>
  created_at: Maybe<Scalars['timestamptz']>
  expires_at: Maybe<Scalars['timestamptz']>
  refresh_token: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Auth_Refresh_Tokens_Max_Fields = {
  __typename?: 'auth_refresh_tokens_max_fields'
  account_id: Maybe<Scalars['uuid']>
  created_at: Maybe<Scalars['timestamptz']>
  expires_at: Maybe<Scalars['timestamptz']>
  refresh_token: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Max_Order_By = {
  account_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  expires_at: Maybe<Order_By>
  refresh_token: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Refresh_Tokens_Min_Fields = {
  __typename?: 'auth_refresh_tokens_min_fields'
  account_id: Maybe<Scalars['uuid']>
  created_at: Maybe<Scalars['timestamptz']>
  expires_at: Maybe<Scalars['timestamptz']>
  refresh_token: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Min_Order_By = {
  account_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  expires_at: Maybe<Order_By>
  refresh_token: Maybe<Order_By>
}

/** response of any mutation on the table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Mutation_Response = {
  __typename?: 'auth_refresh_tokens_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Auth_Refresh_Tokens>
}

/** on conflict condition type for table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_On_Conflict = {
  constraint: Auth_Refresh_Tokens_Constraint
  update_columns: Array<Auth_Refresh_Tokens_Update_Column>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

/** Ordering options when selecting data from "auth.refresh_tokens". */
export type Auth_Refresh_Tokens_Order_By = {
  account: Maybe<Auth_Accounts_Order_By>
  account_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  expires_at: Maybe<Order_By>
  refresh_token: Maybe<Order_By>
}

/** primary key columns input for table: auth_refresh_tokens */
export type Auth_Refresh_Tokens_Pk_Columns_Input = {
  refresh_token: Scalars['uuid']
}

/** select columns of table "auth.refresh_tokens" */
export enum Auth_Refresh_Tokens_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  RefreshToken = 'refresh_token'
}

/** input type for updating data in table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Set_Input = {
  account_id: Maybe<Scalars['uuid']>
  created_at: Maybe<Scalars['timestamptz']>
  expires_at: Maybe<Scalars['timestamptz']>
  refresh_token: Maybe<Scalars['uuid']>
}

/** update columns of table "auth.refresh_tokens" */
export enum Auth_Refresh_Tokens_Update_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  RefreshToken = 'refresh_token'
}

/** columns and relationships of "auth.roles" */
export type Auth_Roles = {
  __typename?: 'auth_roles'
  /** An array relationship */
  account_roles: Array<Auth_Account_Roles>
  /** An aggregate relationship */
  account_roles_aggregate: Auth_Account_Roles_Aggregate
  /** An array relationship */
  accounts: Array<Auth_Accounts>
  /** An aggregate relationship */
  accounts_aggregate: Auth_Accounts_Aggregate
  role: Scalars['String']
}

/** columns and relationships of "auth.roles" */
export type Auth_RolesAccount_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** columns and relationships of "auth.roles" */
export type Auth_RolesAccount_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** columns and relationships of "auth.roles" */
export type Auth_RolesAccountsArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

/** columns and relationships of "auth.roles" */
export type Auth_RolesAccounts_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

/** aggregated selection of "auth.roles" */
export type Auth_Roles_Aggregate = {
  __typename?: 'auth_roles_aggregate'
  aggregate: Maybe<Auth_Roles_Aggregate_Fields>
  nodes: Array<Auth_Roles>
}

/** aggregate fields of "auth.roles" */
export type Auth_Roles_Aggregate_Fields = {
  __typename?: 'auth_roles_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Auth_Roles_Max_Fields>
  min: Maybe<Auth_Roles_Min_Fields>
}

/** aggregate fields of "auth.roles" */
export type Auth_Roles_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Roles_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export type Auth_Roles_Bool_Exp = {
  _and: Maybe<Array<Auth_Roles_Bool_Exp>>
  _not: Maybe<Auth_Roles_Bool_Exp>
  _or: Maybe<Array<Auth_Roles_Bool_Exp>>
  account_roles: Maybe<Auth_Account_Roles_Bool_Exp>
  accounts: Maybe<Auth_Accounts_Bool_Exp>
  role: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.roles" */
export enum Auth_Roles_Constraint {
  /** unique or primary key constraint */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "auth.roles" */
export type Auth_Roles_Insert_Input = {
  account_roles: Maybe<Auth_Account_Roles_Arr_Rel_Insert_Input>
  accounts: Maybe<Auth_Accounts_Arr_Rel_Insert_Input>
  role: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Auth_Roles_Max_Fields = {
  __typename?: 'auth_roles_max_fields'
  role: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Auth_Roles_Min_Fields = {
  __typename?: 'auth_roles_min_fields'
  role: Maybe<Scalars['String']>
}

/** response of any mutation on the table "auth.roles" */
export type Auth_Roles_Mutation_Response = {
  __typename?: 'auth_roles_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Auth_Roles>
}

/** input type for inserting object relation for remote table "auth.roles" */
export type Auth_Roles_Obj_Rel_Insert_Input = {
  data: Auth_Roles_Insert_Input
  /** on conflict condition */
  on_conflict: Maybe<Auth_Roles_On_Conflict>
}

/** on conflict condition type for table "auth.roles" */
export type Auth_Roles_On_Conflict = {
  constraint: Auth_Roles_Constraint
  update_columns: Array<Auth_Roles_Update_Column>
  where: Maybe<Auth_Roles_Bool_Exp>
}

/** Ordering options when selecting data from "auth.roles". */
export type Auth_Roles_Order_By = {
  account_roles_aggregate: Maybe<Auth_Account_Roles_Aggregate_Order_By>
  accounts_aggregate: Maybe<Auth_Accounts_Aggregate_Order_By>
  role: Maybe<Order_By>
}

/** primary key columns input for table: auth_roles */
export type Auth_Roles_Pk_Columns_Input = {
  role: Scalars['String']
}

/** select columns of table "auth.roles" */
export enum Auth_Roles_Select_Column {
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "auth.roles" */
export type Auth_Roles_Set_Input = {
  role: Maybe<Scalars['String']>
}

/** update columns of table "auth.roles" */
export enum Auth_Roles_Update_Column {
  /** column name */
  Role = 'role'
}

/** columns and relationships of "bidon" */
export type Bidon = {
  __typename?: 'bidon'
  deleted: Scalars['Boolean']
  id: Scalars['uuid']
  /** An object relationship */
  proprietaire: Maybe<Proprietaire>
  proprietaire_id: Maybe<Scalars['uuid']>
  test_field: Scalars['String']
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "bidon" */
export type Bidon_Aggregate = {
  __typename?: 'bidon_aggregate'
  aggregate: Maybe<Bidon_Aggregate_Fields>
  nodes: Array<Bidon>
}

/** aggregate fields of "bidon" */
export type Bidon_Aggregate_Fields = {
  __typename?: 'bidon_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Bidon_Max_Fields>
  min: Maybe<Bidon_Min_Fields>
}

/** aggregate fields of "bidon" */
export type Bidon_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Bidon_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "bidon". All fields are combined with a logical 'AND'. */
export type Bidon_Bool_Exp = {
  _and: Maybe<Array<Bidon_Bool_Exp>>
  _not: Maybe<Bidon_Bool_Exp>
  _or: Maybe<Array<Bidon_Bool_Exp>>
  deleted: Maybe<Boolean_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  proprietaire: Maybe<Proprietaire_Bool_Exp>
  proprietaire_id: Maybe<Uuid_Comparison_Exp>
  test_field: Maybe<String_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "bidon" */
export enum Bidon_Constraint {
  /** unique or primary key constraint */
  BidonPkey = 'bidon_pkey'
}

/** input type for inserting data into table "bidon" */
export type Bidon_Insert_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  proprietaire: Maybe<Proprietaire_Obj_Rel_Insert_Input>
  proprietaire_id: Maybe<Scalars['uuid']>
  test_field: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Bidon_Max_Fields = {
  __typename?: 'bidon_max_fields'
  id: Maybe<Scalars['uuid']>
  proprietaire_id: Maybe<Scalars['uuid']>
  test_field: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Bidon_Min_Fields = {
  __typename?: 'bidon_min_fields'
  id: Maybe<Scalars['uuid']>
  proprietaire_id: Maybe<Scalars['uuid']>
  test_field: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "bidon" */
export type Bidon_Mutation_Response = {
  __typename?: 'bidon_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Bidon>
}

/** on conflict condition type for table "bidon" */
export type Bidon_On_Conflict = {
  constraint: Bidon_Constraint
  update_columns: Array<Bidon_Update_Column>
  where: Maybe<Bidon_Bool_Exp>
}

/** Ordering options when selecting data from "bidon". */
export type Bidon_Order_By = {
  deleted: Maybe<Order_By>
  id: Maybe<Order_By>
  proprietaire: Maybe<Proprietaire_Order_By>
  proprietaire_id: Maybe<Order_By>
  test_field: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: bidon */
export type Bidon_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "bidon" */
export enum Bidon_Select_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  ProprietaireId = 'proprietaire_id',
  /** column name */
  TestField = 'test_field',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "bidon" */
export type Bidon_Set_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  proprietaire_id: Maybe<Scalars['uuid']>
  test_field: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "bidon" */
export enum Bidon_Update_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  ProprietaireId = 'proprietaire_id',
  /** column name */
  TestField = 'test_field',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq: Maybe<Scalars['citext']>
  _gt: Maybe<Scalars['citext']>
  _gte: Maybe<Scalars['citext']>
  /** does the column match the given case-insensitive pattern */
  _ilike: Maybe<Scalars['citext']>
  _in: Maybe<Array<Scalars['citext']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex: Maybe<Scalars['citext']>
  _is_null: Maybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like: Maybe<Scalars['citext']>
  _lt: Maybe<Scalars['citext']>
  _lte: Maybe<Scalars['citext']>
  _neq: Maybe<Scalars['citext']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike: Maybe<Scalars['citext']>
  _nin: Maybe<Array<Scalars['citext']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex: Maybe<Scalars['citext']>
  /** does the column NOT match the given pattern */
  _nlike: Maybe<Scalars['citext']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex: Maybe<Scalars['citext']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar: Maybe<Scalars['citext']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex: Maybe<Scalars['citext']>
  /** does the column match the given SQL regular expression */
  _similar: Maybe<Scalars['citext']>
}

/** columns and relationships of "dew" */
export type Dew = {
  __typename?: 'dew'
  colonne: Maybe<Scalars['String']>
  deleted: Scalars['Boolean']
  id: Scalars['uuid']
  second: Maybe<Scalars['Int']>
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "dew" */
export type Dew_Aggregate = {
  __typename?: 'dew_aggregate'
  aggregate: Maybe<Dew_Aggregate_Fields>
  nodes: Array<Dew>
}

/** aggregate fields of "dew" */
export type Dew_Aggregate_Fields = {
  __typename?: 'dew_aggregate_fields'
  avg: Maybe<Dew_Avg_Fields>
  count: Scalars['Int']
  max: Maybe<Dew_Max_Fields>
  min: Maybe<Dew_Min_Fields>
  stddev: Maybe<Dew_Stddev_Fields>
  stddev_pop: Maybe<Dew_Stddev_Pop_Fields>
  stddev_samp: Maybe<Dew_Stddev_Samp_Fields>
  sum: Maybe<Dew_Sum_Fields>
  var_pop: Maybe<Dew_Var_Pop_Fields>
  var_samp: Maybe<Dew_Var_Samp_Fields>
  variance: Maybe<Dew_Variance_Fields>
}

/** aggregate fields of "dew" */
export type Dew_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Dew_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Dew_Avg_Fields = {
  __typename?: 'dew_avg_fields'
  second: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "dew". All fields are combined with a logical 'AND'. */
export type Dew_Bool_Exp = {
  _and: Maybe<Array<Dew_Bool_Exp>>
  _not: Maybe<Dew_Bool_Exp>
  _or: Maybe<Array<Dew_Bool_Exp>>
  colonne: Maybe<String_Comparison_Exp>
  deleted: Maybe<Boolean_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  second: Maybe<Int_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "dew" */
export enum Dew_Constraint {
  /** unique or primary key constraint */
  DewPkey = 'dew_pkey'
}

/** input type for incrementing numeric columns in table "dew" */
export type Dew_Inc_Input = {
  second: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "dew" */
export type Dew_Insert_Input = {
  colonne: Maybe<Scalars['String']>
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  second: Maybe<Scalars['Int']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Dew_Max_Fields = {
  __typename?: 'dew_max_fields'
  colonne: Maybe<Scalars['String']>
  id: Maybe<Scalars['uuid']>
  second: Maybe<Scalars['Int']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Dew_Min_Fields = {
  __typename?: 'dew_min_fields'
  colonne: Maybe<Scalars['String']>
  id: Maybe<Scalars['uuid']>
  second: Maybe<Scalars['Int']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "dew" */
export type Dew_Mutation_Response = {
  __typename?: 'dew_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Dew>
}

/** on conflict condition type for table "dew" */
export type Dew_On_Conflict = {
  constraint: Dew_Constraint
  update_columns: Array<Dew_Update_Column>
  where: Maybe<Dew_Bool_Exp>
}

/** Ordering options when selecting data from "dew". */
export type Dew_Order_By = {
  colonne: Maybe<Order_By>
  deleted: Maybe<Order_By>
  id: Maybe<Order_By>
  second: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: dew */
export type Dew_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "dew" */
export enum Dew_Select_Column {
  /** column name */
  Colonne = 'colonne',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Second = 'second',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "dew" */
export type Dew_Set_Input = {
  colonne: Maybe<Scalars['String']>
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  second: Maybe<Scalars['Int']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate stddev on columns */
export type Dew_Stddev_Fields = {
  __typename?: 'dew_stddev_fields'
  second: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Dew_Stddev_Pop_Fields = {
  __typename?: 'dew_stddev_pop_fields'
  second: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Dew_Stddev_Samp_Fields = {
  __typename?: 'dew_stddev_samp_fields'
  second: Maybe<Scalars['Float']>
}

/** aggregate sum on columns */
export type Dew_Sum_Fields = {
  __typename?: 'dew_sum_fields'
  second: Maybe<Scalars['Int']>
}

/** update columns of table "dew" */
export enum Dew_Update_Column {
  /** column name */
  Colonne = 'colonne',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Second = 'second',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Dew_Var_Pop_Fields = {
  __typename?: 'dew_var_pop_fields'
  second: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Dew_Var_Samp_Fields = {
  __typename?: 'dew_var_samp_fields'
  second: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Dew_Variance_Fields = {
  __typename?: 'dew_variance_fields'
  second: Maybe<Scalars['Float']>
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in: Maybe<Scalars['jsonb']>
  /** does the column contain the given json value at the top level */
  _contains: Maybe<Scalars['jsonb']>
  _eq: Maybe<Scalars['jsonb']>
  _gt: Maybe<Scalars['jsonb']>
  _gte: Maybe<Scalars['jsonb']>
  /** does the string exist as a top-level key in the column */
  _has_key: Maybe<Scalars['String']>
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all: Maybe<Array<Scalars['String']>>
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any: Maybe<Array<Scalars['String']>>
  _in: Maybe<Array<Scalars['jsonb']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['jsonb']>
  _lte: Maybe<Scalars['jsonb']>
  _neq: Maybe<Scalars['jsonb']>
  _nin: Maybe<Array<Scalars['jsonb']>>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "auth.account_providers" */
  delete_auth_account_providers: Maybe<Auth_Account_Providers_Mutation_Response>
  /** delete single row from the table: "auth.account_providers" */
  delete_auth_account_providers_by_pk: Maybe<Auth_Account_Providers>
  /** delete data from the table: "auth.account_roles" */
  delete_auth_account_roles: Maybe<Auth_Account_Roles_Mutation_Response>
  /** delete single row from the table: "auth.account_roles" */
  delete_auth_account_roles_by_pk: Maybe<Auth_Account_Roles>
  /** delete data from the table: "auth.accounts" */
  delete_auth_accounts: Maybe<Auth_Accounts_Mutation_Response>
  /** delete single row from the table: "auth.accounts" */
  delete_auth_accounts_by_pk: Maybe<Auth_Accounts>
  /** delete data from the table: "auth.migrations" */
  delete_auth_migrations: Maybe<Auth_Migrations_Mutation_Response>
  /** delete single row from the table: "auth.migrations" */
  delete_auth_migrations_by_pk: Maybe<Auth_Migrations>
  /** delete data from the table: "auth.providers" */
  delete_auth_providers: Maybe<Auth_Providers_Mutation_Response>
  /** delete single row from the table: "auth.providers" */
  delete_auth_providers_by_pk: Maybe<Auth_Providers>
  /** delete data from the table: "auth.refresh_tokens" */
  delete_auth_refresh_tokens: Maybe<Auth_Refresh_Tokens_Mutation_Response>
  /** delete single row from the table: "auth.refresh_tokens" */
  delete_auth_refresh_tokens_by_pk: Maybe<Auth_Refresh_Tokens>
  /** delete data from the table: "auth.roles" */
  delete_auth_roles: Maybe<Auth_Roles_Mutation_Response>
  /** delete single row from the table: "auth.roles" */
  delete_auth_roles_by_pk: Maybe<Auth_Roles>
  /** delete data from the table: "bidon" */
  delete_bidon: Maybe<Bidon_Mutation_Response>
  /** delete single row from the table: "bidon" */
  delete_bidon_by_pk: Maybe<Bidon>
  /** delete data from the table: "dew" */
  delete_dew: Maybe<Dew_Mutation_Response>
  /** delete single row from the table: "dew" */
  delete_dew_by_pk: Maybe<Dew>
  /** delete data from the table: "platyplus.app_config" */
  delete_platyplus_app_config: Maybe<Platyplus_App_Config_Mutation_Response>
  /** delete single row from the table: "platyplus.app_config" */
  delete_platyplus_app_config_by_pk: Maybe<Platyplus_App_Config>
  /** delete data from the table: "platyplus.property_config" */
  delete_platyplus_property_config: Maybe<Platyplus_Property_Config_Mutation_Response>
  /** delete single row from the table: "platyplus.property_config" */
  delete_platyplus_property_config_by_pk: Maybe<Platyplus_Property_Config>
  /** delete data from the table: "platyplus.table_config" */
  delete_platyplus_table_config: Maybe<Platyplus_Table_Config_Mutation_Response>
  /** delete single row from the table: "platyplus.table_config" */
  delete_platyplus_table_config_by_pk: Maybe<Platyplus_Table_Config>
  /** delete data from the table: "platyplus.tables" */
  delete_platyplus_tables: Maybe<Platyplus_Tables_Mutation_Response>
  /** delete single row from the table: "platyplus.tables" */
  delete_platyplus_tables_by_pk: Maybe<Platyplus_Tables>
  /** delete data from the table: "proprietaire" */
  delete_proprietaire: Maybe<Proprietaire_Mutation_Response>
  /** delete single row from the table: "proprietaire" */
  delete_proprietaire_by_pk: Maybe<Proprietaire>
  /** delete data from the table: "users" */
  delete_users: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk: Maybe<Users>
  /** insert data into the table: "auth.account_providers" */
  insert_auth_account_providers: Maybe<Auth_Account_Providers_Mutation_Response>
  /** insert a single row into the table: "auth.account_providers" */
  insert_auth_account_providers_one: Maybe<Auth_Account_Providers>
  /** insert data into the table: "auth.account_roles" */
  insert_auth_account_roles: Maybe<Auth_Account_Roles_Mutation_Response>
  /** insert a single row into the table: "auth.account_roles" */
  insert_auth_account_roles_one: Maybe<Auth_Account_Roles>
  /** insert data into the table: "auth.accounts" */
  insert_auth_accounts: Maybe<Auth_Accounts_Mutation_Response>
  /** insert a single row into the table: "auth.accounts" */
  insert_auth_accounts_one: Maybe<Auth_Accounts>
  /** insert data into the table: "auth.migrations" */
  insert_auth_migrations: Maybe<Auth_Migrations_Mutation_Response>
  /** insert a single row into the table: "auth.migrations" */
  insert_auth_migrations_one: Maybe<Auth_Migrations>
  /** insert data into the table: "auth.providers" */
  insert_auth_providers: Maybe<Auth_Providers_Mutation_Response>
  /** insert a single row into the table: "auth.providers" */
  insert_auth_providers_one: Maybe<Auth_Providers>
  /** insert data into the table: "auth.refresh_tokens" */
  insert_auth_refresh_tokens: Maybe<Auth_Refresh_Tokens_Mutation_Response>
  /** insert a single row into the table: "auth.refresh_tokens" */
  insert_auth_refresh_tokens_one: Maybe<Auth_Refresh_Tokens>
  /** insert data into the table: "auth.roles" */
  insert_auth_roles: Maybe<Auth_Roles_Mutation_Response>
  /** insert a single row into the table: "auth.roles" */
  insert_auth_roles_one: Maybe<Auth_Roles>
  /** insert data into the table: "bidon" */
  insert_bidon: Maybe<Bidon_Mutation_Response>
  /** insert a single row into the table: "bidon" */
  insert_bidon_one: Maybe<Bidon>
  /** insert data into the table: "dew" */
  insert_dew: Maybe<Dew_Mutation_Response>
  /** insert a single row into the table: "dew" */
  insert_dew_one: Maybe<Dew>
  /** insert data into the table: "platyplus.app_config" */
  insert_platyplus_app_config: Maybe<Platyplus_App_Config_Mutation_Response>
  /** insert a single row into the table: "platyplus.app_config" */
  insert_platyplus_app_config_one: Maybe<Platyplus_App_Config>
  /** insert data into the table: "platyplus.property_config" */
  insert_platyplus_property_config: Maybe<Platyplus_Property_Config_Mutation_Response>
  /** insert a single row into the table: "platyplus.property_config" */
  insert_platyplus_property_config_one: Maybe<Platyplus_Property_Config>
  /** insert data into the table: "platyplus.table_config" */
  insert_platyplus_table_config: Maybe<Platyplus_Table_Config_Mutation_Response>
  /** insert a single row into the table: "platyplus.table_config" */
  insert_platyplus_table_config_one: Maybe<Platyplus_Table_Config>
  /** insert data into the table: "platyplus.tables" */
  insert_platyplus_tables: Maybe<Platyplus_Tables_Mutation_Response>
  /** insert a single row into the table: "platyplus.tables" */
  insert_platyplus_tables_one: Maybe<Platyplus_Tables>
  /** insert data into the table: "proprietaire" */
  insert_proprietaire: Maybe<Proprietaire_Mutation_Response>
  /** insert a single row into the table: "proprietaire" */
  insert_proprietaire_one: Maybe<Proprietaire>
  /** insert data into the table: "users" */
  insert_users: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one: Maybe<Users>
  /** update data of the table: "auth.account_providers" */
  update_auth_account_providers: Maybe<Auth_Account_Providers_Mutation_Response>
  /** update single row of the table: "auth.account_providers" */
  update_auth_account_providers_by_pk: Maybe<Auth_Account_Providers>
  /** update data of the table: "auth.account_roles" */
  update_auth_account_roles: Maybe<Auth_Account_Roles_Mutation_Response>
  /** update single row of the table: "auth.account_roles" */
  update_auth_account_roles_by_pk: Maybe<Auth_Account_Roles>
  /** update data of the table: "auth.accounts" */
  update_auth_accounts: Maybe<Auth_Accounts_Mutation_Response>
  /** update single row of the table: "auth.accounts" */
  update_auth_accounts_by_pk: Maybe<Auth_Accounts>
  /** update data of the table: "auth.migrations" */
  update_auth_migrations: Maybe<Auth_Migrations_Mutation_Response>
  /** update single row of the table: "auth.migrations" */
  update_auth_migrations_by_pk: Maybe<Auth_Migrations>
  /** update data of the table: "auth.providers" */
  update_auth_providers: Maybe<Auth_Providers_Mutation_Response>
  /** update single row of the table: "auth.providers" */
  update_auth_providers_by_pk: Maybe<Auth_Providers>
  /** update data of the table: "auth.refresh_tokens" */
  update_auth_refresh_tokens: Maybe<Auth_Refresh_Tokens_Mutation_Response>
  /** update single row of the table: "auth.refresh_tokens" */
  update_auth_refresh_tokens_by_pk: Maybe<Auth_Refresh_Tokens>
  /** update data of the table: "auth.roles" */
  update_auth_roles: Maybe<Auth_Roles_Mutation_Response>
  /** update single row of the table: "auth.roles" */
  update_auth_roles_by_pk: Maybe<Auth_Roles>
  /** update data of the table: "bidon" */
  update_bidon: Maybe<Bidon_Mutation_Response>
  /** update single row of the table: "bidon" */
  update_bidon_by_pk: Maybe<Bidon>
  /** update data of the table: "dew" */
  update_dew: Maybe<Dew_Mutation_Response>
  /** update single row of the table: "dew" */
  update_dew_by_pk: Maybe<Dew>
  /** update data of the table: "platyplus.app_config" */
  update_platyplus_app_config: Maybe<Platyplus_App_Config_Mutation_Response>
  /** update single row of the table: "platyplus.app_config" */
  update_platyplus_app_config_by_pk: Maybe<Platyplus_App_Config>
  /** update data of the table: "platyplus.property_config" */
  update_platyplus_property_config: Maybe<Platyplus_Property_Config_Mutation_Response>
  /** update single row of the table: "platyplus.property_config" */
  update_platyplus_property_config_by_pk: Maybe<Platyplus_Property_Config>
  /** update data of the table: "platyplus.table_config" */
  update_platyplus_table_config: Maybe<Platyplus_Table_Config_Mutation_Response>
  /** update single row of the table: "platyplus.table_config" */
  update_platyplus_table_config_by_pk: Maybe<Platyplus_Table_Config>
  /** update data of the table: "platyplus.tables" */
  update_platyplus_tables: Maybe<Platyplus_Tables_Mutation_Response>
  /** update single row of the table: "platyplus.tables" */
  update_platyplus_tables_by_pk: Maybe<Platyplus_Tables>
  /** update data of the table: "proprietaire" */
  update_proprietaire: Maybe<Proprietaire_Mutation_Response>
  /** update single row of the table: "proprietaire" */
  update_proprietaire_by_pk: Maybe<Proprietaire>
  /** update data of the table: "users" */
  update_users: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk: Maybe<Users>
}

/** mutation root */
export type Mutation_RootDelete_Auth_Account_ProvidersArgs = {
  where: Auth_Account_Providers_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Account_Providers_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Auth_Account_RolesArgs = {
  where: Auth_Account_Roles_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Account_Roles_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Auth_AccountsArgs = {
  where: Auth_Accounts_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Accounts_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Auth_MigrationsArgs = {
  where: Auth_Migrations_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Migrations_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Auth_ProvidersArgs = {
  where: Auth_Providers_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Providers_By_PkArgs = {
  provider: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Auth_Refresh_TokensArgs = {
  where: Auth_Refresh_Tokens_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Refresh_Tokens_By_PkArgs = {
  refresh_token: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Auth_RolesArgs = {
  where: Auth_Roles_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Roles_By_PkArgs = {
  role: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_BidonArgs = {
  where: Bidon_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Bidon_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_DewArgs = {
  where: Dew_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Dew_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Platyplus_App_ConfigArgs = {
  where: Platyplus_App_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Platyplus_App_Config_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Platyplus_Property_ConfigArgs = {
  where: Platyplus_Property_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Platyplus_Property_Config_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Platyplus_Table_ConfigArgs = {
  where: Platyplus_Table_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Platyplus_Table_Config_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Platyplus_TablesArgs = {
  where: Platyplus_Tables_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Platyplus_Tables_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_ProprietaireArgs = {
  where: Proprietaire_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Proprietaire_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootInsert_Auth_Account_ProvidersArgs = {
  objects: Array<Auth_Account_Providers_Insert_Input>
  on_conflict: Maybe<Auth_Account_Providers_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Account_Providers_OneArgs = {
  object: Auth_Account_Providers_Insert_Input
  on_conflict: Maybe<Auth_Account_Providers_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Account_RolesArgs = {
  objects: Array<Auth_Account_Roles_Insert_Input>
  on_conflict: Maybe<Auth_Account_Roles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Account_Roles_OneArgs = {
  object: Auth_Account_Roles_Insert_Input
  on_conflict: Maybe<Auth_Account_Roles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_AccountsArgs = {
  objects: Array<Auth_Accounts_Insert_Input>
  on_conflict: Maybe<Auth_Accounts_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Accounts_OneArgs = {
  object: Auth_Accounts_Insert_Input
  on_conflict: Maybe<Auth_Accounts_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_MigrationsArgs = {
  objects: Array<Auth_Migrations_Insert_Input>
  on_conflict: Maybe<Auth_Migrations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Migrations_OneArgs = {
  object: Auth_Migrations_Insert_Input
  on_conflict: Maybe<Auth_Migrations_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_ProvidersArgs = {
  objects: Array<Auth_Providers_Insert_Input>
  on_conflict: Maybe<Auth_Providers_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Providers_OneArgs = {
  object: Auth_Providers_Insert_Input
  on_conflict: Maybe<Auth_Providers_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Refresh_TokensArgs = {
  objects: Array<Auth_Refresh_Tokens_Insert_Input>
  on_conflict: Maybe<Auth_Refresh_Tokens_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Refresh_Tokens_OneArgs = {
  object: Auth_Refresh_Tokens_Insert_Input
  on_conflict: Maybe<Auth_Refresh_Tokens_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_RolesArgs = {
  objects: Array<Auth_Roles_Insert_Input>
  on_conflict: Maybe<Auth_Roles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Roles_OneArgs = {
  object: Auth_Roles_Insert_Input
  on_conflict: Maybe<Auth_Roles_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_BidonArgs = {
  objects: Array<Bidon_Insert_Input>
  on_conflict: Maybe<Bidon_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Bidon_OneArgs = {
  object: Bidon_Insert_Input
  on_conflict: Maybe<Bidon_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_DewArgs = {
  objects: Array<Dew_Insert_Input>
  on_conflict: Maybe<Dew_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dew_OneArgs = {
  object: Dew_Insert_Input
  on_conflict: Maybe<Dew_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Platyplus_App_ConfigArgs = {
  objects: Array<Platyplus_App_Config_Insert_Input>
  on_conflict: Maybe<Platyplus_App_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Platyplus_App_Config_OneArgs = {
  object: Platyplus_App_Config_Insert_Input
  on_conflict: Maybe<Platyplus_App_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Platyplus_Property_ConfigArgs = {
  objects: Array<Platyplus_Property_Config_Insert_Input>
  on_conflict: Maybe<Platyplus_Property_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Platyplus_Property_Config_OneArgs = {
  object: Platyplus_Property_Config_Insert_Input
  on_conflict: Maybe<Platyplus_Property_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Platyplus_Table_ConfigArgs = {
  objects: Array<Platyplus_Table_Config_Insert_Input>
  on_conflict: Maybe<Platyplus_Table_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Platyplus_Table_Config_OneArgs = {
  object: Platyplus_Table_Config_Insert_Input
  on_conflict: Maybe<Platyplus_Table_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Platyplus_TablesArgs = {
  objects: Array<Platyplus_Tables_Insert_Input>
  on_conflict: Maybe<Platyplus_Tables_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Platyplus_Tables_OneArgs = {
  object: Platyplus_Tables_Insert_Input
  on_conflict: Maybe<Platyplus_Tables_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_ProprietaireArgs = {
  objects: Array<Proprietaire_Insert_Input>
  on_conflict: Maybe<Proprietaire_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Proprietaire_OneArgs = {
  object: Proprietaire_Insert_Input
  on_conflict: Maybe<Proprietaire_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>
  on_conflict: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input
  on_conflict: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_ProvidersArgs = {
  _set: Maybe<Auth_Account_Providers_Set_Input>
  where: Auth_Account_Providers_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_Providers_By_PkArgs = {
  _set: Maybe<Auth_Account_Providers_Set_Input>
  pk_columns: Auth_Account_Providers_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_RolesArgs = {
  _set: Maybe<Auth_Account_Roles_Set_Input>
  where: Auth_Account_Roles_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Account_Roles_By_PkArgs = {
  _set: Maybe<Auth_Account_Roles_Set_Input>
  pk_columns: Auth_Account_Roles_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Auth_AccountsArgs = {
  _append: Maybe<Auth_Accounts_Append_Input>
  _delete_at_path: Maybe<Auth_Accounts_Delete_At_Path_Input>
  _delete_elem: Maybe<Auth_Accounts_Delete_Elem_Input>
  _delete_key: Maybe<Auth_Accounts_Delete_Key_Input>
  _prepend: Maybe<Auth_Accounts_Prepend_Input>
  _set: Maybe<Auth_Accounts_Set_Input>
  where: Auth_Accounts_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Accounts_By_PkArgs = {
  _append: Maybe<Auth_Accounts_Append_Input>
  _delete_at_path: Maybe<Auth_Accounts_Delete_At_Path_Input>
  _delete_elem: Maybe<Auth_Accounts_Delete_Elem_Input>
  _delete_key: Maybe<Auth_Accounts_Delete_Key_Input>
  _prepend: Maybe<Auth_Accounts_Prepend_Input>
  _set: Maybe<Auth_Accounts_Set_Input>
  pk_columns: Auth_Accounts_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Auth_MigrationsArgs = {
  _inc: Maybe<Auth_Migrations_Inc_Input>
  _set: Maybe<Auth_Migrations_Set_Input>
  where: Auth_Migrations_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Migrations_By_PkArgs = {
  _inc: Maybe<Auth_Migrations_Inc_Input>
  _set: Maybe<Auth_Migrations_Set_Input>
  pk_columns: Auth_Migrations_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Auth_ProvidersArgs = {
  _set: Maybe<Auth_Providers_Set_Input>
  where: Auth_Providers_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Providers_By_PkArgs = {
  _set: Maybe<Auth_Providers_Set_Input>
  pk_columns: Auth_Providers_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Refresh_TokensArgs = {
  _set: Maybe<Auth_Refresh_Tokens_Set_Input>
  where: Auth_Refresh_Tokens_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Refresh_Tokens_By_PkArgs = {
  _set: Maybe<Auth_Refresh_Tokens_Set_Input>
  pk_columns: Auth_Refresh_Tokens_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Auth_RolesArgs = {
  _set: Maybe<Auth_Roles_Set_Input>
  where: Auth_Roles_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Roles_By_PkArgs = {
  _set: Maybe<Auth_Roles_Set_Input>
  pk_columns: Auth_Roles_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_BidonArgs = {
  _set: Maybe<Bidon_Set_Input>
  where: Bidon_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Bidon_By_PkArgs = {
  _set: Maybe<Bidon_Set_Input>
  pk_columns: Bidon_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_DewArgs = {
  _inc: Maybe<Dew_Inc_Input>
  _set: Maybe<Dew_Set_Input>
  where: Dew_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Dew_By_PkArgs = {
  _inc: Maybe<Dew_Inc_Input>
  _set: Maybe<Dew_Set_Input>
  pk_columns: Dew_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Platyplus_App_ConfigArgs = {
  _append: Maybe<Platyplus_App_Config_Append_Input>
  _delete_at_path: Maybe<Platyplus_App_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Platyplus_App_Config_Delete_Elem_Input>
  _delete_key: Maybe<Platyplus_App_Config_Delete_Key_Input>
  _prepend: Maybe<Platyplus_App_Config_Prepend_Input>
  _set: Maybe<Platyplus_App_Config_Set_Input>
  where: Platyplus_App_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Platyplus_App_Config_By_PkArgs = {
  _append: Maybe<Platyplus_App_Config_Append_Input>
  _delete_at_path: Maybe<Platyplus_App_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Platyplus_App_Config_Delete_Elem_Input>
  _delete_key: Maybe<Platyplus_App_Config_Delete_Key_Input>
  _prepend: Maybe<Platyplus_App_Config_Prepend_Input>
  _set: Maybe<Platyplus_App_Config_Set_Input>
  pk_columns: Platyplus_App_Config_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Platyplus_Property_ConfigArgs = {
  _append: Maybe<Platyplus_Property_Config_Append_Input>
  _delete_at_path: Maybe<Platyplus_Property_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Platyplus_Property_Config_Delete_Elem_Input>
  _delete_key: Maybe<Platyplus_Property_Config_Delete_Key_Input>
  _prepend: Maybe<Platyplus_Property_Config_Prepend_Input>
  _set: Maybe<Platyplus_Property_Config_Set_Input>
  where: Platyplus_Property_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Platyplus_Property_Config_By_PkArgs = {
  _append: Maybe<Platyplus_Property_Config_Append_Input>
  _delete_at_path: Maybe<Platyplus_Property_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Platyplus_Property_Config_Delete_Elem_Input>
  _delete_key: Maybe<Platyplus_Property_Config_Delete_Key_Input>
  _prepend: Maybe<Platyplus_Property_Config_Prepend_Input>
  _set: Maybe<Platyplus_Property_Config_Set_Input>
  pk_columns: Platyplus_Property_Config_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Platyplus_Table_ConfigArgs = {
  _append: Maybe<Platyplus_Table_Config_Append_Input>
  _delete_at_path: Maybe<Platyplus_Table_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Platyplus_Table_Config_Delete_Elem_Input>
  _delete_key: Maybe<Platyplus_Table_Config_Delete_Key_Input>
  _prepend: Maybe<Platyplus_Table_Config_Prepend_Input>
  _set: Maybe<Platyplus_Table_Config_Set_Input>
  where: Platyplus_Table_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Platyplus_Table_Config_By_PkArgs = {
  _append: Maybe<Platyplus_Table_Config_Append_Input>
  _delete_at_path: Maybe<Platyplus_Table_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Platyplus_Table_Config_Delete_Elem_Input>
  _delete_key: Maybe<Platyplus_Table_Config_Delete_Key_Input>
  _prepend: Maybe<Platyplus_Table_Config_Prepend_Input>
  _set: Maybe<Platyplus_Table_Config_Set_Input>
  pk_columns: Platyplus_Table_Config_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Platyplus_TablesArgs = {
  _append: Maybe<Platyplus_Tables_Append_Input>
  _delete_at_path: Maybe<Platyplus_Tables_Delete_At_Path_Input>
  _delete_elem: Maybe<Platyplus_Tables_Delete_Elem_Input>
  _delete_key: Maybe<Platyplus_Tables_Delete_Key_Input>
  _prepend: Maybe<Platyplus_Tables_Prepend_Input>
  _set: Maybe<Platyplus_Tables_Set_Input>
  where: Platyplus_Tables_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Platyplus_Tables_By_PkArgs = {
  _append: Maybe<Platyplus_Tables_Append_Input>
  _delete_at_path: Maybe<Platyplus_Tables_Delete_At_Path_Input>
  _delete_elem: Maybe<Platyplus_Tables_Delete_Elem_Input>
  _delete_key: Maybe<Platyplus_Tables_Delete_Key_Input>
  _prepend: Maybe<Platyplus_Tables_Prepend_Input>
  _set: Maybe<Platyplus_Tables_Set_Input>
  pk_columns: Platyplus_Tables_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_ProprietaireArgs = {
  _set: Maybe<Proprietaire_Set_Input>
  where: Proprietaire_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Proprietaire_By_PkArgs = {
  _set: Maybe<Proprietaire_Set_Input>
  pk_columns: Proprietaire_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set: Maybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set: Maybe<Users_Set_Input>
  pk_columns: Users_Pk_Columns_Input
}

/** Boolean expression to compare columns of type "name". All fields are combined with logical 'AND'. */
export type Name_Comparison_Exp = {
  _eq: Maybe<Scalars['name']>
  _gt: Maybe<Scalars['name']>
  _gte: Maybe<Scalars['name']>
  _in: Maybe<Array<Scalars['name']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['name']>
  _lte: Maybe<Scalars['name']>
  _neq: Maybe<Scalars['name']>
  _nin: Maybe<Array<Scalars['name']>>
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "platyplus.app_config" */
export type Platyplus_App_Config = {
  __typename?: 'platyplus_app_config'
  deleted: Scalars['Boolean']
  id: Scalars['uuid']
  menu_order: Scalars['jsonb']
  updated_at: Scalars['timestamptz']
}

/** columns and relationships of "platyplus.app_config" */
export type Platyplus_App_ConfigMenu_OrderArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "platyplus.app_config" */
export type Platyplus_App_Config_Aggregate = {
  __typename?: 'platyplus_app_config_aggregate'
  aggregate: Maybe<Platyplus_App_Config_Aggregate_Fields>
  nodes: Array<Platyplus_App_Config>
}

/** aggregate fields of "platyplus.app_config" */
export type Platyplus_App_Config_Aggregate_Fields = {
  __typename?: 'platyplus_app_config_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Platyplus_App_Config_Max_Fields>
  min: Maybe<Platyplus_App_Config_Min_Fields>
}

/** aggregate fields of "platyplus.app_config" */
export type Platyplus_App_Config_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Platyplus_App_Config_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Platyplus_App_Config_Append_Input = {
  menu_order: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "platyplus.app_config". All fields are combined with a logical 'AND'. */
export type Platyplus_App_Config_Bool_Exp = {
  _and: Maybe<Array<Platyplus_App_Config_Bool_Exp>>
  _not: Maybe<Platyplus_App_Config_Bool_Exp>
  _or: Maybe<Array<Platyplus_App_Config_Bool_Exp>>
  deleted: Maybe<Boolean_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  menu_order: Maybe<Jsonb_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "platyplus.app_config" */
export enum Platyplus_App_Config_Constraint {
  /** unique or primary key constraint */
  AppConfigPkey = 'app_config_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Platyplus_App_Config_Delete_At_Path_Input = {
  menu_order: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Platyplus_App_Config_Delete_Elem_Input = {
  menu_order: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Platyplus_App_Config_Delete_Key_Input = {
  menu_order: Maybe<Scalars['String']>
}

/** input type for inserting data into table "platyplus.app_config" */
export type Platyplus_App_Config_Insert_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  menu_order: Maybe<Scalars['jsonb']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Platyplus_App_Config_Max_Fields = {
  __typename?: 'platyplus_app_config_max_fields'
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Platyplus_App_Config_Min_Fields = {
  __typename?: 'platyplus_app_config_min_fields'
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "platyplus.app_config" */
export type Platyplus_App_Config_Mutation_Response = {
  __typename?: 'platyplus_app_config_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Platyplus_App_Config>
}

/** on conflict condition type for table "platyplus.app_config" */
export type Platyplus_App_Config_On_Conflict = {
  constraint: Platyplus_App_Config_Constraint
  update_columns: Array<Platyplus_App_Config_Update_Column>
  where: Maybe<Platyplus_App_Config_Bool_Exp>
}

/** Ordering options when selecting data from "platyplus.app_config". */
export type Platyplus_App_Config_Order_By = {
  deleted: Maybe<Order_By>
  id: Maybe<Order_By>
  menu_order: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: platyplus_app_config */
export type Platyplus_App_Config_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Platyplus_App_Config_Prepend_Input = {
  menu_order: Maybe<Scalars['jsonb']>
}

/** select columns of table "platyplus.app_config" */
export enum Platyplus_App_Config_Select_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  MenuOrder = 'menu_order',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "platyplus.app_config" */
export type Platyplus_App_Config_Set_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  menu_order: Maybe<Scalars['jsonb']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "platyplus.app_config" */
export enum Platyplus_App_Config_Update_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  MenuOrder = 'menu_order',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "platyplus.columns" */
export type Platyplus_Columns = {
  __typename?: 'platyplus_columns'
  characterMaximumLength: Maybe<Scalars['Int']>
  dataType: Maybe<Scalars['String']>
  default: Maybe<Scalars['String']>
  generationExpression: Maybe<Scalars['String']>
  isGenerated: Maybe<Scalars['Boolean']>
  name: Maybe<Scalars['name']>
  nullable: Maybe<Scalars['Boolean']>
  numericPrecision: Maybe<Scalars['Int']>
  position: Maybe<Scalars['Int']>
  tableId: Maybe<Scalars['String']>
  udtName: Maybe<Scalars['name']>
}

/** aggregated selection of "platyplus.columns" */
export type Platyplus_Columns_Aggregate = {
  __typename?: 'platyplus_columns_aggregate'
  aggregate: Maybe<Platyplus_Columns_Aggregate_Fields>
  nodes: Array<Platyplus_Columns>
}

/** aggregate fields of "platyplus.columns" */
export type Platyplus_Columns_Aggregate_Fields = {
  __typename?: 'platyplus_columns_aggregate_fields'
  avg: Maybe<Platyplus_Columns_Avg_Fields>
  count: Scalars['Int']
  max: Maybe<Platyplus_Columns_Max_Fields>
  min: Maybe<Platyplus_Columns_Min_Fields>
  stddev: Maybe<Platyplus_Columns_Stddev_Fields>
  stddev_pop: Maybe<Platyplus_Columns_Stddev_Pop_Fields>
  stddev_samp: Maybe<Platyplus_Columns_Stddev_Samp_Fields>
  sum: Maybe<Platyplus_Columns_Sum_Fields>
  var_pop: Maybe<Platyplus_Columns_Var_Pop_Fields>
  var_samp: Maybe<Platyplus_Columns_Var_Samp_Fields>
  variance: Maybe<Platyplus_Columns_Variance_Fields>
}

/** aggregate fields of "platyplus.columns" */
export type Platyplus_Columns_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Platyplus_Columns_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "platyplus.columns" */
export type Platyplus_Columns_Aggregate_Order_By = {
  avg: Maybe<Platyplus_Columns_Avg_Order_By>
  count: Maybe<Order_By>
  max: Maybe<Platyplus_Columns_Max_Order_By>
  min: Maybe<Platyplus_Columns_Min_Order_By>
  stddev: Maybe<Platyplus_Columns_Stddev_Order_By>
  stddev_pop: Maybe<Platyplus_Columns_Stddev_Pop_Order_By>
  stddev_samp: Maybe<Platyplus_Columns_Stddev_Samp_Order_By>
  sum: Maybe<Platyplus_Columns_Sum_Order_By>
  var_pop: Maybe<Platyplus_Columns_Var_Pop_Order_By>
  var_samp: Maybe<Platyplus_Columns_Var_Samp_Order_By>
  variance: Maybe<Platyplus_Columns_Variance_Order_By>
}

/** input type for inserting array relation for remote table "platyplus.columns" */
export type Platyplus_Columns_Arr_Rel_Insert_Input = {
  data: Array<Platyplus_Columns_Insert_Input>
}

/** aggregate avg on columns */
export type Platyplus_Columns_Avg_Fields = {
  __typename?: 'platyplus_columns_avg_fields'
  characterMaximumLength: Maybe<Scalars['Float']>
  numericPrecision: Maybe<Scalars['Float']>
  position: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Avg_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "platyplus.columns". All fields are combined with a logical 'AND'. */
export type Platyplus_Columns_Bool_Exp = {
  _and: Maybe<Array<Platyplus_Columns_Bool_Exp>>
  _not: Maybe<Platyplus_Columns_Bool_Exp>
  _or: Maybe<Array<Platyplus_Columns_Bool_Exp>>
  characterMaximumLength: Maybe<Int_Comparison_Exp>
  dataType: Maybe<String_Comparison_Exp>
  default: Maybe<String_Comparison_Exp>
  generationExpression: Maybe<String_Comparison_Exp>
  isGenerated: Maybe<Boolean_Comparison_Exp>
  name: Maybe<Name_Comparison_Exp>
  nullable: Maybe<Boolean_Comparison_Exp>
  numericPrecision: Maybe<Int_Comparison_Exp>
  position: Maybe<Int_Comparison_Exp>
  tableId: Maybe<String_Comparison_Exp>
  udtName: Maybe<Name_Comparison_Exp>
}

/** input type for inserting data into table "platyplus.columns" */
export type Platyplus_Columns_Insert_Input = {
  characterMaximumLength: Maybe<Scalars['Int']>
  dataType: Maybe<Scalars['String']>
  default: Maybe<Scalars['String']>
  generationExpression: Maybe<Scalars['String']>
  isGenerated: Maybe<Scalars['Boolean']>
  name: Maybe<Scalars['name']>
  nullable: Maybe<Scalars['Boolean']>
  numericPrecision: Maybe<Scalars['Int']>
  position: Maybe<Scalars['Int']>
  tableId: Maybe<Scalars['String']>
  udtName: Maybe<Scalars['name']>
}

/** aggregate max on columns */
export type Platyplus_Columns_Max_Fields = {
  __typename?: 'platyplus_columns_max_fields'
  characterMaximumLength: Maybe<Scalars['Int']>
  dataType: Maybe<Scalars['String']>
  default: Maybe<Scalars['String']>
  generationExpression: Maybe<Scalars['String']>
  numericPrecision: Maybe<Scalars['Int']>
  position: Maybe<Scalars['Int']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Max_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  dataType: Maybe<Order_By>
  default: Maybe<Order_By>
  generationExpression: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Platyplus_Columns_Min_Fields = {
  __typename?: 'platyplus_columns_min_fields'
  characterMaximumLength: Maybe<Scalars['Int']>
  dataType: Maybe<Scalars['String']>
  default: Maybe<Scalars['String']>
  generationExpression: Maybe<Scalars['String']>
  numericPrecision: Maybe<Scalars['Int']>
  position: Maybe<Scalars['Int']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Min_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  dataType: Maybe<Order_By>
  default: Maybe<Order_By>
  generationExpression: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** Ordering options when selecting data from "platyplus.columns". */
export type Platyplus_Columns_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  dataType: Maybe<Order_By>
  default: Maybe<Order_By>
  generationExpression: Maybe<Order_By>
  isGenerated: Maybe<Order_By>
  name: Maybe<Order_By>
  nullable: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
  tableId: Maybe<Order_By>
  udtName: Maybe<Order_By>
}

/** select columns of table "platyplus.columns" */
export enum Platyplus_Columns_Select_Column {
  /** column name */
  CharacterMaximumLength = 'characterMaximumLength',
  /** column name */
  DataType = 'dataType',
  /** column name */
  Default = 'default',
  /** column name */
  GenerationExpression = 'generationExpression',
  /** column name */
  IsGenerated = 'isGenerated',
  /** column name */
  Name = 'name',
  /** column name */
  Nullable = 'nullable',
  /** column name */
  NumericPrecision = 'numericPrecision',
  /** column name */
  Position = 'position',
  /** column name */
  TableId = 'tableId',
  /** column name */
  UdtName = 'udtName'
}

/** aggregate stddev on columns */
export type Platyplus_Columns_Stddev_Fields = {
  __typename?: 'platyplus_columns_stddev_fields'
  characterMaximumLength: Maybe<Scalars['Float']>
  numericPrecision: Maybe<Scalars['Float']>
  position: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Stddev_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Platyplus_Columns_Stddev_Pop_Fields = {
  __typename?: 'platyplus_columns_stddev_pop_fields'
  characterMaximumLength: Maybe<Scalars['Float']>
  numericPrecision: Maybe<Scalars['Float']>
  position: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Stddev_Pop_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Platyplus_Columns_Stddev_Samp_Fields = {
  __typename?: 'platyplus_columns_stddev_samp_fields'
  characterMaximumLength: Maybe<Scalars['Float']>
  numericPrecision: Maybe<Scalars['Float']>
  position: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Stddev_Samp_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Platyplus_Columns_Sum_Fields = {
  __typename?: 'platyplus_columns_sum_fields'
  characterMaximumLength: Maybe<Scalars['Int']>
  numericPrecision: Maybe<Scalars['Int']>
  position: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Sum_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
}

/** aggregate var_pop on columns */
export type Platyplus_Columns_Var_Pop_Fields = {
  __typename?: 'platyplus_columns_var_pop_fields'
  characterMaximumLength: Maybe<Scalars['Float']>
  numericPrecision: Maybe<Scalars['Float']>
  position: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Var_Pop_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Platyplus_Columns_Var_Samp_Fields = {
  __typename?: 'platyplus_columns_var_samp_fields'
  characterMaximumLength: Maybe<Scalars['Float']>
  numericPrecision: Maybe<Scalars['Float']>
  position: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Var_Samp_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Platyplus_Columns_Variance_Fields = {
  __typename?: 'platyplus_columns_variance_fields'
  characterMaximumLength: Maybe<Scalars['Float']>
  numericPrecision: Maybe<Scalars['Float']>
  position: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "platyplus.columns" */
export type Platyplus_Columns_Variance_Order_By = {
  characterMaximumLength: Maybe<Order_By>
  numericPrecision: Maybe<Order_By>
  position: Maybe<Order_By>
}

/** columns and relationships of "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys = {
  __typename?: 'platyplus_foreign_keys'
  constraint: Maybe<Scalars['name']>
  from: Maybe<Scalars['String']>
  mapping: Maybe<Scalars['jsonb']>
  to: Maybe<Scalars['String']>
}

/** columns and relationships of "platyplus.foreign_keys" */
export type Platyplus_Foreign_KeysMappingArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys_Aggregate = {
  __typename?: 'platyplus_foreign_keys_aggregate'
  aggregate: Maybe<Platyplus_Foreign_Keys_Aggregate_Fields>
  nodes: Array<Platyplus_Foreign_Keys>
}

/** aggregate fields of "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys_Aggregate_Fields = {
  __typename?: 'platyplus_foreign_keys_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Platyplus_Foreign_Keys_Max_Fields>
  min: Maybe<Platyplus_Foreign_Keys_Min_Fields>
}

/** aggregate fields of "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Platyplus_Foreign_Keys_Max_Order_By>
  min: Maybe<Platyplus_Foreign_Keys_Min_Order_By>
}

/** input type for inserting array relation for remote table "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys_Arr_Rel_Insert_Input = {
  data: Array<Platyplus_Foreign_Keys_Insert_Input>
}

/** Boolean expression to filter rows from the table "platyplus.foreign_keys". All fields are combined with a logical 'AND'. */
export type Platyplus_Foreign_Keys_Bool_Exp = {
  _and: Maybe<Array<Platyplus_Foreign_Keys_Bool_Exp>>
  _not: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
  _or: Maybe<Array<Platyplus_Foreign_Keys_Bool_Exp>>
  constraint: Maybe<Name_Comparison_Exp>
  from: Maybe<String_Comparison_Exp>
  mapping: Maybe<Jsonb_Comparison_Exp>
  to: Maybe<String_Comparison_Exp>
}

/** input type for inserting data into table "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys_Insert_Input = {
  constraint: Maybe<Scalars['name']>
  from: Maybe<Scalars['String']>
  mapping: Maybe<Scalars['jsonb']>
  to: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Platyplus_Foreign_Keys_Max_Fields = {
  __typename?: 'platyplus_foreign_keys_max_fields'
  from: Maybe<Scalars['String']>
  to: Maybe<Scalars['String']>
}

/** order by max() on columns of table "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys_Max_Order_By = {
  from: Maybe<Order_By>
  to: Maybe<Order_By>
}

/** aggregate min on columns */
export type Platyplus_Foreign_Keys_Min_Fields = {
  __typename?: 'platyplus_foreign_keys_min_fields'
  from: Maybe<Scalars['String']>
  to: Maybe<Scalars['String']>
}

/** order by min() on columns of table "platyplus.foreign_keys" */
export type Platyplus_Foreign_Keys_Min_Order_By = {
  from: Maybe<Order_By>
  to: Maybe<Order_By>
}

/** Ordering options when selecting data from "platyplus.foreign_keys". */
export type Platyplus_Foreign_Keys_Order_By = {
  constraint: Maybe<Order_By>
  from: Maybe<Order_By>
  mapping: Maybe<Order_By>
  to: Maybe<Order_By>
}

/** select columns of table "platyplus.foreign_keys" */
export enum Platyplus_Foreign_Keys_Select_Column {
  /** column name */
  Constraint = 'constraint',
  /** column name */
  From = 'from',
  /** column name */
  Mapping = 'mapping',
  /** column name */
  To = 'to'
}

/** columns and relationships of "platyplus.primary_keys" */
export type Platyplus_Primary_Keys = {
  __typename?: 'platyplus_primary_keys'
  columns: Maybe<Scalars['jsonb']>
  constraint: Maybe<Scalars['name']>
  id: Maybe<Scalars['String']>
}

/** columns and relationships of "platyplus.primary_keys" */
export type Platyplus_Primary_KeysColumnsArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "platyplus.primary_keys" */
export type Platyplus_Primary_Keys_Aggregate = {
  __typename?: 'platyplus_primary_keys_aggregate'
  aggregate: Maybe<Platyplus_Primary_Keys_Aggregate_Fields>
  nodes: Array<Platyplus_Primary_Keys>
}

/** aggregate fields of "platyplus.primary_keys" */
export type Platyplus_Primary_Keys_Aggregate_Fields = {
  __typename?: 'platyplus_primary_keys_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Platyplus_Primary_Keys_Max_Fields>
  min: Maybe<Platyplus_Primary_Keys_Min_Fields>
}

/** aggregate fields of "platyplus.primary_keys" */
export type Platyplus_Primary_Keys_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Platyplus_Primary_Keys_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "platyplus.primary_keys". All fields are combined with a logical 'AND'. */
export type Platyplus_Primary_Keys_Bool_Exp = {
  _and: Maybe<Array<Platyplus_Primary_Keys_Bool_Exp>>
  _not: Maybe<Platyplus_Primary_Keys_Bool_Exp>
  _or: Maybe<Array<Platyplus_Primary_Keys_Bool_Exp>>
  columns: Maybe<Jsonb_Comparison_Exp>
  constraint: Maybe<Name_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
}

/** input type for inserting data into table "platyplus.primary_keys" */
export type Platyplus_Primary_Keys_Insert_Input = {
  columns: Maybe<Scalars['jsonb']>
  constraint: Maybe<Scalars['name']>
  id: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Platyplus_Primary_Keys_Max_Fields = {
  __typename?: 'platyplus_primary_keys_max_fields'
  id: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Platyplus_Primary_Keys_Min_Fields = {
  __typename?: 'platyplus_primary_keys_min_fields'
  id: Maybe<Scalars['String']>
}

/** input type for inserting object relation for remote table "platyplus.primary_keys" */
export type Platyplus_Primary_Keys_Obj_Rel_Insert_Input = {
  data: Platyplus_Primary_Keys_Insert_Input
}

/** Ordering options when selecting data from "platyplus.primary_keys". */
export type Platyplus_Primary_Keys_Order_By = {
  columns: Maybe<Order_By>
  constraint: Maybe<Order_By>
  id: Maybe<Order_By>
}

/** select columns of table "platyplus.primary_keys" */
export enum Platyplus_Primary_Keys_Select_Column {
  /** column name */
  Columns = 'columns',
  /** column name */
  Constraint = 'constraint',
  /** column name */
  Id = 'id'
}

/** columns and relationships of "platyplus.property_config" */
export type Platyplus_Property_Config = {
  __typename?: 'platyplus_property_config'
  component: Maybe<Scalars['String']>
  deleted: Scalars['Boolean']
  description: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Scalars['String']
  json_schema: Maybe<Scalars['jsonb']>
  property_name: Scalars['String']
  table_id: Scalars['String']
  title: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** columns and relationships of "platyplus.property_config" */
export type Platyplus_Property_ConfigJson_SchemaArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "platyplus.property_config" */
export type Platyplus_Property_Config_Aggregate = {
  __typename?: 'platyplus_property_config_aggregate'
  aggregate: Maybe<Platyplus_Property_Config_Aggregate_Fields>
  nodes: Array<Platyplus_Property_Config>
}

/** aggregate fields of "platyplus.property_config" */
export type Platyplus_Property_Config_Aggregate_Fields = {
  __typename?: 'platyplus_property_config_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Platyplus_Property_Config_Max_Fields>
  min: Maybe<Platyplus_Property_Config_Min_Fields>
}

/** aggregate fields of "platyplus.property_config" */
export type Platyplus_Property_Config_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Platyplus_Property_Config_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Platyplus_Property_Config_Append_Input = {
  json_schema: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "platyplus.property_config". All fields are combined with a logical 'AND'. */
export type Platyplus_Property_Config_Bool_Exp = {
  _and: Maybe<Array<Platyplus_Property_Config_Bool_Exp>>
  _not: Maybe<Platyplus_Property_Config_Bool_Exp>
  _or: Maybe<Array<Platyplus_Property_Config_Bool_Exp>>
  component: Maybe<String_Comparison_Exp>
  deleted: Maybe<Boolean_Comparison_Exp>
  description: Maybe<String_Comparison_Exp>
  icon: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  json_schema: Maybe<Jsonb_Comparison_Exp>
  property_name: Maybe<String_Comparison_Exp>
  table_id: Maybe<String_Comparison_Exp>
  title: Maybe<String_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "platyplus.property_config" */
export enum Platyplus_Property_Config_Constraint {
  /** unique or primary key constraint */
  PropertyConfigPkey = 'property_config_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Platyplus_Property_Config_Delete_At_Path_Input = {
  json_schema: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Platyplus_Property_Config_Delete_Elem_Input = {
  json_schema: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Platyplus_Property_Config_Delete_Key_Input = {
  json_schema: Maybe<Scalars['String']>
}

/** input type for inserting data into table "platyplus.property_config" */
export type Platyplus_Property_Config_Insert_Input = {
  component: Maybe<Scalars['String']>
  deleted: Maybe<Scalars['Boolean']>
  description: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  json_schema: Maybe<Scalars['jsonb']>
  property_name: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Platyplus_Property_Config_Max_Fields = {
  __typename?: 'platyplus_property_config_max_fields'
  component: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  property_name: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Platyplus_Property_Config_Min_Fields = {
  __typename?: 'platyplus_property_config_min_fields'
  component: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  property_name: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "platyplus.property_config" */
export type Platyplus_Property_Config_Mutation_Response = {
  __typename?: 'platyplus_property_config_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Platyplus_Property_Config>
}

/** on conflict condition type for table "platyplus.property_config" */
export type Platyplus_Property_Config_On_Conflict = {
  constraint: Platyplus_Property_Config_Constraint
  update_columns: Array<Platyplus_Property_Config_Update_Column>
  where: Maybe<Platyplus_Property_Config_Bool_Exp>
}

/** Ordering options when selecting data from "platyplus.property_config". */
export type Platyplus_Property_Config_Order_By = {
  component: Maybe<Order_By>
  deleted: Maybe<Order_By>
  description: Maybe<Order_By>
  icon: Maybe<Order_By>
  id: Maybe<Order_By>
  json_schema: Maybe<Order_By>
  property_name: Maybe<Order_By>
  table_id: Maybe<Order_By>
  title: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: platyplus_property_config */
export type Platyplus_Property_Config_Pk_Columns_Input = {
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Platyplus_Property_Config_Prepend_Input = {
  json_schema: Maybe<Scalars['jsonb']>
}

/** select columns of table "platyplus.property_config" */
export enum Platyplus_Property_Config_Select_Column {
  /** column name */
  Component = 'component',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Description = 'description',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  JsonSchema = 'json_schema',
  /** column name */
  PropertyName = 'property_name',
  /** column name */
  TableId = 'table_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "platyplus.property_config" */
export type Platyplus_Property_Config_Set_Input = {
  component: Maybe<Scalars['String']>
  deleted: Maybe<Scalars['Boolean']>
  description: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  json_schema: Maybe<Scalars['jsonb']>
  property_name: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "platyplus.property_config" */
export enum Platyplus_Property_Config_Update_Column {
  /** column name */
  Component = 'component',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Description = 'description',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  JsonSchema = 'json_schema',
  /** column name */
  PropertyName = 'property_name',
  /** column name */
  TableId = 'table_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "platyplus.table_config" */
export type Platyplus_Table_Config = {
  __typename?: 'platyplus_table_config'
  component: Maybe<Scalars['String']>
  deleted: Scalars['Boolean']
  description: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Scalars['String']
  order: Maybe<Scalars['jsonb']>
  title: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** columns and relationships of "platyplus.table_config" */
export type Platyplus_Table_ConfigOrderArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "platyplus.table_config" */
export type Platyplus_Table_Config_Aggregate = {
  __typename?: 'platyplus_table_config_aggregate'
  aggregate: Maybe<Platyplus_Table_Config_Aggregate_Fields>
  nodes: Array<Platyplus_Table_Config>
}

/** aggregate fields of "platyplus.table_config" */
export type Platyplus_Table_Config_Aggregate_Fields = {
  __typename?: 'platyplus_table_config_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Platyplus_Table_Config_Max_Fields>
  min: Maybe<Platyplus_Table_Config_Min_Fields>
}

/** aggregate fields of "platyplus.table_config" */
export type Platyplus_Table_Config_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Platyplus_Table_Config_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Platyplus_Table_Config_Append_Input = {
  order: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "platyplus.table_config". All fields are combined with a logical 'AND'. */
export type Platyplus_Table_Config_Bool_Exp = {
  _and: Maybe<Array<Platyplus_Table_Config_Bool_Exp>>
  _not: Maybe<Platyplus_Table_Config_Bool_Exp>
  _or: Maybe<Array<Platyplus_Table_Config_Bool_Exp>>
  component: Maybe<String_Comparison_Exp>
  deleted: Maybe<Boolean_Comparison_Exp>
  description: Maybe<String_Comparison_Exp>
  document_label: Maybe<String_Comparison_Exp>
  document_title: Maybe<String_Comparison_Exp>
  icon: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  order: Maybe<Jsonb_Comparison_Exp>
  title: Maybe<String_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "platyplus.table_config" */
export enum Platyplus_Table_Config_Constraint {
  /** unique or primary key constraint */
  TableConfigPkey = 'table_config_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Platyplus_Table_Config_Delete_At_Path_Input = {
  order: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Platyplus_Table_Config_Delete_Elem_Input = {
  order: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Platyplus_Table_Config_Delete_Key_Input = {
  order: Maybe<Scalars['String']>
}

/** input type for inserting data into table "platyplus.table_config" */
export type Platyplus_Table_Config_Insert_Input = {
  component: Maybe<Scalars['String']>
  deleted: Maybe<Scalars['Boolean']>
  description: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  order: Maybe<Scalars['jsonb']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Platyplus_Table_Config_Max_Fields = {
  __typename?: 'platyplus_table_config_max_fields'
  component: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Platyplus_Table_Config_Min_Fields = {
  __typename?: 'platyplus_table_config_min_fields'
  component: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "platyplus.table_config" */
export type Platyplus_Table_Config_Mutation_Response = {
  __typename?: 'platyplus_table_config_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Platyplus_Table_Config>
}

/** input type for inserting object relation for remote table "platyplus.table_config" */
export type Platyplus_Table_Config_Obj_Rel_Insert_Input = {
  data: Platyplus_Table_Config_Insert_Input
  /** on conflict condition */
  on_conflict: Maybe<Platyplus_Table_Config_On_Conflict>
}

/** on conflict condition type for table "platyplus.table_config" */
export type Platyplus_Table_Config_On_Conflict = {
  constraint: Platyplus_Table_Config_Constraint
  update_columns: Array<Platyplus_Table_Config_Update_Column>
  where: Maybe<Platyplus_Table_Config_Bool_Exp>
}

/** Ordering options when selecting data from "platyplus.table_config". */
export type Platyplus_Table_Config_Order_By = {
  component: Maybe<Order_By>
  deleted: Maybe<Order_By>
  description: Maybe<Order_By>
  document_label: Maybe<Order_By>
  document_title: Maybe<Order_By>
  icon: Maybe<Order_By>
  id: Maybe<Order_By>
  order: Maybe<Order_By>
  title: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: platyplus_table_config */
export type Platyplus_Table_Config_Pk_Columns_Input = {
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Platyplus_Table_Config_Prepend_Input = {
  order: Maybe<Scalars['jsonb']>
}

/** select columns of table "platyplus.table_config" */
export enum Platyplus_Table_Config_Select_Column {
  /** column name */
  Component = 'component',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Description = 'description',
  /** column name */
  DocumentLabel = 'document_label',
  /** column name */
  DocumentTitle = 'document_title',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "platyplus.table_config" */
export type Platyplus_Table_Config_Set_Input = {
  component: Maybe<Scalars['String']>
  deleted: Maybe<Scalars['Boolean']>
  description: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  order: Maybe<Scalars['jsonb']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "platyplus.table_config" */
export enum Platyplus_Table_Config_Update_Column {
  /** column name */
  Component = 'component',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Description = 'description',
  /** column name */
  DocumentLabel = 'document_label',
  /** column name */
  DocumentTitle = 'document_title',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "platyplus.tables" */
export type Platyplus_Tables = {
  __typename?: 'platyplus_tables'
  /** An array relationship */
  columns: Array<Platyplus_Columns>
  /** An aggregate relationship */
  columns_aggregate: Platyplus_Columns_Aggregate
  /** An object relationship */
  config: Maybe<Platyplus_Table_Config>
  deleted: Scalars['Boolean']
  /** An array relationship */
  dependentForeignKeys: Array<Platyplus_Foreign_Keys>
  /** An aggregate relationship */
  dependentForeignKeys_aggregate: Platyplus_Foreign_Keys_Aggregate
  /** An array relationship */
  foreignKeys: Array<Platyplus_Foreign_Keys>
  /** An aggregate relationship */
  foreignKeys_aggregate: Platyplus_Foreign_Keys_Aggregate
  id: Scalars['String']
  metadata: Scalars['jsonb']
  /** An object relationship */
  primaryKey: Maybe<Platyplus_Primary_Keys>
  updated_at: Scalars['timestamptz']
}

/** columns and relationships of "platyplus.tables" */
export type Platyplus_TablesColumnsArgs = {
  distinct_on: Maybe<Array<Platyplus_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Columns_Order_By>>
  where: Maybe<Platyplus_Columns_Bool_Exp>
}

/** columns and relationships of "platyplus.tables" */
export type Platyplus_TablesColumns_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Columns_Order_By>>
  where: Maybe<Platyplus_Columns_Bool_Exp>
}

/** columns and relationships of "platyplus.tables" */
export type Platyplus_TablesDependentForeignKeysArgs = {
  distinct_on: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Foreign_Keys_Order_By>>
  where: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
}

/** columns and relationships of "platyplus.tables" */
export type Platyplus_TablesDependentForeignKeys_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Foreign_Keys_Order_By>>
  where: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
}

/** columns and relationships of "platyplus.tables" */
export type Platyplus_TablesForeignKeysArgs = {
  distinct_on: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Foreign_Keys_Order_By>>
  where: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
}

/** columns and relationships of "platyplus.tables" */
export type Platyplus_TablesForeignKeys_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Foreign_Keys_Order_By>>
  where: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
}

/** columns and relationships of "platyplus.tables" */
export type Platyplus_TablesMetadataArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "platyplus.tables" */
export type Platyplus_Tables_Aggregate = {
  __typename?: 'platyplus_tables_aggregate'
  aggregate: Maybe<Platyplus_Tables_Aggregate_Fields>
  nodes: Array<Platyplus_Tables>
}

/** aggregate fields of "platyplus.tables" */
export type Platyplus_Tables_Aggregate_Fields = {
  __typename?: 'platyplus_tables_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Platyplus_Tables_Max_Fields>
  min: Maybe<Platyplus_Tables_Min_Fields>
}

/** aggregate fields of "platyplus.tables" */
export type Platyplus_Tables_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Platyplus_Tables_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Platyplus_Tables_Append_Input = {
  metadata: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "platyplus.tables". All fields are combined with a logical 'AND'. */
export type Platyplus_Tables_Bool_Exp = {
  _and: Maybe<Array<Platyplus_Tables_Bool_Exp>>
  _not: Maybe<Platyplus_Tables_Bool_Exp>
  _or: Maybe<Array<Platyplus_Tables_Bool_Exp>>
  columns: Maybe<Platyplus_Columns_Bool_Exp>
  config: Maybe<Platyplus_Table_Config_Bool_Exp>
  deleted: Maybe<Boolean_Comparison_Exp>
  dependentForeignKeys: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
  foreignKeys: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
  id: Maybe<String_Comparison_Exp>
  metadata: Maybe<Jsonb_Comparison_Exp>
  primaryKey: Maybe<Platyplus_Primary_Keys_Bool_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "platyplus.tables" */
export enum Platyplus_Tables_Constraint {
  /** unique or primary key constraint */
  TablesPkey = 'tables_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Platyplus_Tables_Delete_At_Path_Input = {
  metadata: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Platyplus_Tables_Delete_Elem_Input = {
  metadata: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Platyplus_Tables_Delete_Key_Input = {
  metadata: Maybe<Scalars['String']>
}

/** input type for inserting data into table "platyplus.tables" */
export type Platyplus_Tables_Insert_Input = {
  columns: Maybe<Platyplus_Columns_Arr_Rel_Insert_Input>
  config: Maybe<Platyplus_Table_Config_Obj_Rel_Insert_Input>
  deleted: Maybe<Scalars['Boolean']>
  dependentForeignKeys: Maybe<Platyplus_Foreign_Keys_Arr_Rel_Insert_Input>
  foreignKeys: Maybe<Platyplus_Foreign_Keys_Arr_Rel_Insert_Input>
  id: Maybe<Scalars['String']>
  metadata: Maybe<Scalars['jsonb']>
  primaryKey: Maybe<Platyplus_Primary_Keys_Obj_Rel_Insert_Input>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Platyplus_Tables_Max_Fields = {
  __typename?: 'platyplus_tables_max_fields'
  id: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Platyplus_Tables_Min_Fields = {
  __typename?: 'platyplus_tables_min_fields'
  id: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "platyplus.tables" */
export type Platyplus_Tables_Mutation_Response = {
  __typename?: 'platyplus_tables_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Platyplus_Tables>
}

/** on conflict condition type for table "platyplus.tables" */
export type Platyplus_Tables_On_Conflict = {
  constraint: Platyplus_Tables_Constraint
  update_columns: Array<Platyplus_Tables_Update_Column>
  where: Maybe<Platyplus_Tables_Bool_Exp>
}

/** Ordering options when selecting data from "platyplus.tables". */
export type Platyplus_Tables_Order_By = {
  columns_aggregate: Maybe<Platyplus_Columns_Aggregate_Order_By>
  config: Maybe<Platyplus_Table_Config_Order_By>
  deleted: Maybe<Order_By>
  dependentForeignKeys_aggregate: Maybe<Platyplus_Foreign_Keys_Aggregate_Order_By>
  foreignKeys_aggregate: Maybe<Platyplus_Foreign_Keys_Aggregate_Order_By>
  id: Maybe<Order_By>
  metadata: Maybe<Order_By>
  primaryKey: Maybe<Platyplus_Primary_Keys_Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: platyplus_tables */
export type Platyplus_Tables_Pk_Columns_Input = {
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Platyplus_Tables_Prepend_Input = {
  metadata: Maybe<Scalars['jsonb']>
}

/** select columns of table "platyplus.tables" */
export enum Platyplus_Tables_Select_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "platyplus.tables" */
export type Platyplus_Tables_Set_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['String']>
  metadata: Maybe<Scalars['jsonb']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "platyplus.tables" */
export enum Platyplus_Tables_Update_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "proprietaire" */
export type Proprietaire = {
  __typename?: 'proprietaire'
  deleted: Scalars['Boolean']
  id: Scalars['uuid']
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "proprietaire" */
export type Proprietaire_Aggregate = {
  __typename?: 'proprietaire_aggregate'
  aggregate: Maybe<Proprietaire_Aggregate_Fields>
  nodes: Array<Proprietaire>
}

/** aggregate fields of "proprietaire" */
export type Proprietaire_Aggregate_Fields = {
  __typename?: 'proprietaire_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Proprietaire_Max_Fields>
  min: Maybe<Proprietaire_Min_Fields>
}

/** aggregate fields of "proprietaire" */
export type Proprietaire_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Proprietaire_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "proprietaire". All fields are combined with a logical 'AND'. */
export type Proprietaire_Bool_Exp = {
  _and: Maybe<Array<Proprietaire_Bool_Exp>>
  _not: Maybe<Proprietaire_Bool_Exp>
  _or: Maybe<Array<Proprietaire_Bool_Exp>>
  deleted: Maybe<Boolean_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "proprietaire" */
export enum Proprietaire_Constraint {
  /** unique or primary key constraint */
  ProprietairePkey = 'proprietaire_pkey'
}

/** input type for inserting data into table "proprietaire" */
export type Proprietaire_Insert_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Proprietaire_Max_Fields = {
  __typename?: 'proprietaire_max_fields'
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Proprietaire_Min_Fields = {
  __typename?: 'proprietaire_min_fields'
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "proprietaire" */
export type Proprietaire_Mutation_Response = {
  __typename?: 'proprietaire_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Proprietaire>
}

/** input type for inserting object relation for remote table "proprietaire" */
export type Proprietaire_Obj_Rel_Insert_Input = {
  data: Proprietaire_Insert_Input
  /** on conflict condition */
  on_conflict: Maybe<Proprietaire_On_Conflict>
}

/** on conflict condition type for table "proprietaire" */
export type Proprietaire_On_Conflict = {
  constraint: Proprietaire_Constraint
  update_columns: Array<Proprietaire_Update_Column>
  where: Maybe<Proprietaire_Bool_Exp>
}

/** Ordering options when selecting data from "proprietaire". */
export type Proprietaire_Order_By = {
  deleted: Maybe<Order_By>
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: proprietaire */
export type Proprietaire_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "proprietaire" */
export enum Proprietaire_Select_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "proprietaire" */
export type Proprietaire_Set_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "proprietaire" */
export enum Proprietaire_Update_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Query_Root = {
  __typename?: 'query_root'
  /** fetch data from the table: "auth.account_providers" */
  auth_account_providers: Array<Auth_Account_Providers>
  /** fetch aggregated fields from the table: "auth.account_providers" */
  auth_account_providers_aggregate: Auth_Account_Providers_Aggregate
  /** fetch data from the table: "auth.account_providers" using primary key columns */
  auth_account_providers_by_pk: Maybe<Auth_Account_Providers>
  /** fetch data from the table: "auth.account_roles" */
  auth_account_roles: Array<Auth_Account_Roles>
  /** fetch aggregated fields from the table: "auth.account_roles" */
  auth_account_roles_aggregate: Auth_Account_Roles_Aggregate
  /** fetch data from the table: "auth.account_roles" using primary key columns */
  auth_account_roles_by_pk: Maybe<Auth_Account_Roles>
  /** fetch data from the table: "auth.accounts" */
  auth_accounts: Array<Auth_Accounts>
  /** fetch aggregated fields from the table: "auth.accounts" */
  auth_accounts_aggregate: Auth_Accounts_Aggregate
  /** fetch data from the table: "auth.accounts" using primary key columns */
  auth_accounts_by_pk: Maybe<Auth_Accounts>
  /** fetch data from the table: "auth.migrations" */
  auth_migrations: Array<Auth_Migrations>
  /** fetch aggregated fields from the table: "auth.migrations" */
  auth_migrations_aggregate: Auth_Migrations_Aggregate
  /** fetch data from the table: "auth.migrations" using primary key columns */
  auth_migrations_by_pk: Maybe<Auth_Migrations>
  /** fetch data from the table: "auth.providers" */
  auth_providers: Array<Auth_Providers>
  /** fetch aggregated fields from the table: "auth.providers" */
  auth_providers_aggregate: Auth_Providers_Aggregate
  /** fetch data from the table: "auth.providers" using primary key columns */
  auth_providers_by_pk: Maybe<Auth_Providers>
  /** fetch data from the table: "auth.refresh_tokens" */
  auth_refresh_tokens: Array<Auth_Refresh_Tokens>
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  auth_refresh_tokens_aggregate: Auth_Refresh_Tokens_Aggregate
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  auth_refresh_tokens_by_pk: Maybe<Auth_Refresh_Tokens>
  /** fetch data from the table: "auth.roles" */
  auth_roles: Array<Auth_Roles>
  /** fetch aggregated fields from the table: "auth.roles" */
  auth_roles_aggregate: Auth_Roles_Aggregate
  /** fetch data from the table: "auth.roles" using primary key columns */
  auth_roles_by_pk: Maybe<Auth_Roles>
  /** fetch data from the table: "bidon" */
  bidon: Array<Bidon>
  /** fetch aggregated fields from the table: "bidon" */
  bidon_aggregate: Bidon_Aggregate
  /** fetch data from the table: "bidon" using primary key columns */
  bidon_by_pk: Maybe<Bidon>
  /** fetch data from the table: "dew" */
  dew: Array<Dew>
  /** fetch aggregated fields from the table: "dew" */
  dew_aggregate: Dew_Aggregate
  /** fetch data from the table: "dew" using primary key columns */
  dew_by_pk: Maybe<Dew>
  /** fetch data from the table: "platyplus.app_config" */
  platyplus_app_config: Array<Platyplus_App_Config>
  /** fetch aggregated fields from the table: "platyplus.app_config" */
  platyplus_app_config_aggregate: Platyplus_App_Config_Aggregate
  /** fetch data from the table: "platyplus.app_config" using primary key columns */
  platyplus_app_config_by_pk: Maybe<Platyplus_App_Config>
  /** fetch data from the table: "platyplus.columns" */
  platyplus_columns: Array<Platyplus_Columns>
  /** fetch aggregated fields from the table: "platyplus.columns" */
  platyplus_columns_aggregate: Platyplus_Columns_Aggregate
  /** fetch data from the table: "platyplus.foreign_keys" */
  platyplus_foreign_keys: Array<Platyplus_Foreign_Keys>
  /** fetch aggregated fields from the table: "platyplus.foreign_keys" */
  platyplus_foreign_keys_aggregate: Platyplus_Foreign_Keys_Aggregate
  /** fetch data from the table: "platyplus.primary_keys" */
  platyplus_primary_keys: Array<Platyplus_Primary_Keys>
  /** fetch aggregated fields from the table: "platyplus.primary_keys" */
  platyplus_primary_keys_aggregate: Platyplus_Primary_Keys_Aggregate
  /** fetch data from the table: "platyplus.property_config" */
  platyplus_property_config: Array<Platyplus_Property_Config>
  /** fetch aggregated fields from the table: "platyplus.property_config" */
  platyplus_property_config_aggregate: Platyplus_Property_Config_Aggregate
  /** fetch data from the table: "platyplus.property_config" using primary key columns */
  platyplus_property_config_by_pk: Maybe<Platyplus_Property_Config>
  /** fetch data from the table: "platyplus.table_config" */
  platyplus_table_config: Array<Platyplus_Table_Config>
  /** fetch aggregated fields from the table: "platyplus.table_config" */
  platyplus_table_config_aggregate: Platyplus_Table_Config_Aggregate
  /** fetch data from the table: "platyplus.table_config" using primary key columns */
  platyplus_table_config_by_pk: Maybe<Platyplus_Table_Config>
  /** fetch data from the table: "platyplus.tables" */
  platyplus_tables: Array<Platyplus_Tables>
  /** fetch aggregated fields from the table: "platyplus.tables" */
  platyplus_tables_aggregate: Platyplus_Tables_Aggregate
  /** fetch data from the table: "platyplus.tables" using primary key columns */
  platyplus_tables_by_pk: Maybe<Platyplus_Tables>
  /** fetch data from the table: "proprietaire" */
  proprietaire: Array<Proprietaire>
  /** fetch aggregated fields from the table: "proprietaire" */
  proprietaire_aggregate: Proprietaire_Aggregate
  /** fetch data from the table: "proprietaire" using primary key columns */
  proprietaire_by_pk: Maybe<Proprietaire>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>
}

export type Query_RootAuth_Account_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

export type Query_RootAuth_Account_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

export type Query_RootAuth_Account_Providers_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootAuth_Account_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

export type Query_RootAuth_Account_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

export type Query_RootAuth_Account_Roles_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootAuth_AccountsArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

export type Query_RootAuth_Accounts_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

export type Query_RootAuth_Accounts_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootAuth_MigrationsArgs = {
  distinct_on: Maybe<Array<Auth_Migrations_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Migrations_Order_By>>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

export type Query_RootAuth_Migrations_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Migrations_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Migrations_Order_By>>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

export type Query_RootAuth_Migrations_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootAuth_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Providers_Order_By>>
  where: Maybe<Auth_Providers_Bool_Exp>
}

export type Query_RootAuth_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Providers_Order_By>>
  where: Maybe<Auth_Providers_Bool_Exp>
}

export type Query_RootAuth_Providers_By_PkArgs = {
  provider: Scalars['String']
}

export type Query_RootAuth_Refresh_TokensArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

export type Query_RootAuth_Refresh_Tokens_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

export type Query_RootAuth_Refresh_Tokens_By_PkArgs = {
  refresh_token: Scalars['uuid']
}

export type Query_RootAuth_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Roles_Order_By>>
  where: Maybe<Auth_Roles_Bool_Exp>
}

export type Query_RootAuth_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Roles_Order_By>>
  where: Maybe<Auth_Roles_Bool_Exp>
}

export type Query_RootAuth_Roles_By_PkArgs = {
  role: Scalars['String']
}

export type Query_RootBidonArgs = {
  distinct_on: Maybe<Array<Bidon_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Bidon_Order_By>>
  where: Maybe<Bidon_Bool_Exp>
}

export type Query_RootBidon_AggregateArgs = {
  distinct_on: Maybe<Array<Bidon_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Bidon_Order_By>>
  where: Maybe<Bidon_Bool_Exp>
}

export type Query_RootBidon_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootDewArgs = {
  distinct_on: Maybe<Array<Dew_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Dew_Order_By>>
  where: Maybe<Dew_Bool_Exp>
}

export type Query_RootDew_AggregateArgs = {
  distinct_on: Maybe<Array<Dew_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Dew_Order_By>>
  where: Maybe<Dew_Bool_Exp>
}

export type Query_RootDew_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPlatyplus_App_ConfigArgs = {
  distinct_on: Maybe<Array<Platyplus_App_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_App_Config_Order_By>>
  where: Maybe<Platyplus_App_Config_Bool_Exp>
}

export type Query_RootPlatyplus_App_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_App_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_App_Config_Order_By>>
  where: Maybe<Platyplus_App_Config_Bool_Exp>
}

export type Query_RootPlatyplus_App_Config_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPlatyplus_ColumnsArgs = {
  distinct_on: Maybe<Array<Platyplus_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Columns_Order_By>>
  where: Maybe<Platyplus_Columns_Bool_Exp>
}

export type Query_RootPlatyplus_Columns_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Columns_Order_By>>
  where: Maybe<Platyplus_Columns_Bool_Exp>
}

export type Query_RootPlatyplus_Foreign_KeysArgs = {
  distinct_on: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Foreign_Keys_Order_By>>
  where: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
}

export type Query_RootPlatyplus_Foreign_Keys_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Foreign_Keys_Order_By>>
  where: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
}

export type Query_RootPlatyplus_Primary_KeysArgs = {
  distinct_on: Maybe<Array<Platyplus_Primary_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Primary_Keys_Order_By>>
  where: Maybe<Platyplus_Primary_Keys_Bool_Exp>
}

export type Query_RootPlatyplus_Primary_Keys_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Primary_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Primary_Keys_Order_By>>
  where: Maybe<Platyplus_Primary_Keys_Bool_Exp>
}

export type Query_RootPlatyplus_Property_ConfigArgs = {
  distinct_on: Maybe<Array<Platyplus_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Property_Config_Order_By>>
  where: Maybe<Platyplus_Property_Config_Bool_Exp>
}

export type Query_RootPlatyplus_Property_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Property_Config_Order_By>>
  where: Maybe<Platyplus_Property_Config_Bool_Exp>
}

export type Query_RootPlatyplus_Property_Config_By_PkArgs = {
  id: Scalars['String']
}

export type Query_RootPlatyplus_Table_ConfigArgs = {
  distinct_on: Maybe<Array<Platyplus_Table_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Table_Config_Order_By>>
  where: Maybe<Platyplus_Table_Config_Bool_Exp>
}

export type Query_RootPlatyplus_Table_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Table_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Table_Config_Order_By>>
  where: Maybe<Platyplus_Table_Config_Bool_Exp>
}

export type Query_RootPlatyplus_Table_Config_By_PkArgs = {
  id: Scalars['String']
}

export type Query_RootPlatyplus_TablesArgs = {
  distinct_on: Maybe<Array<Platyplus_Tables_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Tables_Order_By>>
  where: Maybe<Platyplus_Tables_Bool_Exp>
}

export type Query_RootPlatyplus_Tables_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Tables_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Tables_Order_By>>
  where: Maybe<Platyplus_Tables_Bool_Exp>
}

export type Query_RootPlatyplus_Tables_By_PkArgs = {
  id: Scalars['String']
}

export type Query_RootProprietaireArgs = {
  distinct_on: Maybe<Array<Proprietaire_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Proprietaire_Order_By>>
  where: Maybe<Proprietaire_Bool_Exp>
}

export type Query_RootProprietaire_AggregateArgs = {
  distinct_on: Maybe<Array<Proprietaire_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Proprietaire_Order_By>>
  where: Maybe<Proprietaire_Bool_Exp>
}

export type Query_RootProprietaire_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootUsersArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Users_Order_By>>
  where: Maybe<Users_Bool_Exp>
}

export type Query_RootUsers_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Users_Order_By>>
  where: Maybe<Users_Bool_Exp>
}

export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "auth.account_providers" */
  auth_account_providers: Array<Auth_Account_Providers>
  /** fetch aggregated fields from the table: "auth.account_providers" */
  auth_account_providers_aggregate: Auth_Account_Providers_Aggregate
  /** fetch data from the table: "auth.account_providers" using primary key columns */
  auth_account_providers_by_pk: Maybe<Auth_Account_Providers>
  /** fetch data from the table: "auth.account_roles" */
  auth_account_roles: Array<Auth_Account_Roles>
  /** fetch aggregated fields from the table: "auth.account_roles" */
  auth_account_roles_aggregate: Auth_Account_Roles_Aggregate
  /** fetch data from the table: "auth.account_roles" using primary key columns */
  auth_account_roles_by_pk: Maybe<Auth_Account_Roles>
  /** fetch data from the table: "auth.accounts" */
  auth_accounts: Array<Auth_Accounts>
  /** fetch aggregated fields from the table: "auth.accounts" */
  auth_accounts_aggregate: Auth_Accounts_Aggregate
  /** fetch data from the table: "auth.accounts" using primary key columns */
  auth_accounts_by_pk: Maybe<Auth_Accounts>
  /** fetch data from the table: "auth.migrations" */
  auth_migrations: Array<Auth_Migrations>
  /** fetch aggregated fields from the table: "auth.migrations" */
  auth_migrations_aggregate: Auth_Migrations_Aggregate
  /** fetch data from the table: "auth.migrations" using primary key columns */
  auth_migrations_by_pk: Maybe<Auth_Migrations>
  /** fetch data from the table: "auth.providers" */
  auth_providers: Array<Auth_Providers>
  /** fetch aggregated fields from the table: "auth.providers" */
  auth_providers_aggregate: Auth_Providers_Aggregate
  /** fetch data from the table: "auth.providers" using primary key columns */
  auth_providers_by_pk: Maybe<Auth_Providers>
  /** fetch data from the table: "auth.refresh_tokens" */
  auth_refresh_tokens: Array<Auth_Refresh_Tokens>
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  auth_refresh_tokens_aggregate: Auth_Refresh_Tokens_Aggregate
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  auth_refresh_tokens_by_pk: Maybe<Auth_Refresh_Tokens>
  /** fetch data from the table: "auth.roles" */
  auth_roles: Array<Auth_Roles>
  /** fetch aggregated fields from the table: "auth.roles" */
  auth_roles_aggregate: Auth_Roles_Aggregate
  /** fetch data from the table: "auth.roles" using primary key columns */
  auth_roles_by_pk: Maybe<Auth_Roles>
  /** fetch data from the table: "bidon" */
  bidon: Array<Bidon>
  /** fetch aggregated fields from the table: "bidon" */
  bidon_aggregate: Bidon_Aggregate
  /** fetch data from the table: "bidon" using primary key columns */
  bidon_by_pk: Maybe<Bidon>
  /** fetch data from the table: "dew" */
  dew: Array<Dew>
  /** fetch aggregated fields from the table: "dew" */
  dew_aggregate: Dew_Aggregate
  /** fetch data from the table: "dew" using primary key columns */
  dew_by_pk: Maybe<Dew>
  /** fetch data from the table: "platyplus.app_config" */
  platyplus_app_config: Array<Platyplus_App_Config>
  /** fetch aggregated fields from the table: "platyplus.app_config" */
  platyplus_app_config_aggregate: Platyplus_App_Config_Aggregate
  /** fetch data from the table: "platyplus.app_config" using primary key columns */
  platyplus_app_config_by_pk: Maybe<Platyplus_App_Config>
  /** fetch data from the table: "platyplus.columns" */
  platyplus_columns: Array<Platyplus_Columns>
  /** fetch aggregated fields from the table: "platyplus.columns" */
  platyplus_columns_aggregate: Platyplus_Columns_Aggregate
  /** fetch data from the table: "platyplus.foreign_keys" */
  platyplus_foreign_keys: Array<Platyplus_Foreign_Keys>
  /** fetch aggregated fields from the table: "platyplus.foreign_keys" */
  platyplus_foreign_keys_aggregate: Platyplus_Foreign_Keys_Aggregate
  /** fetch data from the table: "platyplus.primary_keys" */
  platyplus_primary_keys: Array<Platyplus_Primary_Keys>
  /** fetch aggregated fields from the table: "platyplus.primary_keys" */
  platyplus_primary_keys_aggregate: Platyplus_Primary_Keys_Aggregate
  /** fetch data from the table: "platyplus.property_config" */
  platyplus_property_config: Array<Platyplus_Property_Config>
  /** fetch aggregated fields from the table: "platyplus.property_config" */
  platyplus_property_config_aggregate: Platyplus_Property_Config_Aggregate
  /** fetch data from the table: "platyplus.property_config" using primary key columns */
  platyplus_property_config_by_pk: Maybe<Platyplus_Property_Config>
  /** fetch data from the table: "platyplus.table_config" */
  platyplus_table_config: Array<Platyplus_Table_Config>
  /** fetch aggregated fields from the table: "platyplus.table_config" */
  platyplus_table_config_aggregate: Platyplus_Table_Config_Aggregate
  /** fetch data from the table: "platyplus.table_config" using primary key columns */
  platyplus_table_config_by_pk: Maybe<Platyplus_Table_Config>
  /** fetch data from the table: "platyplus.tables" */
  platyplus_tables: Array<Platyplus_Tables>
  /** fetch aggregated fields from the table: "platyplus.tables" */
  platyplus_tables_aggregate: Platyplus_Tables_Aggregate
  /** fetch data from the table: "platyplus.tables" using primary key columns */
  platyplus_tables_by_pk: Maybe<Platyplus_Tables>
  /** fetch data from the table: "proprietaire" */
  proprietaire: Array<Proprietaire>
  /** fetch aggregated fields from the table: "proprietaire" */
  proprietaire_aggregate: Proprietaire_Aggregate
  /** fetch data from the table: "proprietaire" using primary key columns */
  proprietaire_by_pk: Maybe<Proprietaire>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>
}

export type Subscription_RootAuth_Account_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

export type Subscription_RootAuth_Account_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

export type Subscription_RootAuth_Account_Providers_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootAuth_Account_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

export type Subscription_RootAuth_Account_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

export type Subscription_RootAuth_Account_Roles_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootAuth_AccountsArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

export type Subscription_RootAuth_Accounts_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

export type Subscription_RootAuth_Accounts_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootAuth_MigrationsArgs = {
  distinct_on: Maybe<Array<Auth_Migrations_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Migrations_Order_By>>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

export type Subscription_RootAuth_Migrations_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Migrations_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Migrations_Order_By>>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

export type Subscription_RootAuth_Migrations_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootAuth_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Providers_Order_By>>
  where: Maybe<Auth_Providers_Bool_Exp>
}

export type Subscription_RootAuth_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Providers_Order_By>>
  where: Maybe<Auth_Providers_Bool_Exp>
}

export type Subscription_RootAuth_Providers_By_PkArgs = {
  provider: Scalars['String']
}

export type Subscription_RootAuth_Refresh_TokensArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

export type Subscription_RootAuth_Refresh_Tokens_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

export type Subscription_RootAuth_Refresh_Tokens_By_PkArgs = {
  refresh_token: Scalars['uuid']
}

export type Subscription_RootAuth_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Roles_Order_By>>
  where: Maybe<Auth_Roles_Bool_Exp>
}

export type Subscription_RootAuth_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Roles_Order_By>>
  where: Maybe<Auth_Roles_Bool_Exp>
}

export type Subscription_RootAuth_Roles_By_PkArgs = {
  role: Scalars['String']
}

export type Subscription_RootBidonArgs = {
  distinct_on: Maybe<Array<Bidon_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Bidon_Order_By>>
  where: Maybe<Bidon_Bool_Exp>
}

export type Subscription_RootBidon_AggregateArgs = {
  distinct_on: Maybe<Array<Bidon_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Bidon_Order_By>>
  where: Maybe<Bidon_Bool_Exp>
}

export type Subscription_RootBidon_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootDewArgs = {
  distinct_on: Maybe<Array<Dew_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Dew_Order_By>>
  where: Maybe<Dew_Bool_Exp>
}

export type Subscription_RootDew_AggregateArgs = {
  distinct_on: Maybe<Array<Dew_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Dew_Order_By>>
  where: Maybe<Dew_Bool_Exp>
}

export type Subscription_RootDew_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPlatyplus_App_ConfigArgs = {
  distinct_on: Maybe<Array<Platyplus_App_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_App_Config_Order_By>>
  where: Maybe<Platyplus_App_Config_Bool_Exp>
}

export type Subscription_RootPlatyplus_App_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_App_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_App_Config_Order_By>>
  where: Maybe<Platyplus_App_Config_Bool_Exp>
}

export type Subscription_RootPlatyplus_App_Config_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPlatyplus_ColumnsArgs = {
  distinct_on: Maybe<Array<Platyplus_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Columns_Order_By>>
  where: Maybe<Platyplus_Columns_Bool_Exp>
}

export type Subscription_RootPlatyplus_Columns_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Columns_Order_By>>
  where: Maybe<Platyplus_Columns_Bool_Exp>
}

export type Subscription_RootPlatyplus_Foreign_KeysArgs = {
  distinct_on: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Foreign_Keys_Order_By>>
  where: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
}

export type Subscription_RootPlatyplus_Foreign_Keys_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Foreign_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Foreign_Keys_Order_By>>
  where: Maybe<Platyplus_Foreign_Keys_Bool_Exp>
}

export type Subscription_RootPlatyplus_Primary_KeysArgs = {
  distinct_on: Maybe<Array<Platyplus_Primary_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Primary_Keys_Order_By>>
  where: Maybe<Platyplus_Primary_Keys_Bool_Exp>
}

export type Subscription_RootPlatyplus_Primary_Keys_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Primary_Keys_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Primary_Keys_Order_By>>
  where: Maybe<Platyplus_Primary_Keys_Bool_Exp>
}

export type Subscription_RootPlatyplus_Property_ConfigArgs = {
  distinct_on: Maybe<Array<Platyplus_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Property_Config_Order_By>>
  where: Maybe<Platyplus_Property_Config_Bool_Exp>
}

export type Subscription_RootPlatyplus_Property_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Property_Config_Order_By>>
  where: Maybe<Platyplus_Property_Config_Bool_Exp>
}

export type Subscription_RootPlatyplus_Property_Config_By_PkArgs = {
  id: Scalars['String']
}

export type Subscription_RootPlatyplus_Table_ConfigArgs = {
  distinct_on: Maybe<Array<Platyplus_Table_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Table_Config_Order_By>>
  where: Maybe<Platyplus_Table_Config_Bool_Exp>
}

export type Subscription_RootPlatyplus_Table_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Table_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Table_Config_Order_By>>
  where: Maybe<Platyplus_Table_Config_Bool_Exp>
}

export type Subscription_RootPlatyplus_Table_Config_By_PkArgs = {
  id: Scalars['String']
}

export type Subscription_RootPlatyplus_TablesArgs = {
  distinct_on: Maybe<Array<Platyplus_Tables_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Tables_Order_By>>
  where: Maybe<Platyplus_Tables_Bool_Exp>
}

export type Subscription_RootPlatyplus_Tables_AggregateArgs = {
  distinct_on: Maybe<Array<Platyplus_Tables_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Platyplus_Tables_Order_By>>
  where: Maybe<Platyplus_Tables_Bool_Exp>
}

export type Subscription_RootPlatyplus_Tables_By_PkArgs = {
  id: Scalars['String']
}

export type Subscription_RootProprietaireArgs = {
  distinct_on: Maybe<Array<Proprietaire_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Proprietaire_Order_By>>
  where: Maybe<Proprietaire_Bool_Exp>
}

export type Subscription_RootProprietaire_AggregateArgs = {
  distinct_on: Maybe<Array<Proprietaire_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Proprietaire_Order_By>>
  where: Maybe<Proprietaire_Bool_Exp>
}

export type Subscription_RootProprietaire_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootUsersArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Users_Order_By>>
  where: Maybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Users_Order_By>>
  where: Maybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']
}

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq: Maybe<Scalars['timestamp']>
  _gt: Maybe<Scalars['timestamp']>
  _gte: Maybe<Scalars['timestamp']>
  _in: Maybe<Array<Scalars['timestamp']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['timestamp']>
  _lte: Maybe<Scalars['timestamp']>
  _neq: Maybe<Scalars['timestamp']>
  _nin: Maybe<Array<Scalars['timestamp']>>
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq: Maybe<Scalars['timestamptz']>
  _gt: Maybe<Scalars['timestamptz']>
  _gte: Maybe<Scalars['timestamptz']>
  _in: Maybe<Array<Scalars['timestamptz']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['timestamptz']>
  _lte: Maybe<Scalars['timestamptz']>
  _neq: Maybe<Scalars['timestamptz']>
  _nin: Maybe<Array<Scalars['timestamptz']>>
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users'
  /** An object relationship */
  account: Maybe<Auth_Accounts>
  avatar_url: Maybe<Scalars['String']>
  created_at: Scalars['timestamptz']
  display_name: Maybe<Scalars['String']>
  id: Scalars['uuid']
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate'
  aggregate: Maybe<Users_Aggregate_Fields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields'
  count: Scalars['Int']
  max: Maybe<Users_Max_Fields>
  min: Maybe<Users_Min_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Users_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and: Maybe<Array<Users_Bool_Exp>>
  _not: Maybe<Users_Bool_Exp>
  _or: Maybe<Array<Users_Bool_Exp>>
  account: Maybe<Auth_Accounts_Bool_Exp>
  avatar_url: Maybe<String_Comparison_Exp>
  created_at: Maybe<Timestamptz_Comparison_Exp>
  display_name: Maybe<String_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  account: Maybe<Auth_Accounts_Obj_Rel_Insert_Input>
  avatar_url: Maybe<Scalars['String']>
  created_at: Maybe<Scalars['timestamptz']>
  display_name: Maybe<Scalars['String']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields'
  avatar_url: Maybe<Scalars['String']>
  created_at: Maybe<Scalars['timestamptz']>
  display_name: Maybe<Scalars['String']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields'
  avatar_url: Maybe<Scalars['String']>
  created_at: Maybe<Scalars['timestamptz']>
  display_name: Maybe<Scalars['String']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  /** on conflict condition */
  on_conflict: Maybe<Users_On_Conflict>
}

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns: Array<Users_Update_Column>
  where: Maybe<Users_Bool_Exp>
}

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  account: Maybe<Auth_Accounts_Order_By>
  avatar_url: Maybe<Order_By>
  created_at: Maybe<Order_By>
  display_name: Maybe<Order_By>
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AvatarUrl = 'avatar_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  avatar_url: Maybe<Scalars['String']>
  created_at: Maybe<Scalars['timestamptz']>
  display_name: Maybe<Scalars['String']>
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  AvatarUrl = 'avatar_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq: Maybe<Scalars['uuid']>
  _gt: Maybe<Scalars['uuid']>
  _gte: Maybe<Scalars['uuid']>
  _in: Maybe<Array<Scalars['uuid']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['uuid']>
  _lte: Maybe<Scalars['uuid']>
  _neq: Maybe<Scalars['uuid']>
  _nin: Maybe<Array<Scalars['uuid']>>
}

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
