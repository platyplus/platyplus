/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */
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
  bigint: any
  citext: string
  date: any
  json: Record<string, unknown>
  jsonb: Record<string, unknown>
  name: string
  numeric: any
  smallint: number
  timestamp: any
  timestamptz: Date
  uuid: string
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
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

/** expression to compare columns of type Float. All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq: Maybe<Scalars['Float']>
  _gt: Maybe<Scalars['Float']>
  _gte: Maybe<Scalars['Float']>
  _in: Maybe<Array<Scalars['Float']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['Float']>
  _lte: Maybe<Scalars['Float']>
  _neq: Maybe<Scalars['Float']>
  _nin: Maybe<Array<Scalars['Float']>>
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
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

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq: Maybe<Scalars['String']>
  _gt: Maybe<Scalars['String']>
  _gte: Maybe<Scalars['String']>
  _ilike: Maybe<Scalars['String']>
  _in: Maybe<Array<Scalars['String']>>
  _is_null: Maybe<Scalars['Boolean']>
  _like: Maybe<Scalars['String']>
  _lt: Maybe<Scalars['String']>
  _lte: Maybe<Scalars['String']>
  _neq: Maybe<Scalars['String']>
  _nilike: Maybe<Scalars['String']>
  _nin: Maybe<Array<Scalars['String']>>
  _nlike: Maybe<Scalars['String']>
  _nsimilar: Maybe<Scalars['String']>
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
  count: Maybe<Scalars['Int']>
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
  on_conflict: Maybe<Auth_Account_Providers_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.account_providers". All fields are combined with a logical 'AND'. */
export type Auth_Account_Providers_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Account_Providers_Bool_Exp>>>
  _not: Maybe<Auth_Account_Providers_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Account_Providers_Bool_Exp>>>
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Account_Providers>
}

/** input type for inserting object relation for remote table "auth.account_providers" */
export type Auth_Account_Providers_Obj_Rel_Insert_Input = {
  data: Auth_Account_Providers_Insert_Input
  on_conflict: Maybe<Auth_Account_Providers_On_Conflict>
}

/** on conflict condition type for table "auth.account_providers" */
export type Auth_Account_Providers_On_Conflict = {
  constraint: Auth_Account_Providers_Constraint
  update_columns: Array<Auth_Account_Providers_Update_Column>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** ordering options when selecting data from "auth.account_providers" */
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

/** primary key columns input for table: "auth.account_providers" */
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
  count: Maybe<Scalars['Int']>
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
  on_conflict: Maybe<Auth_Account_Roles_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.account_roles". All fields are combined with a logical 'AND'. */
export type Auth_Account_Roles_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Account_Roles_Bool_Exp>>>
  _not: Maybe<Auth_Account_Roles_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Account_Roles_Bool_Exp>>>
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Account_Roles>
}

/** input type for inserting object relation for remote table "auth.account_roles" */
export type Auth_Account_Roles_Obj_Rel_Insert_Input = {
  data: Auth_Account_Roles_Insert_Input
  on_conflict: Maybe<Auth_Account_Roles_On_Conflict>
}

/** on conflict condition type for table "auth.account_roles" */
export type Auth_Account_Roles_On_Conflict = {
  constraint: Auth_Account_Roles_Constraint
  update_columns: Array<Auth_Account_Roles_Update_Column>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** ordering options when selecting data from "auth.account_roles" */
export type Auth_Account_Roles_Order_By = {
  account: Maybe<Auth_Accounts_Order_By>
  account_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  id: Maybe<Order_By>
  role: Maybe<Order_By>
  roleByRole: Maybe<Auth_Roles_Order_By>
}

/** primary key columns input for table: "auth.account_roles" */
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
  /** An aggregated array relationship */
  account_providers_aggregate: Auth_Account_Providers_Aggregate
  /** An array relationship */
  account_roles: Array<Auth_Account_Roles>
  /** An aggregated array relationship */
  account_roles_aggregate: Auth_Account_Roles_Aggregate
  active: Scalars['Boolean']
  created_at: Scalars['timestamptz']
  custom_register_data: Maybe<Scalars['jsonb']>
  default_role: Scalars['String']
  email: Maybe<Scalars['citext']>
  id: Scalars['uuid']
  is_anonymous: Scalars['Boolean']
  last_confirmation_email_sent_at: Scalars['timestamptz']
  locale: Scalars['String']
  mfa_enabled: Scalars['Boolean']
  new_email: Maybe<Scalars['citext']>
  otp_secret: Maybe<Scalars['String']>
  password_hash: Maybe<Scalars['String']>
  /** An array relationship */
  refresh_tokens: Array<Auth_Refresh_Tokens>
  /** An aggregated array relationship */
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
  count: Maybe<Scalars['Int']>
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
  on_conflict: Maybe<Auth_Accounts_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.accounts". All fields are combined with a logical 'AND'. */
export type Auth_Accounts_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Accounts_Bool_Exp>>>
  _not: Maybe<Auth_Accounts_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Accounts_Bool_Exp>>>
  account_providers: Maybe<Auth_Account_Providers_Bool_Exp>
  account_roles: Maybe<Auth_Account_Roles_Bool_Exp>
  active: Maybe<Boolean_Comparison_Exp>
  created_at: Maybe<Timestamptz_Comparison_Exp>
  custom_register_data: Maybe<Jsonb_Comparison_Exp>
  default_role: Maybe<String_Comparison_Exp>
  email: Maybe<Citext_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  is_anonymous: Maybe<Boolean_Comparison_Exp>
  last_confirmation_email_sent_at: Maybe<Timestamptz_Comparison_Exp>
  locale: Maybe<String_Comparison_Exp>
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
  custom_register_data: Maybe<Array<Maybe<Scalars['String']>>>
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
  last_confirmation_email_sent_at: Maybe<Scalars['timestamptz']>
  locale: Maybe<Scalars['String']>
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
  last_confirmation_email_sent_at: Maybe<Scalars['timestamptz']>
  locale: Maybe<Scalars['String']>
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
  last_confirmation_email_sent_at: Maybe<Order_By>
  locale: Maybe<Order_By>
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
  last_confirmation_email_sent_at: Maybe<Scalars['timestamptz']>
  locale: Maybe<Scalars['String']>
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
  last_confirmation_email_sent_at: Maybe<Order_By>
  locale: Maybe<Order_By>
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Accounts>
}

/** input type for inserting object relation for remote table "auth.accounts" */
export type Auth_Accounts_Obj_Rel_Insert_Input = {
  data: Auth_Accounts_Insert_Input
  on_conflict: Maybe<Auth_Accounts_On_Conflict>
}

/** on conflict condition type for table "auth.accounts" */
export type Auth_Accounts_On_Conflict = {
  constraint: Auth_Accounts_Constraint
  update_columns: Array<Auth_Accounts_Update_Column>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

/** ordering options when selecting data from "auth.accounts" */
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
  last_confirmation_email_sent_at: Maybe<Order_By>
  locale: Maybe<Order_By>
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

/** primary key columns input for table: "auth.accounts" */
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
  LastConfirmationEmailSentAt = 'last_confirmation_email_sent_at',
  /** column name */
  Locale = 'locale',
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
  last_confirmation_email_sent_at: Maybe<Scalars['timestamptz']>
  locale: Maybe<Scalars['String']>
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
  LastConfirmationEmailSentAt = 'last_confirmation_email_sent_at',
  /** column name */
  Locale = 'locale',
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

/** columns and relationships of "auth.email_templates" */
export type Auth_Email_Templates = {
  __typename?: 'auth_email_templates'
  html: Scalars['String']
  id: Scalars['String']
  locale: Scalars['String']
  no_html: Scalars['String']
  title: Scalars['String']
}

/** aggregated selection of "auth.email_templates" */
export type Auth_Email_Templates_Aggregate = {
  __typename?: 'auth_email_templates_aggregate'
  aggregate: Maybe<Auth_Email_Templates_Aggregate_Fields>
  nodes: Array<Auth_Email_Templates>
}

/** aggregate fields of "auth.email_templates" */
export type Auth_Email_Templates_Aggregate_Fields = {
  __typename?: 'auth_email_templates_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Auth_Email_Templates_Max_Fields>
  min: Maybe<Auth_Email_Templates_Min_Fields>
}

/** aggregate fields of "auth.email_templates" */
export type Auth_Email_Templates_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Email_Templates_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.email_templates" */
export type Auth_Email_Templates_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Email_Templates_Max_Order_By>
  min: Maybe<Auth_Email_Templates_Min_Order_By>
}

/** input type for inserting array relation for remote table "auth.email_templates" */
export type Auth_Email_Templates_Arr_Rel_Insert_Input = {
  data: Array<Auth_Email_Templates_Insert_Input>
  on_conflict: Maybe<Auth_Email_Templates_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.email_templates". All fields are combined with a logical 'AND'. */
export type Auth_Email_Templates_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Email_Templates_Bool_Exp>>>
  _not: Maybe<Auth_Email_Templates_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Email_Templates_Bool_Exp>>>
  html: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  locale: Maybe<String_Comparison_Exp>
  no_html: Maybe<String_Comparison_Exp>
  title: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.email_templates" */
export enum Auth_Email_Templates_Constraint {
  /** unique or primary key constraint */
  EmailTemplatesPkey = 'email_templates_pkey'
}

/** input type for inserting data into table "auth.email_templates" */
export type Auth_Email_Templates_Insert_Input = {
  html: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
  no_html: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Auth_Email_Templates_Max_Fields = {
  __typename?: 'auth_email_templates_max_fields'
  html: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
  no_html: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
}

/** order by max() on columns of table "auth.email_templates" */
export type Auth_Email_Templates_Max_Order_By = {
  html: Maybe<Order_By>
  id: Maybe<Order_By>
  locale: Maybe<Order_By>
  no_html: Maybe<Order_By>
  title: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Email_Templates_Min_Fields = {
  __typename?: 'auth_email_templates_min_fields'
  html: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
  no_html: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.email_templates" */
export type Auth_Email_Templates_Min_Order_By = {
  html: Maybe<Order_By>
  id: Maybe<Order_By>
  locale: Maybe<Order_By>
  no_html: Maybe<Order_By>
  title: Maybe<Order_By>
}

/** response of any mutation on the table "auth.email_templates" */
export type Auth_Email_Templates_Mutation_Response = {
  __typename?: 'auth_email_templates_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Email_Templates>
}

/** input type for inserting object relation for remote table "auth.email_templates" */
export type Auth_Email_Templates_Obj_Rel_Insert_Input = {
  data: Auth_Email_Templates_Insert_Input
  on_conflict: Maybe<Auth_Email_Templates_On_Conflict>
}

/** on conflict condition type for table "auth.email_templates" */
export type Auth_Email_Templates_On_Conflict = {
  constraint: Auth_Email_Templates_Constraint
  update_columns: Array<Auth_Email_Templates_Update_Column>
  where: Maybe<Auth_Email_Templates_Bool_Exp>
}

/** ordering options when selecting data from "auth.email_templates" */
export type Auth_Email_Templates_Order_By = {
  html: Maybe<Order_By>
  id: Maybe<Order_By>
  locale: Maybe<Order_By>
  no_html: Maybe<Order_By>
  title: Maybe<Order_By>
}

/** primary key columns input for table: "auth.email_templates" */
export type Auth_Email_Templates_Pk_Columns_Input = {
  id: Scalars['String']
  locale: Scalars['String']
}

/** select columns of table "auth.email_templates" */
export enum Auth_Email_Templates_Select_Column {
  /** column name */
  Html = 'html',
  /** column name */
  Id = 'id',
  /** column name */
  Locale = 'locale',
  /** column name */
  NoHtml = 'no_html',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "auth.email_templates" */
export type Auth_Email_Templates_Set_Input = {
  html: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  locale: Maybe<Scalars['String']>
  no_html: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
}

/** update columns of table "auth.email_templates" */
export enum Auth_Email_Templates_Update_Column {
  /** column name */
  Html = 'html',
  /** column name */
  Id = 'id',
  /** column name */
  Locale = 'locale',
  /** column name */
  NoHtml = 'no_html',
  /** column name */
  Title = 'title'
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
  count: Maybe<Scalars['Int']>
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

/** order by aggregate values of table "auth.migrations" */
export type Auth_Migrations_Aggregate_Order_By = {
  avg: Maybe<Auth_Migrations_Avg_Order_By>
  count: Maybe<Order_By>
  max: Maybe<Auth_Migrations_Max_Order_By>
  min: Maybe<Auth_Migrations_Min_Order_By>
  stddev: Maybe<Auth_Migrations_Stddev_Order_By>
  stddev_pop: Maybe<Auth_Migrations_Stddev_Pop_Order_By>
  stddev_samp: Maybe<Auth_Migrations_Stddev_Samp_Order_By>
  sum: Maybe<Auth_Migrations_Sum_Order_By>
  var_pop: Maybe<Auth_Migrations_Var_Pop_Order_By>
  var_samp: Maybe<Auth_Migrations_Var_Samp_Order_By>
  variance: Maybe<Auth_Migrations_Variance_Order_By>
}

/** input type for inserting array relation for remote table "auth.migrations" */
export type Auth_Migrations_Arr_Rel_Insert_Input = {
  data: Array<Auth_Migrations_Insert_Input>
  on_conflict: Maybe<Auth_Migrations_On_Conflict>
}

/** aggregate avg on columns */
export type Auth_Migrations_Avg_Fields = {
  __typename?: 'auth_migrations_avg_fields'
  id: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "auth.migrations" */
export type Auth_Migrations_Avg_Order_By = {
  id: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "auth.migrations". All fields are combined with a logical 'AND'. */
export type Auth_Migrations_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Migrations_Bool_Exp>>>
  _not: Maybe<Auth_Migrations_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Migrations_Bool_Exp>>>
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

/** input type for incrementing integer column in table "auth.migrations" */
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

/** order by max() on columns of table "auth.migrations" */
export type Auth_Migrations_Max_Order_By = {
  executed_at: Maybe<Order_By>
  hash: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Migrations_Min_Fields = {
  __typename?: 'auth_migrations_min_fields'
  executed_at: Maybe<Scalars['timestamp']>
  hash: Maybe<Scalars['String']>
  id: Maybe<Scalars['Int']>
  name: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.migrations" */
export type Auth_Migrations_Min_Order_By = {
  executed_at: Maybe<Order_By>
  hash: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
}

/** response of any mutation on the table "auth.migrations" */
export type Auth_Migrations_Mutation_Response = {
  __typename?: 'auth_migrations_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Migrations>
}

/** input type for inserting object relation for remote table "auth.migrations" */
export type Auth_Migrations_Obj_Rel_Insert_Input = {
  data: Auth_Migrations_Insert_Input
  on_conflict: Maybe<Auth_Migrations_On_Conflict>
}

/** on conflict condition type for table "auth.migrations" */
export type Auth_Migrations_On_Conflict = {
  constraint: Auth_Migrations_Constraint
  update_columns: Array<Auth_Migrations_Update_Column>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

/** ordering options when selecting data from "auth.migrations" */
export type Auth_Migrations_Order_By = {
  executed_at: Maybe<Order_By>
  hash: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
}

/** primary key columns input for table: "auth.migrations" */
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

/** order by stddev() on columns of table "auth.migrations" */
export type Auth_Migrations_Stddev_Order_By = {
  id: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Auth_Migrations_Stddev_Pop_Fields = {
  __typename?: 'auth_migrations_stddev_pop_fields'
  id: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "auth.migrations" */
export type Auth_Migrations_Stddev_Pop_Order_By = {
  id: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Auth_Migrations_Stddev_Samp_Fields = {
  __typename?: 'auth_migrations_stddev_samp_fields'
  id: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "auth.migrations" */
export type Auth_Migrations_Stddev_Samp_Order_By = {
  id: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Auth_Migrations_Sum_Fields = {
  __typename?: 'auth_migrations_sum_fields'
  id: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "auth.migrations" */
export type Auth_Migrations_Sum_Order_By = {
  id: Maybe<Order_By>
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

/** order by var_pop() on columns of table "auth.migrations" */
export type Auth_Migrations_Var_Pop_Order_By = {
  id: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Auth_Migrations_Var_Samp_Fields = {
  __typename?: 'auth_migrations_var_samp_fields'
  id: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "auth.migrations" */
export type Auth_Migrations_Var_Samp_Order_By = {
  id: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Auth_Migrations_Variance_Fields = {
  __typename?: 'auth_migrations_variance_fields'
  id: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "auth.migrations" */
export type Auth_Migrations_Variance_Order_By = {
  id: Maybe<Order_By>
}

/** columns and relationships of "auth.provider_requests" */
export type Auth_Provider_Requests = {
  __typename?: 'auth_provider_requests'
  id: Scalars['uuid']
  jwt_token: Maybe<Scalars['String']>
  redirect_url_failure: Scalars['String']
  redirect_url_success: Scalars['String']
}

/** aggregated selection of "auth.provider_requests" */
export type Auth_Provider_Requests_Aggregate = {
  __typename?: 'auth_provider_requests_aggregate'
  aggregate: Maybe<Auth_Provider_Requests_Aggregate_Fields>
  nodes: Array<Auth_Provider_Requests>
}

/** aggregate fields of "auth.provider_requests" */
export type Auth_Provider_Requests_Aggregate_Fields = {
  __typename?: 'auth_provider_requests_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Auth_Provider_Requests_Max_Fields>
  min: Maybe<Auth_Provider_Requests_Min_Fields>
}

/** aggregate fields of "auth.provider_requests" */
export type Auth_Provider_Requests_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Provider_Requests_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.provider_requests" */
export type Auth_Provider_Requests_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Provider_Requests_Max_Order_By>
  min: Maybe<Auth_Provider_Requests_Min_Order_By>
}

/** input type for inserting array relation for remote table "auth.provider_requests" */
export type Auth_Provider_Requests_Arr_Rel_Insert_Input = {
  data: Array<Auth_Provider_Requests_Insert_Input>
  on_conflict: Maybe<Auth_Provider_Requests_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.provider_requests". All fields are combined with a logical 'AND'. */
export type Auth_Provider_Requests_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Provider_Requests_Bool_Exp>>>
  _not: Maybe<Auth_Provider_Requests_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Provider_Requests_Bool_Exp>>>
  id: Maybe<Uuid_Comparison_Exp>
  jwt_token: Maybe<String_Comparison_Exp>
  redirect_url_failure: Maybe<String_Comparison_Exp>
  redirect_url_success: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.provider_requests" */
export enum Auth_Provider_Requests_Constraint {
  /** unique or primary key constraint */
  ProviderRequestsPkey = 'provider_requests_pkey'
}

/** input type for inserting data into table "auth.provider_requests" */
export type Auth_Provider_Requests_Insert_Input = {
  id: Maybe<Scalars['uuid']>
  jwt_token: Maybe<Scalars['String']>
  redirect_url_failure: Maybe<Scalars['String']>
  redirect_url_success: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Auth_Provider_Requests_Max_Fields = {
  __typename?: 'auth_provider_requests_max_fields'
  id: Maybe<Scalars['uuid']>
  jwt_token: Maybe<Scalars['String']>
  redirect_url_failure: Maybe<Scalars['String']>
  redirect_url_success: Maybe<Scalars['String']>
}

/** order by max() on columns of table "auth.provider_requests" */
export type Auth_Provider_Requests_Max_Order_By = {
  id: Maybe<Order_By>
  jwt_token: Maybe<Order_By>
  redirect_url_failure: Maybe<Order_By>
  redirect_url_success: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Provider_Requests_Min_Fields = {
  __typename?: 'auth_provider_requests_min_fields'
  id: Maybe<Scalars['uuid']>
  jwt_token: Maybe<Scalars['String']>
  redirect_url_failure: Maybe<Scalars['String']>
  redirect_url_success: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.provider_requests" */
export type Auth_Provider_Requests_Min_Order_By = {
  id: Maybe<Order_By>
  jwt_token: Maybe<Order_By>
  redirect_url_failure: Maybe<Order_By>
  redirect_url_success: Maybe<Order_By>
}

/** response of any mutation on the table "auth.provider_requests" */
export type Auth_Provider_Requests_Mutation_Response = {
  __typename?: 'auth_provider_requests_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Provider_Requests>
}

/** input type for inserting object relation for remote table "auth.provider_requests" */
export type Auth_Provider_Requests_Obj_Rel_Insert_Input = {
  data: Auth_Provider_Requests_Insert_Input
  on_conflict: Maybe<Auth_Provider_Requests_On_Conflict>
}

/** on conflict condition type for table "auth.provider_requests" */
export type Auth_Provider_Requests_On_Conflict = {
  constraint: Auth_Provider_Requests_Constraint
  update_columns: Array<Auth_Provider_Requests_Update_Column>
  where: Maybe<Auth_Provider_Requests_Bool_Exp>
}

/** ordering options when selecting data from "auth.provider_requests" */
export type Auth_Provider_Requests_Order_By = {
  id: Maybe<Order_By>
  jwt_token: Maybe<Order_By>
  redirect_url_failure: Maybe<Order_By>
  redirect_url_success: Maybe<Order_By>
}

/** primary key columns input for table: "auth.provider_requests" */
export type Auth_Provider_Requests_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "auth.provider_requests" */
export enum Auth_Provider_Requests_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  JwtToken = 'jwt_token',
  /** column name */
  RedirectUrlFailure = 'redirect_url_failure',
  /** column name */
  RedirectUrlSuccess = 'redirect_url_success'
}

/** input type for updating data in table "auth.provider_requests" */
export type Auth_Provider_Requests_Set_Input = {
  id: Maybe<Scalars['uuid']>
  jwt_token: Maybe<Scalars['String']>
  redirect_url_failure: Maybe<Scalars['String']>
  redirect_url_success: Maybe<Scalars['String']>
}

/** update columns of table "auth.provider_requests" */
export enum Auth_Provider_Requests_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  JwtToken = 'jwt_token',
  /** column name */
  RedirectUrlFailure = 'redirect_url_failure',
  /** column name */
  RedirectUrlSuccess = 'redirect_url_success'
}

/** columns and relationships of "auth.providers" */
export type Auth_Providers = {
  __typename?: 'auth_providers'
  /** An array relationship */
  account_providers: Array<Auth_Account_Providers>
  /** An aggregated array relationship */
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
  count: Maybe<Scalars['Int']>
  max: Maybe<Auth_Providers_Max_Fields>
  min: Maybe<Auth_Providers_Min_Fields>
}

/** aggregate fields of "auth.providers" */
export type Auth_Providers_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Providers_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.providers" */
export type Auth_Providers_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Providers_Max_Order_By>
  min: Maybe<Auth_Providers_Min_Order_By>
}

/** input type for inserting array relation for remote table "auth.providers" */
export type Auth_Providers_Arr_Rel_Insert_Input = {
  data: Array<Auth_Providers_Insert_Input>
  on_conflict: Maybe<Auth_Providers_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export type Auth_Providers_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Providers_Bool_Exp>>>
  _not: Maybe<Auth_Providers_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Providers_Bool_Exp>>>
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

/** order by max() on columns of table "auth.providers" */
export type Auth_Providers_Max_Order_By = {
  provider: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Providers_Min_Fields = {
  __typename?: 'auth_providers_min_fields'
  provider: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.providers" */
export type Auth_Providers_Min_Order_By = {
  provider: Maybe<Order_By>
}

/** response of any mutation on the table "auth.providers" */
export type Auth_Providers_Mutation_Response = {
  __typename?: 'auth_providers_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Providers>
}

/** input type for inserting object relation for remote table "auth.providers" */
export type Auth_Providers_Obj_Rel_Insert_Input = {
  data: Auth_Providers_Insert_Input
  on_conflict: Maybe<Auth_Providers_On_Conflict>
}

/** on conflict condition type for table "auth.providers" */
export type Auth_Providers_On_Conflict = {
  constraint: Auth_Providers_Constraint
  update_columns: Array<Auth_Providers_Update_Column>
  where: Maybe<Auth_Providers_Bool_Exp>
}

/** ordering options when selecting data from "auth.providers" */
export type Auth_Providers_Order_By = {
  account_providers_aggregate: Maybe<Auth_Account_Providers_Aggregate_Order_By>
  provider: Maybe<Order_By>
}

/** primary key columns input for table: "auth.providers" */
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
  count: Maybe<Scalars['Int']>
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
  on_conflict: Maybe<Auth_Refresh_Tokens_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export type Auth_Refresh_Tokens_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Refresh_Tokens_Bool_Exp>>>
  _not: Maybe<Auth_Refresh_Tokens_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Refresh_Tokens_Bool_Exp>>>
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Refresh_Tokens>
}

/** input type for inserting object relation for remote table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Obj_Rel_Insert_Input = {
  data: Auth_Refresh_Tokens_Insert_Input
  on_conflict: Maybe<Auth_Refresh_Tokens_On_Conflict>
}

/** on conflict condition type for table "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_On_Conflict = {
  constraint: Auth_Refresh_Tokens_Constraint
  update_columns: Array<Auth_Refresh_Tokens_Update_Column>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

/** ordering options when selecting data from "auth.refresh_tokens" */
export type Auth_Refresh_Tokens_Order_By = {
  account: Maybe<Auth_Accounts_Order_By>
  account_id: Maybe<Order_By>
  created_at: Maybe<Order_By>
  expires_at: Maybe<Order_By>
  refresh_token: Maybe<Order_By>
}

/** primary key columns input for table: "auth.refresh_tokens" */
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
  /** An aggregated array relationship */
  account_roles_aggregate: Auth_Account_Roles_Aggregate
  /** An array relationship */
  accounts: Array<Auth_Accounts>
  /** An aggregated array relationship */
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
  count: Maybe<Scalars['Int']>
  max: Maybe<Auth_Roles_Max_Fields>
  min: Maybe<Auth_Roles_Min_Fields>
}

/** aggregate fields of "auth.roles" */
export type Auth_Roles_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Roles_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.roles" */
export type Auth_Roles_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Roles_Max_Order_By>
  min: Maybe<Auth_Roles_Min_Order_By>
}

/** input type for inserting array relation for remote table "auth.roles" */
export type Auth_Roles_Arr_Rel_Insert_Input = {
  data: Array<Auth_Roles_Insert_Input>
  on_conflict: Maybe<Auth_Roles_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export type Auth_Roles_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Roles_Bool_Exp>>>
  _not: Maybe<Auth_Roles_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Roles_Bool_Exp>>>
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

/** order by max() on columns of table "auth.roles" */
export type Auth_Roles_Max_Order_By = {
  role: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Roles_Min_Fields = {
  __typename?: 'auth_roles_min_fields'
  role: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.roles" */
export type Auth_Roles_Min_Order_By = {
  role: Maybe<Order_By>
}

/** response of any mutation on the table "auth.roles" */
export type Auth_Roles_Mutation_Response = {
  __typename?: 'auth_roles_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Roles>
}

/** input type for inserting object relation for remote table "auth.roles" */
export type Auth_Roles_Obj_Rel_Insert_Input = {
  data: Auth_Roles_Insert_Input
  on_conflict: Maybe<Auth_Roles_On_Conflict>
}

/** on conflict condition type for table "auth.roles" */
export type Auth_Roles_On_Conflict = {
  constraint: Auth_Roles_Constraint
  update_columns: Array<Auth_Roles_Update_Column>
  where: Maybe<Auth_Roles_Bool_Exp>
}

/** ordering options when selecting data from "auth.roles" */
export type Auth_Roles_Order_By = {
  account_roles_aggregate: Maybe<Auth_Account_Roles_Aggregate_Order_By>
  accounts_aggregate: Maybe<Auth_Accounts_Aggregate_Order_By>
  role: Maybe<Order_By>
}

/** primary key columns input for table: "auth.roles" */
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

/** columns and relationships of "auth.whitelist" */
export type Auth_Whitelist = {
  __typename?: 'auth_whitelist'
  email: Scalars['String']
}

/** aggregated selection of "auth.whitelist" */
export type Auth_Whitelist_Aggregate = {
  __typename?: 'auth_whitelist_aggregate'
  aggregate: Maybe<Auth_Whitelist_Aggregate_Fields>
  nodes: Array<Auth_Whitelist>
}

/** aggregate fields of "auth.whitelist" */
export type Auth_Whitelist_Aggregate_Fields = {
  __typename?: 'auth_whitelist_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Auth_Whitelist_Max_Fields>
  min: Maybe<Auth_Whitelist_Min_Fields>
}

/** aggregate fields of "auth.whitelist" */
export type Auth_Whitelist_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Auth_Whitelist_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.whitelist" */
export type Auth_Whitelist_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Auth_Whitelist_Max_Order_By>
  min: Maybe<Auth_Whitelist_Min_Order_By>
}

/** input type for inserting array relation for remote table "auth.whitelist" */
export type Auth_Whitelist_Arr_Rel_Insert_Input = {
  data: Array<Auth_Whitelist_Insert_Input>
  on_conflict: Maybe<Auth_Whitelist_On_Conflict>
}

/** Boolean expression to filter rows from the table "auth.whitelist". All fields are combined with a logical 'AND'. */
export type Auth_Whitelist_Bool_Exp = {
  _and: Maybe<Array<Maybe<Auth_Whitelist_Bool_Exp>>>
  _not: Maybe<Auth_Whitelist_Bool_Exp>
  _or: Maybe<Array<Maybe<Auth_Whitelist_Bool_Exp>>>
  email: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "auth.whitelist" */
export enum Auth_Whitelist_Constraint {
  /** unique or primary key constraint */
  WhitelistPkey = 'whitelist_pkey'
}

/** input type for inserting data into table "auth.whitelist" */
export type Auth_Whitelist_Insert_Input = {
  email: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Auth_Whitelist_Max_Fields = {
  __typename?: 'auth_whitelist_max_fields'
  email: Maybe<Scalars['String']>
}

/** order by max() on columns of table "auth.whitelist" */
export type Auth_Whitelist_Max_Order_By = {
  email: Maybe<Order_By>
}

/** aggregate min on columns */
export type Auth_Whitelist_Min_Fields = {
  __typename?: 'auth_whitelist_min_fields'
  email: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.whitelist" */
export type Auth_Whitelist_Min_Order_By = {
  email: Maybe<Order_By>
}

/** response of any mutation on the table "auth.whitelist" */
export type Auth_Whitelist_Mutation_Response = {
  __typename?: 'auth_whitelist_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Auth_Whitelist>
}

/** input type for inserting object relation for remote table "auth.whitelist" */
export type Auth_Whitelist_Obj_Rel_Insert_Input = {
  data: Auth_Whitelist_Insert_Input
  on_conflict: Maybe<Auth_Whitelist_On_Conflict>
}

/** on conflict condition type for table "auth.whitelist" */
export type Auth_Whitelist_On_Conflict = {
  constraint: Auth_Whitelist_Constraint
  update_columns: Array<Auth_Whitelist_Update_Column>
  where: Maybe<Auth_Whitelist_Bool_Exp>
}

/** ordering options when selecting data from "auth.whitelist" */
export type Auth_Whitelist_Order_By = {
  email: Maybe<Order_By>
}

/** primary key columns input for table: "auth.whitelist" */
export type Auth_Whitelist_Pk_Columns_Input = {
  email: Scalars['String']
}

/** select columns of table "auth.whitelist" */
export enum Auth_Whitelist_Select_Column {
  /** column name */
  Email = 'email'
}

/** input type for updating data in table "auth.whitelist" */
export type Auth_Whitelist_Set_Input = {
  email: Maybe<Scalars['String']>
}

/** update columns of table "auth.whitelist" */
export enum Auth_Whitelist_Update_Column {
  /** column name */
  Email = 'email'
}

/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq: Maybe<Scalars['bigint']>
  _gt: Maybe<Scalars['bigint']>
  _gte: Maybe<Scalars['bigint']>
  _in: Maybe<Array<Scalars['bigint']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['bigint']>
  _lte: Maybe<Scalars['bigint']>
  _neq: Maybe<Scalars['bigint']>
  _nin: Maybe<Array<Scalars['bigint']>>
}

/** expression to compare columns of type citext. All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq: Maybe<Scalars['citext']>
  _gt: Maybe<Scalars['citext']>
  _gte: Maybe<Scalars['citext']>
  _ilike: Maybe<Scalars['String']>
  _in: Maybe<Array<Scalars['citext']>>
  _is_null: Maybe<Scalars['Boolean']>
  _like: Maybe<Scalars['String']>
  _lt: Maybe<Scalars['citext']>
  _lte: Maybe<Scalars['citext']>
  _neq: Maybe<Scalars['citext']>
  _nilike: Maybe<Scalars['String']>
  _nin: Maybe<Array<Scalars['citext']>>
  _nlike: Maybe<Scalars['String']>
  _nsimilar: Maybe<Scalars['String']>
  _similar: Maybe<Scalars['String']>
}

/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq: Maybe<Scalars['date']>
  _gt: Maybe<Scalars['date']>
  _gte: Maybe<Scalars['date']>
  _in: Maybe<Array<Scalars['date']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['date']>
  _lte: Maybe<Scalars['date']>
  _neq: Maybe<Scalars['date']>
  _nin: Maybe<Array<Scalars['date']>>
}

/** columns and relationships of "drug" */
export type Drug = {
  __typename?: 'drug'
  id: Scalars['uuid']
  name: Scalars['String']
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "drug" */
export type Drug_Aggregate = {
  __typename?: 'drug_aggregate'
  aggregate: Maybe<Drug_Aggregate_Fields>
  nodes: Array<Drug>
}

/** aggregate fields of "drug" */
export type Drug_Aggregate_Fields = {
  __typename?: 'drug_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Drug_Max_Fields>
  min: Maybe<Drug_Min_Fields>
}

/** aggregate fields of "drug" */
export type Drug_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Drug_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "drug" */
export type Drug_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Drug_Max_Order_By>
  min: Maybe<Drug_Min_Order_By>
}

/** input type for inserting array relation for remote table "drug" */
export type Drug_Arr_Rel_Insert_Input = {
  data: Array<Drug_Insert_Input>
  on_conflict: Maybe<Drug_On_Conflict>
}

/** Boolean expression to filter rows from the table "drug". All fields are combined with a logical 'AND'. */
export type Drug_Bool_Exp = {
  _and: Maybe<Array<Maybe<Drug_Bool_Exp>>>
  _not: Maybe<Drug_Bool_Exp>
  _or: Maybe<Array<Maybe<Drug_Bool_Exp>>>
  id: Maybe<Uuid_Comparison_Exp>
  name: Maybe<String_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "drug" */
export enum Drug_Constraint {
  /** unique or primary key constraint */
  DrugPkey = 'drug_pkey'
}

/** input type for inserting data into table "drug" */
export type Drug_Insert_Input = {
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Drug_Max_Fields = {
  __typename?: 'drug_max_fields'
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "drug" */
export type Drug_Max_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** aggregate min on columns */
export type Drug_Min_Fields = {
  __typename?: 'drug_min_fields'
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "drug" */
export type Drug_Min_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** response of any mutation on the table "drug" */
export type Drug_Mutation_Response = {
  __typename?: 'drug_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Drug>
}

/** input type for inserting object relation for remote table "drug" */
export type Drug_Obj_Rel_Insert_Input = {
  data: Drug_Insert_Input
  on_conflict: Maybe<Drug_On_Conflict>
}

/** on conflict condition type for table "drug" */
export type Drug_On_Conflict = {
  constraint: Drug_Constraint
  update_columns: Array<Drug_Update_Column>
  where: Maybe<Drug_Bool_Exp>
}

/** ordering options when selecting data from "drug" */
export type Drug_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: "drug" */
export type Drug_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "drug" */
export enum Drug_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "drug" */
export type Drug_Set_Input = {
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "drug" */
export enum Drug_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq: Maybe<Scalars['json']>
  _gt: Maybe<Scalars['json']>
  _gte: Maybe<Scalars['json']>
  _in: Maybe<Array<Scalars['json']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['json']>
  _lte: Maybe<Scalars['json']>
  _neq: Maybe<Scalars['json']>
  _nin: Maybe<Array<Scalars['json']>>
}

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
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

/** columns and relationships of "lab_test" */
export type Lab_Test = {
  __typename?: 'lab_test'
  deleted: Scalars['Boolean']
  id: Scalars['uuid']
  name: Scalars['String']
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "lab_test" */
export type Lab_Test_Aggregate = {
  __typename?: 'lab_test_aggregate'
  aggregate: Maybe<Lab_Test_Aggregate_Fields>
  nodes: Array<Lab_Test>
}

/** aggregate fields of "lab_test" */
export type Lab_Test_Aggregate_Fields = {
  __typename?: 'lab_test_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Lab_Test_Max_Fields>
  min: Maybe<Lab_Test_Min_Fields>
}

/** aggregate fields of "lab_test" */
export type Lab_Test_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Lab_Test_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "lab_test" */
export type Lab_Test_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Lab_Test_Max_Order_By>
  min: Maybe<Lab_Test_Min_Order_By>
}

/** input type for inserting array relation for remote table "lab_test" */
export type Lab_Test_Arr_Rel_Insert_Input = {
  data: Array<Lab_Test_Insert_Input>
  on_conflict: Maybe<Lab_Test_On_Conflict>
}

/** Boolean expression to filter rows from the table "lab_test". All fields are combined with a logical 'AND'. */
export type Lab_Test_Bool_Exp = {
  _and: Maybe<Array<Maybe<Lab_Test_Bool_Exp>>>
  _not: Maybe<Lab_Test_Bool_Exp>
  _or: Maybe<Array<Maybe<Lab_Test_Bool_Exp>>>
  deleted: Maybe<Boolean_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  name: Maybe<String_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "lab_test" */
export enum Lab_Test_Constraint {
  /** unique or primary key constraint */
  LabTestPkey = 'lab_test_pkey'
}

/** input type for inserting data into table "lab_test" */
export type Lab_Test_Insert_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Lab_Test_Max_Fields = {
  __typename?: 'lab_test_max_fields'
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "lab_test" */
export type Lab_Test_Max_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** aggregate min on columns */
export type Lab_Test_Min_Fields = {
  __typename?: 'lab_test_min_fields'
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "lab_test" */
export type Lab_Test_Min_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** response of any mutation on the table "lab_test" */
export type Lab_Test_Mutation_Response = {
  __typename?: 'lab_test_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Lab_Test>
}

/** input type for inserting object relation for remote table "lab_test" */
export type Lab_Test_Obj_Rel_Insert_Input = {
  data: Lab_Test_Insert_Input
  on_conflict: Maybe<Lab_Test_On_Conflict>
}

/** on conflict condition type for table "lab_test" */
export type Lab_Test_On_Conflict = {
  constraint: Lab_Test_Constraint
  update_columns: Array<Lab_Test_Update_Column>
  where: Maybe<Lab_Test_Bool_Exp>
}

/** ordering options when selecting data from "lab_test" */
export type Lab_Test_Order_By = {
  deleted: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: "lab_test" */
export type Lab_Test_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "lab_test" */
export enum Lab_Test_Select_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "lab_test" */
export type Lab_Test_Set_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "lab_test" */
export enum Lab_Test_Update_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "metadata.app_config" */
export type Metadata_App_Config = {
  __typename?: 'metadata_app_config'
  deleted: Scalars['Boolean']
  id: Scalars['uuid']
  menu_order: Scalars['jsonb']
  updated_at: Scalars['timestamptz']
}

/** columns and relationships of "metadata.app_config" */
export type Metadata_App_ConfigMenu_OrderArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.app_config" */
export type Metadata_App_Config_Aggregate = {
  __typename?: 'metadata_app_config_aggregate'
  aggregate: Maybe<Metadata_App_Config_Aggregate_Fields>
  nodes: Array<Metadata_App_Config>
}

/** aggregate fields of "metadata.app_config" */
export type Metadata_App_Config_Aggregate_Fields = {
  __typename?: 'metadata_app_config_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_App_Config_Max_Fields>
  min: Maybe<Metadata_App_Config_Min_Fields>
}

/** aggregate fields of "metadata.app_config" */
export type Metadata_App_Config_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_App_Config_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.app_config" */
export type Metadata_App_Config_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_App_Config_Max_Order_By>
  min: Maybe<Metadata_App_Config_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metadata_App_Config_Append_Input = {
  menu_order: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "metadata.app_config" */
export type Metadata_App_Config_Arr_Rel_Insert_Input = {
  data: Array<Metadata_App_Config_Insert_Input>
  on_conflict: Maybe<Metadata_App_Config_On_Conflict>
}

/** Boolean expression to filter rows from the table "metadata.app_config". All fields are combined with a logical 'AND'. */
export type Metadata_App_Config_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_App_Config_Bool_Exp>>>
  _not: Maybe<Metadata_App_Config_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_App_Config_Bool_Exp>>>
  deleted: Maybe<Boolean_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  menu_order: Maybe<Jsonb_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "metadata.app_config" */
export enum Metadata_App_Config_Constraint {
  /** unique or primary key constraint */
  AppConfigPkey = 'app_config_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metadata_App_Config_Delete_At_Path_Input = {
  menu_order: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metadata_App_Config_Delete_Elem_Input = {
  menu_order: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metadata_App_Config_Delete_Key_Input = {
  menu_order: Maybe<Scalars['String']>
}

/** input type for inserting data into table "metadata.app_config" */
export type Metadata_App_Config_Insert_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  menu_order: Maybe<Scalars['jsonb']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Metadata_App_Config_Max_Fields = {
  __typename?: 'metadata_app_config_max_fields'
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "metadata.app_config" */
export type Metadata_App_Config_Max_Order_By = {
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_App_Config_Min_Fields = {
  __typename?: 'metadata_app_config_min_fields'
  id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "metadata.app_config" */
export type Metadata_App_Config_Min_Order_By = {
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** response of any mutation on the table "metadata.app_config" */
export type Metadata_App_Config_Mutation_Response = {
  __typename?: 'metadata_app_config_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Metadata_App_Config>
}

/** input type for inserting object relation for remote table "metadata.app_config" */
export type Metadata_App_Config_Obj_Rel_Insert_Input = {
  data: Metadata_App_Config_Insert_Input
  on_conflict: Maybe<Metadata_App_Config_On_Conflict>
}

/** on conflict condition type for table "metadata.app_config" */
export type Metadata_App_Config_On_Conflict = {
  constraint: Metadata_App_Config_Constraint
  update_columns: Array<Metadata_App_Config_Update_Column>
  where: Maybe<Metadata_App_Config_Bool_Exp>
}

/** ordering options when selecting data from "metadata.app_config" */
export type Metadata_App_Config_Order_By = {
  deleted: Maybe<Order_By>
  id: Maybe<Order_By>
  menu_order: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: "metadata.app_config" */
export type Metadata_App_Config_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metadata_App_Config_Prepend_Input = {
  menu_order: Maybe<Scalars['jsonb']>
}

/** select columns of table "metadata.app_config" */
export enum Metadata_App_Config_Select_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  MenuOrder = 'menu_order',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "metadata.app_config" */
export type Metadata_App_Config_Set_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  menu_order: Maybe<Scalars['jsonb']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "metadata.app_config" */
export enum Metadata_App_Config_Update_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  MenuOrder = 'menu_order',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "metadata.check_constraint" */
export type Metadata_Check_Constraint = {
  __typename?: 'metadata_check_constraint'
  check: Maybe<Scalars['String']>
  contraintName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.check_constraint" */
export type Metadata_Check_Constraint_Aggregate = {
  __typename?: 'metadata_check_constraint_aggregate'
  aggregate: Maybe<Metadata_Check_Constraint_Aggregate_Fields>
  nodes: Array<Metadata_Check_Constraint>
}

/** aggregate fields of "metadata.check_constraint" */
export type Metadata_Check_Constraint_Aggregate_Fields = {
  __typename?: 'metadata_check_constraint_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Check_Constraint_Max_Fields>
  min: Maybe<Metadata_Check_Constraint_Min_Fields>
}

/** aggregate fields of "metadata.check_constraint" */
export type Metadata_Check_Constraint_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Check_Constraint_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.check_constraint" */
export type Metadata_Check_Constraint_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Check_Constraint_Max_Order_By>
  min: Maybe<Metadata_Check_Constraint_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.check_constraint". All fields are combined with a logical 'AND'. */
export type Metadata_Check_Constraint_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Check_Constraint_Bool_Exp>>>
  _not: Maybe<Metadata_Check_Constraint_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Check_Constraint_Bool_Exp>>>
  check: Maybe<String_Comparison_Exp>
  contraintName: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<String_Comparison_Exp>
  tableSchema: Maybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Check_Constraint_Max_Fields = {
  __typename?: 'metadata_check_constraint_max_fields'
  check: Maybe<Scalars['String']>
  contraintName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.check_constraint" */
export type Metadata_Check_Constraint_Max_Order_By = {
  check: Maybe<Order_By>
  contraintName: Maybe<Order_By>
  id: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Check_Constraint_Min_Fields = {
  __typename?: 'metadata_check_constraint_min_fields'
  check: Maybe<Scalars['String']>
  contraintName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.check_constraint" */
export type Metadata_Check_Constraint_Min_Order_By = {
  check: Maybe<Order_By>
  contraintName: Maybe<Order_By>
  id: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.check_constraint" */
export type Metadata_Check_Constraint_Order_By = {
  check: Maybe<Order_By>
  contraintName: Maybe<Order_By>
  id: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.check_constraint" */
export enum Metadata_Check_Constraint_Select_Column {
  /** column name */
  Check = 'check',
  /** column name */
  ContraintName = 'contraintName',
  /** column name */
  Id = 'id',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** columns and relationships of "metadata.column_info" */
export type Metadata_Column_Info = {
  __typename?: 'metadata_column_info'
  /** An array relationship */
  canInsert: Array<Metadata_Permission_Select_Columns>
  /** An aggregated array relationship */
  canInsert_aggregate: Metadata_Permission_Select_Columns_Aggregate
  /** An array relationship */
  canSelect: Array<Metadata_Permission_Select_Columns>
  /** An aggregated array relationship */
  canSelect_aggregate: Metadata_Permission_Select_Columns_Aggregate
  /** An array relationship */
  canUpdate: Array<Metadata_Permission_Update_Columns>
  /** An aggregated array relationship */
  canUpdate_aggregate: Metadata_Permission_Update_Columns_Aggregate
  character_maximum_length: Maybe<Scalars['Int']>
  character_octet_length: Maybe<Scalars['Int']>
  character_set_catalog: Maybe<Scalars['name']>
  character_set_name: Maybe<Scalars['name']>
  character_set_schema: Maybe<Scalars['name']>
  collation_catalog: Maybe<Scalars['name']>
  collation_name: Maybe<Scalars['name']>
  collation_schema: Maybe<Scalars['name']>
  /** An object relationship */
  config: Maybe<Metadata_Property_Config>
  data_type: Maybe<Scalars['String']>
  datetime_precision: Maybe<Scalars['Int']>
  default: Maybe<Scalars['String']>
  domain_catalog: Maybe<Scalars['name']>
  domain_name: Maybe<Scalars['name']>
  domain_schema: Maybe<Scalars['name']>
  dtd_identifier: Maybe<Scalars['name']>
  generation_expression: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  identity_cycle: Maybe<Scalars['String']>
  identity_generation: Maybe<Scalars['String']>
  identity_increment: Maybe<Scalars['String']>
  identity_maximum: Maybe<Scalars['String']>
  identity_minimum: Maybe<Scalars['String']>
  identity_start: Maybe<Scalars['String']>
  interval_precision: Maybe<Scalars['Int']>
  interval_type: Maybe<Scalars['String']>
  isNullable: Maybe<Scalars['String']>
  is_generated: Maybe<Scalars['String']>
  is_identity: Maybe<Scalars['String']>
  is_self_referencing: Maybe<Scalars['String']>
  is_updatable: Maybe<Scalars['String']>
  maximum_cardinality: Maybe<Scalars['Int']>
  name: Maybe<Scalars['name']>
  numeric_precision: Maybe<Scalars['Int']>
  numeric_precision_radix: Maybe<Scalars['Int']>
  numeric_scale: Maybe<Scalars['Int']>
  ordinal_position: Maybe<Scalars['Int']>
  /** An object relationship */
  primaryKey: Maybe<Metadata_Primary_Key_Column>
  scope_catalog: Maybe<Scalars['name']>
  scope_name: Maybe<Scalars['name']>
  scope_schema: Maybe<Scalars['name']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  table_catalog: Maybe<Scalars['name']>
  table_id: Maybe<Scalars['String']>
  table_name: Maybe<Scalars['name']>
  table_schema: Maybe<Scalars['name']>
  udtName: Maybe<Scalars['name']>
  udt_catalog: Maybe<Scalars['name']>
  udt_schema: Maybe<Scalars['name']>
}

/** columns and relationships of "metadata.column_info" */
export type Metadata_Column_InfoCanInsertArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.column_info" */
export type Metadata_Column_InfoCanInsert_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.column_info" */
export type Metadata_Column_InfoCanSelectArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.column_info" */
export type Metadata_Column_InfoCanSelect_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.column_info" */
export type Metadata_Column_InfoCanUpdateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Update_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.column_info" */
export type Metadata_Column_InfoCanUpdate_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Update_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
}

/** aggregated selection of "metadata.column_info" */
export type Metadata_Column_Info_Aggregate = {
  __typename?: 'metadata_column_info_aggregate'
  aggregate: Maybe<Metadata_Column_Info_Aggregate_Fields>
  nodes: Array<Metadata_Column_Info>
}

/** aggregate fields of "metadata.column_info" */
export type Metadata_Column_Info_Aggregate_Fields = {
  __typename?: 'metadata_column_info_aggregate_fields'
  avg: Maybe<Metadata_Column_Info_Avg_Fields>
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Column_Info_Max_Fields>
  min: Maybe<Metadata_Column_Info_Min_Fields>
  stddev: Maybe<Metadata_Column_Info_Stddev_Fields>
  stddev_pop: Maybe<Metadata_Column_Info_Stddev_Pop_Fields>
  stddev_samp: Maybe<Metadata_Column_Info_Stddev_Samp_Fields>
  sum: Maybe<Metadata_Column_Info_Sum_Fields>
  var_pop: Maybe<Metadata_Column_Info_Var_Pop_Fields>
  var_samp: Maybe<Metadata_Column_Info_Var_Samp_Fields>
  variance: Maybe<Metadata_Column_Info_Variance_Fields>
}

/** aggregate fields of "metadata.column_info" */
export type Metadata_Column_Info_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Column_Info_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.column_info" */
export type Metadata_Column_Info_Aggregate_Order_By = {
  avg: Maybe<Metadata_Column_Info_Avg_Order_By>
  count: Maybe<Order_By>
  max: Maybe<Metadata_Column_Info_Max_Order_By>
  min: Maybe<Metadata_Column_Info_Min_Order_By>
  stddev: Maybe<Metadata_Column_Info_Stddev_Order_By>
  stddev_pop: Maybe<Metadata_Column_Info_Stddev_Pop_Order_By>
  stddev_samp: Maybe<Metadata_Column_Info_Stddev_Samp_Order_By>
  sum: Maybe<Metadata_Column_Info_Sum_Order_By>
  var_pop: Maybe<Metadata_Column_Info_Var_Pop_Order_By>
  var_samp: Maybe<Metadata_Column_Info_Var_Samp_Order_By>
  variance: Maybe<Metadata_Column_Info_Variance_Order_By>
}

/** aggregate avg on columns */
export type Metadata_Column_Info_Avg_Fields = {
  __typename?: 'metadata_column_info_avg_fields'
  character_maximum_length: Maybe<Scalars['Float']>
  character_octet_length: Maybe<Scalars['Float']>
  datetime_precision: Maybe<Scalars['Float']>
  interval_precision: Maybe<Scalars['Float']>
  maximum_cardinality: Maybe<Scalars['Float']>
  numeric_precision: Maybe<Scalars['Float']>
  numeric_precision_radix: Maybe<Scalars['Float']>
  numeric_scale: Maybe<Scalars['Float']>
  ordinal_position: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Avg_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "metadata.column_info". All fields are combined with a logical 'AND'. */
export type Metadata_Column_Info_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Column_Info_Bool_Exp>>>
  _not: Maybe<Metadata_Column_Info_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Column_Info_Bool_Exp>>>
  canInsert: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
  canSelect: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
  canUpdate: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
  character_maximum_length: Maybe<Int_Comparison_Exp>
  character_octet_length: Maybe<Int_Comparison_Exp>
  character_set_catalog: Maybe<Name_Comparison_Exp>
  character_set_name: Maybe<Name_Comparison_Exp>
  character_set_schema: Maybe<Name_Comparison_Exp>
  collation_catalog: Maybe<Name_Comparison_Exp>
  collation_name: Maybe<Name_Comparison_Exp>
  collation_schema: Maybe<Name_Comparison_Exp>
  config: Maybe<Metadata_Property_Config_Bool_Exp>
  data_type: Maybe<String_Comparison_Exp>
  datetime_precision: Maybe<Int_Comparison_Exp>
  default: Maybe<String_Comparison_Exp>
  domain_catalog: Maybe<Name_Comparison_Exp>
  domain_name: Maybe<Name_Comparison_Exp>
  domain_schema: Maybe<Name_Comparison_Exp>
  dtd_identifier: Maybe<Name_Comparison_Exp>
  generation_expression: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  identity_cycle: Maybe<String_Comparison_Exp>
  identity_generation: Maybe<String_Comparison_Exp>
  identity_increment: Maybe<String_Comparison_Exp>
  identity_maximum: Maybe<String_Comparison_Exp>
  identity_minimum: Maybe<String_Comparison_Exp>
  identity_start: Maybe<String_Comparison_Exp>
  interval_precision: Maybe<Int_Comparison_Exp>
  interval_type: Maybe<String_Comparison_Exp>
  isNullable: Maybe<String_Comparison_Exp>
  is_generated: Maybe<String_Comparison_Exp>
  is_identity: Maybe<String_Comparison_Exp>
  is_self_referencing: Maybe<String_Comparison_Exp>
  is_updatable: Maybe<String_Comparison_Exp>
  maximum_cardinality: Maybe<Int_Comparison_Exp>
  name: Maybe<Name_Comparison_Exp>
  numeric_precision: Maybe<Int_Comparison_Exp>
  numeric_precision_radix: Maybe<Int_Comparison_Exp>
  numeric_scale: Maybe<Int_Comparison_Exp>
  ordinal_position: Maybe<Int_Comparison_Exp>
  primaryKey: Maybe<Metadata_Primary_Key_Column_Bool_Exp>
  scope_catalog: Maybe<Name_Comparison_Exp>
  scope_name: Maybe<Name_Comparison_Exp>
  scope_schema: Maybe<Name_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  table_catalog: Maybe<Name_Comparison_Exp>
  table_id: Maybe<String_Comparison_Exp>
  table_name: Maybe<Name_Comparison_Exp>
  table_schema: Maybe<Name_Comparison_Exp>
  udtName: Maybe<Name_Comparison_Exp>
  udt_catalog: Maybe<Name_Comparison_Exp>
  udt_schema: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Column_Info_Max_Fields = {
  __typename?: 'metadata_column_info_max_fields'
  character_maximum_length: Maybe<Scalars['Int']>
  character_octet_length: Maybe<Scalars['Int']>
  data_type: Maybe<Scalars['String']>
  datetime_precision: Maybe<Scalars['Int']>
  default: Maybe<Scalars['String']>
  generation_expression: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  identity_cycle: Maybe<Scalars['String']>
  identity_generation: Maybe<Scalars['String']>
  identity_increment: Maybe<Scalars['String']>
  identity_maximum: Maybe<Scalars['String']>
  identity_minimum: Maybe<Scalars['String']>
  identity_start: Maybe<Scalars['String']>
  interval_precision: Maybe<Scalars['Int']>
  interval_type: Maybe<Scalars['String']>
  isNullable: Maybe<Scalars['String']>
  is_generated: Maybe<Scalars['String']>
  is_identity: Maybe<Scalars['String']>
  is_self_referencing: Maybe<Scalars['String']>
  is_updatable: Maybe<Scalars['String']>
  maximum_cardinality: Maybe<Scalars['Int']>
  numeric_precision: Maybe<Scalars['Int']>
  numeric_precision_radix: Maybe<Scalars['Int']>
  numeric_scale: Maybe<Scalars['Int']>
  ordinal_position: Maybe<Scalars['Int']>
  table_id: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Max_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  data_type: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  default: Maybe<Order_By>
  generation_expression: Maybe<Order_By>
  id: Maybe<Order_By>
  identity_cycle: Maybe<Order_By>
  identity_generation: Maybe<Order_By>
  identity_increment: Maybe<Order_By>
  identity_maximum: Maybe<Order_By>
  identity_minimum: Maybe<Order_By>
  identity_start: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  interval_type: Maybe<Order_By>
  isNullable: Maybe<Order_By>
  is_generated: Maybe<Order_By>
  is_identity: Maybe<Order_By>
  is_self_referencing: Maybe<Order_By>
  is_updatable: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
  table_id: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Column_Info_Min_Fields = {
  __typename?: 'metadata_column_info_min_fields'
  character_maximum_length: Maybe<Scalars['Int']>
  character_octet_length: Maybe<Scalars['Int']>
  data_type: Maybe<Scalars['String']>
  datetime_precision: Maybe<Scalars['Int']>
  default: Maybe<Scalars['String']>
  generation_expression: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  identity_cycle: Maybe<Scalars['String']>
  identity_generation: Maybe<Scalars['String']>
  identity_increment: Maybe<Scalars['String']>
  identity_maximum: Maybe<Scalars['String']>
  identity_minimum: Maybe<Scalars['String']>
  identity_start: Maybe<Scalars['String']>
  interval_precision: Maybe<Scalars['Int']>
  interval_type: Maybe<Scalars['String']>
  isNullable: Maybe<Scalars['String']>
  is_generated: Maybe<Scalars['String']>
  is_identity: Maybe<Scalars['String']>
  is_self_referencing: Maybe<Scalars['String']>
  is_updatable: Maybe<Scalars['String']>
  maximum_cardinality: Maybe<Scalars['Int']>
  numeric_precision: Maybe<Scalars['Int']>
  numeric_precision_radix: Maybe<Scalars['Int']>
  numeric_scale: Maybe<Scalars['Int']>
  ordinal_position: Maybe<Scalars['Int']>
  table_id: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Min_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  data_type: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  default: Maybe<Order_By>
  generation_expression: Maybe<Order_By>
  id: Maybe<Order_By>
  identity_cycle: Maybe<Order_By>
  identity_generation: Maybe<Order_By>
  identity_increment: Maybe<Order_By>
  identity_maximum: Maybe<Order_By>
  identity_minimum: Maybe<Order_By>
  identity_start: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  interval_type: Maybe<Order_By>
  isNullable: Maybe<Order_By>
  is_generated: Maybe<Order_By>
  is_identity: Maybe<Order_By>
  is_self_referencing: Maybe<Order_By>
  is_updatable: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
  table_id: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.column_info" */
export type Metadata_Column_Info_Order_By = {
  canInsert_aggregate: Maybe<Metadata_Permission_Select_Columns_Aggregate_Order_By>
  canSelect_aggregate: Maybe<Metadata_Permission_Select_Columns_Aggregate_Order_By>
  canUpdate_aggregate: Maybe<Metadata_Permission_Update_Columns_Aggregate_Order_By>
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  character_set_catalog: Maybe<Order_By>
  character_set_name: Maybe<Order_By>
  character_set_schema: Maybe<Order_By>
  collation_catalog: Maybe<Order_By>
  collation_name: Maybe<Order_By>
  collation_schema: Maybe<Order_By>
  config: Maybe<Metadata_Property_Config_Order_By>
  data_type: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  default: Maybe<Order_By>
  domain_catalog: Maybe<Order_By>
  domain_name: Maybe<Order_By>
  domain_schema: Maybe<Order_By>
  dtd_identifier: Maybe<Order_By>
  generation_expression: Maybe<Order_By>
  id: Maybe<Order_By>
  identity_cycle: Maybe<Order_By>
  identity_generation: Maybe<Order_By>
  identity_increment: Maybe<Order_By>
  identity_maximum: Maybe<Order_By>
  identity_minimum: Maybe<Order_By>
  identity_start: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  interval_type: Maybe<Order_By>
  isNullable: Maybe<Order_By>
  is_generated: Maybe<Order_By>
  is_identity: Maybe<Order_By>
  is_self_referencing: Maybe<Order_By>
  is_updatable: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  name: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
  primaryKey: Maybe<Metadata_Primary_Key_Column_Order_By>
  scope_catalog: Maybe<Order_By>
  scope_name: Maybe<Order_By>
  scope_schema: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  table_catalog: Maybe<Order_By>
  table_id: Maybe<Order_By>
  table_name: Maybe<Order_By>
  table_schema: Maybe<Order_By>
  udtName: Maybe<Order_By>
  udt_catalog: Maybe<Order_By>
  udt_schema: Maybe<Order_By>
}

/** select columns of table "metadata.column_info" */
export enum Metadata_Column_Info_Select_Column {
  /** column name */
  CharacterMaximumLength = 'character_maximum_length',
  /** column name */
  CharacterOctetLength = 'character_octet_length',
  /** column name */
  CharacterSetCatalog = 'character_set_catalog',
  /** column name */
  CharacterSetName = 'character_set_name',
  /** column name */
  CharacterSetSchema = 'character_set_schema',
  /** column name */
  CollationCatalog = 'collation_catalog',
  /** column name */
  CollationName = 'collation_name',
  /** column name */
  CollationSchema = 'collation_schema',
  /** column name */
  DataType = 'data_type',
  /** column name */
  DatetimePrecision = 'datetime_precision',
  /** column name */
  Default = 'default',
  /** column name */
  DomainCatalog = 'domain_catalog',
  /** column name */
  DomainName = 'domain_name',
  /** column name */
  DomainSchema = 'domain_schema',
  /** column name */
  DtdIdentifier = 'dtd_identifier',
  /** column name */
  GenerationExpression = 'generation_expression',
  /** column name */
  Id = 'id',
  /** column name */
  IdentityCycle = 'identity_cycle',
  /** column name */
  IdentityGeneration = 'identity_generation',
  /** column name */
  IdentityIncrement = 'identity_increment',
  /** column name */
  IdentityMaximum = 'identity_maximum',
  /** column name */
  IdentityMinimum = 'identity_minimum',
  /** column name */
  IdentityStart = 'identity_start',
  /** column name */
  IntervalPrecision = 'interval_precision',
  /** column name */
  IntervalType = 'interval_type',
  /** column name */
  IsNullable = 'isNullable',
  /** column name */
  IsGenerated = 'is_generated',
  /** column name */
  IsIdentity = 'is_identity',
  /** column name */
  IsSelfReferencing = 'is_self_referencing',
  /** column name */
  IsUpdatable = 'is_updatable',
  /** column name */
  MaximumCardinality = 'maximum_cardinality',
  /** column name */
  Name = 'name',
  /** column name */
  NumericPrecision = 'numeric_precision',
  /** column name */
  NumericPrecisionRadix = 'numeric_precision_radix',
  /** column name */
  NumericScale = 'numeric_scale',
  /** column name */
  OrdinalPosition = 'ordinal_position',
  /** column name */
  ScopeCatalog = 'scope_catalog',
  /** column name */
  ScopeName = 'scope_name',
  /** column name */
  ScopeSchema = 'scope_schema',
  /** column name */
  TableCatalog = 'table_catalog',
  /** column name */
  TableId = 'table_id',
  /** column name */
  TableName = 'table_name',
  /** column name */
  TableSchema = 'table_schema',
  /** column name */
  UdtName = 'udtName',
  /** column name */
  UdtCatalog = 'udt_catalog',
  /** column name */
  UdtSchema = 'udt_schema'
}

/** aggregate stddev on columns */
export type Metadata_Column_Info_Stddev_Fields = {
  __typename?: 'metadata_column_info_stddev_fields'
  character_maximum_length: Maybe<Scalars['Float']>
  character_octet_length: Maybe<Scalars['Float']>
  datetime_precision: Maybe<Scalars['Float']>
  interval_precision: Maybe<Scalars['Float']>
  maximum_cardinality: Maybe<Scalars['Float']>
  numeric_precision: Maybe<Scalars['Float']>
  numeric_precision_radix: Maybe<Scalars['Float']>
  numeric_scale: Maybe<Scalars['Float']>
  ordinal_position: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Stddev_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Metadata_Column_Info_Stddev_Pop_Fields = {
  __typename?: 'metadata_column_info_stddev_pop_fields'
  character_maximum_length: Maybe<Scalars['Float']>
  character_octet_length: Maybe<Scalars['Float']>
  datetime_precision: Maybe<Scalars['Float']>
  interval_precision: Maybe<Scalars['Float']>
  maximum_cardinality: Maybe<Scalars['Float']>
  numeric_precision: Maybe<Scalars['Float']>
  numeric_precision_radix: Maybe<Scalars['Float']>
  numeric_scale: Maybe<Scalars['Float']>
  ordinal_position: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Stddev_Pop_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Metadata_Column_Info_Stddev_Samp_Fields = {
  __typename?: 'metadata_column_info_stddev_samp_fields'
  character_maximum_length: Maybe<Scalars['Float']>
  character_octet_length: Maybe<Scalars['Float']>
  datetime_precision: Maybe<Scalars['Float']>
  interval_precision: Maybe<Scalars['Float']>
  maximum_cardinality: Maybe<Scalars['Float']>
  numeric_precision: Maybe<Scalars['Float']>
  numeric_precision_radix: Maybe<Scalars['Float']>
  numeric_scale: Maybe<Scalars['Float']>
  ordinal_position: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Stddev_Samp_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Metadata_Column_Info_Sum_Fields = {
  __typename?: 'metadata_column_info_sum_fields'
  character_maximum_length: Maybe<Scalars['Int']>
  character_octet_length: Maybe<Scalars['Int']>
  datetime_precision: Maybe<Scalars['Int']>
  interval_precision: Maybe<Scalars['Int']>
  maximum_cardinality: Maybe<Scalars['Int']>
  numeric_precision: Maybe<Scalars['Int']>
  numeric_precision_radix: Maybe<Scalars['Int']>
  numeric_scale: Maybe<Scalars['Int']>
  ordinal_position: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Sum_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
}

/** aggregate var_pop on columns */
export type Metadata_Column_Info_Var_Pop_Fields = {
  __typename?: 'metadata_column_info_var_pop_fields'
  character_maximum_length: Maybe<Scalars['Float']>
  character_octet_length: Maybe<Scalars['Float']>
  datetime_precision: Maybe<Scalars['Float']>
  interval_precision: Maybe<Scalars['Float']>
  maximum_cardinality: Maybe<Scalars['Float']>
  numeric_precision: Maybe<Scalars['Float']>
  numeric_precision_radix: Maybe<Scalars['Float']>
  numeric_scale: Maybe<Scalars['Float']>
  ordinal_position: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Var_Pop_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Metadata_Column_Info_Var_Samp_Fields = {
  __typename?: 'metadata_column_info_var_samp_fields'
  character_maximum_length: Maybe<Scalars['Float']>
  character_octet_length: Maybe<Scalars['Float']>
  datetime_precision: Maybe<Scalars['Float']>
  interval_precision: Maybe<Scalars['Float']>
  maximum_cardinality: Maybe<Scalars['Float']>
  numeric_precision: Maybe<Scalars['Float']>
  numeric_precision_radix: Maybe<Scalars['Float']>
  numeric_scale: Maybe<Scalars['Float']>
  ordinal_position: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Var_Samp_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Metadata_Column_Info_Variance_Fields = {
  __typename?: 'metadata_column_info_variance_fields'
  character_maximum_length: Maybe<Scalars['Float']>
  character_octet_length: Maybe<Scalars['Float']>
  datetime_precision: Maybe<Scalars['Float']>
  interval_precision: Maybe<Scalars['Float']>
  maximum_cardinality: Maybe<Scalars['Float']>
  numeric_precision: Maybe<Scalars['Float']>
  numeric_precision_radix: Maybe<Scalars['Float']>
  numeric_scale: Maybe<Scalars['Float']>
  ordinal_position: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "metadata.column_info" */
export type Metadata_Column_Info_Variance_Order_By = {
  character_maximum_length: Maybe<Order_By>
  character_octet_length: Maybe<Order_By>
  datetime_precision: Maybe<Order_By>
  interval_precision: Maybe<Order_By>
  maximum_cardinality: Maybe<Order_By>
  numeric_precision: Maybe<Order_By>
  numeric_precision_radix: Maybe<Order_By>
  numeric_scale: Maybe<Order_By>
  ordinal_position: Maybe<Order_By>
}

/** columns and relationships of "metadata.computed_field" */
export type Metadata_Computed_Field = {
  __typename?: 'metadata_computed_field'
  comment: Maybe<Scalars['String']>
  computedFieldName: Maybe<Scalars['String']>
  definition: Maybe<Scalars['jsonb']>
  id: Maybe<Scalars['String']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.computed_field" */
export type Metadata_Computed_FieldDefinitionArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.computed_field" */
export type Metadata_Computed_Field_Aggregate = {
  __typename?: 'metadata_computed_field_aggregate'
  aggregate: Maybe<Metadata_Computed_Field_Aggregate_Fields>
  nodes: Array<Metadata_Computed_Field>
}

/** aggregate fields of "metadata.computed_field" */
export type Metadata_Computed_Field_Aggregate_Fields = {
  __typename?: 'metadata_computed_field_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Computed_Field_Max_Fields>
  min: Maybe<Metadata_Computed_Field_Min_Fields>
}

/** aggregate fields of "metadata.computed_field" */
export type Metadata_Computed_Field_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Computed_Field_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.computed_field" */
export type Metadata_Computed_Field_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Computed_Field_Max_Order_By>
  min: Maybe<Metadata_Computed_Field_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Computed_Field_Append_Input = {
  definition: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "metadata.computed_field" */
export type Metadata_Computed_Field_Arr_Rel_Insert_Input = {
  data: Array<Metadata_Computed_Field_Insert_Input>
}

/** Boolean expression to filter rows from the table "metadata.computed_field". All fields are combined with a logical 'AND'. */
export type Metadata_Computed_Field_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Computed_Field_Bool_Exp>>>
  _not: Maybe<Metadata_Computed_Field_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Computed_Field_Bool_Exp>>>
  comment: Maybe<String_Comparison_Exp>
  computedFieldName: Maybe<String_Comparison_Exp>
  definition: Maybe<Jsonb_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<String_Comparison_Exp>
  tableSchema: Maybe<String_Comparison_Exp>
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metadata_Computed_Field_Delete_At_Path_Input = {
  definition: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metadata_Computed_Field_Delete_Elem_Input = {
  definition: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metadata_Computed_Field_Delete_Key_Input = {
  definition: Maybe<Scalars['String']>
}

/** input type for inserting data into table "metadata.computed_field" */
export type Metadata_Computed_Field_Insert_Input = {
  comment: Maybe<Scalars['String']>
  computedFieldName: Maybe<Scalars['String']>
  definition: Maybe<Scalars['jsonb']>
  id: Maybe<Scalars['String']>
  table: Maybe<Metadata_Table_Obj_Rel_Insert_Input>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Metadata_Computed_Field_Max_Fields = {
  __typename?: 'metadata_computed_field_max_fields'
  comment: Maybe<Scalars['String']>
  computedFieldName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.computed_field" */
export type Metadata_Computed_Field_Max_Order_By = {
  comment: Maybe<Order_By>
  computedFieldName: Maybe<Order_By>
  id: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Computed_Field_Min_Fields = {
  __typename?: 'metadata_computed_field_min_fields'
  comment: Maybe<Scalars['String']>
  computedFieldName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.computed_field" */
export type Metadata_Computed_Field_Min_Order_By = {
  comment: Maybe<Order_By>
  computedFieldName: Maybe<Order_By>
  id: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** response of any mutation on the table "metadata.computed_field" */
export type Metadata_Computed_Field_Mutation_Response = {
  __typename?: 'metadata_computed_field_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Metadata_Computed_Field>
}

/** input type for inserting object relation for remote table "metadata.computed_field" */
export type Metadata_Computed_Field_Obj_Rel_Insert_Input = {
  data: Metadata_Computed_Field_Insert_Input
}

/** ordering options when selecting data from "metadata.computed_field" */
export type Metadata_Computed_Field_Order_By = {
  comment: Maybe<Order_By>
  computedFieldName: Maybe<Order_By>
  definition: Maybe<Order_By>
  id: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Computed_Field_Prepend_Input = {
  definition: Maybe<Scalars['jsonb']>
}

/** select columns of table "metadata.computed_field" */
export enum Metadata_Computed_Field_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  ComputedFieldName = 'computedFieldName',
  /** column name */
  Definition = 'definition',
  /** column name */
  Id = 'id',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** input type for updating data in table "metadata.computed_field" */
export type Metadata_Computed_Field_Set_Input = {
  comment: Maybe<Scalars['String']>
  computedFieldName: Maybe<Scalars['String']>
  definition: Maybe<Scalars['jsonb']>
  id: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.computed_property" */
export type Metadata_Computed_Property = {
  __typename?: 'metadata_computed_property'
  id: Scalars['uuid']
  name: Scalars['String']
  /** tells whether the value can be null or not. If nullable, rxdb won't be able to sort it */
  nullable: Scalars['Boolean']
  table_id: Scalars['String']
  template: Maybe<Scalars['String']>
  transformation: Maybe<Scalars['String']>
  /** JSON schema type: string, number, array, object, boolean */
  type: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.computed_property" */
export type Metadata_Computed_Property_Aggregate = {
  __typename?: 'metadata_computed_property_aggregate'
  aggregate: Maybe<Metadata_Computed_Property_Aggregate_Fields>
  nodes: Array<Metadata_Computed_Property>
}

/** aggregate fields of "metadata.computed_property" */
export type Metadata_Computed_Property_Aggregate_Fields = {
  __typename?: 'metadata_computed_property_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Computed_Property_Max_Fields>
  min: Maybe<Metadata_Computed_Property_Min_Fields>
}

/** aggregate fields of "metadata.computed_property" */
export type Metadata_Computed_Property_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Computed_Property_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.computed_property" */
export type Metadata_Computed_Property_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Computed_Property_Max_Order_By>
  min: Maybe<Metadata_Computed_Property_Min_Order_By>
}

/** input type for inserting array relation for remote table "metadata.computed_property" */
export type Metadata_Computed_Property_Arr_Rel_Insert_Input = {
  data: Array<Metadata_Computed_Property_Insert_Input>
  on_conflict: Maybe<Metadata_Computed_Property_On_Conflict>
}

/** Boolean expression to filter rows from the table "metadata.computed_property". All fields are combined with a logical 'AND'. */
export type Metadata_Computed_Property_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Computed_Property_Bool_Exp>>>
  _not: Maybe<Metadata_Computed_Property_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Computed_Property_Bool_Exp>>>
  id: Maybe<Uuid_Comparison_Exp>
  name: Maybe<String_Comparison_Exp>
  nullable: Maybe<Boolean_Comparison_Exp>
  table_id: Maybe<String_Comparison_Exp>
  template: Maybe<String_Comparison_Exp>
  transformation: Maybe<String_Comparison_Exp>
  type: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "metadata.computed_property" */
export enum Metadata_Computed_Property_Constraint {
  /** unique or primary key constraint */
  ComputedPropertyPkey = 'computed_property_pkey'
}

/** input type for inserting data into table "metadata.computed_property" */
export type Metadata_Computed_Property_Insert_Input = {
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  nullable: Maybe<Scalars['Boolean']>
  table_id: Maybe<Scalars['String']>
  template: Maybe<Scalars['String']>
  transformation: Maybe<Scalars['String']>
  type: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Metadata_Computed_Property_Max_Fields = {
  __typename?: 'metadata_computed_property_max_fields'
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  template: Maybe<Scalars['String']>
  transformation: Maybe<Scalars['String']>
  type: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.computed_property" */
export type Metadata_Computed_Property_Max_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  table_id: Maybe<Order_By>
  template: Maybe<Order_By>
  transformation: Maybe<Order_By>
  type: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Computed_Property_Min_Fields = {
  __typename?: 'metadata_computed_property_min_fields'
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  template: Maybe<Scalars['String']>
  transformation: Maybe<Scalars['String']>
  type: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.computed_property" */
export type Metadata_Computed_Property_Min_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  table_id: Maybe<Order_By>
  template: Maybe<Order_By>
  transformation: Maybe<Order_By>
  type: Maybe<Order_By>
}

/** response of any mutation on the table "metadata.computed_property" */
export type Metadata_Computed_Property_Mutation_Response = {
  __typename?: 'metadata_computed_property_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Metadata_Computed_Property>
}

/** input type for inserting object relation for remote table "metadata.computed_property" */
export type Metadata_Computed_Property_Obj_Rel_Insert_Input = {
  data: Metadata_Computed_Property_Insert_Input
  on_conflict: Maybe<Metadata_Computed_Property_On_Conflict>
}

/** on conflict condition type for table "metadata.computed_property" */
export type Metadata_Computed_Property_On_Conflict = {
  constraint: Metadata_Computed_Property_Constraint
  update_columns: Array<Metadata_Computed_Property_Update_Column>
  where: Maybe<Metadata_Computed_Property_Bool_Exp>
}

/** ordering options when selecting data from "metadata.computed_property" */
export type Metadata_Computed_Property_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  nullable: Maybe<Order_By>
  table_id: Maybe<Order_By>
  template: Maybe<Order_By>
  transformation: Maybe<Order_By>
  type: Maybe<Order_By>
}

/** primary key columns input for table: "metadata.computed_property" */
export type Metadata_Computed_Property_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "metadata.computed_property" */
export enum Metadata_Computed_Property_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nullable = 'nullable',
  /** column name */
  TableId = 'table_id',
  /** column name */
  Template = 'template',
  /** column name */
  Transformation = 'transformation',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "metadata.computed_property" */
export type Metadata_Computed_Property_Set_Input = {
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  nullable: Maybe<Scalars['Boolean']>
  table_id: Maybe<Scalars['String']>
  template: Maybe<Scalars['String']>
  transformation: Maybe<Scalars['String']>
  type: Maybe<Scalars['String']>
}

/** update columns of table "metadata.computed_property" */
export enum Metadata_Computed_Property_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nullable = 'nullable',
  /** column name */
  TableId = 'table_id',
  /** column name */
  Template = 'template',
  /** column name */
  Transformation = 'transformation',
  /** column name */
  Type = 'type'
}

/** columns and relationships of "metadata.custom_type" */
export type Metadata_Custom_Type = {
  __typename?: 'metadata_custom_type'
  custom_types: Maybe<Scalars['jsonb']>
}

/** columns and relationships of "metadata.custom_type" */
export type Metadata_Custom_TypeCustom_TypesArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.custom_type" */
export type Metadata_Custom_Type_Aggregate = {
  __typename?: 'metadata_custom_type_aggregate'
  aggregate: Maybe<Metadata_Custom_Type_Aggregate_Fields>
  nodes: Array<Metadata_Custom_Type>
}

/** aggregate fields of "metadata.custom_type" */
export type Metadata_Custom_Type_Aggregate_Fields = {
  __typename?: 'metadata_custom_type_aggregate_fields'
  count: Maybe<Scalars['Int']>
}

/** aggregate fields of "metadata.custom_type" */
export type Metadata_Custom_Type_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Custom_Type_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.custom_type" */
export type Metadata_Custom_Type_Aggregate_Order_By = {
  count: Maybe<Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Custom_Type_Append_Input = {
  custom_types: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "metadata.custom_type" */
export type Metadata_Custom_Type_Arr_Rel_Insert_Input = {
  data: Array<Metadata_Custom_Type_Insert_Input>
}

/** Boolean expression to filter rows from the table "metadata.custom_type". All fields are combined with a logical 'AND'. */
export type Metadata_Custom_Type_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Custom_Type_Bool_Exp>>>
  _not: Maybe<Metadata_Custom_Type_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Custom_Type_Bool_Exp>>>
  custom_types: Maybe<Jsonb_Comparison_Exp>
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metadata_Custom_Type_Delete_At_Path_Input = {
  custom_types: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metadata_Custom_Type_Delete_Elem_Input = {
  custom_types: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metadata_Custom_Type_Delete_Key_Input = {
  custom_types: Maybe<Scalars['String']>
}

/** input type for inserting data into table "metadata.custom_type" */
export type Metadata_Custom_Type_Insert_Input = {
  custom_types: Maybe<Scalars['jsonb']>
}

/** response of any mutation on the table "metadata.custom_type" */
export type Metadata_Custom_Type_Mutation_Response = {
  __typename?: 'metadata_custom_type_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Metadata_Custom_Type>
}

/** input type for inserting object relation for remote table "metadata.custom_type" */
export type Metadata_Custom_Type_Obj_Rel_Insert_Input = {
  data: Metadata_Custom_Type_Insert_Input
}

/** ordering options when selecting data from "metadata.custom_type" */
export type Metadata_Custom_Type_Order_By = {
  custom_types: Maybe<Order_By>
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Custom_Type_Prepend_Input = {
  custom_types: Maybe<Scalars['jsonb']>
}

/** select columns of table "metadata.custom_type" */
export enum Metadata_Custom_Type_Select_Column {
  /** column name */
  CustomTypes = 'custom_types'
}

/** input type for updating data in table "metadata.custom_type" */
export type Metadata_Custom_Type_Set_Input = {
  custom_types: Maybe<Scalars['jsonb']>
}

/** columns and relationships of "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint = {
  __typename?: 'metadata_foreign_key_constraint'
  columnMapping: Maybe<Scalars['json']>
  columns: Maybe<Scalars['json']>
  contraintName: Maybe<Scalars['String']>
  contraintOid: Maybe<Scalars['Int']>
  id: Maybe<Scalars['String']>
  onDelete: Maybe<Scalars['String']>
  onUpdate: Maybe<Scalars['String']>
  refColumns: Maybe<Scalars['json']>
  refId: Maybe<Scalars['String']>
  refTableName: Maybe<Scalars['String']>
  refTableSchema: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_ConstraintColumnMappingArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_ConstraintColumnsArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_ConstraintRefColumnsArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Aggregate = {
  __typename?: 'metadata_foreign_key_constraint_aggregate'
  aggregate: Maybe<Metadata_Foreign_Key_Constraint_Aggregate_Fields>
  nodes: Array<Metadata_Foreign_Key_Constraint>
}

/** aggregate fields of "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Aggregate_Fields = {
  __typename?: 'metadata_foreign_key_constraint_aggregate_fields'
  avg: Maybe<Metadata_Foreign_Key_Constraint_Avg_Fields>
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Foreign_Key_Constraint_Max_Fields>
  min: Maybe<Metadata_Foreign_Key_Constraint_Min_Fields>
  stddev: Maybe<Metadata_Foreign_Key_Constraint_Stddev_Fields>
  stddev_pop: Maybe<Metadata_Foreign_Key_Constraint_Stddev_Pop_Fields>
  stddev_samp: Maybe<Metadata_Foreign_Key_Constraint_Stddev_Samp_Fields>
  sum: Maybe<Metadata_Foreign_Key_Constraint_Sum_Fields>
  var_pop: Maybe<Metadata_Foreign_Key_Constraint_Var_Pop_Fields>
  var_samp: Maybe<Metadata_Foreign_Key_Constraint_Var_Samp_Fields>
  variance: Maybe<Metadata_Foreign_Key_Constraint_Variance_Fields>
}

/** aggregate fields of "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Aggregate_Order_By = {
  avg: Maybe<Metadata_Foreign_Key_Constraint_Avg_Order_By>
  count: Maybe<Order_By>
  max: Maybe<Metadata_Foreign_Key_Constraint_Max_Order_By>
  min: Maybe<Metadata_Foreign_Key_Constraint_Min_Order_By>
  stddev: Maybe<Metadata_Foreign_Key_Constraint_Stddev_Order_By>
  stddev_pop: Maybe<Metadata_Foreign_Key_Constraint_Stddev_Pop_Order_By>
  stddev_samp: Maybe<Metadata_Foreign_Key_Constraint_Stddev_Samp_Order_By>
  sum: Maybe<Metadata_Foreign_Key_Constraint_Sum_Order_By>
  var_pop: Maybe<Metadata_Foreign_Key_Constraint_Var_Pop_Order_By>
  var_samp: Maybe<Metadata_Foreign_Key_Constraint_Var_Samp_Order_By>
  variance: Maybe<Metadata_Foreign_Key_Constraint_Variance_Order_By>
}

/** aggregate avg on columns */
export type Metadata_Foreign_Key_Constraint_Avg_Fields = {
  __typename?: 'metadata_foreign_key_constraint_avg_fields'
  contraintOid: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Avg_Order_By = {
  contraintOid: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "metadata.foreign_key_constraint". All fields are combined with a logical 'AND'. */
export type Metadata_Foreign_Key_Constraint_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>>>
  _not: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>>>
  columnMapping: Maybe<Json_Comparison_Exp>
  columns: Maybe<Json_Comparison_Exp>
  contraintName: Maybe<String_Comparison_Exp>
  contraintOid: Maybe<Int_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  onDelete: Maybe<String_Comparison_Exp>
  onUpdate: Maybe<String_Comparison_Exp>
  refColumns: Maybe<Json_Comparison_Exp>
  refId: Maybe<String_Comparison_Exp>
  refTableName: Maybe<String_Comparison_Exp>
  refTableSchema: Maybe<String_Comparison_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<String_Comparison_Exp>
  tableSchema: Maybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Foreign_Key_Constraint_Max_Fields = {
  __typename?: 'metadata_foreign_key_constraint_max_fields'
  contraintName: Maybe<Scalars['String']>
  contraintOid: Maybe<Scalars['Int']>
  id: Maybe<Scalars['String']>
  onDelete: Maybe<Scalars['String']>
  onUpdate: Maybe<Scalars['String']>
  refId: Maybe<Scalars['String']>
  refTableName: Maybe<Scalars['String']>
  refTableSchema: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Max_Order_By = {
  contraintName: Maybe<Order_By>
  contraintOid: Maybe<Order_By>
  id: Maybe<Order_By>
  onDelete: Maybe<Order_By>
  onUpdate: Maybe<Order_By>
  refId: Maybe<Order_By>
  refTableName: Maybe<Order_By>
  refTableSchema: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Foreign_Key_Constraint_Min_Fields = {
  __typename?: 'metadata_foreign_key_constraint_min_fields'
  contraintName: Maybe<Scalars['String']>
  contraintOid: Maybe<Scalars['Int']>
  id: Maybe<Scalars['String']>
  onDelete: Maybe<Scalars['String']>
  onUpdate: Maybe<Scalars['String']>
  refId: Maybe<Scalars['String']>
  refTableName: Maybe<Scalars['String']>
  refTableSchema: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['String']>
  tableSchema: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Min_Order_By = {
  contraintName: Maybe<Order_By>
  contraintOid: Maybe<Order_By>
  id: Maybe<Order_By>
  onDelete: Maybe<Order_By>
  onUpdate: Maybe<Order_By>
  refId: Maybe<Order_By>
  refTableName: Maybe<Order_By>
  refTableSchema: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Order_By = {
  columnMapping: Maybe<Order_By>
  columns: Maybe<Order_By>
  contraintName: Maybe<Order_By>
  contraintOid: Maybe<Order_By>
  id: Maybe<Order_By>
  onDelete: Maybe<Order_By>
  onUpdate: Maybe<Order_By>
  refColumns: Maybe<Order_By>
  refId: Maybe<Order_By>
  refTableName: Maybe<Order_By>
  refTableSchema: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.foreign_key_constraint" */
export enum Metadata_Foreign_Key_Constraint_Select_Column {
  /** column name */
  ColumnMapping = 'columnMapping',
  /** column name */
  Columns = 'columns',
  /** column name */
  ContraintName = 'contraintName',
  /** column name */
  ContraintOid = 'contraintOid',
  /** column name */
  Id = 'id',
  /** column name */
  OnDelete = 'onDelete',
  /** column name */
  OnUpdate = 'onUpdate',
  /** column name */
  RefColumns = 'refColumns',
  /** column name */
  RefId = 'refId',
  /** column name */
  RefTableName = 'refTableName',
  /** column name */
  RefTableSchema = 'refTableSchema',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** aggregate stddev on columns */
export type Metadata_Foreign_Key_Constraint_Stddev_Fields = {
  __typename?: 'metadata_foreign_key_constraint_stddev_fields'
  contraintOid: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Stddev_Order_By = {
  contraintOid: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Metadata_Foreign_Key_Constraint_Stddev_Pop_Fields = {
  __typename?: 'metadata_foreign_key_constraint_stddev_pop_fields'
  contraintOid: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Stddev_Pop_Order_By = {
  contraintOid: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Metadata_Foreign_Key_Constraint_Stddev_Samp_Fields = {
  __typename?: 'metadata_foreign_key_constraint_stddev_samp_fields'
  contraintOid: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Stddev_Samp_Order_By = {
  contraintOid: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Metadata_Foreign_Key_Constraint_Sum_Fields = {
  __typename?: 'metadata_foreign_key_constraint_sum_fields'
  contraintOid: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Sum_Order_By = {
  contraintOid: Maybe<Order_By>
}

/** aggregate var_pop on columns */
export type Metadata_Foreign_Key_Constraint_Var_Pop_Fields = {
  __typename?: 'metadata_foreign_key_constraint_var_pop_fields'
  contraintOid: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Var_Pop_Order_By = {
  contraintOid: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Metadata_Foreign_Key_Constraint_Var_Samp_Fields = {
  __typename?: 'metadata_foreign_key_constraint_var_samp_fields'
  contraintOid: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Var_Samp_Order_By = {
  contraintOid: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Metadata_Foreign_Key_Constraint_Variance_Fields = {
  __typename?: 'metadata_foreign_key_constraint_variance_fields'
  contraintOid: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "metadata.foreign_key_constraint" */
export type Metadata_Foreign_Key_Constraint_Variance_Order_By = {
  contraintOid: Maybe<Order_By>
}

/** columns and relationships of "metadata.function" */
export type Metadata_Function = {
  __typename?: 'metadata_function'
  configuration: Maybe<Scalars['jsonb']>
  function_name: Maybe<Scalars['String']>
  function_schema: Maybe<Scalars['String']>
  is_system_defined: Maybe<Scalars['Boolean']>
}

/** columns and relationships of "metadata.function" */
export type Metadata_FunctionConfigurationArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.function_agg" */
export type Metadata_Function_Agg = {
  __typename?: 'metadata_function_agg'
  default_args: Maybe<Scalars['smallint']>
  description: Maybe<Scalars['String']>
  function_definition: Maybe<Scalars['String']>
  function_name: Maybe<Scalars['String']>
  function_oid: Maybe<Scalars['Int']>
  function_schema: Maybe<Scalars['String']>
  function_type: Maybe<Scalars['String']>
  has_variadic: Maybe<Scalars['Boolean']>
  input_arg_names: Maybe<Scalars['json']>
  input_arg_types: Maybe<Scalars['json']>
  return_type_name: Maybe<Scalars['String']>
  return_type_schema: Maybe<Scalars['String']>
  return_type_type: Maybe<Scalars['String']>
  returns_set: Maybe<Scalars['Boolean']>
}

/** columns and relationships of "metadata.function_agg" */
export type Metadata_Function_AggInput_Arg_NamesArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.function_agg" */
export type Metadata_Function_AggInput_Arg_TypesArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.function_agg" */
export type Metadata_Function_Agg_Aggregate = {
  __typename?: 'metadata_function_agg_aggregate'
  aggregate: Maybe<Metadata_Function_Agg_Aggregate_Fields>
  nodes: Array<Metadata_Function_Agg>
}

/** aggregate fields of "metadata.function_agg" */
export type Metadata_Function_Agg_Aggregate_Fields = {
  __typename?: 'metadata_function_agg_aggregate_fields'
  avg: Maybe<Metadata_Function_Agg_Avg_Fields>
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Function_Agg_Max_Fields>
  min: Maybe<Metadata_Function_Agg_Min_Fields>
  stddev: Maybe<Metadata_Function_Agg_Stddev_Fields>
  stddev_pop: Maybe<Metadata_Function_Agg_Stddev_Pop_Fields>
  stddev_samp: Maybe<Metadata_Function_Agg_Stddev_Samp_Fields>
  sum: Maybe<Metadata_Function_Agg_Sum_Fields>
  var_pop: Maybe<Metadata_Function_Agg_Var_Pop_Fields>
  var_samp: Maybe<Metadata_Function_Agg_Var_Samp_Fields>
  variance: Maybe<Metadata_Function_Agg_Variance_Fields>
}

/** aggregate fields of "metadata.function_agg" */
export type Metadata_Function_Agg_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Function_Agg_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.function_agg" */
export type Metadata_Function_Agg_Aggregate_Order_By = {
  avg: Maybe<Metadata_Function_Agg_Avg_Order_By>
  count: Maybe<Order_By>
  max: Maybe<Metadata_Function_Agg_Max_Order_By>
  min: Maybe<Metadata_Function_Agg_Min_Order_By>
  stddev: Maybe<Metadata_Function_Agg_Stddev_Order_By>
  stddev_pop: Maybe<Metadata_Function_Agg_Stddev_Pop_Order_By>
  stddev_samp: Maybe<Metadata_Function_Agg_Stddev_Samp_Order_By>
  sum: Maybe<Metadata_Function_Agg_Sum_Order_By>
  var_pop: Maybe<Metadata_Function_Agg_Var_Pop_Order_By>
  var_samp: Maybe<Metadata_Function_Agg_Var_Samp_Order_By>
  variance: Maybe<Metadata_Function_Agg_Variance_Order_By>
}

/** aggregate avg on columns */
export type Metadata_Function_Agg_Avg_Fields = {
  __typename?: 'metadata_function_agg_avg_fields'
  default_args: Maybe<Scalars['Float']>
  function_oid: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Avg_Order_By = {
  default_args: Maybe<Order_By>
  function_oid: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "metadata.function_agg". All fields are combined with a logical 'AND'. */
export type Metadata_Function_Agg_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Function_Agg_Bool_Exp>>>
  _not: Maybe<Metadata_Function_Agg_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Function_Agg_Bool_Exp>>>
  default_args: Maybe<Smallint_Comparison_Exp>
  description: Maybe<String_Comparison_Exp>
  function_definition: Maybe<String_Comparison_Exp>
  function_name: Maybe<String_Comparison_Exp>
  function_oid: Maybe<Int_Comparison_Exp>
  function_schema: Maybe<String_Comparison_Exp>
  function_type: Maybe<String_Comparison_Exp>
  has_variadic: Maybe<Boolean_Comparison_Exp>
  input_arg_names: Maybe<Json_Comparison_Exp>
  input_arg_types: Maybe<Json_Comparison_Exp>
  return_type_name: Maybe<String_Comparison_Exp>
  return_type_schema: Maybe<String_Comparison_Exp>
  return_type_type: Maybe<String_Comparison_Exp>
  returns_set: Maybe<Boolean_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Function_Agg_Max_Fields = {
  __typename?: 'metadata_function_agg_max_fields'
  default_args: Maybe<Scalars['smallint']>
  description: Maybe<Scalars['String']>
  function_definition: Maybe<Scalars['String']>
  function_name: Maybe<Scalars['String']>
  function_oid: Maybe<Scalars['Int']>
  function_schema: Maybe<Scalars['String']>
  function_type: Maybe<Scalars['String']>
  return_type_name: Maybe<Scalars['String']>
  return_type_schema: Maybe<Scalars['String']>
  return_type_type: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Max_Order_By = {
  default_args: Maybe<Order_By>
  description: Maybe<Order_By>
  function_definition: Maybe<Order_By>
  function_name: Maybe<Order_By>
  function_oid: Maybe<Order_By>
  function_schema: Maybe<Order_By>
  function_type: Maybe<Order_By>
  return_type_name: Maybe<Order_By>
  return_type_schema: Maybe<Order_By>
  return_type_type: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Function_Agg_Min_Fields = {
  __typename?: 'metadata_function_agg_min_fields'
  default_args: Maybe<Scalars['smallint']>
  description: Maybe<Scalars['String']>
  function_definition: Maybe<Scalars['String']>
  function_name: Maybe<Scalars['String']>
  function_oid: Maybe<Scalars['Int']>
  function_schema: Maybe<Scalars['String']>
  function_type: Maybe<Scalars['String']>
  return_type_name: Maybe<Scalars['String']>
  return_type_schema: Maybe<Scalars['String']>
  return_type_type: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Min_Order_By = {
  default_args: Maybe<Order_By>
  description: Maybe<Order_By>
  function_definition: Maybe<Order_By>
  function_name: Maybe<Order_By>
  function_oid: Maybe<Order_By>
  function_schema: Maybe<Order_By>
  function_type: Maybe<Order_By>
  return_type_name: Maybe<Order_By>
  return_type_schema: Maybe<Order_By>
  return_type_type: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.function_agg" */
export type Metadata_Function_Agg_Order_By = {
  default_args: Maybe<Order_By>
  description: Maybe<Order_By>
  function_definition: Maybe<Order_By>
  function_name: Maybe<Order_By>
  function_oid: Maybe<Order_By>
  function_schema: Maybe<Order_By>
  function_type: Maybe<Order_By>
  has_variadic: Maybe<Order_By>
  input_arg_names: Maybe<Order_By>
  input_arg_types: Maybe<Order_By>
  return_type_name: Maybe<Order_By>
  return_type_schema: Maybe<Order_By>
  return_type_type: Maybe<Order_By>
  returns_set: Maybe<Order_By>
}

/** select columns of table "metadata.function_agg" */
export enum Metadata_Function_Agg_Select_Column {
  /** column name */
  DefaultArgs = 'default_args',
  /** column name */
  Description = 'description',
  /** column name */
  FunctionDefinition = 'function_definition',
  /** column name */
  FunctionName = 'function_name',
  /** column name */
  FunctionOid = 'function_oid',
  /** column name */
  FunctionSchema = 'function_schema',
  /** column name */
  FunctionType = 'function_type',
  /** column name */
  HasVariadic = 'has_variadic',
  /** column name */
  InputArgNames = 'input_arg_names',
  /** column name */
  InputArgTypes = 'input_arg_types',
  /** column name */
  ReturnTypeName = 'return_type_name',
  /** column name */
  ReturnTypeSchema = 'return_type_schema',
  /** column name */
  ReturnTypeType = 'return_type_type',
  /** column name */
  ReturnsSet = 'returns_set'
}

/** aggregate stddev on columns */
export type Metadata_Function_Agg_Stddev_Fields = {
  __typename?: 'metadata_function_agg_stddev_fields'
  default_args: Maybe<Scalars['Float']>
  function_oid: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Stddev_Order_By = {
  default_args: Maybe<Order_By>
  function_oid: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Metadata_Function_Agg_Stddev_Pop_Fields = {
  __typename?: 'metadata_function_agg_stddev_pop_fields'
  default_args: Maybe<Scalars['Float']>
  function_oid: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Stddev_Pop_Order_By = {
  default_args: Maybe<Order_By>
  function_oid: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Metadata_Function_Agg_Stddev_Samp_Fields = {
  __typename?: 'metadata_function_agg_stddev_samp_fields'
  default_args: Maybe<Scalars['Float']>
  function_oid: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Stddev_Samp_Order_By = {
  default_args: Maybe<Order_By>
  function_oid: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Metadata_Function_Agg_Sum_Fields = {
  __typename?: 'metadata_function_agg_sum_fields'
  default_args: Maybe<Scalars['smallint']>
  function_oid: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Sum_Order_By = {
  default_args: Maybe<Order_By>
  function_oid: Maybe<Order_By>
}

/** aggregate var_pop on columns */
export type Metadata_Function_Agg_Var_Pop_Fields = {
  __typename?: 'metadata_function_agg_var_pop_fields'
  default_args: Maybe<Scalars['Float']>
  function_oid: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Var_Pop_Order_By = {
  default_args: Maybe<Order_By>
  function_oid: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Metadata_Function_Agg_Var_Samp_Fields = {
  __typename?: 'metadata_function_agg_var_samp_fields'
  default_args: Maybe<Scalars['Float']>
  function_oid: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Var_Samp_Order_By = {
  default_args: Maybe<Order_By>
  function_oid: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Metadata_Function_Agg_Variance_Fields = {
  __typename?: 'metadata_function_agg_variance_fields'
  default_args: Maybe<Scalars['Float']>
  function_oid: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "metadata.function_agg" */
export type Metadata_Function_Agg_Variance_Order_By = {
  default_args: Maybe<Order_By>
  function_oid: Maybe<Order_By>
}

/** aggregated selection of "metadata.function" */
export type Metadata_Function_Aggregate = {
  __typename?: 'metadata_function_aggregate'
  aggregate: Maybe<Metadata_Function_Aggregate_Fields>
  nodes: Array<Metadata_Function>
}

/** aggregate fields of "metadata.function" */
export type Metadata_Function_Aggregate_Fields = {
  __typename?: 'metadata_function_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Function_Max_Fields>
  min: Maybe<Metadata_Function_Min_Fields>
}

/** aggregate fields of "metadata.function" */
export type Metadata_Function_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Function_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.function" */
export type Metadata_Function_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Function_Max_Order_By>
  min: Maybe<Metadata_Function_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Function_Append_Input = {
  configuration: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "metadata.function" */
export type Metadata_Function_Arr_Rel_Insert_Input = {
  data: Array<Metadata_Function_Insert_Input>
}

/** Boolean expression to filter rows from the table "metadata.function". All fields are combined with a logical 'AND'. */
export type Metadata_Function_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Function_Bool_Exp>>>
  _not: Maybe<Metadata_Function_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Function_Bool_Exp>>>
  configuration: Maybe<Jsonb_Comparison_Exp>
  function_name: Maybe<String_Comparison_Exp>
  function_schema: Maybe<String_Comparison_Exp>
  is_system_defined: Maybe<Boolean_Comparison_Exp>
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metadata_Function_Delete_At_Path_Input = {
  configuration: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metadata_Function_Delete_Elem_Input = {
  configuration: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metadata_Function_Delete_Key_Input = {
  configuration: Maybe<Scalars['String']>
}

/** input type for inserting data into table "metadata.function" */
export type Metadata_Function_Insert_Input = {
  configuration: Maybe<Scalars['jsonb']>
  function_name: Maybe<Scalars['String']>
  function_schema: Maybe<Scalars['String']>
  is_system_defined: Maybe<Scalars['Boolean']>
}

/** aggregate max on columns */
export type Metadata_Function_Max_Fields = {
  __typename?: 'metadata_function_max_fields'
  function_name: Maybe<Scalars['String']>
  function_schema: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.function" */
export type Metadata_Function_Max_Order_By = {
  function_name: Maybe<Order_By>
  function_schema: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Function_Min_Fields = {
  __typename?: 'metadata_function_min_fields'
  function_name: Maybe<Scalars['String']>
  function_schema: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.function" */
export type Metadata_Function_Min_Order_By = {
  function_name: Maybe<Order_By>
  function_schema: Maybe<Order_By>
}

/** response of any mutation on the table "metadata.function" */
export type Metadata_Function_Mutation_Response = {
  __typename?: 'metadata_function_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Metadata_Function>
}

/** input type for inserting object relation for remote table "metadata.function" */
export type Metadata_Function_Obj_Rel_Insert_Input = {
  data: Metadata_Function_Insert_Input
}

/** ordering options when selecting data from "metadata.function" */
export type Metadata_Function_Order_By = {
  configuration: Maybe<Order_By>
  function_name: Maybe<Order_By>
  function_schema: Maybe<Order_By>
  is_system_defined: Maybe<Order_By>
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Function_Prepend_Input = {
  configuration: Maybe<Scalars['jsonb']>
}

/** select columns of table "metadata.function" */
export enum Metadata_Function_Select_Column {
  /** column name */
  Configuration = 'configuration',
  /** column name */
  FunctionName = 'function_name',
  /** column name */
  FunctionSchema = 'function_schema',
  /** column name */
  IsSystemDefined = 'is_system_defined'
}

/** input type for updating data in table "metadata.function" */
export type Metadata_Function_Set_Input = {
  configuration: Maybe<Scalars['jsonb']>
  function_name: Maybe<Scalars['String']>
  function_schema: Maybe<Scalars['String']>
  is_system_defined: Maybe<Scalars['Boolean']>
}

/** columns and relationships of "metadata.index" */
export type Metadata_Index = {
  __typename?: 'metadata_index'
  /** An array relationship */
  columns: Array<Metadata_Index_Column>
  /** An aggregated array relationship */
  columns_aggregate: Metadata_Index_Column_Aggregate
  id: Maybe<Scalars['String']>
  name: Maybe<Scalars['name']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
}

/** columns and relationships of "metadata.index" */
export type Metadata_IndexColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Column_Order_By>>
  where: Maybe<Metadata_Index_Column_Bool_Exp>
}

/** columns and relationships of "metadata.index" */
export type Metadata_IndexColumns_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Column_Order_By>>
  where: Maybe<Metadata_Index_Column_Bool_Exp>
}

/** aggregated selection of "metadata.index" */
export type Metadata_Index_Aggregate = {
  __typename?: 'metadata_index_aggregate'
  aggregate: Maybe<Metadata_Index_Aggregate_Fields>
  nodes: Array<Metadata_Index>
}

/** aggregate fields of "metadata.index" */
export type Metadata_Index_Aggregate_Fields = {
  __typename?: 'metadata_index_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Index_Max_Fields>
  min: Maybe<Metadata_Index_Min_Fields>
}

/** aggregate fields of "metadata.index" */
export type Metadata_Index_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Index_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.index" */
export type Metadata_Index_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Index_Max_Order_By>
  min: Maybe<Metadata_Index_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.index". All fields are combined with a logical 'AND'. */
export type Metadata_Index_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Index_Bool_Exp>>>
  _not: Maybe<Metadata_Index_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Index_Bool_Exp>>>
  columns: Maybe<Metadata_Index_Column_Bool_Exp>
  id: Maybe<String_Comparison_Exp>
  name: Maybe<Name_Comparison_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
}

/** columns and relationships of "metadata.index_column" */
export type Metadata_Index_Column = {
  __typename?: 'metadata_index_column'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['name']>
  id: Maybe<Scalars['String']>
  indexId: Maybe<Scalars['String']>
  indexName: Maybe<Scalars['name']>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
}

/** aggregated selection of "metadata.index_column" */
export type Metadata_Index_Column_Aggregate = {
  __typename?: 'metadata_index_column_aggregate'
  aggregate: Maybe<Metadata_Index_Column_Aggregate_Fields>
  nodes: Array<Metadata_Index_Column>
}

/** aggregate fields of "metadata.index_column" */
export type Metadata_Index_Column_Aggregate_Fields = {
  __typename?: 'metadata_index_column_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Index_Column_Max_Fields>
  min: Maybe<Metadata_Index_Column_Min_Fields>
}

/** aggregate fields of "metadata.index_column" */
export type Metadata_Index_Column_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Index_Column_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.index_column" */
export type Metadata_Index_Column_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Index_Column_Max_Order_By>
  min: Maybe<Metadata_Index_Column_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.index_column". All fields are combined with a logical 'AND'. */
export type Metadata_Index_Column_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Index_Column_Bool_Exp>>>
  _not: Maybe<Metadata_Index_Column_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Index_Column_Bool_Exp>>>
  columnId: Maybe<String_Comparison_Exp>
  columnName: Maybe<Name_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  indexId: Maybe<String_Comparison_Exp>
  indexName: Maybe<Name_Comparison_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Index_Column_Max_Fields = {
  __typename?: 'metadata_index_column_max_fields'
  columnId: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  indexId: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.index_column" */
export type Metadata_Index_Column_Max_Order_By = {
  columnId: Maybe<Order_By>
  id: Maybe<Order_By>
  indexId: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Index_Column_Min_Fields = {
  __typename?: 'metadata_index_column_min_fields'
  columnId: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  indexId: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.index_column" */
export type Metadata_Index_Column_Min_Order_By = {
  columnId: Maybe<Order_By>
  id: Maybe<Order_By>
  indexId: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.index_column" */
export type Metadata_Index_Column_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  indexId: Maybe<Order_By>
  indexName: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.index_column" */
export enum Metadata_Index_Column_Select_Column {
  /** column name */
  ColumnId = 'columnId',
  /** column name */
  ColumnName = 'columnName',
  /** column name */
  Id = 'id',
  /** column name */
  IndexId = 'indexId',
  /** column name */
  IndexName = 'indexName',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** aggregate max on columns */
export type Metadata_Index_Max_Fields = {
  __typename?: 'metadata_index_max_fields'
  id: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.index" */
export type Metadata_Index_Max_Order_By = {
  id: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Index_Min_Fields = {
  __typename?: 'metadata_index_min_fields'
  id: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.index" */
export type Metadata_Index_Min_Order_By = {
  id: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.index" */
export type Metadata_Index_Order_By = {
  columns_aggregate: Maybe<Metadata_Index_Column_Aggregate_Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.index" */
export enum Metadata_Index_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** columns and relationships of "metadata.permission_agg" */
export type Metadata_Permission_Agg = {
  __typename?: 'metadata_permission_agg'
  id: Maybe<Scalars['String']>
  permissions: Maybe<Scalars['json']>
  /** An object relationship */
  role: Maybe<Metadata_Role>
  roleName: Maybe<Scalars['String']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
}

/** columns and relationships of "metadata.permission_agg" */
export type Metadata_Permission_AggPermissionsArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.permission_agg" */
export type Metadata_Permission_Agg_Aggregate = {
  __typename?: 'metadata_permission_agg_aggregate'
  aggregate: Maybe<Metadata_Permission_Agg_Aggregate_Fields>
  nodes: Array<Metadata_Permission_Agg>
}

/** aggregate fields of "metadata.permission_agg" */
export type Metadata_Permission_Agg_Aggregate_Fields = {
  __typename?: 'metadata_permission_agg_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Permission_Agg_Max_Fields>
  min: Maybe<Metadata_Permission_Agg_Min_Fields>
}

/** aggregate fields of "metadata.permission_agg" */
export type Metadata_Permission_Agg_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.permission_agg" */
export type Metadata_Permission_Agg_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Permission_Agg_Max_Order_By>
  min: Maybe<Metadata_Permission_Agg_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.permission_agg". All fields are combined with a logical 'AND'. */
export type Metadata_Permission_Agg_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Permission_Agg_Bool_Exp>>>
  _not: Maybe<Metadata_Permission_Agg_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Permission_Agg_Bool_Exp>>>
  id: Maybe<String_Comparison_Exp>
  permissions: Maybe<Json_Comparison_Exp>
  role: Maybe<Metadata_Role_Bool_Exp>
  roleName: Maybe<String_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Permission_Agg_Max_Fields = {
  __typename?: 'metadata_permission_agg_max_fields'
  id: Maybe<Scalars['String']>
  roleName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.permission_agg" */
export type Metadata_Permission_Agg_Max_Order_By = {
  id: Maybe<Order_By>
  roleName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Permission_Agg_Min_Fields = {
  __typename?: 'metadata_permission_agg_min_fields'
  id: Maybe<Scalars['String']>
  roleName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.permission_agg" */
export type Metadata_Permission_Agg_Min_Order_By = {
  id: Maybe<Order_By>
  roleName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.permission_agg" */
export type Metadata_Permission_Agg_Order_By = {
  id: Maybe<Order_By>
  permissions: Maybe<Order_By>
  role: Maybe<Metadata_Role_Order_By>
  roleName: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.permission_agg" */
export enum Metadata_Permission_Agg_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Permissions = 'permissions',
  /** column name */
  RoleName = 'roleName',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** columns and relationships of "metadata.permission_insert_columns" */
export type Metadata_Permission_Insert_Columns = {
  __typename?: 'metadata_permission_insert_columns'
  /** An object relationship */
  column: Maybe<Metadata_Column_Info>
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  /** An object relationship */
  role: Maybe<Metadata_Role>
  roleName: Maybe<Scalars['String']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
}

/** aggregated selection of "metadata.permission_insert_columns" */
export type Metadata_Permission_Insert_Columns_Aggregate = {
  __typename?: 'metadata_permission_insert_columns_aggregate'
  aggregate: Maybe<Metadata_Permission_Insert_Columns_Aggregate_Fields>
  nodes: Array<Metadata_Permission_Insert_Columns>
}

/** aggregate fields of "metadata.permission_insert_columns" */
export type Metadata_Permission_Insert_Columns_Aggregate_Fields = {
  __typename?: 'metadata_permission_insert_columns_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Permission_Insert_Columns_Max_Fields>
  min: Maybe<Metadata_Permission_Insert_Columns_Min_Fields>
}

/** aggregate fields of "metadata.permission_insert_columns" */
export type Metadata_Permission_Insert_Columns_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Permission_Insert_Columns_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.permission_insert_columns" */
export type Metadata_Permission_Insert_Columns_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Permission_Insert_Columns_Max_Order_By>
  min: Maybe<Metadata_Permission_Insert_Columns_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.permission_insert_columns". All fields are combined with a logical 'AND'. */
export type Metadata_Permission_Insert_Columns_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>>>
  _not: Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>>>
  column: Maybe<Metadata_Column_Info_Bool_Exp>
  columnId: Maybe<String_Comparison_Exp>
  columnName: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  role: Maybe<Metadata_Role_Bool_Exp>
  roleName: Maybe<String_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Permission_Insert_Columns_Max_Fields = {
  __typename?: 'metadata_permission_insert_columns_max_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  roleName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.permission_insert_columns" */
export type Metadata_Permission_Insert_Columns_Max_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  roleName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Permission_Insert_Columns_Min_Fields = {
  __typename?: 'metadata_permission_insert_columns_min_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  roleName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.permission_insert_columns" */
export type Metadata_Permission_Insert_Columns_Min_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  roleName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.permission_insert_columns" */
export type Metadata_Permission_Insert_Columns_Order_By = {
  column: Maybe<Metadata_Column_Info_Order_By>
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  role: Maybe<Metadata_Role_Order_By>
  roleName: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.permission_insert_columns" */
export enum Metadata_Permission_Insert_Columns_Select_Column {
  /** column name */
  ColumnId = 'columnId',
  /** column name */
  ColumnName = 'columnName',
  /** column name */
  Id = 'id',
  /** column name */
  RoleName = 'roleName',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** columns and relationships of "metadata.permission_select_columns" */
export type Metadata_Permission_Select_Columns = {
  __typename?: 'metadata_permission_select_columns'
  /** An object relationship */
  column: Maybe<Metadata_Column_Info>
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  /** An object relationship */
  role: Maybe<Metadata_Role>
  roleName: Maybe<Scalars['String']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
}

/** aggregated selection of "metadata.permission_select_columns" */
export type Metadata_Permission_Select_Columns_Aggregate = {
  __typename?: 'metadata_permission_select_columns_aggregate'
  aggregate: Maybe<Metadata_Permission_Select_Columns_Aggregate_Fields>
  nodes: Array<Metadata_Permission_Select_Columns>
}

/** aggregate fields of "metadata.permission_select_columns" */
export type Metadata_Permission_Select_Columns_Aggregate_Fields = {
  __typename?: 'metadata_permission_select_columns_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Permission_Select_Columns_Max_Fields>
  min: Maybe<Metadata_Permission_Select_Columns_Min_Fields>
}

/** aggregate fields of "metadata.permission_select_columns" */
export type Metadata_Permission_Select_Columns_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.permission_select_columns" */
export type Metadata_Permission_Select_Columns_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Permission_Select_Columns_Max_Order_By>
  min: Maybe<Metadata_Permission_Select_Columns_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.permission_select_columns". All fields are combined with a logical 'AND'. */
export type Metadata_Permission_Select_Columns_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Permission_Select_Columns_Bool_Exp>>>
  _not: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Permission_Select_Columns_Bool_Exp>>>
  column: Maybe<Metadata_Column_Info_Bool_Exp>
  columnId: Maybe<String_Comparison_Exp>
  columnName: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  role: Maybe<Metadata_Role_Bool_Exp>
  roleName: Maybe<String_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Permission_Select_Columns_Max_Fields = {
  __typename?: 'metadata_permission_select_columns_max_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  roleName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.permission_select_columns" */
export type Metadata_Permission_Select_Columns_Max_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  roleName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Permission_Select_Columns_Min_Fields = {
  __typename?: 'metadata_permission_select_columns_min_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  roleName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.permission_select_columns" */
export type Metadata_Permission_Select_Columns_Min_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  roleName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.permission_select_columns" */
export type Metadata_Permission_Select_Columns_Order_By = {
  column: Maybe<Metadata_Column_Info_Order_By>
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  role: Maybe<Metadata_Role_Order_By>
  roleName: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.permission_select_columns" */
export enum Metadata_Permission_Select_Columns_Select_Column {
  /** column name */
  ColumnId = 'columnId',
  /** column name */
  ColumnName = 'columnName',
  /** column name */
  Id = 'id',
  /** column name */
  RoleName = 'roleName',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** columns and relationships of "metadata.permission_update_columns" */
export type Metadata_Permission_Update_Columns = {
  __typename?: 'metadata_permission_update_columns'
  /** An object relationship */
  column: Maybe<Metadata_Column_Info>
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  /** An object relationship */
  role: Maybe<Metadata_Role>
  roleName: Maybe<Scalars['String']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
}

/** aggregated selection of "metadata.permission_update_columns" */
export type Metadata_Permission_Update_Columns_Aggregate = {
  __typename?: 'metadata_permission_update_columns_aggregate'
  aggregate: Maybe<Metadata_Permission_Update_Columns_Aggregate_Fields>
  nodes: Array<Metadata_Permission_Update_Columns>
}

/** aggregate fields of "metadata.permission_update_columns" */
export type Metadata_Permission_Update_Columns_Aggregate_Fields = {
  __typename?: 'metadata_permission_update_columns_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Permission_Update_Columns_Max_Fields>
  min: Maybe<Metadata_Permission_Update_Columns_Min_Fields>
}

/** aggregate fields of "metadata.permission_update_columns" */
export type Metadata_Permission_Update_Columns_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.permission_update_columns" */
export type Metadata_Permission_Update_Columns_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Permission_Update_Columns_Max_Order_By>
  min: Maybe<Metadata_Permission_Update_Columns_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.permission_update_columns". All fields are combined with a logical 'AND'. */
export type Metadata_Permission_Update_Columns_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Permission_Update_Columns_Bool_Exp>>>
  _not: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Permission_Update_Columns_Bool_Exp>>>
  column: Maybe<Metadata_Column_Info_Bool_Exp>
  columnId: Maybe<String_Comparison_Exp>
  columnName: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  role: Maybe<Metadata_Role_Bool_Exp>
  roleName: Maybe<String_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Permission_Update_Columns_Max_Fields = {
  __typename?: 'metadata_permission_update_columns_max_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  roleName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.permission_update_columns" */
export type Metadata_Permission_Update_Columns_Max_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  roleName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Permission_Update_Columns_Min_Fields = {
  __typename?: 'metadata_permission_update_columns_min_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  roleName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.permission_update_columns" */
export type Metadata_Permission_Update_Columns_Min_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  roleName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.permission_update_columns" */
export type Metadata_Permission_Update_Columns_Order_By = {
  column: Maybe<Metadata_Column_Info_Order_By>
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  role: Maybe<Metadata_Role_Order_By>
  roleName: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.permission_update_columns" */
export enum Metadata_Permission_Update_Columns_Select_Column {
  /** column name */
  ColumnId = 'columnId',
  /** column name */
  ColumnName = 'columnName',
  /** column name */
  Id = 'id',
  /** column name */
  RoleName = 'roleName',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** columns and relationships of "metadata.primary_key" */
export type Metadata_Primary_Key = {
  __typename?: 'metadata_primary_key'
  /** An array relationship */
  columns: Array<Metadata_Index_Column>
  /** An aggregated array relationship */
  columns_aggregate: Metadata_Index_Column_Aggregate
  constraintName: Maybe<Scalars['name']>
  id: Maybe<Scalars['name']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
}

/** columns and relationships of "metadata.primary_key" */
export type Metadata_Primary_KeyColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Column_Order_By>>
  where: Maybe<Metadata_Index_Column_Bool_Exp>
}

/** columns and relationships of "metadata.primary_key" */
export type Metadata_Primary_KeyColumns_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Column_Order_By>>
  where: Maybe<Metadata_Index_Column_Bool_Exp>
}

/** aggregated selection of "metadata.primary_key" */
export type Metadata_Primary_Key_Aggregate = {
  __typename?: 'metadata_primary_key_aggregate'
  aggregate: Maybe<Metadata_Primary_Key_Aggregate_Fields>
  nodes: Array<Metadata_Primary_Key>
}

/** aggregate fields of "metadata.primary_key" */
export type Metadata_Primary_Key_Aggregate_Fields = {
  __typename?: 'metadata_primary_key_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Primary_Key_Max_Fields>
  min: Maybe<Metadata_Primary_Key_Min_Fields>
}

/** aggregate fields of "metadata.primary_key" */
export type Metadata_Primary_Key_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Primary_Key_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.primary_key" */
export type Metadata_Primary_Key_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Primary_Key_Max_Order_By>
  min: Maybe<Metadata_Primary_Key_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.primary_key". All fields are combined with a logical 'AND'. */
export type Metadata_Primary_Key_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Primary_Key_Bool_Exp>>>
  _not: Maybe<Metadata_Primary_Key_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Primary_Key_Bool_Exp>>>
  columns: Maybe<Metadata_Index_Column_Bool_Exp>
  constraintName: Maybe<Name_Comparison_Exp>
  id: Maybe<Name_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
}

/** columns and relationships of "metadata.primary_key_column" */
export type Metadata_Primary_Key_Column = {
  __typename?: 'metadata_primary_key_column'
  /** An object relationship */
  column: Maybe<Metadata_Column_Info>
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  constraintName: Maybe<Scalars['name']>
  id: Maybe<Scalars['name']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
}

/** aggregated selection of "metadata.primary_key_column" */
export type Metadata_Primary_Key_Column_Aggregate = {
  __typename?: 'metadata_primary_key_column_aggregate'
  aggregate: Maybe<Metadata_Primary_Key_Column_Aggregate_Fields>
  nodes: Array<Metadata_Primary_Key_Column>
}

/** aggregate fields of "metadata.primary_key_column" */
export type Metadata_Primary_Key_Column_Aggregate_Fields = {
  __typename?: 'metadata_primary_key_column_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Primary_Key_Column_Max_Fields>
  min: Maybe<Metadata_Primary_Key_Column_Min_Fields>
}

/** aggregate fields of "metadata.primary_key_column" */
export type Metadata_Primary_Key_Column_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Primary_Key_Column_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.primary_key_column" */
export type Metadata_Primary_Key_Column_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Primary_Key_Column_Max_Order_By>
  min: Maybe<Metadata_Primary_Key_Column_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.primary_key_column". All fields are combined with a logical 'AND'. */
export type Metadata_Primary_Key_Column_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Primary_Key_Column_Bool_Exp>>>
  _not: Maybe<Metadata_Primary_Key_Column_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Primary_Key_Column_Bool_Exp>>>
  column: Maybe<Metadata_Column_Info_Bool_Exp>
  columnId: Maybe<String_Comparison_Exp>
  columnName: Maybe<String_Comparison_Exp>
  constraintName: Maybe<Name_Comparison_Exp>
  id: Maybe<Name_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Primary_Key_Column_Max_Fields = {
  __typename?: 'metadata_primary_key_column_max_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.primary_key_column" */
export type Metadata_Primary_Key_Column_Max_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Primary_Key_Column_Min_Fields = {
  __typename?: 'metadata_primary_key_column_min_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.primary_key_column" */
export type Metadata_Primary_Key_Column_Min_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.primary_key_column" */
export type Metadata_Primary_Key_Column_Order_By = {
  column: Maybe<Metadata_Column_Info_Order_By>
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  constraintName: Maybe<Order_By>
  id: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.primary_key_column" */
export enum Metadata_Primary_Key_Column_Select_Column {
  /** column name */
  ColumnId = 'columnId',
  /** column name */
  ColumnName = 'columnName',
  /** column name */
  ConstraintName = 'constraintName',
  /** column name */
  Id = 'id',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** aggregate max on columns */
export type Metadata_Primary_Key_Max_Fields = {
  __typename?: 'metadata_primary_key_max_fields'
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.primary_key" */
export type Metadata_Primary_Key_Max_Order_By = {
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Primary_Key_Min_Fields = {
  __typename?: 'metadata_primary_key_min_fields'
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.primary_key" */
export type Metadata_Primary_Key_Min_Order_By = {
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.primary_key" */
export type Metadata_Primary_Key_Order_By = {
  columns_aggregate: Maybe<Metadata_Index_Column_Aggregate_Order_By>
  constraintName: Maybe<Order_By>
  id: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
}

/** select columns of table "metadata.primary_key" */
export enum Metadata_Primary_Key_Select_Column {
  /** column name */
  ConstraintName = 'constraintName',
  /** column name */
  Id = 'id',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema'
}

/** columns and relationships of "metadata.property_config" */
export type Metadata_Property_Config = {
  __typename?: 'metadata_property_config'
  component: Maybe<Scalars['String']>
  deleted: Scalars['Boolean']
  description: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  /** table_schema.table_name.property_name */
  id: Scalars['String']
  json_schema: Maybe<Scalars['jsonb']>
  property_name: Scalars['String']
  table_id: Scalars['String']
  title: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** columns and relationships of "metadata.property_config" */
export type Metadata_Property_ConfigJson_SchemaArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.property_config" */
export type Metadata_Property_Config_Aggregate = {
  __typename?: 'metadata_property_config_aggregate'
  aggregate: Maybe<Metadata_Property_Config_Aggregate_Fields>
  nodes: Array<Metadata_Property_Config>
}

/** aggregate fields of "metadata.property_config" */
export type Metadata_Property_Config_Aggregate_Fields = {
  __typename?: 'metadata_property_config_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Property_Config_Max_Fields>
  min: Maybe<Metadata_Property_Config_Min_Fields>
}

/** aggregate fields of "metadata.property_config" */
export type Metadata_Property_Config_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Property_Config_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.property_config" */
export type Metadata_Property_Config_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Property_Config_Max_Order_By>
  min: Maybe<Metadata_Property_Config_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Property_Config_Append_Input = {
  json_schema: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "metadata.property_config" */
export type Metadata_Property_Config_Arr_Rel_Insert_Input = {
  data: Array<Metadata_Property_Config_Insert_Input>
  on_conflict: Maybe<Metadata_Property_Config_On_Conflict>
}

/** Boolean expression to filter rows from the table "metadata.property_config". All fields are combined with a logical 'AND'. */
export type Metadata_Property_Config_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Property_Config_Bool_Exp>>>
  _not: Maybe<Metadata_Property_Config_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Property_Config_Bool_Exp>>>
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

/** unique or primary key constraints on table "metadata.property_config" */
export enum Metadata_Property_Config_Constraint {
  /** unique or primary key constraint */
  PropertyConfigPkey = 'property_config_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metadata_Property_Config_Delete_At_Path_Input = {
  json_schema: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metadata_Property_Config_Delete_Elem_Input = {
  json_schema: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metadata_Property_Config_Delete_Key_Input = {
  json_schema: Maybe<Scalars['String']>
}

/** input type for inserting data into table "metadata.property_config" */
export type Metadata_Property_Config_Insert_Input = {
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
export type Metadata_Property_Config_Max_Fields = {
  __typename?: 'metadata_property_config_max_fields'
  component: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  property_name: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "metadata.property_config" */
export type Metadata_Property_Config_Max_Order_By = {
  component: Maybe<Order_By>
  description: Maybe<Order_By>
  icon: Maybe<Order_By>
  id: Maybe<Order_By>
  property_name: Maybe<Order_By>
  table_id: Maybe<Order_By>
  title: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Property_Config_Min_Fields = {
  __typename?: 'metadata_property_config_min_fields'
  component: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  property_name: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "metadata.property_config" */
export type Metadata_Property_Config_Min_Order_By = {
  component: Maybe<Order_By>
  description: Maybe<Order_By>
  icon: Maybe<Order_By>
  id: Maybe<Order_By>
  property_name: Maybe<Order_By>
  table_id: Maybe<Order_By>
  title: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** response of any mutation on the table "metadata.property_config" */
export type Metadata_Property_Config_Mutation_Response = {
  __typename?: 'metadata_property_config_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Metadata_Property_Config>
}

/** input type for inserting object relation for remote table "metadata.property_config" */
export type Metadata_Property_Config_Obj_Rel_Insert_Input = {
  data: Metadata_Property_Config_Insert_Input
  on_conflict: Maybe<Metadata_Property_Config_On_Conflict>
}

/** on conflict condition type for table "metadata.property_config" */
export type Metadata_Property_Config_On_Conflict = {
  constraint: Metadata_Property_Config_Constraint
  update_columns: Array<Metadata_Property_Config_Update_Column>
  where: Maybe<Metadata_Property_Config_Bool_Exp>
}

/** ordering options when selecting data from "metadata.property_config" */
export type Metadata_Property_Config_Order_By = {
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

/** primary key columns input for table: "metadata.property_config" */
export type Metadata_Property_Config_Pk_Columns_Input = {
  /** table_schema.table_name.property_name */
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Property_Config_Prepend_Input = {
  json_schema: Maybe<Scalars['jsonb']>
}

/** select columns of table "metadata.property_config" */
export enum Metadata_Property_Config_Select_Column {
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

/** input type for updating data in table "metadata.property_config" */
export type Metadata_Property_Config_Set_Input = {
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

/** update columns of table "metadata.property_config" */
export enum Metadata_Property_Config_Update_Column {
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

/** columns and relationships of "metadata.relationship" */
export type Metadata_Relationship = {
  __typename?: 'metadata_relationship'
  comment: Maybe<Scalars['String']>
  definition: Maybe<Scalars['jsonb']>
  id: Maybe<Scalars['String']>
  isSystemDefined: Maybe<Scalars['Boolean']>
  /** An array relationship */
  mapping: Array<Metadata_Relationship_Mapping>
  /** An aggregated array relationship */
  mapping_aggregate: Metadata_Relationship_Mapping_Aggregate
  name: Maybe<Scalars['String']>
  /** An object relationship */
  remoteTable: Maybe<Metadata_Table>
  remoteTableId: Maybe<Scalars['String']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
  tableSchema: Maybe<Scalars['name']>
  type: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.relationship" */
export type Metadata_RelationshipDefinitionArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.relationship" */
export type Metadata_RelationshipMappingArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Mapping_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Mapping_Order_By>>
  where: Maybe<Metadata_Relationship_Mapping_Bool_Exp>
}

/** columns and relationships of "metadata.relationship" */
export type Metadata_RelationshipMapping_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Mapping_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Mapping_Order_By>>
  where: Maybe<Metadata_Relationship_Mapping_Bool_Exp>
}

/** aggregated selection of "metadata.relationship" */
export type Metadata_Relationship_Aggregate = {
  __typename?: 'metadata_relationship_aggregate'
  aggregate: Maybe<Metadata_Relationship_Aggregate_Fields>
  nodes: Array<Metadata_Relationship>
}

/** aggregate fields of "metadata.relationship" */
export type Metadata_Relationship_Aggregate_Fields = {
  __typename?: 'metadata_relationship_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Relationship_Max_Fields>
  min: Maybe<Metadata_Relationship_Min_Fields>
}

/** aggregate fields of "metadata.relationship" */
export type Metadata_Relationship_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Relationship_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.relationship" */
export type Metadata_Relationship_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Relationship_Max_Order_By>
  min: Maybe<Metadata_Relationship_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Relationship_Append_Input = {
  definition: Maybe<Scalars['jsonb']>
}

/** Boolean expression to filter rows from the table "metadata.relationship". All fields are combined with a logical 'AND'. */
export type Metadata_Relationship_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Relationship_Bool_Exp>>>
  _not: Maybe<Metadata_Relationship_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Relationship_Bool_Exp>>>
  comment: Maybe<String_Comparison_Exp>
  definition: Maybe<Jsonb_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  isSystemDefined: Maybe<Boolean_Comparison_Exp>
  mapping: Maybe<Metadata_Relationship_Mapping_Bool_Exp>
  name: Maybe<String_Comparison_Exp>
  remoteTable: Maybe<Metadata_Table_Bool_Exp>
  remoteTableId: Maybe<String_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
  tableSchema: Maybe<Name_Comparison_Exp>
  type: Maybe<String_Comparison_Exp>
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metadata_Relationship_Delete_At_Path_Input = {
  definition: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metadata_Relationship_Delete_Elem_Input = {
  definition: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metadata_Relationship_Delete_Key_Input = {
  definition: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.relationship_mapping" */
export type Metadata_Relationship_Mapping = {
  __typename?: 'metadata_relationship_mapping'
  /** An object relationship */
  column: Maybe<Metadata_Column_Info>
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  relationId: Maybe<Scalars['String']>
  relationName: Maybe<Scalars['String']>
  /** An object relationship */
  relationship: Maybe<Metadata_Relationship>
  /** An object relationship */
  remoteColumn: Maybe<Metadata_Column_Info>
  remoteColumnId: Maybe<Scalars['String']>
  remoteColumnName: Maybe<Scalars['String']>
  remoteSchemaName: Maybe<Scalars['String']>
  /** An object relationship */
  remoteTable: Maybe<Metadata_Table>
  remoteTableId: Maybe<Scalars['String']>
  remoteTableName: Maybe<Scalars['String']>
  schemaName: Maybe<Scalars['name']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  tableId: Maybe<Scalars['String']>
  tableName: Maybe<Scalars['name']>
}

/** aggregated selection of "metadata.relationship_mapping" */
export type Metadata_Relationship_Mapping_Aggregate = {
  __typename?: 'metadata_relationship_mapping_aggregate'
  aggregate: Maybe<Metadata_Relationship_Mapping_Aggregate_Fields>
  nodes: Array<Metadata_Relationship_Mapping>
}

/** aggregate fields of "metadata.relationship_mapping" */
export type Metadata_Relationship_Mapping_Aggregate_Fields = {
  __typename?: 'metadata_relationship_mapping_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Relationship_Mapping_Max_Fields>
  min: Maybe<Metadata_Relationship_Mapping_Min_Fields>
}

/** aggregate fields of "metadata.relationship_mapping" */
export type Metadata_Relationship_Mapping_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Relationship_Mapping_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.relationship_mapping" */
export type Metadata_Relationship_Mapping_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Relationship_Mapping_Max_Order_By>
  min: Maybe<Metadata_Relationship_Mapping_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.relationship_mapping". All fields are combined with a logical 'AND'. */
export type Metadata_Relationship_Mapping_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Relationship_Mapping_Bool_Exp>>>
  _not: Maybe<Metadata_Relationship_Mapping_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Relationship_Mapping_Bool_Exp>>>
  column: Maybe<Metadata_Column_Info_Bool_Exp>
  columnId: Maybe<String_Comparison_Exp>
  columnName: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  relationId: Maybe<String_Comparison_Exp>
  relationName: Maybe<String_Comparison_Exp>
  relationship: Maybe<Metadata_Relationship_Bool_Exp>
  remoteColumn: Maybe<Metadata_Column_Info_Bool_Exp>
  remoteColumnId: Maybe<String_Comparison_Exp>
  remoteColumnName: Maybe<String_Comparison_Exp>
  remoteSchemaName: Maybe<String_Comparison_Exp>
  remoteTable: Maybe<Metadata_Table_Bool_Exp>
  remoteTableId: Maybe<String_Comparison_Exp>
  remoteTableName: Maybe<String_Comparison_Exp>
  schemaName: Maybe<Name_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  tableId: Maybe<String_Comparison_Exp>
  tableName: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Relationship_Mapping_Max_Fields = {
  __typename?: 'metadata_relationship_mapping_max_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  relationId: Maybe<Scalars['String']>
  relationName: Maybe<Scalars['String']>
  remoteColumnId: Maybe<Scalars['String']>
  remoteColumnName: Maybe<Scalars['String']>
  remoteSchemaName: Maybe<Scalars['String']>
  remoteTableId: Maybe<Scalars['String']>
  remoteTableName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.relationship_mapping" */
export type Metadata_Relationship_Mapping_Max_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  relationId: Maybe<Order_By>
  relationName: Maybe<Order_By>
  remoteColumnId: Maybe<Order_By>
  remoteColumnName: Maybe<Order_By>
  remoteSchemaName: Maybe<Order_By>
  remoteTableId: Maybe<Order_By>
  remoteTableName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Relationship_Mapping_Min_Fields = {
  __typename?: 'metadata_relationship_mapping_min_fields'
  columnId: Maybe<Scalars['String']>
  columnName: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  relationId: Maybe<Scalars['String']>
  relationName: Maybe<Scalars['String']>
  remoteColumnId: Maybe<Scalars['String']>
  remoteColumnName: Maybe<Scalars['String']>
  remoteSchemaName: Maybe<Scalars['String']>
  remoteTableId: Maybe<Scalars['String']>
  remoteTableName: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.relationship_mapping" */
export type Metadata_Relationship_Mapping_Min_Order_By = {
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  relationId: Maybe<Order_By>
  relationName: Maybe<Order_By>
  remoteColumnId: Maybe<Order_By>
  remoteColumnName: Maybe<Order_By>
  remoteSchemaName: Maybe<Order_By>
  remoteTableId: Maybe<Order_By>
  remoteTableName: Maybe<Order_By>
  tableId: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.relationship_mapping" */
export type Metadata_Relationship_Mapping_Order_By = {
  column: Maybe<Metadata_Column_Info_Order_By>
  columnId: Maybe<Order_By>
  columnName: Maybe<Order_By>
  id: Maybe<Order_By>
  relationId: Maybe<Order_By>
  relationName: Maybe<Order_By>
  relationship: Maybe<Metadata_Relationship_Order_By>
  remoteColumn: Maybe<Metadata_Column_Info_Order_By>
  remoteColumnId: Maybe<Order_By>
  remoteColumnName: Maybe<Order_By>
  remoteSchemaName: Maybe<Order_By>
  remoteTable: Maybe<Metadata_Table_Order_By>
  remoteTableId: Maybe<Order_By>
  remoteTableName: Maybe<Order_By>
  schemaName: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
}

/** select columns of table "metadata.relationship_mapping" */
export enum Metadata_Relationship_Mapping_Select_Column {
  /** column name */
  ColumnId = 'columnId',
  /** column name */
  ColumnName = 'columnName',
  /** column name */
  Id = 'id',
  /** column name */
  RelationId = 'relationId',
  /** column name */
  RelationName = 'relationName',
  /** column name */
  RemoteColumnId = 'remoteColumnId',
  /** column name */
  RemoteColumnName = 'remoteColumnName',
  /** column name */
  RemoteSchemaName = 'remoteSchemaName',
  /** column name */
  RemoteTableId = 'remoteTableId',
  /** column name */
  RemoteTableName = 'remoteTableName',
  /** column name */
  SchemaName = 'schemaName',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName'
}

/** aggregate max on columns */
export type Metadata_Relationship_Max_Fields = {
  __typename?: 'metadata_relationship_max_fields'
  comment: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  remoteTableId: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  type: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.relationship" */
export type Metadata_Relationship_Max_Order_By = {
  comment: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  remoteTableId: Maybe<Order_By>
  tableId: Maybe<Order_By>
  type: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Relationship_Min_Fields = {
  __typename?: 'metadata_relationship_min_fields'
  comment: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  remoteTableId: Maybe<Scalars['String']>
  tableId: Maybe<Scalars['String']>
  type: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.relationship" */
export type Metadata_Relationship_Min_Order_By = {
  comment: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  remoteTableId: Maybe<Order_By>
  tableId: Maybe<Order_By>
  type: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.relationship" */
export type Metadata_Relationship_Order_By = {
  comment: Maybe<Order_By>
  definition: Maybe<Order_By>
  id: Maybe<Order_By>
  isSystemDefined: Maybe<Order_By>
  mapping_aggregate: Maybe<Metadata_Relationship_Mapping_Aggregate_Order_By>
  name: Maybe<Order_By>
  remoteTable: Maybe<Metadata_Table_Order_By>
  remoteTableId: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  tableId: Maybe<Order_By>
  tableName: Maybe<Order_By>
  tableSchema: Maybe<Order_By>
  type: Maybe<Order_By>
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Relationship_Prepend_Input = {
  definition: Maybe<Scalars['jsonb']>
}

/** select columns of table "metadata.relationship" */
export enum Metadata_Relationship_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Definition = 'definition',
  /** column name */
  Id = 'id',
  /** column name */
  IsSystemDefined = 'isSystemDefined',
  /** column name */
  Name = 'name',
  /** column name */
  RemoteTableId = 'remoteTableId',
  /** column name */
  TableId = 'tableId',
  /** column name */
  TableName = 'tableName',
  /** column name */
  TableSchema = 'tableSchema',
  /** column name */
  Type = 'type'
}

/** columns and relationships of "metadata.role" */
export type Metadata_Role = {
  __typename?: 'metadata_role'
  /** An object relationship */
  appRole: Maybe<Auth_Roles>
  id: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
  /** An array relationship */
  permissions: Array<Metadata_Permission_Agg>
  /** An aggregated array relationship */
  permissions_aggregate: Metadata_Permission_Agg_Aggregate
}

/** columns and relationships of "metadata.role" */
export type Metadata_RolePermissionsArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Agg_Order_By>>
  where: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** columns and relationships of "metadata.role" */
export type Metadata_RolePermissions_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Agg_Order_By>>
  where: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** aggregated selection of "metadata.role" */
export type Metadata_Role_Aggregate = {
  __typename?: 'metadata_role_aggregate'
  aggregate: Maybe<Metadata_Role_Aggregate_Fields>
  nodes: Array<Metadata_Role>
}

/** aggregate fields of "metadata.role" */
export type Metadata_Role_Aggregate_Fields = {
  __typename?: 'metadata_role_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Role_Max_Fields>
  min: Maybe<Metadata_Role_Min_Fields>
}

/** aggregate fields of "metadata.role" */
export type Metadata_Role_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Role_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.role" */
export type Metadata_Role_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Role_Max_Order_By>
  min: Maybe<Metadata_Role_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.role". All fields are combined with a logical 'AND'. */
export type Metadata_Role_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Role_Bool_Exp>>>
  _not: Maybe<Metadata_Role_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Role_Bool_Exp>>>
  appRole: Maybe<Auth_Roles_Bool_Exp>
  id: Maybe<String_Comparison_Exp>
  name: Maybe<String_Comparison_Exp>
  permissions: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** aggregate max on columns */
export type Metadata_Role_Max_Fields = {
  __typename?: 'metadata_role_max_fields'
  id: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.role" */
export type Metadata_Role_Max_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Role_Min_Fields = {
  __typename?: 'metadata_role_min_fields'
  id: Maybe<Scalars['String']>
  name: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.role" */
export type Metadata_Role_Min_Order_By = {
  id: Maybe<Order_By>
  name: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.role" */
export type Metadata_Role_Order_By = {
  appRole: Maybe<Auth_Roles_Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  permissions_aggregate: Maybe<Metadata_Permission_Agg_Aggregate_Order_By>
}

/** select columns of table "metadata.role" */
export enum Metadata_Role_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** columns and relationships of "metadata.schema_info" */
export type Metadata_Schema_Info = {
  __typename?: 'metadata_schema_info'
  catalog_name: Maybe<Scalars['name']>
  default_character_set_catalog: Maybe<Scalars['name']>
  default_character_set_name: Maybe<Scalars['name']>
  default_character_set_schema: Maybe<Scalars['name']>
  schema_name: Maybe<Scalars['name']>
  schema_owner: Maybe<Scalars['name']>
  sql_path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.schema_info" */
export type Metadata_Schema_Info_Aggregate = {
  __typename?: 'metadata_schema_info_aggregate'
  aggregate: Maybe<Metadata_Schema_Info_Aggregate_Fields>
  nodes: Array<Metadata_Schema_Info>
}

/** aggregate fields of "metadata.schema_info" */
export type Metadata_Schema_Info_Aggregate_Fields = {
  __typename?: 'metadata_schema_info_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Schema_Info_Max_Fields>
  min: Maybe<Metadata_Schema_Info_Min_Fields>
}

/** aggregate fields of "metadata.schema_info" */
export type Metadata_Schema_Info_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Schema_Info_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.schema_info" */
export type Metadata_Schema_Info_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Schema_Info_Max_Order_By>
  min: Maybe<Metadata_Schema_Info_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.schema_info". All fields are combined with a logical 'AND'. */
export type Metadata_Schema_Info_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Schema_Info_Bool_Exp>>>
  _not: Maybe<Metadata_Schema_Info_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Schema_Info_Bool_Exp>>>
  catalog_name: Maybe<Name_Comparison_Exp>
  default_character_set_catalog: Maybe<Name_Comparison_Exp>
  default_character_set_name: Maybe<Name_Comparison_Exp>
  default_character_set_schema: Maybe<Name_Comparison_Exp>
  schema_name: Maybe<Name_Comparison_Exp>
  schema_owner: Maybe<Name_Comparison_Exp>
  sql_path: Maybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Schema_Info_Max_Fields = {
  __typename?: 'metadata_schema_info_max_fields'
  sql_path: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.schema_info" */
export type Metadata_Schema_Info_Max_Order_By = {
  sql_path: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Schema_Info_Min_Fields = {
  __typename?: 'metadata_schema_info_min_fields'
  sql_path: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.schema_info" */
export type Metadata_Schema_Info_Min_Order_By = {
  sql_path: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.schema_info" */
export type Metadata_Schema_Info_Order_By = {
  catalog_name: Maybe<Order_By>
  default_character_set_catalog: Maybe<Order_By>
  default_character_set_name: Maybe<Order_By>
  default_character_set_schema: Maybe<Order_By>
  schema_name: Maybe<Order_By>
  schema_owner: Maybe<Order_By>
  sql_path: Maybe<Order_By>
}

/** select columns of table "metadata.schema_info" */
export enum Metadata_Schema_Info_Select_Column {
  /** column name */
  CatalogName = 'catalog_name',
  /** column name */
  DefaultCharacterSetCatalog = 'default_character_set_catalog',
  /** column name */
  DefaultCharacterSetName = 'default_character_set_name',
  /** column name */
  DefaultCharacterSetSchema = 'default_character_set_schema',
  /** column name */
  SchemaName = 'schema_name',
  /** column name */
  SchemaOwner = 'schema_owner',
  /** column name */
  SqlPath = 'sql_path'
}

/** columns and relationships of "metadata.table" */
export type Metadata_Table = {
  __typename?: 'metadata_table'
  _properties_config__old: Maybe<Scalars['jsonb']>
  /** An array relationship */
  canInsert: Array<Metadata_Permission_Insert_Columns>
  /** An aggregated array relationship */
  canInsert_aggregate: Metadata_Permission_Insert_Columns_Aggregate
  /** An array relationship */
  canSelect: Array<Metadata_Permission_Select_Columns>
  /** An aggregated array relationship */
  canSelect_aggregate: Metadata_Permission_Select_Columns_Aggregate
  /** An array relationship */
  canUpdate: Array<Metadata_Permission_Update_Columns>
  /** An aggregated array relationship */
  canUpdate_aggregate: Metadata_Permission_Update_Columns_Aggregate
  /** An array relationship */
  checkConstraints: Array<Metadata_Check_Constraint>
  /** An aggregated array relationship */
  checkConstraints_aggregate: Metadata_Check_Constraint_Aggregate
  /** An array relationship */
  columns: Array<Metadata_Column_Info>
  /** An aggregated array relationship */
  columns_aggregate: Metadata_Column_Info_Aggregate
  /** An array relationship */
  computedFields: Array<Metadata_Computed_Field>
  /** An aggregated array relationship */
  computedFields_aggregate: Metadata_Computed_Field_Aggregate
  /** An array relationship */
  computedProperties: Array<Metadata_Computed_Property>
  /** An aggregated array relationship */
  computedProperties_aggregate: Metadata_Computed_Property_Aggregate
  /** An object relationship */
  config: Maybe<Metadata_Table_Config>
  configuration: Maybe<Scalars['jsonb']>
  deleted: Maybe<Scalars['Boolean']>
  /** An array relationship */
  dependentForeignKeys: Array<Metadata_Foreign_Key_Constraint>
  /** An aggregated array relationship */
  dependentForeignKeys_aggregate: Metadata_Foreign_Key_Constraint_Aggregate
  /** An array relationship */
  foreignKeys: Array<Metadata_Foreign_Key_Constraint>
  /** An aggregated array relationship */
  foreignKeys_aggregate: Metadata_Foreign_Key_Constraint_Aggregate
  id: Maybe<Scalars['String']>
  /** An array relationship */
  indexes: Array<Metadata_Index>
  /** An aggregated array relationship */
  indexes_aggregate: Metadata_Index_Aggregate
  /** An object relationship */
  info: Maybe<Metadata_Table_Info>
  isEnum: Maybe<Scalars['Boolean']>
  isSystemDefined: Maybe<Scalars['Boolean']>
  name: Maybe<Scalars['name']>
  /** An array relationship */
  permissions: Array<Metadata_Permission_Agg>
  /** An aggregated array relationship */
  permissions_aggregate: Metadata_Permission_Agg_Aggregate
  /** An object relationship */
  primaryKey: Maybe<Metadata_Primary_Key>
  /** An array relationship */
  primaryKeys: Array<Metadata_Primary_Key>
  /** An aggregated array relationship */
  primaryKeys_aggregate: Metadata_Primary_Key_Aggregate
  /** An array relationship */
  propertiesConfig: Array<Metadata_Property_Config>
  /** An aggregated array relationship */
  propertiesConfig_aggregate: Metadata_Property_Config_Aggregate
  /** An array relationship */
  refForeignKeys: Array<Metadata_Foreign_Key_Constraint>
  /** An aggregated array relationship */
  refForeignKeys_aggregate: Metadata_Foreign_Key_Constraint_Aggregate
  /** An array relationship */
  relationships: Array<Metadata_Relationship>
  /** An aggregated array relationship */
  relationships_aggregate: Metadata_Relationship_Aggregate
  schema: Maybe<Scalars['name']>
  updatedAt: Maybe<Scalars['timestamptz']>
  /** An object relationship */
  view: Maybe<Metadata_View_Info>
}

/** columns and relationships of "metadata.table" */
export type Metadata_Table_Properties_Config__OldArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableCanInsertArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Insert_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Insert_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableCanInsert_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Insert_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Insert_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableCanSelectArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableCanSelect_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableCanUpdateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Update_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableCanUpdate_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Update_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableCheckConstraintsArgs = {
  distinct_on: Maybe<Array<Metadata_Check_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Check_Constraint_Order_By>>
  where: Maybe<Metadata_Check_Constraint_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableCheckConstraints_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Check_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Check_Constraint_Order_By>>
  where: Maybe<Metadata_Check_Constraint_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Column_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Column_Info_Order_By>>
  where: Maybe<Metadata_Column_Info_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableColumns_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Column_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Column_Info_Order_By>>
  where: Maybe<Metadata_Column_Info_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableComputedFieldsArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Field_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Field_Order_By>>
  where: Maybe<Metadata_Computed_Field_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableComputedFields_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Field_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Field_Order_By>>
  where: Maybe<Metadata_Computed_Field_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableComputedPropertiesArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Property_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Property_Order_By>>
  where: Maybe<Metadata_Computed_Property_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableComputedProperties_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Property_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Property_Order_By>>
  where: Maybe<Metadata_Computed_Property_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableConfigurationArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableDependentForeignKeysArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableDependentForeignKeys_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableForeignKeysArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableForeignKeys_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableIndexesArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Order_By>>
  where: Maybe<Metadata_Index_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableIndexes_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Order_By>>
  where: Maybe<Metadata_Index_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TablePermissionsArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Agg_Order_By>>
  where: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TablePermissions_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Agg_Order_By>>
  where: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TablePrimaryKeysArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Order_By>>
  where: Maybe<Metadata_Primary_Key_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TablePrimaryKeys_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Order_By>>
  where: Maybe<Metadata_Primary_Key_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TablePropertiesConfigArgs = {
  distinct_on: Maybe<Array<Metadata_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Property_Config_Order_By>>
  where: Maybe<Metadata_Property_Config_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TablePropertiesConfig_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Property_Config_Order_By>>
  where: Maybe<Metadata_Property_Config_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableRefForeignKeysArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableRefForeignKeys_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableRelationshipsArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Order_By>>
  where: Maybe<Metadata_Relationship_Bool_Exp>
}

/** columns and relationships of "metadata.table" */
export type Metadata_TableRelationships_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Order_By>>
  where: Maybe<Metadata_Relationship_Bool_Exp>
}

/** aggregated selection of "metadata.table" */
export type Metadata_Table_Aggregate = {
  __typename?: 'metadata_table_aggregate'
  aggregate: Maybe<Metadata_Table_Aggregate_Fields>
  nodes: Array<Metadata_Table>
}

/** aggregate fields of "metadata.table" */
export type Metadata_Table_Aggregate_Fields = {
  __typename?: 'metadata_table_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Table_Max_Fields>
  min: Maybe<Metadata_Table_Min_Fields>
}

/** aggregate fields of "metadata.table" */
export type Metadata_Table_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Table_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.table" */
export type Metadata_Table_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Table_Max_Order_By>
  min: Maybe<Metadata_Table_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Table_Append_Input = {
  _properties_config__old: Maybe<Scalars['jsonb']>
  configuration: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "metadata.table" */
export type Metadata_Table_Arr_Rel_Insert_Input = {
  data: Array<Metadata_Table_Insert_Input>
}

/** Boolean expression to filter rows from the table "metadata.table". All fields are combined with a logical 'AND'. */
export type Metadata_Table_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Table_Bool_Exp>>>
  _not: Maybe<Metadata_Table_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Table_Bool_Exp>>>
  _properties_config__old: Maybe<Jsonb_Comparison_Exp>
  canInsert: Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>
  canSelect: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
  canUpdate: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
  checkConstraints: Maybe<Metadata_Check_Constraint_Bool_Exp>
  columns: Maybe<Metadata_Column_Info_Bool_Exp>
  computedFields: Maybe<Metadata_Computed_Field_Bool_Exp>
  computedProperties: Maybe<Metadata_Computed_Property_Bool_Exp>
  config: Maybe<Metadata_Table_Config_Bool_Exp>
  configuration: Maybe<Jsonb_Comparison_Exp>
  deleted: Maybe<Boolean_Comparison_Exp>
  dependentForeignKeys: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
  foreignKeys: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
  id: Maybe<String_Comparison_Exp>
  indexes: Maybe<Metadata_Index_Bool_Exp>
  info: Maybe<Metadata_Table_Info_Bool_Exp>
  isEnum: Maybe<Boolean_Comparison_Exp>
  isSystemDefined: Maybe<Boolean_Comparison_Exp>
  name: Maybe<Name_Comparison_Exp>
  permissions: Maybe<Metadata_Permission_Agg_Bool_Exp>
  primaryKey: Maybe<Metadata_Primary_Key_Bool_Exp>
  primaryKeys: Maybe<Metadata_Primary_Key_Bool_Exp>
  propertiesConfig: Maybe<Metadata_Property_Config_Bool_Exp>
  refForeignKeys: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
  relationships: Maybe<Metadata_Relationship_Bool_Exp>
  schema: Maybe<Name_Comparison_Exp>
  updatedAt: Maybe<Timestamptz_Comparison_Exp>
  view: Maybe<Metadata_View_Info_Bool_Exp>
}

/** columns and relationships of "metadata.table_config" */
export type Metadata_Table_Config = {
  __typename?: 'metadata_table_config'
  component: Maybe<Scalars['String']>
  deleted: Scalars['Boolean']
  description: Maybe<Scalars['String']>
  document_component: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Scalars['String']
  order: Scalars['jsonb']
  title: Maybe<Scalars['String']>
  updated_at: Scalars['timestamptz']
}

/** columns and relationships of "metadata.table_config" */
export type Metadata_Table_ConfigOrderArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.table_config" */
export type Metadata_Table_Config_Aggregate = {
  __typename?: 'metadata_table_config_aggregate'
  aggregate: Maybe<Metadata_Table_Config_Aggregate_Fields>
  nodes: Array<Metadata_Table_Config>
}

/** aggregate fields of "metadata.table_config" */
export type Metadata_Table_Config_Aggregate_Fields = {
  __typename?: 'metadata_table_config_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Table_Config_Max_Fields>
  min: Maybe<Metadata_Table_Config_Min_Fields>
}

/** aggregate fields of "metadata.table_config" */
export type Metadata_Table_Config_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Table_Config_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.table_config" */
export type Metadata_Table_Config_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Table_Config_Max_Order_By>
  min: Maybe<Metadata_Table_Config_Min_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Table_Config_Append_Input = {
  order: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "metadata.table_config" */
export type Metadata_Table_Config_Arr_Rel_Insert_Input = {
  data: Array<Metadata_Table_Config_Insert_Input>
  on_conflict: Maybe<Metadata_Table_Config_On_Conflict>
}

/** Boolean expression to filter rows from the table "metadata.table_config". All fields are combined with a logical 'AND'. */
export type Metadata_Table_Config_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Table_Config_Bool_Exp>>>
  _not: Maybe<Metadata_Table_Config_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Table_Config_Bool_Exp>>>
  component: Maybe<String_Comparison_Exp>
  deleted: Maybe<Boolean_Comparison_Exp>
  description: Maybe<String_Comparison_Exp>
  document_component: Maybe<String_Comparison_Exp>
  document_label: Maybe<String_Comparison_Exp>
  document_title: Maybe<String_Comparison_Exp>
  icon: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  order: Maybe<Jsonb_Comparison_Exp>
  title: Maybe<String_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "metadata.table_config" */
export enum Metadata_Table_Config_Constraint {
  /** unique or primary key constraint */
  TableConfigPkey = 'table_config_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metadata_Table_Config_Delete_At_Path_Input = {
  order: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metadata_Table_Config_Delete_Elem_Input = {
  order: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metadata_Table_Config_Delete_Key_Input = {
  order: Maybe<Scalars['String']>
}

/** input type for inserting data into table "metadata.table_config" */
export type Metadata_Table_Config_Insert_Input = {
  component: Maybe<Scalars['String']>
  deleted: Maybe<Scalars['Boolean']>
  description: Maybe<Scalars['String']>
  document_component: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  order: Maybe<Scalars['jsonb']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Metadata_Table_Config_Max_Fields = {
  __typename?: 'metadata_table_config_max_fields'
  component: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  document_component: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "metadata.table_config" */
export type Metadata_Table_Config_Max_Order_By = {
  component: Maybe<Order_By>
  description: Maybe<Order_By>
  document_component: Maybe<Order_By>
  document_label: Maybe<Order_By>
  document_title: Maybe<Order_By>
  icon: Maybe<Order_By>
  id: Maybe<Order_By>
  title: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Table_Config_Min_Fields = {
  __typename?: 'metadata_table_config_min_fields'
  component: Maybe<Scalars['String']>
  description: Maybe<Scalars['String']>
  document_component: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "metadata.table_config" */
export type Metadata_Table_Config_Min_Order_By = {
  component: Maybe<Order_By>
  description: Maybe<Order_By>
  document_component: Maybe<Order_By>
  document_label: Maybe<Order_By>
  document_title: Maybe<Order_By>
  icon: Maybe<Order_By>
  id: Maybe<Order_By>
  title: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** response of any mutation on the table "metadata.table_config" */
export type Metadata_Table_Config_Mutation_Response = {
  __typename?: 'metadata_table_config_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Metadata_Table_Config>
}

/** input type for inserting object relation for remote table "metadata.table_config" */
export type Metadata_Table_Config_Obj_Rel_Insert_Input = {
  data: Metadata_Table_Config_Insert_Input
  on_conflict: Maybe<Metadata_Table_Config_On_Conflict>
}

/** on conflict condition type for table "metadata.table_config" */
export type Metadata_Table_Config_On_Conflict = {
  constraint: Metadata_Table_Config_Constraint
  update_columns: Array<Metadata_Table_Config_Update_Column>
  where: Maybe<Metadata_Table_Config_Bool_Exp>
}

/** ordering options when selecting data from "metadata.table_config" */
export type Metadata_Table_Config_Order_By = {
  component: Maybe<Order_By>
  deleted: Maybe<Order_By>
  description: Maybe<Order_By>
  document_component: Maybe<Order_By>
  document_label: Maybe<Order_By>
  document_title: Maybe<Order_By>
  icon: Maybe<Order_By>
  id: Maybe<Order_By>
  order: Maybe<Order_By>
  title: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: "metadata.table_config" */
export type Metadata_Table_Config_Pk_Columns_Input = {
  id: Scalars['String']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Table_Config_Prepend_Input = {
  order: Maybe<Scalars['jsonb']>
}

/** select columns of table "metadata.table_config" */
export enum Metadata_Table_Config_Select_Column {
  /** column name */
  Component = 'component',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Description = 'description',
  /** column name */
  DocumentComponent = 'document_component',
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

/** input type for updating data in table "metadata.table_config" */
export type Metadata_Table_Config_Set_Input = {
  component: Maybe<Scalars['String']>
  deleted: Maybe<Scalars['Boolean']>
  description: Maybe<Scalars['String']>
  document_component: Maybe<Scalars['String']>
  document_label: Maybe<Scalars['String']>
  document_title: Maybe<Scalars['String']>
  icon: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  order: Maybe<Scalars['jsonb']>
  title: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** update columns of table "metadata.table_config" */
export enum Metadata_Table_Config_Update_Column {
  /** column name */
  Component = 'component',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Description = 'description',
  /** column name */
  DocumentComponent = 'document_component',
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

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Metadata_Table_Delete_At_Path_Input = {
  _properties_config__old: Maybe<Array<Maybe<Scalars['String']>>>
  configuration: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Metadata_Table_Delete_Elem_Input = {
  _properties_config__old: Maybe<Scalars['Int']>
  configuration: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Metadata_Table_Delete_Key_Input = {
  _properties_config__old: Maybe<Scalars['String']>
  configuration: Maybe<Scalars['String']>
}

/** columns and relationships of "metadata.table_info" */
export type Metadata_Table_Info = {
  __typename?: 'metadata_table_info'
  commit_action: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  is_insertable_into: Maybe<Scalars['String']>
  is_typed: Maybe<Scalars['String']>
  reference_generation: Maybe<Scalars['String']>
  self_referencing_column_name: Maybe<Scalars['name']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  table_catalog: Maybe<Scalars['name']>
  table_id: Maybe<Scalars['String']>
  table_name: Maybe<Scalars['name']>
  table_schema: Maybe<Scalars['name']>
  table_type: Maybe<Scalars['String']>
  user_defined_type_catalog: Maybe<Scalars['name']>
  user_defined_type_name: Maybe<Scalars['name']>
  user_defined_type_schema: Maybe<Scalars['name']>
}

/** aggregated selection of "metadata.table_info" */
export type Metadata_Table_Info_Aggregate = {
  __typename?: 'metadata_table_info_aggregate'
  aggregate: Maybe<Metadata_Table_Info_Aggregate_Fields>
  nodes: Array<Metadata_Table_Info>
}

/** aggregate fields of "metadata.table_info" */
export type Metadata_Table_Info_Aggregate_Fields = {
  __typename?: 'metadata_table_info_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_Table_Info_Max_Fields>
  min: Maybe<Metadata_Table_Info_Min_Fields>
}

/** aggregate fields of "metadata.table_info" */
export type Metadata_Table_Info_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Table_Info_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.table_info" */
export type Metadata_Table_Info_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_Table_Info_Max_Order_By>
  min: Maybe<Metadata_Table_Info_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.table_info". All fields are combined with a logical 'AND'. */
export type Metadata_Table_Info_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Table_Info_Bool_Exp>>>
  _not: Maybe<Metadata_Table_Info_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Table_Info_Bool_Exp>>>
  commit_action: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  is_insertable_into: Maybe<String_Comparison_Exp>
  is_typed: Maybe<String_Comparison_Exp>
  reference_generation: Maybe<String_Comparison_Exp>
  self_referencing_column_name: Maybe<Name_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  table_catalog: Maybe<Name_Comparison_Exp>
  table_id: Maybe<String_Comparison_Exp>
  table_name: Maybe<Name_Comparison_Exp>
  table_schema: Maybe<Name_Comparison_Exp>
  table_type: Maybe<String_Comparison_Exp>
  user_defined_type_catalog: Maybe<Name_Comparison_Exp>
  user_defined_type_name: Maybe<Name_Comparison_Exp>
  user_defined_type_schema: Maybe<Name_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_Table_Info_Max_Fields = {
  __typename?: 'metadata_table_info_max_fields'
  commit_action: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  is_insertable_into: Maybe<Scalars['String']>
  is_typed: Maybe<Scalars['String']>
  reference_generation: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  table_type: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.table_info" */
export type Metadata_Table_Info_Max_Order_By = {
  commit_action: Maybe<Order_By>
  id: Maybe<Order_By>
  is_insertable_into: Maybe<Order_By>
  is_typed: Maybe<Order_By>
  reference_generation: Maybe<Order_By>
  table_id: Maybe<Order_By>
  table_type: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Table_Info_Min_Fields = {
  __typename?: 'metadata_table_info_min_fields'
  commit_action: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  is_insertable_into: Maybe<Scalars['String']>
  is_typed: Maybe<Scalars['String']>
  reference_generation: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  table_type: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.table_info" */
export type Metadata_Table_Info_Min_Order_By = {
  commit_action: Maybe<Order_By>
  id: Maybe<Order_By>
  is_insertable_into: Maybe<Order_By>
  is_typed: Maybe<Order_By>
  reference_generation: Maybe<Order_By>
  table_id: Maybe<Order_By>
  table_type: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.table_info" */
export type Metadata_Table_Info_Order_By = {
  commit_action: Maybe<Order_By>
  id: Maybe<Order_By>
  is_insertable_into: Maybe<Order_By>
  is_typed: Maybe<Order_By>
  reference_generation: Maybe<Order_By>
  self_referencing_column_name: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  table_catalog: Maybe<Order_By>
  table_id: Maybe<Order_By>
  table_name: Maybe<Order_By>
  table_schema: Maybe<Order_By>
  table_type: Maybe<Order_By>
  user_defined_type_catalog: Maybe<Order_By>
  user_defined_type_name: Maybe<Order_By>
  user_defined_type_schema: Maybe<Order_By>
}

/** select columns of table "metadata.table_info" */
export enum Metadata_Table_Info_Select_Column {
  /** column name */
  CommitAction = 'commit_action',
  /** column name */
  Id = 'id',
  /** column name */
  IsInsertableInto = 'is_insertable_into',
  /** column name */
  IsTyped = 'is_typed',
  /** column name */
  ReferenceGeneration = 'reference_generation',
  /** column name */
  SelfReferencingColumnName = 'self_referencing_column_name',
  /** column name */
  TableCatalog = 'table_catalog',
  /** column name */
  TableId = 'table_id',
  /** column name */
  TableName = 'table_name',
  /** column name */
  TableSchema = 'table_schema',
  /** column name */
  TableType = 'table_type',
  /** column name */
  UserDefinedTypeCatalog = 'user_defined_type_catalog',
  /** column name */
  UserDefinedTypeName = 'user_defined_type_name',
  /** column name */
  UserDefinedTypeSchema = 'user_defined_type_schema'
}

/** input type for inserting data into table "metadata.table" */
export type Metadata_Table_Insert_Input = {
  _properties_config__old: Maybe<Scalars['jsonb']>
  computedFields: Maybe<Metadata_Computed_Field_Arr_Rel_Insert_Input>
  computedProperties: Maybe<Metadata_Computed_Property_Arr_Rel_Insert_Input>
  config: Maybe<Metadata_Table_Config_Obj_Rel_Insert_Input>
  configuration: Maybe<Scalars['jsonb']>
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['String']>
  isEnum: Maybe<Scalars['Boolean']>
  isSystemDefined: Maybe<Scalars['Boolean']>
  name: Maybe<Scalars['name']>
  propertiesConfig: Maybe<Metadata_Property_Config_Arr_Rel_Insert_Input>
  schema: Maybe<Scalars['name']>
  updatedAt: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Metadata_Table_Max_Fields = {
  __typename?: 'metadata_table_max_fields'
  id: Maybe<Scalars['String']>
  updatedAt: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "metadata.table" */
export type Metadata_Table_Max_Order_By = {
  id: Maybe<Order_By>
  updatedAt: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_Table_Min_Fields = {
  __typename?: 'metadata_table_min_fields'
  id: Maybe<Scalars['String']>
  updatedAt: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "metadata.table" */
export type Metadata_Table_Min_Order_By = {
  id: Maybe<Order_By>
  updatedAt: Maybe<Order_By>
}

/** response of any mutation on the table "metadata.table" */
export type Metadata_Table_Mutation_Response = {
  __typename?: 'metadata_table_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Metadata_Table>
}

/** input type for inserting object relation for remote table "metadata.table" */
export type Metadata_Table_Obj_Rel_Insert_Input = {
  data: Metadata_Table_Insert_Input
}

/** ordering options when selecting data from "metadata.table" */
export type Metadata_Table_Order_By = {
  _properties_config__old: Maybe<Order_By>
  canInsert_aggregate: Maybe<Metadata_Permission_Insert_Columns_Aggregate_Order_By>
  canSelect_aggregate: Maybe<Metadata_Permission_Select_Columns_Aggregate_Order_By>
  canUpdate_aggregate: Maybe<Metadata_Permission_Update_Columns_Aggregate_Order_By>
  checkConstraints_aggregate: Maybe<Metadata_Check_Constraint_Aggregate_Order_By>
  columns_aggregate: Maybe<Metadata_Column_Info_Aggregate_Order_By>
  computedFields_aggregate: Maybe<Metadata_Computed_Field_Aggregate_Order_By>
  computedProperties_aggregate: Maybe<Metadata_Computed_Property_Aggregate_Order_By>
  config: Maybe<Metadata_Table_Config_Order_By>
  configuration: Maybe<Order_By>
  deleted: Maybe<Order_By>
  dependentForeignKeys_aggregate: Maybe<Metadata_Foreign_Key_Constraint_Aggregate_Order_By>
  foreignKeys_aggregate: Maybe<Metadata_Foreign_Key_Constraint_Aggregate_Order_By>
  id: Maybe<Order_By>
  indexes_aggregate: Maybe<Metadata_Index_Aggregate_Order_By>
  info: Maybe<Metadata_Table_Info_Order_By>
  isEnum: Maybe<Order_By>
  isSystemDefined: Maybe<Order_By>
  name: Maybe<Order_By>
  permissions_aggregate: Maybe<Metadata_Permission_Agg_Aggregate_Order_By>
  primaryKey: Maybe<Metadata_Primary_Key_Order_By>
  primaryKeys_aggregate: Maybe<Metadata_Primary_Key_Aggregate_Order_By>
  propertiesConfig_aggregate: Maybe<Metadata_Property_Config_Aggregate_Order_By>
  refForeignKeys_aggregate: Maybe<Metadata_Foreign_Key_Constraint_Aggregate_Order_By>
  relationships_aggregate: Maybe<Metadata_Relationship_Aggregate_Order_By>
  schema: Maybe<Order_By>
  updatedAt: Maybe<Order_By>
  view: Maybe<Metadata_View_Info_Order_By>
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Metadata_Table_Prepend_Input = {
  _properties_config__old: Maybe<Scalars['jsonb']>
  configuration: Maybe<Scalars['jsonb']>
}

/** select columns of table "metadata.table" */
export enum Metadata_Table_Select_Column {
  /** column name */
  PropertiesConfigOld = '_properties_config__old',
  /** column name */
  Configuration = 'configuration',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  IsEnum = 'isEnum',
  /** column name */
  IsSystemDefined = 'isSystemDefined',
  /** column name */
  Name = 'name',
  /** column name */
  Schema = 'schema',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "metadata.table" */
export type Metadata_Table_Set_Input = {
  _properties_config__old: Maybe<Scalars['jsonb']>
  configuration: Maybe<Scalars['jsonb']>
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['String']>
  isEnum: Maybe<Scalars['Boolean']>
  isSystemDefined: Maybe<Scalars['Boolean']>
  name: Maybe<Scalars['name']>
  schema: Maybe<Scalars['name']>
  updatedAt: Maybe<Scalars['timestamptz']>
}

/** columns and relationships of "metadata.unique_constraint" */
export type Metadata_Unique_Constraint = {
  __typename?: 'metadata_unique_constraint'
  columns: Maybe<Scalars['json']>
  constraint_name: Maybe<Scalars['name']>
  id: Maybe<Scalars['name']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  table_name: Maybe<Scalars['name']>
  table_schema: Maybe<Scalars['name']>
}

/** columns and relationships of "metadata.unique_constraint" */
export type Metadata_Unique_ConstraintColumnsArgs = {
  path: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.unique_constraint" */
export type Metadata_Unique_Constraint_Aggregate = {
  __typename?: 'metadata_unique_constraint_aggregate'
  aggregate: Maybe<Metadata_Unique_Constraint_Aggregate_Fields>
  nodes: Array<Metadata_Unique_Constraint>
}

/** aggregate fields of "metadata.unique_constraint" */
export type Metadata_Unique_Constraint_Aggregate_Fields = {
  __typename?: 'metadata_unique_constraint_aggregate_fields'
  count: Maybe<Scalars['Int']>
}

/** aggregate fields of "metadata.unique_constraint" */
export type Metadata_Unique_Constraint_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_Unique_Constraint_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.unique_constraint" */
export type Metadata_Unique_Constraint_Aggregate_Order_By = {
  count: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "metadata.unique_constraint". All fields are combined with a logical 'AND'. */
export type Metadata_Unique_Constraint_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_Unique_Constraint_Bool_Exp>>>
  _not: Maybe<Metadata_Unique_Constraint_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_Unique_Constraint_Bool_Exp>>>
  columns: Maybe<Json_Comparison_Exp>
  constraint_name: Maybe<Name_Comparison_Exp>
  id: Maybe<Name_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  table_name: Maybe<Name_Comparison_Exp>
  table_schema: Maybe<Name_Comparison_Exp>
}

/** ordering options when selecting data from "metadata.unique_constraint" */
export type Metadata_Unique_Constraint_Order_By = {
  columns: Maybe<Order_By>
  constraint_name: Maybe<Order_By>
  id: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  table_name: Maybe<Order_By>
  table_schema: Maybe<Order_By>
}

/** select columns of table "metadata.unique_constraint" */
export enum Metadata_Unique_Constraint_Select_Column {
  /** column name */
  Columns = 'columns',
  /** column name */
  ConstraintName = 'constraint_name',
  /** column name */
  Id = 'id',
  /** column name */
  TableName = 'table_name',
  /** column name */
  TableSchema = 'table_schema'
}

/** columns and relationships of "metadata.view_info" */
export type Metadata_View_Info = {
  __typename?: 'metadata_view_info'
  check_option: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  is_insertable_into: Maybe<Scalars['String']>
  is_trigger_deletable: Maybe<Scalars['String']>
  is_trigger_insertable_into: Maybe<Scalars['String']>
  is_trigger_updatable: Maybe<Scalars['String']>
  is_updatable: Maybe<Scalars['String']>
  /** An object relationship */
  table: Maybe<Metadata_Table>
  table_catalog: Maybe<Scalars['name']>
  table_id: Maybe<Scalars['String']>
  table_name: Maybe<Scalars['name']>
  table_schema: Maybe<Scalars['name']>
  view_definition: Maybe<Scalars['String']>
}

/** aggregated selection of "metadata.view_info" */
export type Metadata_View_Info_Aggregate = {
  __typename?: 'metadata_view_info_aggregate'
  aggregate: Maybe<Metadata_View_Info_Aggregate_Fields>
  nodes: Array<Metadata_View_Info>
}

/** aggregate fields of "metadata.view_info" */
export type Metadata_View_Info_Aggregate_Fields = {
  __typename?: 'metadata_view_info_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Metadata_View_Info_Max_Fields>
  min: Maybe<Metadata_View_Info_Min_Fields>
}

/** aggregate fields of "metadata.view_info" */
export type Metadata_View_Info_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Metadata_View_Info_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "metadata.view_info" */
export type Metadata_View_Info_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Metadata_View_Info_Max_Order_By>
  min: Maybe<Metadata_View_Info_Min_Order_By>
}

/** Boolean expression to filter rows from the table "metadata.view_info". All fields are combined with a logical 'AND'. */
export type Metadata_View_Info_Bool_Exp = {
  _and: Maybe<Array<Maybe<Metadata_View_Info_Bool_Exp>>>
  _not: Maybe<Metadata_View_Info_Bool_Exp>
  _or: Maybe<Array<Maybe<Metadata_View_Info_Bool_Exp>>>
  check_option: Maybe<String_Comparison_Exp>
  id: Maybe<String_Comparison_Exp>
  is_insertable_into: Maybe<String_Comparison_Exp>
  is_trigger_deletable: Maybe<String_Comparison_Exp>
  is_trigger_insertable_into: Maybe<String_Comparison_Exp>
  is_trigger_updatable: Maybe<String_Comparison_Exp>
  is_updatable: Maybe<String_Comparison_Exp>
  table: Maybe<Metadata_Table_Bool_Exp>
  table_catalog: Maybe<Name_Comparison_Exp>
  table_id: Maybe<String_Comparison_Exp>
  table_name: Maybe<Name_Comparison_Exp>
  table_schema: Maybe<Name_Comparison_Exp>
  view_definition: Maybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type Metadata_View_Info_Max_Fields = {
  __typename?: 'metadata_view_info_max_fields'
  check_option: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  is_insertable_into: Maybe<Scalars['String']>
  is_trigger_deletable: Maybe<Scalars['String']>
  is_trigger_insertable_into: Maybe<Scalars['String']>
  is_trigger_updatable: Maybe<Scalars['String']>
  is_updatable: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  view_definition: Maybe<Scalars['String']>
}

/** order by max() on columns of table "metadata.view_info" */
export type Metadata_View_Info_Max_Order_By = {
  check_option: Maybe<Order_By>
  id: Maybe<Order_By>
  is_insertable_into: Maybe<Order_By>
  is_trigger_deletable: Maybe<Order_By>
  is_trigger_insertable_into: Maybe<Order_By>
  is_trigger_updatable: Maybe<Order_By>
  is_updatable: Maybe<Order_By>
  table_id: Maybe<Order_By>
  view_definition: Maybe<Order_By>
}

/** aggregate min on columns */
export type Metadata_View_Info_Min_Fields = {
  __typename?: 'metadata_view_info_min_fields'
  check_option: Maybe<Scalars['String']>
  id: Maybe<Scalars['String']>
  is_insertable_into: Maybe<Scalars['String']>
  is_trigger_deletable: Maybe<Scalars['String']>
  is_trigger_insertable_into: Maybe<Scalars['String']>
  is_trigger_updatable: Maybe<Scalars['String']>
  is_updatable: Maybe<Scalars['String']>
  table_id: Maybe<Scalars['String']>
  view_definition: Maybe<Scalars['String']>
}

/** order by min() on columns of table "metadata.view_info" */
export type Metadata_View_Info_Min_Order_By = {
  check_option: Maybe<Order_By>
  id: Maybe<Order_By>
  is_insertable_into: Maybe<Order_By>
  is_trigger_deletable: Maybe<Order_By>
  is_trigger_insertable_into: Maybe<Order_By>
  is_trigger_updatable: Maybe<Order_By>
  is_updatable: Maybe<Order_By>
  table_id: Maybe<Order_By>
  view_definition: Maybe<Order_By>
}

/** ordering options when selecting data from "metadata.view_info" */
export type Metadata_View_Info_Order_By = {
  check_option: Maybe<Order_By>
  id: Maybe<Order_By>
  is_insertable_into: Maybe<Order_By>
  is_trigger_deletable: Maybe<Order_By>
  is_trigger_insertable_into: Maybe<Order_By>
  is_trigger_updatable: Maybe<Order_By>
  is_updatable: Maybe<Order_By>
  table: Maybe<Metadata_Table_Order_By>
  table_catalog: Maybe<Order_By>
  table_id: Maybe<Order_By>
  table_name: Maybe<Order_By>
  table_schema: Maybe<Order_By>
  view_definition: Maybe<Order_By>
}

/** select columns of table "metadata.view_info" */
export enum Metadata_View_Info_Select_Column {
  /** column name */
  CheckOption = 'check_option',
  /** column name */
  Id = 'id',
  /** column name */
  IsInsertableInto = 'is_insertable_into',
  /** column name */
  IsTriggerDeletable = 'is_trigger_deletable',
  /** column name */
  IsTriggerInsertableInto = 'is_trigger_insertable_into',
  /** column name */
  IsTriggerUpdatable = 'is_trigger_updatable',
  /** column name */
  IsUpdatable = 'is_updatable',
  /** column name */
  TableCatalog = 'table_catalog',
  /** column name */
  TableId = 'table_id',
  /** column name */
  TableName = 'table_name',
  /** column name */
  TableSchema = 'table_schema',
  /** column name */
  ViewDefinition = 'view_definition'
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
  /** delete data from the table: "auth.email_templates" */
  delete_auth_email_templates: Maybe<Auth_Email_Templates_Mutation_Response>
  /** delete single row from the table: "auth.email_templates" */
  delete_auth_email_templates_by_pk: Maybe<Auth_Email_Templates>
  /** delete data from the table: "auth.migrations" */
  delete_auth_migrations: Maybe<Auth_Migrations_Mutation_Response>
  /** delete single row from the table: "auth.migrations" */
  delete_auth_migrations_by_pk: Maybe<Auth_Migrations>
  /** delete data from the table: "auth.provider_requests" */
  delete_auth_provider_requests: Maybe<Auth_Provider_Requests_Mutation_Response>
  /** delete single row from the table: "auth.provider_requests" */
  delete_auth_provider_requests_by_pk: Maybe<Auth_Provider_Requests>
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
  /** delete data from the table: "auth.whitelist" */
  delete_auth_whitelist: Maybe<Auth_Whitelist_Mutation_Response>
  /** delete single row from the table: "auth.whitelist" */
  delete_auth_whitelist_by_pk: Maybe<Auth_Whitelist>
  /** delete data from the table: "drug" */
  delete_drug: Maybe<Drug_Mutation_Response>
  /** delete single row from the table: "drug" */
  delete_drug_by_pk: Maybe<Drug>
  /** delete data from the table: "lab_test" */
  delete_lab_test: Maybe<Lab_Test_Mutation_Response>
  /** delete single row from the table: "lab_test" */
  delete_lab_test_by_pk: Maybe<Lab_Test>
  /** delete data from the table: "metadata.app_config" */
  delete_metadata_app_config: Maybe<Metadata_App_Config_Mutation_Response>
  /** delete single row from the table: "metadata.app_config" */
  delete_metadata_app_config_by_pk: Maybe<Metadata_App_Config>
  /** delete data from the table: "metadata.computed_field" */
  delete_metadata_computed_field: Maybe<Metadata_Computed_Field_Mutation_Response>
  /** delete data from the table: "metadata.computed_property" */
  delete_metadata_computed_property: Maybe<Metadata_Computed_Property_Mutation_Response>
  /** delete single row from the table: "metadata.computed_property" */
  delete_metadata_computed_property_by_pk: Maybe<Metadata_Computed_Property>
  /** delete data from the table: "metadata.custom_type" */
  delete_metadata_custom_type: Maybe<Metadata_Custom_Type_Mutation_Response>
  /** delete data from the table: "metadata.function" */
  delete_metadata_function: Maybe<Metadata_Function_Mutation_Response>
  /** delete data from the table: "metadata.property_config" */
  delete_metadata_property_config: Maybe<Metadata_Property_Config_Mutation_Response>
  /** delete single row from the table: "metadata.property_config" */
  delete_metadata_property_config_by_pk: Maybe<Metadata_Property_Config>
  /** delete data from the table: "metadata.table" */
  delete_metadata_table: Maybe<Metadata_Table_Mutation_Response>
  /** delete data from the table: "metadata.table_config" */
  delete_metadata_table_config: Maybe<Metadata_Table_Config_Mutation_Response>
  /** delete single row from the table: "metadata.table_config" */
  delete_metadata_table_config_by_pk: Maybe<Metadata_Table_Config>
  /** delete data from the table: "patient" */
  delete_patient: Maybe<Patient_Mutation_Response>
  /** delete single row from the table: "patient" */
  delete_patient_by_pk: Maybe<Patient>
  /** delete data from the table: "users" */
  delete_users: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk: Maybe<Users>
  /** delete data from the table: "visite" */
  delete_visite: Maybe<Visite_Mutation_Response>
  /** delete single row from the table: "visite" */
  delete_visite_by_pk: Maybe<Visite>
  /** delete data from the table: "visite_lab_test" */
  delete_visite_lab_test: Maybe<Visite_Lab_Test_Mutation_Response>
  /** delete single row from the table: "visite_lab_test" */
  delete_visite_lab_test_by_pk: Maybe<Visite_Lab_Test>
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
  /** insert data into the table: "auth.email_templates" */
  insert_auth_email_templates: Maybe<Auth_Email_Templates_Mutation_Response>
  /** insert a single row into the table: "auth.email_templates" */
  insert_auth_email_templates_one: Maybe<Auth_Email_Templates>
  /** insert data into the table: "auth.migrations" */
  insert_auth_migrations: Maybe<Auth_Migrations_Mutation_Response>
  /** insert a single row into the table: "auth.migrations" */
  insert_auth_migrations_one: Maybe<Auth_Migrations>
  /** insert data into the table: "auth.provider_requests" */
  insert_auth_provider_requests: Maybe<Auth_Provider_Requests_Mutation_Response>
  /** insert a single row into the table: "auth.provider_requests" */
  insert_auth_provider_requests_one: Maybe<Auth_Provider_Requests>
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
  /** insert data into the table: "auth.whitelist" */
  insert_auth_whitelist: Maybe<Auth_Whitelist_Mutation_Response>
  /** insert a single row into the table: "auth.whitelist" */
  insert_auth_whitelist_one: Maybe<Auth_Whitelist>
  /** insert data into the table: "drug" */
  insert_drug: Maybe<Drug_Mutation_Response>
  /** insert a single row into the table: "drug" */
  insert_drug_one: Maybe<Drug>
  /** insert data into the table: "lab_test" */
  insert_lab_test: Maybe<Lab_Test_Mutation_Response>
  /** insert a single row into the table: "lab_test" */
  insert_lab_test_one: Maybe<Lab_Test>
  /** insert data into the table: "metadata.app_config" */
  insert_metadata_app_config: Maybe<Metadata_App_Config_Mutation_Response>
  /** insert a single row into the table: "metadata.app_config" */
  insert_metadata_app_config_one: Maybe<Metadata_App_Config>
  /** insert data into the table: "metadata.computed_field" */
  insert_metadata_computed_field: Maybe<Metadata_Computed_Field_Mutation_Response>
  /** insert a single row into the table: "metadata.computed_field" */
  insert_metadata_computed_field_one: Maybe<Metadata_Computed_Field>
  /** insert data into the table: "metadata.computed_property" */
  insert_metadata_computed_property: Maybe<Metadata_Computed_Property_Mutation_Response>
  /** insert a single row into the table: "metadata.computed_property" */
  insert_metadata_computed_property_one: Maybe<Metadata_Computed_Property>
  /** insert data into the table: "metadata.custom_type" */
  insert_metadata_custom_type: Maybe<Metadata_Custom_Type_Mutation_Response>
  /** insert a single row into the table: "metadata.custom_type" */
  insert_metadata_custom_type_one: Maybe<Metadata_Custom_Type>
  /** insert data into the table: "metadata.function" */
  insert_metadata_function: Maybe<Metadata_Function_Mutation_Response>
  /** insert a single row into the table: "metadata.function" */
  insert_metadata_function_one: Maybe<Metadata_Function>
  /** insert data into the table: "metadata.property_config" */
  insert_metadata_property_config: Maybe<Metadata_Property_Config_Mutation_Response>
  /** insert a single row into the table: "metadata.property_config" */
  insert_metadata_property_config_one: Maybe<Metadata_Property_Config>
  /** insert data into the table: "metadata.table" */
  insert_metadata_table: Maybe<Metadata_Table_Mutation_Response>
  /** insert data into the table: "metadata.table_config" */
  insert_metadata_table_config: Maybe<Metadata_Table_Config_Mutation_Response>
  /** insert a single row into the table: "metadata.table_config" */
  insert_metadata_table_config_one: Maybe<Metadata_Table_Config>
  /** insert a single row into the table: "metadata.table" */
  insert_metadata_table_one: Maybe<Metadata_Table>
  /** insert data into the table: "patient" */
  insert_patient: Maybe<Patient_Mutation_Response>
  /** insert a single row into the table: "patient" */
  insert_patient_one: Maybe<Patient>
  /** insert data into the table: "users" */
  insert_users: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one: Maybe<Users>
  /** insert data into the table: "visite" */
  insert_visite: Maybe<Visite_Mutation_Response>
  /** insert data into the table: "visite_lab_test" */
  insert_visite_lab_test: Maybe<Visite_Lab_Test_Mutation_Response>
  /** insert a single row into the table: "visite_lab_test" */
  insert_visite_lab_test_one: Maybe<Visite_Lab_Test>
  /** insert a single row into the table: "visite" */
  insert_visite_one: Maybe<Visite>
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
  /** update data of the table: "auth.email_templates" */
  update_auth_email_templates: Maybe<Auth_Email_Templates_Mutation_Response>
  /** update single row of the table: "auth.email_templates" */
  update_auth_email_templates_by_pk: Maybe<Auth_Email_Templates>
  /** update data of the table: "auth.migrations" */
  update_auth_migrations: Maybe<Auth_Migrations_Mutation_Response>
  /** update single row of the table: "auth.migrations" */
  update_auth_migrations_by_pk: Maybe<Auth_Migrations>
  /** update data of the table: "auth.provider_requests" */
  update_auth_provider_requests: Maybe<Auth_Provider_Requests_Mutation_Response>
  /** update single row of the table: "auth.provider_requests" */
  update_auth_provider_requests_by_pk: Maybe<Auth_Provider_Requests>
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
  /** update data of the table: "auth.whitelist" */
  update_auth_whitelist: Maybe<Auth_Whitelist_Mutation_Response>
  /** update single row of the table: "auth.whitelist" */
  update_auth_whitelist_by_pk: Maybe<Auth_Whitelist>
  /** update data of the table: "drug" */
  update_drug: Maybe<Drug_Mutation_Response>
  /** update single row of the table: "drug" */
  update_drug_by_pk: Maybe<Drug>
  /** update data of the table: "lab_test" */
  update_lab_test: Maybe<Lab_Test_Mutation_Response>
  /** update single row of the table: "lab_test" */
  update_lab_test_by_pk: Maybe<Lab_Test>
  /** update data of the table: "metadata.app_config" */
  update_metadata_app_config: Maybe<Metadata_App_Config_Mutation_Response>
  /** update single row of the table: "metadata.app_config" */
  update_metadata_app_config_by_pk: Maybe<Metadata_App_Config>
  /** update data of the table: "metadata.computed_field" */
  update_metadata_computed_field: Maybe<Metadata_Computed_Field_Mutation_Response>
  /** update data of the table: "metadata.computed_property" */
  update_metadata_computed_property: Maybe<Metadata_Computed_Property_Mutation_Response>
  /** update single row of the table: "metadata.computed_property" */
  update_metadata_computed_property_by_pk: Maybe<Metadata_Computed_Property>
  /** update data of the table: "metadata.custom_type" */
  update_metadata_custom_type: Maybe<Metadata_Custom_Type_Mutation_Response>
  /** update data of the table: "metadata.function" */
  update_metadata_function: Maybe<Metadata_Function_Mutation_Response>
  /** update data of the table: "metadata.property_config" */
  update_metadata_property_config: Maybe<Metadata_Property_Config_Mutation_Response>
  /** update single row of the table: "metadata.property_config" */
  update_metadata_property_config_by_pk: Maybe<Metadata_Property_Config>
  /** update data of the table: "metadata.table" */
  update_metadata_table: Maybe<Metadata_Table_Mutation_Response>
  /** update data of the table: "metadata.table_config" */
  update_metadata_table_config: Maybe<Metadata_Table_Config_Mutation_Response>
  /** update single row of the table: "metadata.table_config" */
  update_metadata_table_config_by_pk: Maybe<Metadata_Table_Config>
  /** update data of the table: "patient" */
  update_patient: Maybe<Patient_Mutation_Response>
  /** update single row of the table: "patient" */
  update_patient_by_pk: Maybe<Patient>
  /** update data of the table: "users" */
  update_users: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk: Maybe<Users>
  /** update data of the table: "visite" */
  update_visite: Maybe<Visite_Mutation_Response>
  /** update single row of the table: "visite" */
  update_visite_by_pk: Maybe<Visite>
  /** update data of the table: "visite_lab_test" */
  update_visite_lab_test: Maybe<Visite_Lab_Test_Mutation_Response>
  /** update single row of the table: "visite_lab_test" */
  update_visite_lab_test_by_pk: Maybe<Visite_Lab_Test>
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
export type Mutation_RootDelete_Auth_Email_TemplatesArgs = {
  where: Auth_Email_Templates_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Email_Templates_By_PkArgs = {
  id: Scalars['String']
  locale: Scalars['String']
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
export type Mutation_RootDelete_Auth_Provider_RequestsArgs = {
  where: Auth_Provider_Requests_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Provider_Requests_By_PkArgs = {
  id: Scalars['uuid']
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
export type Mutation_RootDelete_Auth_WhitelistArgs = {
  where: Auth_Whitelist_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Auth_Whitelist_By_PkArgs = {
  email: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_DrugArgs = {
  where: Drug_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Drug_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Lab_TestArgs = {
  where: Lab_Test_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Lab_Test_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Metadata_App_ConfigArgs = {
  where: Metadata_App_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Metadata_App_Config_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Metadata_Computed_FieldArgs = {
  where: Metadata_Computed_Field_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Metadata_Computed_PropertyArgs = {
  where: Metadata_Computed_Property_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Metadata_Computed_Property_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Metadata_Custom_TypeArgs = {
  where: Metadata_Custom_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Metadata_FunctionArgs = {
  where: Metadata_Function_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Metadata_Property_ConfigArgs = {
  where: Metadata_Property_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Metadata_Property_Config_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Metadata_TableArgs = {
  where: Metadata_Table_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Metadata_Table_ConfigArgs = {
  where: Metadata_Table_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Metadata_Table_Config_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_PatientArgs = {
  where: Patient_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Patient_By_PkArgs = {
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
export type Mutation_RootDelete_VisiteArgs = {
  where: Visite_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Visite_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Visite_Lab_TestArgs = {
  where: Visite_Lab_Test_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Visite_Lab_Test_By_PkArgs = {
  lab_test_id: Scalars['uuid']
  visite_id: Scalars['uuid']
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
export type Mutation_RootInsert_Auth_Email_TemplatesArgs = {
  objects: Array<Auth_Email_Templates_Insert_Input>
  on_conflict: Maybe<Auth_Email_Templates_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Email_Templates_OneArgs = {
  object: Auth_Email_Templates_Insert_Input
  on_conflict: Maybe<Auth_Email_Templates_On_Conflict>
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
export type Mutation_RootInsert_Auth_Provider_RequestsArgs = {
  objects: Array<Auth_Provider_Requests_Insert_Input>
  on_conflict: Maybe<Auth_Provider_Requests_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Provider_Requests_OneArgs = {
  object: Auth_Provider_Requests_Insert_Input
  on_conflict: Maybe<Auth_Provider_Requests_On_Conflict>
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
export type Mutation_RootInsert_Auth_WhitelistArgs = {
  objects: Array<Auth_Whitelist_Insert_Input>
  on_conflict: Maybe<Auth_Whitelist_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Auth_Whitelist_OneArgs = {
  object: Auth_Whitelist_Insert_Input
  on_conflict: Maybe<Auth_Whitelist_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_DrugArgs = {
  objects: Array<Drug_Insert_Input>
  on_conflict: Maybe<Drug_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Drug_OneArgs = {
  object: Drug_Insert_Input
  on_conflict: Maybe<Drug_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Lab_TestArgs = {
  objects: Array<Lab_Test_Insert_Input>
  on_conflict: Maybe<Lab_Test_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Lab_Test_OneArgs = {
  object: Lab_Test_Insert_Input
  on_conflict: Maybe<Lab_Test_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_App_ConfigArgs = {
  objects: Array<Metadata_App_Config_Insert_Input>
  on_conflict: Maybe<Metadata_App_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_App_Config_OneArgs = {
  object: Metadata_App_Config_Insert_Input
  on_conflict: Maybe<Metadata_App_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Computed_FieldArgs = {
  objects: Array<Metadata_Computed_Field_Insert_Input>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Computed_Field_OneArgs = {
  object: Metadata_Computed_Field_Insert_Input
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Computed_PropertyArgs = {
  objects: Array<Metadata_Computed_Property_Insert_Input>
  on_conflict: Maybe<Metadata_Computed_Property_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Computed_Property_OneArgs = {
  object: Metadata_Computed_Property_Insert_Input
  on_conflict: Maybe<Metadata_Computed_Property_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Custom_TypeArgs = {
  objects: Array<Metadata_Custom_Type_Insert_Input>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Custom_Type_OneArgs = {
  object: Metadata_Custom_Type_Insert_Input
}

/** mutation root */
export type Mutation_RootInsert_Metadata_FunctionArgs = {
  objects: Array<Metadata_Function_Insert_Input>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Function_OneArgs = {
  object: Metadata_Function_Insert_Input
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Property_ConfigArgs = {
  objects: Array<Metadata_Property_Config_Insert_Input>
  on_conflict: Maybe<Metadata_Property_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Property_Config_OneArgs = {
  object: Metadata_Property_Config_Insert_Input
  on_conflict: Maybe<Metadata_Property_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_TableArgs = {
  objects: Array<Metadata_Table_Insert_Input>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Table_ConfigArgs = {
  objects: Array<Metadata_Table_Config_Insert_Input>
  on_conflict: Maybe<Metadata_Table_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Table_Config_OneArgs = {
  object: Metadata_Table_Config_Insert_Input
  on_conflict: Maybe<Metadata_Table_Config_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Metadata_Table_OneArgs = {
  object: Metadata_Table_Insert_Input
}

/** mutation root */
export type Mutation_RootInsert_PatientArgs = {
  objects: Array<Patient_Insert_Input>
  on_conflict: Maybe<Patient_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Patient_OneArgs = {
  object: Patient_Insert_Input
  on_conflict: Maybe<Patient_On_Conflict>
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
export type Mutation_RootInsert_VisiteArgs = {
  objects: Array<Visite_Insert_Input>
  on_conflict: Maybe<Visite_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Visite_Lab_TestArgs = {
  objects: Array<Visite_Lab_Test_Insert_Input>
  on_conflict: Maybe<Visite_Lab_Test_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Visite_Lab_Test_OneArgs = {
  object: Visite_Lab_Test_Insert_Input
  on_conflict: Maybe<Visite_Lab_Test_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Visite_OneArgs = {
  object: Visite_Insert_Input
  on_conflict: Maybe<Visite_On_Conflict>
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
export type Mutation_RootUpdate_Auth_Email_TemplatesArgs = {
  _set: Maybe<Auth_Email_Templates_Set_Input>
  where: Auth_Email_Templates_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Email_Templates_By_PkArgs = {
  _set: Maybe<Auth_Email_Templates_Set_Input>
  pk_columns: Auth_Email_Templates_Pk_Columns_Input
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
export type Mutation_RootUpdate_Auth_Provider_RequestsArgs = {
  _set: Maybe<Auth_Provider_Requests_Set_Input>
  where: Auth_Provider_Requests_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Provider_Requests_By_PkArgs = {
  _set: Maybe<Auth_Provider_Requests_Set_Input>
  pk_columns: Auth_Provider_Requests_Pk_Columns_Input
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
export type Mutation_RootUpdate_Auth_WhitelistArgs = {
  _set: Maybe<Auth_Whitelist_Set_Input>
  where: Auth_Whitelist_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Auth_Whitelist_By_PkArgs = {
  _set: Maybe<Auth_Whitelist_Set_Input>
  pk_columns: Auth_Whitelist_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_DrugArgs = {
  _set: Maybe<Drug_Set_Input>
  where: Drug_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Drug_By_PkArgs = {
  _set: Maybe<Drug_Set_Input>
  pk_columns: Drug_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Lab_TestArgs = {
  _set: Maybe<Lab_Test_Set_Input>
  where: Lab_Test_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Lab_Test_By_PkArgs = {
  _set: Maybe<Lab_Test_Set_Input>
  pk_columns: Lab_Test_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_App_ConfigArgs = {
  _append: Maybe<Metadata_App_Config_Append_Input>
  _delete_at_path: Maybe<Metadata_App_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_App_Config_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_App_Config_Delete_Key_Input>
  _prepend: Maybe<Metadata_App_Config_Prepend_Input>
  _set: Maybe<Metadata_App_Config_Set_Input>
  where: Metadata_App_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_App_Config_By_PkArgs = {
  _append: Maybe<Metadata_App_Config_Append_Input>
  _delete_at_path: Maybe<Metadata_App_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_App_Config_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_App_Config_Delete_Key_Input>
  _prepend: Maybe<Metadata_App_Config_Prepend_Input>
  _set: Maybe<Metadata_App_Config_Set_Input>
  pk_columns: Metadata_App_Config_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_Computed_FieldArgs = {
  _append: Maybe<Metadata_Computed_Field_Append_Input>
  _delete_at_path: Maybe<Metadata_Computed_Field_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_Computed_Field_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_Computed_Field_Delete_Key_Input>
  _prepend: Maybe<Metadata_Computed_Field_Prepend_Input>
  _set: Maybe<Metadata_Computed_Field_Set_Input>
  where: Metadata_Computed_Field_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_Computed_PropertyArgs = {
  _set: Maybe<Metadata_Computed_Property_Set_Input>
  where: Metadata_Computed_Property_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_Computed_Property_By_PkArgs = {
  _set: Maybe<Metadata_Computed_Property_Set_Input>
  pk_columns: Metadata_Computed_Property_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_Custom_TypeArgs = {
  _append: Maybe<Metadata_Custom_Type_Append_Input>
  _delete_at_path: Maybe<Metadata_Custom_Type_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_Custom_Type_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_Custom_Type_Delete_Key_Input>
  _prepend: Maybe<Metadata_Custom_Type_Prepend_Input>
  _set: Maybe<Metadata_Custom_Type_Set_Input>
  where: Metadata_Custom_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_FunctionArgs = {
  _append: Maybe<Metadata_Function_Append_Input>
  _delete_at_path: Maybe<Metadata_Function_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_Function_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_Function_Delete_Key_Input>
  _prepend: Maybe<Metadata_Function_Prepend_Input>
  _set: Maybe<Metadata_Function_Set_Input>
  where: Metadata_Function_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_Property_ConfigArgs = {
  _append: Maybe<Metadata_Property_Config_Append_Input>
  _delete_at_path: Maybe<Metadata_Property_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_Property_Config_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_Property_Config_Delete_Key_Input>
  _prepend: Maybe<Metadata_Property_Config_Prepend_Input>
  _set: Maybe<Metadata_Property_Config_Set_Input>
  where: Metadata_Property_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_Property_Config_By_PkArgs = {
  _append: Maybe<Metadata_Property_Config_Append_Input>
  _delete_at_path: Maybe<Metadata_Property_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_Property_Config_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_Property_Config_Delete_Key_Input>
  _prepend: Maybe<Metadata_Property_Config_Prepend_Input>
  _set: Maybe<Metadata_Property_Config_Set_Input>
  pk_columns: Metadata_Property_Config_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_TableArgs = {
  _append: Maybe<Metadata_Table_Append_Input>
  _delete_at_path: Maybe<Metadata_Table_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_Table_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_Table_Delete_Key_Input>
  _prepend: Maybe<Metadata_Table_Prepend_Input>
  _set: Maybe<Metadata_Table_Set_Input>
  where: Metadata_Table_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_Table_ConfigArgs = {
  _append: Maybe<Metadata_Table_Config_Append_Input>
  _delete_at_path: Maybe<Metadata_Table_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_Table_Config_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_Table_Config_Delete_Key_Input>
  _prepend: Maybe<Metadata_Table_Config_Prepend_Input>
  _set: Maybe<Metadata_Table_Config_Set_Input>
  where: Metadata_Table_Config_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Metadata_Table_Config_By_PkArgs = {
  _append: Maybe<Metadata_Table_Config_Append_Input>
  _delete_at_path: Maybe<Metadata_Table_Config_Delete_At_Path_Input>
  _delete_elem: Maybe<Metadata_Table_Config_Delete_Elem_Input>
  _delete_key: Maybe<Metadata_Table_Config_Delete_Key_Input>
  _prepend: Maybe<Metadata_Table_Config_Prepend_Input>
  _set: Maybe<Metadata_Table_Config_Set_Input>
  pk_columns: Metadata_Table_Config_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_PatientArgs = {
  _append: Maybe<Patient_Append_Input>
  _delete_at_path: Maybe<Patient_Delete_At_Path_Input>
  _delete_elem: Maybe<Patient_Delete_Elem_Input>
  _delete_key: Maybe<Patient_Delete_Key_Input>
  _inc: Maybe<Patient_Inc_Input>
  _prepend: Maybe<Patient_Prepend_Input>
  _set: Maybe<Patient_Set_Input>
  where: Patient_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Patient_By_PkArgs = {
  _append: Maybe<Patient_Append_Input>
  _delete_at_path: Maybe<Patient_Delete_At_Path_Input>
  _delete_elem: Maybe<Patient_Delete_Elem_Input>
  _delete_key: Maybe<Patient_Delete_Key_Input>
  _inc: Maybe<Patient_Inc_Input>
  _prepend: Maybe<Patient_Prepend_Input>
  _set: Maybe<Patient_Set_Input>
  pk_columns: Patient_Pk_Columns_Input
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

/** mutation root */
export type Mutation_RootUpdate_VisiteArgs = {
  _inc: Maybe<Visite_Inc_Input>
  _set: Maybe<Visite_Set_Input>
  where: Visite_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Visite_By_PkArgs = {
  _inc: Maybe<Visite_Inc_Input>
  _set: Maybe<Visite_Set_Input>
  pk_columns: Visite_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Visite_Lab_TestArgs = {
  _set: Maybe<Visite_Lab_Test_Set_Input>
  where: Visite_Lab_Test_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Visite_Lab_Test_By_PkArgs = {
  _set: Maybe<Visite_Lab_Test_Set_Input>
  pk_columns: Visite_Lab_Test_Pk_Columns_Input
}

/** expression to compare columns of type name. All fields are combined with logical 'AND'. */
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

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq: Maybe<Scalars['numeric']>
  _gt: Maybe<Scalars['numeric']>
  _gte: Maybe<Scalars['numeric']>
  _in: Maybe<Array<Scalars['numeric']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['numeric']>
  _lte: Maybe<Scalars['numeric']>
  _neq: Maybe<Scalars['numeric']>
  _nin: Maybe<Array<Scalars['numeric']>>
}

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "patient" */
export type Patient = {
  __typename?: 'patient'
  a_bigint: Maybe<Scalars['bigint']>
  a_boolean: Scalars['Boolean']
  a_citext: Maybe<Scalars['citext']>
  a_date: Maybe<Scalars['date']>
  a_jsonb: Maybe<Scalars['jsonb']>
  a_numeric: Maybe<Scalars['numeric']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Int']>
  an_uuid: Maybe<Scalars['uuid']>
  deleted: Scalars['Boolean']
  id: Scalars['uuid']
  name: Scalars['String']
  updated_at: Scalars['timestamptz']
  /** An array relationship */
  visites: Array<Visite>
  /** An aggregated array relationship */
  visites_aggregate: Visite_Aggregate
}

/** columns and relationships of "patient" */
export type PatientA_JsonbArgs = {
  path: Maybe<Scalars['String']>
}

/** columns and relationships of "patient" */
export type PatientVisitesArgs = {
  distinct_on: Maybe<Array<Visite_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Order_By>>
  where: Maybe<Visite_Bool_Exp>
}

/** columns and relationships of "patient" */
export type PatientVisites_AggregateArgs = {
  distinct_on: Maybe<Array<Visite_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Order_By>>
  where: Maybe<Visite_Bool_Exp>
}

/** aggregated selection of "patient" */
export type Patient_Aggregate = {
  __typename?: 'patient_aggregate'
  aggregate: Maybe<Patient_Aggregate_Fields>
  nodes: Array<Patient>
}

/** aggregate fields of "patient" */
export type Patient_Aggregate_Fields = {
  __typename?: 'patient_aggregate_fields'
  avg: Maybe<Patient_Avg_Fields>
  count: Maybe<Scalars['Int']>
  max: Maybe<Patient_Max_Fields>
  min: Maybe<Patient_Min_Fields>
  stddev: Maybe<Patient_Stddev_Fields>
  stddev_pop: Maybe<Patient_Stddev_Pop_Fields>
  stddev_samp: Maybe<Patient_Stddev_Samp_Fields>
  sum: Maybe<Patient_Sum_Fields>
  var_pop: Maybe<Patient_Var_Pop_Fields>
  var_samp: Maybe<Patient_Var_Samp_Fields>
  variance: Maybe<Patient_Variance_Fields>
}

/** aggregate fields of "patient" */
export type Patient_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Patient_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "patient" */
export type Patient_Aggregate_Order_By = {
  avg: Maybe<Patient_Avg_Order_By>
  count: Maybe<Order_By>
  max: Maybe<Patient_Max_Order_By>
  min: Maybe<Patient_Min_Order_By>
  stddev: Maybe<Patient_Stddev_Order_By>
  stddev_pop: Maybe<Patient_Stddev_Pop_Order_By>
  stddev_samp: Maybe<Patient_Stddev_Samp_Order_By>
  sum: Maybe<Patient_Sum_Order_By>
  var_pop: Maybe<Patient_Var_Pop_Order_By>
  var_samp: Maybe<Patient_Var_Samp_Order_By>
  variance: Maybe<Patient_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Patient_Append_Input = {
  a_jsonb: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "patient" */
export type Patient_Arr_Rel_Insert_Input = {
  data: Array<Patient_Insert_Input>
  on_conflict: Maybe<Patient_On_Conflict>
}

/** aggregate avg on columns */
export type Patient_Avg_Fields = {
  __typename?: 'patient_avg_fields'
  a_bigint: Maybe<Scalars['Float']>
  a_numeric: Maybe<Scalars['Float']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "patient" */
export type Patient_Avg_Order_By = {
  a_bigint: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "patient". All fields are combined with a logical 'AND'. */
export type Patient_Bool_Exp = {
  _and: Maybe<Array<Maybe<Patient_Bool_Exp>>>
  _not: Maybe<Patient_Bool_Exp>
  _or: Maybe<Array<Maybe<Patient_Bool_Exp>>>
  a_bigint: Maybe<Bigint_Comparison_Exp>
  a_boolean: Maybe<Boolean_Comparison_Exp>
  a_citext: Maybe<Citext_Comparison_Exp>
  a_date: Maybe<Date_Comparison_Exp>
  a_jsonb: Maybe<Jsonb_Comparison_Exp>
  a_numeric: Maybe<Numeric_Comparison_Exp>
  a_real: Maybe<Float_Comparison_Exp>
  an_integer: Maybe<Int_Comparison_Exp>
  an_uuid: Maybe<Uuid_Comparison_Exp>
  deleted: Maybe<Boolean_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  name: Maybe<String_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
  visites: Maybe<Visite_Bool_Exp>
}

/** unique or primary key constraints on table "patient" */
export enum Patient_Constraint {
  /** unique or primary key constraint */
  PatientPkey = 'patient_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Patient_Delete_At_Path_Input = {
  a_jsonb: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Patient_Delete_Elem_Input = {
  a_jsonb: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Patient_Delete_Key_Input = {
  a_jsonb: Maybe<Scalars['String']>
}

/** input type for incrementing integer column in table "patient" */
export type Patient_Inc_Input = {
  a_bigint: Maybe<Scalars['bigint']>
  a_numeric: Maybe<Scalars['numeric']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "patient" */
export type Patient_Insert_Input = {
  a_bigint: Maybe<Scalars['bigint']>
  a_boolean: Maybe<Scalars['Boolean']>
  a_citext: Maybe<Scalars['citext']>
  a_date: Maybe<Scalars['date']>
  a_jsonb: Maybe<Scalars['jsonb']>
  a_numeric: Maybe<Scalars['numeric']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Int']>
  an_uuid: Maybe<Scalars['uuid']>
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
  visites: Maybe<Visite_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Patient_Max_Fields = {
  __typename?: 'patient_max_fields'
  a_bigint: Maybe<Scalars['bigint']>
  a_citext: Maybe<Scalars['citext']>
  a_date: Maybe<Scalars['date']>
  a_numeric: Maybe<Scalars['numeric']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Int']>
  an_uuid: Maybe<Scalars['uuid']>
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "patient" */
export type Patient_Max_Order_By = {
  a_bigint: Maybe<Order_By>
  a_citext: Maybe<Order_By>
  a_date: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
  an_uuid: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** aggregate min on columns */
export type Patient_Min_Fields = {
  __typename?: 'patient_min_fields'
  a_bigint: Maybe<Scalars['bigint']>
  a_citext: Maybe<Scalars['citext']>
  a_date: Maybe<Scalars['date']>
  a_numeric: Maybe<Scalars['numeric']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Int']>
  an_uuid: Maybe<Scalars['uuid']>
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "patient" */
export type Patient_Min_Order_By = {
  a_bigint: Maybe<Order_By>
  a_citext: Maybe<Order_By>
  a_date: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
  an_uuid: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** response of any mutation on the table "patient" */
export type Patient_Mutation_Response = {
  __typename?: 'patient_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Patient>
}

/** input type for inserting object relation for remote table "patient" */
export type Patient_Obj_Rel_Insert_Input = {
  data: Patient_Insert_Input
  on_conflict: Maybe<Patient_On_Conflict>
}

/** on conflict condition type for table "patient" */
export type Patient_On_Conflict = {
  constraint: Patient_Constraint
  update_columns: Array<Patient_Update_Column>
  where: Maybe<Patient_Bool_Exp>
}

/** ordering options when selecting data from "patient" */
export type Patient_Order_By = {
  a_bigint: Maybe<Order_By>
  a_boolean: Maybe<Order_By>
  a_citext: Maybe<Order_By>
  a_date: Maybe<Order_By>
  a_jsonb: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
  an_uuid: Maybe<Order_By>
  deleted: Maybe<Order_By>
  id: Maybe<Order_By>
  name: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  visites_aggregate: Maybe<Visite_Aggregate_Order_By>
}

/** primary key columns input for table: "patient" */
export type Patient_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Patient_Prepend_Input = {
  a_jsonb: Maybe<Scalars['jsonb']>
}

/** select columns of table "patient" */
export enum Patient_Select_Column {
  /** column name */
  ABigint = 'a_bigint',
  /** column name */
  ABoolean = 'a_boolean',
  /** column name */
  ACitext = 'a_citext',
  /** column name */
  ADate = 'a_date',
  /** column name */
  AJsonb = 'a_jsonb',
  /** column name */
  ANumeric = 'a_numeric',
  /** column name */
  AReal = 'a_real',
  /** column name */
  AnInteger = 'an_integer',
  /** column name */
  AnUuid = 'an_uuid',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "patient" */
export type Patient_Set_Input = {
  a_bigint: Maybe<Scalars['bigint']>
  a_boolean: Maybe<Scalars['Boolean']>
  a_citext: Maybe<Scalars['citext']>
  a_date: Maybe<Scalars['date']>
  a_jsonb: Maybe<Scalars['jsonb']>
  a_numeric: Maybe<Scalars['numeric']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Int']>
  an_uuid: Maybe<Scalars['uuid']>
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  name: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
}

/** aggregate stddev on columns */
export type Patient_Stddev_Fields = {
  __typename?: 'patient_stddev_fields'
  a_bigint: Maybe<Scalars['Float']>
  a_numeric: Maybe<Scalars['Float']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "patient" */
export type Patient_Stddev_Order_By = {
  a_bigint: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Patient_Stddev_Pop_Fields = {
  __typename?: 'patient_stddev_pop_fields'
  a_bigint: Maybe<Scalars['Float']>
  a_numeric: Maybe<Scalars['Float']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "patient" */
export type Patient_Stddev_Pop_Order_By = {
  a_bigint: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Patient_Stddev_Samp_Fields = {
  __typename?: 'patient_stddev_samp_fields'
  a_bigint: Maybe<Scalars['Float']>
  a_numeric: Maybe<Scalars['Float']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "patient" */
export type Patient_Stddev_Samp_Order_By = {
  a_bigint: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Patient_Sum_Fields = {
  __typename?: 'patient_sum_fields'
  a_bigint: Maybe<Scalars['bigint']>
  a_numeric: Maybe<Scalars['numeric']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "patient" */
export type Patient_Sum_Order_By = {
  a_bigint: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
}

/** update columns of table "patient" */
export enum Patient_Update_Column {
  /** column name */
  ABigint = 'a_bigint',
  /** column name */
  ABoolean = 'a_boolean',
  /** column name */
  ACitext = 'a_citext',
  /** column name */
  ADate = 'a_date',
  /** column name */
  AJsonb = 'a_jsonb',
  /** column name */
  ANumeric = 'a_numeric',
  /** column name */
  AReal = 'a_real',
  /** column name */
  AnInteger = 'an_integer',
  /** column name */
  AnUuid = 'an_uuid',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Patient_Var_Pop_Fields = {
  __typename?: 'patient_var_pop_fields'
  a_bigint: Maybe<Scalars['Float']>
  a_numeric: Maybe<Scalars['Float']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "patient" */
export type Patient_Var_Pop_Order_By = {
  a_bigint: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Patient_Var_Samp_Fields = {
  __typename?: 'patient_var_samp_fields'
  a_bigint: Maybe<Scalars['Float']>
  a_numeric: Maybe<Scalars['Float']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "patient" */
export type Patient_Var_Samp_Order_By = {
  a_bigint: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Patient_Variance_Fields = {
  __typename?: 'patient_variance_fields'
  a_bigint: Maybe<Scalars['Float']>
  a_numeric: Maybe<Scalars['Float']>
  a_real: Maybe<Scalars['Float']>
  an_integer: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "patient" */
export type Patient_Variance_Order_By = {
  a_bigint: Maybe<Order_By>
  a_numeric: Maybe<Order_By>
  a_real: Maybe<Order_By>
  an_integer: Maybe<Order_By>
}

/** query root */
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
  /** fetch data from the table: "auth.email_templates" */
  auth_email_templates: Array<Auth_Email_Templates>
  /** fetch aggregated fields from the table: "auth.email_templates" */
  auth_email_templates_aggregate: Auth_Email_Templates_Aggregate
  /** fetch data from the table: "auth.email_templates" using primary key columns */
  auth_email_templates_by_pk: Maybe<Auth_Email_Templates>
  /** fetch data from the table: "auth.migrations" */
  auth_migrations: Array<Auth_Migrations>
  /** fetch aggregated fields from the table: "auth.migrations" */
  auth_migrations_aggregate: Auth_Migrations_Aggregate
  /** fetch data from the table: "auth.migrations" using primary key columns */
  auth_migrations_by_pk: Maybe<Auth_Migrations>
  /** fetch data from the table: "auth.provider_requests" */
  auth_provider_requests: Array<Auth_Provider_Requests>
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  auth_provider_requests_aggregate: Auth_Provider_Requests_Aggregate
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  auth_provider_requests_by_pk: Maybe<Auth_Provider_Requests>
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
  /** fetch data from the table: "auth.whitelist" */
  auth_whitelist: Array<Auth_Whitelist>
  /** fetch aggregated fields from the table: "auth.whitelist" */
  auth_whitelist_aggregate: Auth_Whitelist_Aggregate
  /** fetch data from the table: "auth.whitelist" using primary key columns */
  auth_whitelist_by_pk: Maybe<Auth_Whitelist>
  /** fetch data from the table: "drug" */
  drug: Array<Drug>
  /** fetch aggregated fields from the table: "drug" */
  drug_aggregate: Drug_Aggregate
  /** fetch data from the table: "drug" using primary key columns */
  drug_by_pk: Maybe<Drug>
  /** fetch data from the table: "lab_test" */
  lab_test: Array<Lab_Test>
  /** fetch aggregated fields from the table: "lab_test" */
  lab_test_aggregate: Lab_Test_Aggregate
  /** fetch data from the table: "lab_test" using primary key columns */
  lab_test_by_pk: Maybe<Lab_Test>
  /** fetch data from the table: "metadata.app_config" */
  metadata_app_config: Array<Metadata_App_Config>
  /** fetch aggregated fields from the table: "metadata.app_config" */
  metadata_app_config_aggregate: Metadata_App_Config_Aggregate
  /** fetch data from the table: "metadata.app_config" using primary key columns */
  metadata_app_config_by_pk: Maybe<Metadata_App_Config>
  /** fetch data from the table: "metadata.check_constraint" */
  metadata_check_constraint: Array<Metadata_Check_Constraint>
  /** fetch aggregated fields from the table: "metadata.check_constraint" */
  metadata_check_constraint_aggregate: Metadata_Check_Constraint_Aggregate
  /** fetch data from the table: "metadata.column_info" */
  metadata_column_info: Array<Metadata_Column_Info>
  /** fetch aggregated fields from the table: "metadata.column_info" */
  metadata_column_info_aggregate: Metadata_Column_Info_Aggregate
  /** fetch data from the table: "metadata.computed_field" */
  metadata_computed_field: Array<Metadata_Computed_Field>
  /** fetch aggregated fields from the table: "metadata.computed_field" */
  metadata_computed_field_aggregate: Metadata_Computed_Field_Aggregate
  /** fetch data from the table: "metadata.computed_property" */
  metadata_computed_property: Array<Metadata_Computed_Property>
  /** fetch aggregated fields from the table: "metadata.computed_property" */
  metadata_computed_property_aggregate: Metadata_Computed_Property_Aggregate
  /** fetch data from the table: "metadata.computed_property" using primary key columns */
  metadata_computed_property_by_pk: Maybe<Metadata_Computed_Property>
  /** fetch data from the table: "metadata.custom_type" */
  metadata_custom_type: Array<Metadata_Custom_Type>
  /** fetch aggregated fields from the table: "metadata.custom_type" */
  metadata_custom_type_aggregate: Metadata_Custom_Type_Aggregate
  /** fetch data from the table: "metadata.foreign_key_constraint" */
  metadata_foreign_key_constraint: Array<Metadata_Foreign_Key_Constraint>
  /** fetch aggregated fields from the table: "metadata.foreign_key_constraint" */
  metadata_foreign_key_constraint_aggregate: Metadata_Foreign_Key_Constraint_Aggregate
  /** fetch data from the table: "metadata.function" */
  metadata_function: Array<Metadata_Function>
  /** fetch data from the table: "metadata.function_agg" */
  metadata_function_agg: Array<Metadata_Function_Agg>
  /** fetch aggregated fields from the table: "metadata.function_agg" */
  metadata_function_agg_aggregate: Metadata_Function_Agg_Aggregate
  /** fetch aggregated fields from the table: "metadata.function" */
  metadata_function_aggregate: Metadata_Function_Aggregate
  /** fetch data from the table: "metadata.index" */
  metadata_index: Array<Metadata_Index>
  /** fetch aggregated fields from the table: "metadata.index" */
  metadata_index_aggregate: Metadata_Index_Aggregate
  /** fetch data from the table: "metadata.index_column" */
  metadata_index_column: Array<Metadata_Index_Column>
  /** fetch aggregated fields from the table: "metadata.index_column" */
  metadata_index_column_aggregate: Metadata_Index_Column_Aggregate
  /** fetch data from the table: "metadata.permission_agg" */
  metadata_permission_agg: Array<Metadata_Permission_Agg>
  /** fetch aggregated fields from the table: "metadata.permission_agg" */
  metadata_permission_agg_aggregate: Metadata_Permission_Agg_Aggregate
  /** fetch data from the table: "metadata.permission_insert_columns" */
  metadata_permission_insert_columns: Array<Metadata_Permission_Insert_Columns>
  /** fetch aggregated fields from the table: "metadata.permission_insert_columns" */
  metadata_permission_insert_columns_aggregate: Metadata_Permission_Insert_Columns_Aggregate
  /** fetch data from the table: "metadata.permission_select_columns" */
  metadata_permission_select_columns: Array<Metadata_Permission_Select_Columns>
  /** fetch aggregated fields from the table: "metadata.permission_select_columns" */
  metadata_permission_select_columns_aggregate: Metadata_Permission_Select_Columns_Aggregate
  /** fetch data from the table: "metadata.permission_update_columns" */
  metadata_permission_update_columns: Array<Metadata_Permission_Update_Columns>
  /** fetch aggregated fields from the table: "metadata.permission_update_columns" */
  metadata_permission_update_columns_aggregate: Metadata_Permission_Update_Columns_Aggregate
  /** fetch data from the table: "metadata.primary_key" */
  metadata_primary_key: Array<Metadata_Primary_Key>
  /** fetch aggregated fields from the table: "metadata.primary_key" */
  metadata_primary_key_aggregate: Metadata_Primary_Key_Aggregate
  /** fetch data from the table: "metadata.primary_key_column" */
  metadata_primary_key_column: Array<Metadata_Primary_Key_Column>
  /** fetch aggregated fields from the table: "metadata.primary_key_column" */
  metadata_primary_key_column_aggregate: Metadata_Primary_Key_Column_Aggregate
  /** fetch data from the table: "metadata.property_config" */
  metadata_property_config: Array<Metadata_Property_Config>
  /** fetch aggregated fields from the table: "metadata.property_config" */
  metadata_property_config_aggregate: Metadata_Property_Config_Aggregate
  /** fetch data from the table: "metadata.property_config" using primary key columns */
  metadata_property_config_by_pk: Maybe<Metadata_Property_Config>
  /** fetch data from the table: "metadata.relationship" */
  metadata_relationship: Array<Metadata_Relationship>
  /** fetch aggregated fields from the table: "metadata.relationship" */
  metadata_relationship_aggregate: Metadata_Relationship_Aggregate
  /** fetch data from the table: "metadata.relationship_mapping" */
  metadata_relationship_mapping: Array<Metadata_Relationship_Mapping>
  /** fetch aggregated fields from the table: "metadata.relationship_mapping" */
  metadata_relationship_mapping_aggregate: Metadata_Relationship_Mapping_Aggregate
  /** fetch data from the table: "metadata.role" */
  metadata_role: Array<Metadata_Role>
  /** fetch aggregated fields from the table: "metadata.role" */
  metadata_role_aggregate: Metadata_Role_Aggregate
  /** fetch data from the table: "metadata.schema_info" */
  metadata_schema_info: Array<Metadata_Schema_Info>
  /** fetch aggregated fields from the table: "metadata.schema_info" */
  metadata_schema_info_aggregate: Metadata_Schema_Info_Aggregate
  /** fetch data from the table: "metadata.table" */
  metadata_table: Array<Metadata_Table>
  /** fetch aggregated fields from the table: "metadata.table" */
  metadata_table_aggregate: Metadata_Table_Aggregate
  /** fetch data from the table: "metadata.table_config" */
  metadata_table_config: Array<Metadata_Table_Config>
  /** fetch aggregated fields from the table: "metadata.table_config" */
  metadata_table_config_aggregate: Metadata_Table_Config_Aggregate
  /** fetch data from the table: "metadata.table_config" using primary key columns */
  metadata_table_config_by_pk: Maybe<Metadata_Table_Config>
  /** fetch data from the table: "metadata.table_info" */
  metadata_table_info: Array<Metadata_Table_Info>
  /** fetch aggregated fields from the table: "metadata.table_info" */
  metadata_table_info_aggregate: Metadata_Table_Info_Aggregate
  /** fetch data from the table: "metadata.unique_constraint" */
  metadata_unique_constraint: Array<Metadata_Unique_Constraint>
  /** fetch aggregated fields from the table: "metadata.unique_constraint" */
  metadata_unique_constraint_aggregate: Metadata_Unique_Constraint_Aggregate
  /** fetch data from the table: "metadata.view_info" */
  metadata_view_info: Array<Metadata_View_Info>
  /** fetch aggregated fields from the table: "metadata.view_info" */
  metadata_view_info_aggregate: Metadata_View_Info_Aggregate
  /** fetch data from the table: "patient" */
  patient: Array<Patient>
  /** fetch aggregated fields from the table: "patient" */
  patient_aggregate: Patient_Aggregate
  /** fetch data from the table: "patient" using primary key columns */
  patient_by_pk: Maybe<Patient>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>
  /** fetch data from the table: "visite" */
  visite: Array<Visite>
  /** fetch aggregated fields from the table: "visite" */
  visite_aggregate: Visite_Aggregate
  /** fetch data from the table: "visite" using primary key columns */
  visite_by_pk: Maybe<Visite>
  /** fetch data from the table: "visite_lab_test" */
  visite_lab_test: Array<Visite_Lab_Test>
  /** fetch aggregated fields from the table: "visite_lab_test" */
  visite_lab_test_aggregate: Visite_Lab_Test_Aggregate
  /** fetch data from the table: "visite_lab_test" using primary key columns */
  visite_lab_test_by_pk: Maybe<Visite_Lab_Test>
}

/** query root */
export type Query_RootAuth_Account_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Account_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Account_Providers_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootAuth_Account_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Account_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Account_Roles_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootAuth_AccountsArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Accounts_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Accounts_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootAuth_Email_TemplatesArgs = {
  distinct_on: Maybe<Array<Auth_Email_Templates_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Email_Templates_Order_By>>
  where: Maybe<Auth_Email_Templates_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Email_Templates_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Email_Templates_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Email_Templates_Order_By>>
  where: Maybe<Auth_Email_Templates_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Email_Templates_By_PkArgs = {
  id: Scalars['String']
  locale: Scalars['String']
}

/** query root */
export type Query_RootAuth_MigrationsArgs = {
  distinct_on: Maybe<Array<Auth_Migrations_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Migrations_Order_By>>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Migrations_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Migrations_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Migrations_Order_By>>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Migrations_By_PkArgs = {
  id: Scalars['Int']
}

/** query root */
export type Query_RootAuth_Provider_RequestsArgs = {
  distinct_on: Maybe<Array<Auth_Provider_Requests_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Provider_Requests_Order_By>>
  where: Maybe<Auth_Provider_Requests_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Provider_Requests_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Provider_Requests_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Provider_Requests_Order_By>>
  where: Maybe<Auth_Provider_Requests_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Provider_Requests_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootAuth_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Providers_Order_By>>
  where: Maybe<Auth_Providers_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Providers_Order_By>>
  where: Maybe<Auth_Providers_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Providers_By_PkArgs = {
  provider: Scalars['String']
}

/** query root */
export type Query_RootAuth_Refresh_TokensArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Refresh_Tokens_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Refresh_Tokens_By_PkArgs = {
  refresh_token: Scalars['uuid']
}

/** query root */
export type Query_RootAuth_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Roles_Order_By>>
  where: Maybe<Auth_Roles_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Roles_Order_By>>
  where: Maybe<Auth_Roles_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Roles_By_PkArgs = {
  role: Scalars['String']
}

/** query root */
export type Query_RootAuth_WhitelistArgs = {
  distinct_on: Maybe<Array<Auth_Whitelist_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Whitelist_Order_By>>
  where: Maybe<Auth_Whitelist_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Whitelist_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Whitelist_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Whitelist_Order_By>>
  where: Maybe<Auth_Whitelist_Bool_Exp>
}

/** query root */
export type Query_RootAuth_Whitelist_By_PkArgs = {
  email: Scalars['String']
}

/** query root */
export type Query_RootDrugArgs = {
  distinct_on: Maybe<Array<Drug_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Drug_Order_By>>
  where: Maybe<Drug_Bool_Exp>
}

/** query root */
export type Query_RootDrug_AggregateArgs = {
  distinct_on: Maybe<Array<Drug_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Drug_Order_By>>
  where: Maybe<Drug_Bool_Exp>
}

/** query root */
export type Query_RootDrug_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootLab_TestArgs = {
  distinct_on: Maybe<Array<Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Lab_Test_Order_By>>
  where: Maybe<Lab_Test_Bool_Exp>
}

/** query root */
export type Query_RootLab_Test_AggregateArgs = {
  distinct_on: Maybe<Array<Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Lab_Test_Order_By>>
  where: Maybe<Lab_Test_Bool_Exp>
}

/** query root */
export type Query_RootLab_Test_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootMetadata_App_ConfigArgs = {
  distinct_on: Maybe<Array<Metadata_App_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_App_Config_Order_By>>
  where: Maybe<Metadata_App_Config_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_App_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_App_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_App_Config_Order_By>>
  where: Maybe<Metadata_App_Config_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_App_Config_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootMetadata_Check_ConstraintArgs = {
  distinct_on: Maybe<Array<Metadata_Check_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Check_Constraint_Order_By>>
  where: Maybe<Metadata_Check_Constraint_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Check_Constraint_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Check_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Check_Constraint_Order_By>>
  where: Maybe<Metadata_Check_Constraint_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Column_InfoArgs = {
  distinct_on: Maybe<Array<Metadata_Column_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Column_Info_Order_By>>
  where: Maybe<Metadata_Column_Info_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Column_Info_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Column_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Column_Info_Order_By>>
  where: Maybe<Metadata_Column_Info_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Computed_FieldArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Field_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Field_Order_By>>
  where: Maybe<Metadata_Computed_Field_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Computed_Field_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Field_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Field_Order_By>>
  where: Maybe<Metadata_Computed_Field_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Computed_PropertyArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Property_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Property_Order_By>>
  where: Maybe<Metadata_Computed_Property_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Computed_Property_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Property_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Property_Order_By>>
  where: Maybe<Metadata_Computed_Property_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Computed_Property_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootMetadata_Custom_TypeArgs = {
  distinct_on: Maybe<Array<Metadata_Custom_Type_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Custom_Type_Order_By>>
  where: Maybe<Metadata_Custom_Type_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Custom_Type_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Custom_Type_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Custom_Type_Order_By>>
  where: Maybe<Metadata_Custom_Type_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Foreign_Key_ConstraintArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Foreign_Key_Constraint_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_FunctionArgs = {
  distinct_on: Maybe<Array<Metadata_Function_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Function_Order_By>>
  where: Maybe<Metadata_Function_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Function_AggArgs = {
  distinct_on: Maybe<Array<Metadata_Function_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Function_Agg_Order_By>>
  where: Maybe<Metadata_Function_Agg_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Function_Agg_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Function_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Function_Agg_Order_By>>
  where: Maybe<Metadata_Function_Agg_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Function_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Function_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Function_Order_By>>
  where: Maybe<Metadata_Function_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_IndexArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Order_By>>
  where: Maybe<Metadata_Index_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Index_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Order_By>>
  where: Maybe<Metadata_Index_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Index_ColumnArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Column_Order_By>>
  where: Maybe<Metadata_Index_Column_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Index_Column_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Column_Order_By>>
  where: Maybe<Metadata_Index_Column_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Permission_AggArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Agg_Order_By>>
  where: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Permission_Agg_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Agg_Order_By>>
  where: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Permission_Insert_ColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Insert_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Insert_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Permission_Insert_Columns_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Insert_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Insert_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Permission_Select_ColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Permission_Select_Columns_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Permission_Update_ColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Update_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Permission_Update_Columns_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Update_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Primary_KeyArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Order_By>>
  where: Maybe<Metadata_Primary_Key_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Primary_Key_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Order_By>>
  where: Maybe<Metadata_Primary_Key_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Primary_Key_ColumnArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Column_Order_By>>
  where: Maybe<Metadata_Primary_Key_Column_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Primary_Key_Column_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Column_Order_By>>
  where: Maybe<Metadata_Primary_Key_Column_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Property_ConfigArgs = {
  distinct_on: Maybe<Array<Metadata_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Property_Config_Order_By>>
  where: Maybe<Metadata_Property_Config_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Property_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Property_Config_Order_By>>
  where: Maybe<Metadata_Property_Config_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Property_Config_By_PkArgs = {
  id: Scalars['String']
}

/** query root */
export type Query_RootMetadata_RelationshipArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Order_By>>
  where: Maybe<Metadata_Relationship_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Relationship_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Order_By>>
  where: Maybe<Metadata_Relationship_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Relationship_MappingArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Mapping_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Mapping_Order_By>>
  where: Maybe<Metadata_Relationship_Mapping_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Relationship_Mapping_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Mapping_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Mapping_Order_By>>
  where: Maybe<Metadata_Relationship_Mapping_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_RoleArgs = {
  distinct_on: Maybe<Array<Metadata_Role_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Role_Order_By>>
  where: Maybe<Metadata_Role_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Role_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Role_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Role_Order_By>>
  where: Maybe<Metadata_Role_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Schema_InfoArgs = {
  distinct_on: Maybe<Array<Metadata_Schema_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Schema_Info_Order_By>>
  where: Maybe<Metadata_Schema_Info_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Schema_Info_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Schema_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Schema_Info_Order_By>>
  where: Maybe<Metadata_Schema_Info_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_TableArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Order_By>>
  where: Maybe<Metadata_Table_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Table_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Order_By>>
  where: Maybe<Metadata_Table_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Table_ConfigArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Config_Order_By>>
  where: Maybe<Metadata_Table_Config_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Table_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Config_Order_By>>
  where: Maybe<Metadata_Table_Config_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Table_Config_By_PkArgs = {
  id: Scalars['String']
}

/** query root */
export type Query_RootMetadata_Table_InfoArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Info_Order_By>>
  where: Maybe<Metadata_Table_Info_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Table_Info_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Info_Order_By>>
  where: Maybe<Metadata_Table_Info_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Unique_ConstraintArgs = {
  distinct_on: Maybe<Array<Metadata_Unique_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Unique_Constraint_Order_By>>
  where: Maybe<Metadata_Unique_Constraint_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_Unique_Constraint_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Unique_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Unique_Constraint_Order_By>>
  where: Maybe<Metadata_Unique_Constraint_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_View_InfoArgs = {
  distinct_on: Maybe<Array<Metadata_View_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_View_Info_Order_By>>
  where: Maybe<Metadata_View_Info_Bool_Exp>
}

/** query root */
export type Query_RootMetadata_View_Info_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_View_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_View_Info_Order_By>>
  where: Maybe<Metadata_View_Info_Bool_Exp>
}

/** query root */
export type Query_RootPatientArgs = {
  distinct_on: Maybe<Array<Patient_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Patient_Order_By>>
  where: Maybe<Patient_Bool_Exp>
}

/** query root */
export type Query_RootPatient_AggregateArgs = {
  distinct_on: Maybe<Array<Patient_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Patient_Order_By>>
  where: Maybe<Patient_Bool_Exp>
}

/** query root */
export type Query_RootPatient_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootUsersArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Users_Order_By>>
  where: Maybe<Users_Bool_Exp>
}

/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Users_Order_By>>
  where: Maybe<Users_Bool_Exp>
}

/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootVisiteArgs = {
  distinct_on: Maybe<Array<Visite_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Order_By>>
  where: Maybe<Visite_Bool_Exp>
}

/** query root */
export type Query_RootVisite_AggregateArgs = {
  distinct_on: Maybe<Array<Visite_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Order_By>>
  where: Maybe<Visite_Bool_Exp>
}

/** query root */
export type Query_RootVisite_By_PkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type Query_RootVisite_Lab_TestArgs = {
  distinct_on: Maybe<Array<Visite_Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Lab_Test_Order_By>>
  where: Maybe<Visite_Lab_Test_Bool_Exp>
}

/** query root */
export type Query_RootVisite_Lab_Test_AggregateArgs = {
  distinct_on: Maybe<Array<Visite_Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Lab_Test_Order_By>>
  where: Maybe<Visite_Lab_Test_Bool_Exp>
}

/** query root */
export type Query_RootVisite_Lab_Test_By_PkArgs = {
  lab_test_id: Scalars['uuid']
  visite_id: Scalars['uuid']
}

/** expression to compare columns of type smallint. All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq: Maybe<Scalars['smallint']>
  _gt: Maybe<Scalars['smallint']>
  _gte: Maybe<Scalars['smallint']>
  _in: Maybe<Array<Scalars['smallint']>>
  _is_null: Maybe<Scalars['Boolean']>
  _lt: Maybe<Scalars['smallint']>
  _lte: Maybe<Scalars['smallint']>
  _neq: Maybe<Scalars['smallint']>
  _nin: Maybe<Array<Scalars['smallint']>>
}

/** subscription root */
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
  /** fetch data from the table: "auth.email_templates" */
  auth_email_templates: Array<Auth_Email_Templates>
  /** fetch aggregated fields from the table: "auth.email_templates" */
  auth_email_templates_aggregate: Auth_Email_Templates_Aggregate
  /** fetch data from the table: "auth.email_templates" using primary key columns */
  auth_email_templates_by_pk: Maybe<Auth_Email_Templates>
  /** fetch data from the table: "auth.migrations" */
  auth_migrations: Array<Auth_Migrations>
  /** fetch aggregated fields from the table: "auth.migrations" */
  auth_migrations_aggregate: Auth_Migrations_Aggregate
  /** fetch data from the table: "auth.migrations" using primary key columns */
  auth_migrations_by_pk: Maybe<Auth_Migrations>
  /** fetch data from the table: "auth.provider_requests" */
  auth_provider_requests: Array<Auth_Provider_Requests>
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  auth_provider_requests_aggregate: Auth_Provider_Requests_Aggregate
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  auth_provider_requests_by_pk: Maybe<Auth_Provider_Requests>
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
  /** fetch data from the table: "auth.whitelist" */
  auth_whitelist: Array<Auth_Whitelist>
  /** fetch aggregated fields from the table: "auth.whitelist" */
  auth_whitelist_aggregate: Auth_Whitelist_Aggregate
  /** fetch data from the table: "auth.whitelist" using primary key columns */
  auth_whitelist_by_pk: Maybe<Auth_Whitelist>
  /** fetch data from the table: "drug" */
  drug: Array<Drug>
  /** fetch aggregated fields from the table: "drug" */
  drug_aggregate: Drug_Aggregate
  /** fetch data from the table: "drug" using primary key columns */
  drug_by_pk: Maybe<Drug>
  /** fetch data from the table: "lab_test" */
  lab_test: Array<Lab_Test>
  /** fetch aggregated fields from the table: "lab_test" */
  lab_test_aggregate: Lab_Test_Aggregate
  /** fetch data from the table: "lab_test" using primary key columns */
  lab_test_by_pk: Maybe<Lab_Test>
  /** fetch data from the table: "metadata.app_config" */
  metadata_app_config: Array<Metadata_App_Config>
  /** fetch aggregated fields from the table: "metadata.app_config" */
  metadata_app_config_aggregate: Metadata_App_Config_Aggregate
  /** fetch data from the table: "metadata.app_config" using primary key columns */
  metadata_app_config_by_pk: Maybe<Metadata_App_Config>
  /** fetch data from the table: "metadata.check_constraint" */
  metadata_check_constraint: Array<Metadata_Check_Constraint>
  /** fetch aggregated fields from the table: "metadata.check_constraint" */
  metadata_check_constraint_aggregate: Metadata_Check_Constraint_Aggregate
  /** fetch data from the table: "metadata.column_info" */
  metadata_column_info: Array<Metadata_Column_Info>
  /** fetch aggregated fields from the table: "metadata.column_info" */
  metadata_column_info_aggregate: Metadata_Column_Info_Aggregate
  /** fetch data from the table: "metadata.computed_field" */
  metadata_computed_field: Array<Metadata_Computed_Field>
  /** fetch aggregated fields from the table: "metadata.computed_field" */
  metadata_computed_field_aggregate: Metadata_Computed_Field_Aggregate
  /** fetch data from the table: "metadata.computed_property" */
  metadata_computed_property: Array<Metadata_Computed_Property>
  /** fetch aggregated fields from the table: "metadata.computed_property" */
  metadata_computed_property_aggregate: Metadata_Computed_Property_Aggregate
  /** fetch data from the table: "metadata.computed_property" using primary key columns */
  metadata_computed_property_by_pk: Maybe<Metadata_Computed_Property>
  /** fetch data from the table: "metadata.custom_type" */
  metadata_custom_type: Array<Metadata_Custom_Type>
  /** fetch aggregated fields from the table: "metadata.custom_type" */
  metadata_custom_type_aggregate: Metadata_Custom_Type_Aggregate
  /** fetch data from the table: "metadata.foreign_key_constraint" */
  metadata_foreign_key_constraint: Array<Metadata_Foreign_Key_Constraint>
  /** fetch aggregated fields from the table: "metadata.foreign_key_constraint" */
  metadata_foreign_key_constraint_aggregate: Metadata_Foreign_Key_Constraint_Aggregate
  /** fetch data from the table: "metadata.function" */
  metadata_function: Array<Metadata_Function>
  /** fetch data from the table: "metadata.function_agg" */
  metadata_function_agg: Array<Metadata_Function_Agg>
  /** fetch aggregated fields from the table: "metadata.function_agg" */
  metadata_function_agg_aggregate: Metadata_Function_Agg_Aggregate
  /** fetch aggregated fields from the table: "metadata.function" */
  metadata_function_aggregate: Metadata_Function_Aggregate
  /** fetch data from the table: "metadata.index" */
  metadata_index: Array<Metadata_Index>
  /** fetch aggregated fields from the table: "metadata.index" */
  metadata_index_aggregate: Metadata_Index_Aggregate
  /** fetch data from the table: "metadata.index_column" */
  metadata_index_column: Array<Metadata_Index_Column>
  /** fetch aggregated fields from the table: "metadata.index_column" */
  metadata_index_column_aggregate: Metadata_Index_Column_Aggregate
  /** fetch data from the table: "metadata.permission_agg" */
  metadata_permission_agg: Array<Metadata_Permission_Agg>
  /** fetch aggregated fields from the table: "metadata.permission_agg" */
  metadata_permission_agg_aggregate: Metadata_Permission_Agg_Aggregate
  /** fetch data from the table: "metadata.permission_insert_columns" */
  metadata_permission_insert_columns: Array<Metadata_Permission_Insert_Columns>
  /** fetch aggregated fields from the table: "metadata.permission_insert_columns" */
  metadata_permission_insert_columns_aggregate: Metadata_Permission_Insert_Columns_Aggregate
  /** fetch data from the table: "metadata.permission_select_columns" */
  metadata_permission_select_columns: Array<Metadata_Permission_Select_Columns>
  /** fetch aggregated fields from the table: "metadata.permission_select_columns" */
  metadata_permission_select_columns_aggregate: Metadata_Permission_Select_Columns_Aggregate
  /** fetch data from the table: "metadata.permission_update_columns" */
  metadata_permission_update_columns: Array<Metadata_Permission_Update_Columns>
  /** fetch aggregated fields from the table: "metadata.permission_update_columns" */
  metadata_permission_update_columns_aggregate: Metadata_Permission_Update_Columns_Aggregate
  /** fetch data from the table: "metadata.primary_key" */
  metadata_primary_key: Array<Metadata_Primary_Key>
  /** fetch aggregated fields from the table: "metadata.primary_key" */
  metadata_primary_key_aggregate: Metadata_Primary_Key_Aggregate
  /** fetch data from the table: "metadata.primary_key_column" */
  metadata_primary_key_column: Array<Metadata_Primary_Key_Column>
  /** fetch aggregated fields from the table: "metadata.primary_key_column" */
  metadata_primary_key_column_aggregate: Metadata_Primary_Key_Column_Aggregate
  /** fetch data from the table: "metadata.property_config" */
  metadata_property_config: Array<Metadata_Property_Config>
  /** fetch aggregated fields from the table: "metadata.property_config" */
  metadata_property_config_aggregate: Metadata_Property_Config_Aggregate
  /** fetch data from the table: "metadata.property_config" using primary key columns */
  metadata_property_config_by_pk: Maybe<Metadata_Property_Config>
  /** fetch data from the table: "metadata.relationship" */
  metadata_relationship: Array<Metadata_Relationship>
  /** fetch aggregated fields from the table: "metadata.relationship" */
  metadata_relationship_aggregate: Metadata_Relationship_Aggregate
  /** fetch data from the table: "metadata.relationship_mapping" */
  metadata_relationship_mapping: Array<Metadata_Relationship_Mapping>
  /** fetch aggregated fields from the table: "metadata.relationship_mapping" */
  metadata_relationship_mapping_aggregate: Metadata_Relationship_Mapping_Aggregate
  /** fetch data from the table: "metadata.role" */
  metadata_role: Array<Metadata_Role>
  /** fetch aggregated fields from the table: "metadata.role" */
  metadata_role_aggregate: Metadata_Role_Aggregate
  /** fetch data from the table: "metadata.schema_info" */
  metadata_schema_info: Array<Metadata_Schema_Info>
  /** fetch aggregated fields from the table: "metadata.schema_info" */
  metadata_schema_info_aggregate: Metadata_Schema_Info_Aggregate
  /** fetch data from the table: "metadata.table" */
  metadata_table: Array<Metadata_Table>
  /** fetch aggregated fields from the table: "metadata.table" */
  metadata_table_aggregate: Metadata_Table_Aggregate
  /** fetch data from the table: "metadata.table_config" */
  metadata_table_config: Array<Metadata_Table_Config>
  /** fetch aggregated fields from the table: "metadata.table_config" */
  metadata_table_config_aggregate: Metadata_Table_Config_Aggregate
  /** fetch data from the table: "metadata.table_config" using primary key columns */
  metadata_table_config_by_pk: Maybe<Metadata_Table_Config>
  /** fetch data from the table: "metadata.table_info" */
  metadata_table_info: Array<Metadata_Table_Info>
  /** fetch aggregated fields from the table: "metadata.table_info" */
  metadata_table_info_aggregate: Metadata_Table_Info_Aggregate
  /** fetch data from the table: "metadata.unique_constraint" */
  metadata_unique_constraint: Array<Metadata_Unique_Constraint>
  /** fetch aggregated fields from the table: "metadata.unique_constraint" */
  metadata_unique_constraint_aggregate: Metadata_Unique_Constraint_Aggregate
  /** fetch data from the table: "metadata.view_info" */
  metadata_view_info: Array<Metadata_View_Info>
  /** fetch aggregated fields from the table: "metadata.view_info" */
  metadata_view_info_aggregate: Metadata_View_Info_Aggregate
  /** fetch data from the table: "patient" */
  patient: Array<Patient>
  /** fetch aggregated fields from the table: "patient" */
  patient_aggregate: Patient_Aggregate
  /** fetch data from the table: "patient" using primary key columns */
  patient_by_pk: Maybe<Patient>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>
  /** fetch data from the table: "visite" */
  visite: Array<Visite>
  /** fetch aggregated fields from the table: "visite" */
  visite_aggregate: Visite_Aggregate
  /** fetch data from the table: "visite" using primary key columns */
  visite_by_pk: Maybe<Visite>
  /** fetch data from the table: "visite_lab_test" */
  visite_lab_test: Array<Visite_Lab_Test>
  /** fetch aggregated fields from the table: "visite_lab_test" */
  visite_lab_test_aggregate: Visite_Lab_Test_Aggregate
  /** fetch data from the table: "visite_lab_test" using primary key columns */
  visite_lab_test_by_pk: Maybe<Visite_Lab_Test>
}

/** subscription root */
export type Subscription_RootAuth_Account_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Account_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Providers_Order_By>>
  where: Maybe<Auth_Account_Providers_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Account_Providers_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootAuth_Account_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Account_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Account_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Account_Roles_Order_By>>
  where: Maybe<Auth_Account_Roles_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Account_Roles_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootAuth_AccountsArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Accounts_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Accounts_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Accounts_Order_By>>
  where: Maybe<Auth_Accounts_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Accounts_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootAuth_Email_TemplatesArgs = {
  distinct_on: Maybe<Array<Auth_Email_Templates_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Email_Templates_Order_By>>
  where: Maybe<Auth_Email_Templates_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Email_Templates_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Email_Templates_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Email_Templates_Order_By>>
  where: Maybe<Auth_Email_Templates_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Email_Templates_By_PkArgs = {
  id: Scalars['String']
  locale: Scalars['String']
}

/** subscription root */
export type Subscription_RootAuth_MigrationsArgs = {
  distinct_on: Maybe<Array<Auth_Migrations_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Migrations_Order_By>>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Migrations_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Migrations_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Migrations_Order_By>>
  where: Maybe<Auth_Migrations_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Migrations_By_PkArgs = {
  id: Scalars['Int']
}

/** subscription root */
export type Subscription_RootAuth_Provider_RequestsArgs = {
  distinct_on: Maybe<Array<Auth_Provider_Requests_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Provider_Requests_Order_By>>
  where: Maybe<Auth_Provider_Requests_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Provider_Requests_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Provider_Requests_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Provider_Requests_Order_By>>
  where: Maybe<Auth_Provider_Requests_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Provider_Requests_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootAuth_ProvidersArgs = {
  distinct_on: Maybe<Array<Auth_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Providers_Order_By>>
  where: Maybe<Auth_Providers_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Providers_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Providers_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Providers_Order_By>>
  where: Maybe<Auth_Providers_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Providers_By_PkArgs = {
  provider: Scalars['String']
}

/** subscription root */
export type Subscription_RootAuth_Refresh_TokensArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Refresh_Tokens_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Refresh_Tokens_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Refresh_Tokens_Order_By>>
  where: Maybe<Auth_Refresh_Tokens_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Refresh_Tokens_By_PkArgs = {
  refresh_token: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootAuth_RolesArgs = {
  distinct_on: Maybe<Array<Auth_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Roles_Order_By>>
  where: Maybe<Auth_Roles_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Roles_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Roles_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Roles_Order_By>>
  where: Maybe<Auth_Roles_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Roles_By_PkArgs = {
  role: Scalars['String']
}

/** subscription root */
export type Subscription_RootAuth_WhitelistArgs = {
  distinct_on: Maybe<Array<Auth_Whitelist_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Whitelist_Order_By>>
  where: Maybe<Auth_Whitelist_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Whitelist_AggregateArgs = {
  distinct_on: Maybe<Array<Auth_Whitelist_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Auth_Whitelist_Order_By>>
  where: Maybe<Auth_Whitelist_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAuth_Whitelist_By_PkArgs = {
  email: Scalars['String']
}

/** subscription root */
export type Subscription_RootDrugArgs = {
  distinct_on: Maybe<Array<Drug_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Drug_Order_By>>
  where: Maybe<Drug_Bool_Exp>
}

/** subscription root */
export type Subscription_RootDrug_AggregateArgs = {
  distinct_on: Maybe<Array<Drug_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Drug_Order_By>>
  where: Maybe<Drug_Bool_Exp>
}

/** subscription root */
export type Subscription_RootDrug_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootLab_TestArgs = {
  distinct_on: Maybe<Array<Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Lab_Test_Order_By>>
  where: Maybe<Lab_Test_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLab_Test_AggregateArgs = {
  distinct_on: Maybe<Array<Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Lab_Test_Order_By>>
  where: Maybe<Lab_Test_Bool_Exp>
}

/** subscription root */
export type Subscription_RootLab_Test_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootMetadata_App_ConfigArgs = {
  distinct_on: Maybe<Array<Metadata_App_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_App_Config_Order_By>>
  where: Maybe<Metadata_App_Config_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_App_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_App_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_App_Config_Order_By>>
  where: Maybe<Metadata_App_Config_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_App_Config_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootMetadata_Check_ConstraintArgs = {
  distinct_on: Maybe<Array<Metadata_Check_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Check_Constraint_Order_By>>
  where: Maybe<Metadata_Check_Constraint_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Check_Constraint_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Check_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Check_Constraint_Order_By>>
  where: Maybe<Metadata_Check_Constraint_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Column_InfoArgs = {
  distinct_on: Maybe<Array<Metadata_Column_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Column_Info_Order_By>>
  where: Maybe<Metadata_Column_Info_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Column_Info_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Column_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Column_Info_Order_By>>
  where: Maybe<Metadata_Column_Info_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Computed_FieldArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Field_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Field_Order_By>>
  where: Maybe<Metadata_Computed_Field_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Computed_Field_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Field_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Field_Order_By>>
  where: Maybe<Metadata_Computed_Field_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Computed_PropertyArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Property_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Property_Order_By>>
  where: Maybe<Metadata_Computed_Property_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Computed_Property_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Computed_Property_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Computed_Property_Order_By>>
  where: Maybe<Metadata_Computed_Property_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Computed_Property_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootMetadata_Custom_TypeArgs = {
  distinct_on: Maybe<Array<Metadata_Custom_Type_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Custom_Type_Order_By>>
  where: Maybe<Metadata_Custom_Type_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Custom_Type_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Custom_Type_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Custom_Type_Order_By>>
  where: Maybe<Metadata_Custom_Type_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Foreign_Key_ConstraintArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Foreign_Key_Constraint_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Foreign_Key_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Foreign_Key_Constraint_Order_By>>
  where: Maybe<Metadata_Foreign_Key_Constraint_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_FunctionArgs = {
  distinct_on: Maybe<Array<Metadata_Function_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Function_Order_By>>
  where: Maybe<Metadata_Function_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Function_AggArgs = {
  distinct_on: Maybe<Array<Metadata_Function_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Function_Agg_Order_By>>
  where: Maybe<Metadata_Function_Agg_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Function_Agg_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Function_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Function_Agg_Order_By>>
  where: Maybe<Metadata_Function_Agg_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Function_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Function_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Function_Order_By>>
  where: Maybe<Metadata_Function_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_IndexArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Order_By>>
  where: Maybe<Metadata_Index_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Index_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Order_By>>
  where: Maybe<Metadata_Index_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Index_ColumnArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Column_Order_By>>
  where: Maybe<Metadata_Index_Column_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Index_Column_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Index_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Index_Column_Order_By>>
  where: Maybe<Metadata_Index_Column_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Permission_AggArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Agg_Order_By>>
  where: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Permission_Agg_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Agg_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Agg_Order_By>>
  where: Maybe<Metadata_Permission_Agg_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Permission_Insert_ColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Insert_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Insert_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Permission_Insert_Columns_AggregateArgs =
  {
    distinct_on: Maybe<Array<Metadata_Permission_Insert_Columns_Select_Column>>
    limit: Maybe<Scalars['Int']>
    offset: Maybe<Scalars['Int']>
    order_by: Maybe<Array<Metadata_Permission_Insert_Columns_Order_By>>
    where: Maybe<Metadata_Permission_Insert_Columns_Bool_Exp>
  }

/** subscription root */
export type Subscription_RootMetadata_Permission_Select_ColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Permission_Select_Columns_AggregateArgs =
  {
    distinct_on: Maybe<Array<Metadata_Permission_Select_Columns_Select_Column>>
    limit: Maybe<Scalars['Int']>
    offset: Maybe<Scalars['Int']>
    order_by: Maybe<Array<Metadata_Permission_Select_Columns_Order_By>>
    where: Maybe<Metadata_Permission_Select_Columns_Bool_Exp>
  }

/** subscription root */
export type Subscription_RootMetadata_Permission_Update_ColumnsArgs = {
  distinct_on: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Permission_Update_Columns_Order_By>>
  where: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Permission_Update_Columns_AggregateArgs =
  {
    distinct_on: Maybe<Array<Metadata_Permission_Update_Columns_Select_Column>>
    limit: Maybe<Scalars['Int']>
    offset: Maybe<Scalars['Int']>
    order_by: Maybe<Array<Metadata_Permission_Update_Columns_Order_By>>
    where: Maybe<Metadata_Permission_Update_Columns_Bool_Exp>
  }

/** subscription root */
export type Subscription_RootMetadata_Primary_KeyArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Order_By>>
  where: Maybe<Metadata_Primary_Key_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Primary_Key_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Order_By>>
  where: Maybe<Metadata_Primary_Key_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Primary_Key_ColumnArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Column_Order_By>>
  where: Maybe<Metadata_Primary_Key_Column_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Primary_Key_Column_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Primary_Key_Column_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Primary_Key_Column_Order_By>>
  where: Maybe<Metadata_Primary_Key_Column_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Property_ConfigArgs = {
  distinct_on: Maybe<Array<Metadata_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Property_Config_Order_By>>
  where: Maybe<Metadata_Property_Config_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Property_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Property_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Property_Config_Order_By>>
  where: Maybe<Metadata_Property_Config_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Property_Config_By_PkArgs = {
  id: Scalars['String']
}

/** subscription root */
export type Subscription_RootMetadata_RelationshipArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Order_By>>
  where: Maybe<Metadata_Relationship_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Relationship_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Order_By>>
  where: Maybe<Metadata_Relationship_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Relationship_MappingArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Mapping_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Mapping_Order_By>>
  where: Maybe<Metadata_Relationship_Mapping_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Relationship_Mapping_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Relationship_Mapping_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Relationship_Mapping_Order_By>>
  where: Maybe<Metadata_Relationship_Mapping_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_RoleArgs = {
  distinct_on: Maybe<Array<Metadata_Role_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Role_Order_By>>
  where: Maybe<Metadata_Role_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Role_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Role_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Role_Order_By>>
  where: Maybe<Metadata_Role_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Schema_InfoArgs = {
  distinct_on: Maybe<Array<Metadata_Schema_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Schema_Info_Order_By>>
  where: Maybe<Metadata_Schema_Info_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Schema_Info_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Schema_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Schema_Info_Order_By>>
  where: Maybe<Metadata_Schema_Info_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_TableArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Order_By>>
  where: Maybe<Metadata_Table_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Table_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Order_By>>
  where: Maybe<Metadata_Table_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Table_ConfigArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Config_Order_By>>
  where: Maybe<Metadata_Table_Config_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Table_Config_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Config_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Config_Order_By>>
  where: Maybe<Metadata_Table_Config_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Table_Config_By_PkArgs = {
  id: Scalars['String']
}

/** subscription root */
export type Subscription_RootMetadata_Table_InfoArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Info_Order_By>>
  where: Maybe<Metadata_Table_Info_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Table_Info_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Table_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Table_Info_Order_By>>
  where: Maybe<Metadata_Table_Info_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Unique_ConstraintArgs = {
  distinct_on: Maybe<Array<Metadata_Unique_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Unique_Constraint_Order_By>>
  where: Maybe<Metadata_Unique_Constraint_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_Unique_Constraint_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_Unique_Constraint_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_Unique_Constraint_Order_By>>
  where: Maybe<Metadata_Unique_Constraint_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_View_InfoArgs = {
  distinct_on: Maybe<Array<Metadata_View_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_View_Info_Order_By>>
  where: Maybe<Metadata_View_Info_Bool_Exp>
}

/** subscription root */
export type Subscription_RootMetadata_View_Info_AggregateArgs = {
  distinct_on: Maybe<Array<Metadata_View_Info_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Metadata_View_Info_Order_By>>
  where: Maybe<Metadata_View_Info_Bool_Exp>
}

/** subscription root */
export type Subscription_RootPatientArgs = {
  distinct_on: Maybe<Array<Patient_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Patient_Order_By>>
  where: Maybe<Patient_Bool_Exp>
}

/** subscription root */
export type Subscription_RootPatient_AggregateArgs = {
  distinct_on: Maybe<Array<Patient_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Patient_Order_By>>
  where: Maybe<Patient_Bool_Exp>
}

/** subscription root */
export type Subscription_RootPatient_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Users_Order_By>>
  where: Maybe<Users_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Users_Order_By>>
  where: Maybe<Users_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootVisiteArgs = {
  distinct_on: Maybe<Array<Visite_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Order_By>>
  where: Maybe<Visite_Bool_Exp>
}

/** subscription root */
export type Subscription_RootVisite_AggregateArgs = {
  distinct_on: Maybe<Array<Visite_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Order_By>>
  where: Maybe<Visite_Bool_Exp>
}

/** subscription root */
export type Subscription_RootVisite_By_PkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type Subscription_RootVisite_Lab_TestArgs = {
  distinct_on: Maybe<Array<Visite_Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Lab_Test_Order_By>>
  where: Maybe<Visite_Lab_Test_Bool_Exp>
}

/** subscription root */
export type Subscription_RootVisite_Lab_Test_AggregateArgs = {
  distinct_on: Maybe<Array<Visite_Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Lab_Test_Order_By>>
  where: Maybe<Visite_Lab_Test_Bool_Exp>
}

/** subscription root */
export type Subscription_RootVisite_Lab_Test_By_PkArgs = {
  lab_test_id: Scalars['uuid']
  visite_id: Scalars['uuid']
}

/** expression to compare columns of type timestamp. All fields are combined with logical 'AND'. */
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

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
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
  deleted: Scalars['Boolean']
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
  count: Maybe<Scalars['Int']>
  max: Maybe<Users_Max_Fields>
  min: Maybe<Users_Min_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Users_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Users_Max_Order_By>
  min: Maybe<Users_Min_Order_By>
}

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>
  on_conflict: Maybe<Users_On_Conflict>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and: Maybe<Array<Maybe<Users_Bool_Exp>>>
  _not: Maybe<Users_Bool_Exp>
  _or: Maybe<Array<Maybe<Users_Bool_Exp>>>
  account: Maybe<Auth_Accounts_Bool_Exp>
  avatar_url: Maybe<String_Comparison_Exp>
  created_at: Maybe<Timestamptz_Comparison_Exp>
  deleted: Maybe<Boolean_Comparison_Exp>
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
  deleted: Maybe<Scalars['Boolean']>
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

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  avatar_url: Maybe<Order_By>
  created_at: Maybe<Order_By>
  display_name: Maybe<Order_By>
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
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

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  avatar_url: Maybe<Order_By>
  created_at: Maybe<Order_By>
  display_name: Maybe<Order_By>
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  on_conflict: Maybe<Users_On_Conflict>
}

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns: Array<Users_Update_Column>
  where: Maybe<Users_Bool_Exp>
}

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  account: Maybe<Auth_Accounts_Order_By>
  avatar_url: Maybe<Order_By>
  created_at: Maybe<Order_By>
  deleted: Maybe<Order_By>
  display_name: Maybe<Order_By>
  id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
}

/** primary key columns input for table: "users" */
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
  Deleted = 'deleted',
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
  deleted: Maybe<Scalars['Boolean']>
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
  Deleted = 'deleted',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
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

/**
 * Une visite
 *
 *
 * columns and relationships of "visite"
 */
export type Visite = {
  __typename?: 'visite'
  deleted: Scalars['Boolean']
  id: Scalars['uuid']
  /** An array relationship */
  lab_tests: Array<Visite_Lab_Test>
  /** An aggregated array relationship */
  lab_tests_aggregate: Visite_Lab_Test_Aggregate
  muac: Scalars['Int']
  /** An object relationship */
  patient: Patient
  patient_id: Scalars['uuid']
  test: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
  visit_date: Scalars['timestamptz']
}

/**
 * Une visite
 *
 *
 * columns and relationships of "visite"
 */
export type VisiteLab_TestsArgs = {
  distinct_on: Maybe<Array<Visite_Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Lab_Test_Order_By>>
  where: Maybe<Visite_Lab_Test_Bool_Exp>
}

/**
 * Une visite
 *
 *
 * columns and relationships of "visite"
 */
export type VisiteLab_Tests_AggregateArgs = {
  distinct_on: Maybe<Array<Visite_Lab_Test_Select_Column>>
  limit: Maybe<Scalars['Int']>
  offset: Maybe<Scalars['Int']>
  order_by: Maybe<Array<Visite_Lab_Test_Order_By>>
  where: Maybe<Visite_Lab_Test_Bool_Exp>
}

/** aggregated selection of "visite" */
export type Visite_Aggregate = {
  __typename?: 'visite_aggregate'
  aggregate: Maybe<Visite_Aggregate_Fields>
  nodes: Array<Visite>
}

/** aggregate fields of "visite" */
export type Visite_Aggregate_Fields = {
  __typename?: 'visite_aggregate_fields'
  avg: Maybe<Visite_Avg_Fields>
  count: Maybe<Scalars['Int']>
  max: Maybe<Visite_Max_Fields>
  min: Maybe<Visite_Min_Fields>
  stddev: Maybe<Visite_Stddev_Fields>
  stddev_pop: Maybe<Visite_Stddev_Pop_Fields>
  stddev_samp: Maybe<Visite_Stddev_Samp_Fields>
  sum: Maybe<Visite_Sum_Fields>
  var_pop: Maybe<Visite_Var_Pop_Fields>
  var_samp: Maybe<Visite_Var_Samp_Fields>
  variance: Maybe<Visite_Variance_Fields>
}

/** aggregate fields of "visite" */
export type Visite_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Visite_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "visite" */
export type Visite_Aggregate_Order_By = {
  avg: Maybe<Visite_Avg_Order_By>
  count: Maybe<Order_By>
  max: Maybe<Visite_Max_Order_By>
  min: Maybe<Visite_Min_Order_By>
  stddev: Maybe<Visite_Stddev_Order_By>
  stddev_pop: Maybe<Visite_Stddev_Pop_Order_By>
  stddev_samp: Maybe<Visite_Stddev_Samp_Order_By>
  sum: Maybe<Visite_Sum_Order_By>
  var_pop: Maybe<Visite_Var_Pop_Order_By>
  var_samp: Maybe<Visite_Var_Samp_Order_By>
  variance: Maybe<Visite_Variance_Order_By>
}

/** input type for inserting array relation for remote table "visite" */
export type Visite_Arr_Rel_Insert_Input = {
  data: Array<Visite_Insert_Input>
  on_conflict: Maybe<Visite_On_Conflict>
}

/** aggregate avg on columns */
export type Visite_Avg_Fields = {
  __typename?: 'visite_avg_fields'
  muac: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "visite" */
export type Visite_Avg_Order_By = {
  muac: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "visite". All fields are combined with a logical 'AND'. */
export type Visite_Bool_Exp = {
  _and: Maybe<Array<Maybe<Visite_Bool_Exp>>>
  _not: Maybe<Visite_Bool_Exp>
  _or: Maybe<Array<Maybe<Visite_Bool_Exp>>>
  deleted: Maybe<Boolean_Comparison_Exp>
  id: Maybe<Uuid_Comparison_Exp>
  lab_tests: Maybe<Visite_Lab_Test_Bool_Exp>
  muac: Maybe<Int_Comparison_Exp>
  patient: Maybe<Patient_Bool_Exp>
  patient_id: Maybe<Uuid_Comparison_Exp>
  test: Maybe<String_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
  visit_date: Maybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "visite" */
export enum Visite_Constraint {
  /** unique or primary key constraint */
  VisitePkey = 'visite_pkey'
}

/** input type for incrementing integer column in table "visite" */
export type Visite_Inc_Input = {
  muac: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "visite" */
export type Visite_Insert_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  lab_tests: Maybe<Visite_Lab_Test_Arr_Rel_Insert_Input>
  muac: Maybe<Scalars['Int']>
  patient: Maybe<Patient_Obj_Rel_Insert_Input>
  patient_id: Maybe<Scalars['uuid']>
  test: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
  visit_date: Maybe<Scalars['timestamptz']>
}

/** columns and relationships of "visite_lab_test" */
export type Visite_Lab_Test = {
  __typename?: 'visite_lab_test'
  deleted: Scalars['Boolean']
  /** An object relationship */
  lab_test: Lab_Test
  lab_test_id: Scalars['uuid']
  updated_at: Scalars['timestamptz']
  /** An object relationship */
  visite: Visite
  visite_id: Scalars['uuid']
}

/** aggregated selection of "visite_lab_test" */
export type Visite_Lab_Test_Aggregate = {
  __typename?: 'visite_lab_test_aggregate'
  aggregate: Maybe<Visite_Lab_Test_Aggregate_Fields>
  nodes: Array<Visite_Lab_Test>
}

/** aggregate fields of "visite_lab_test" */
export type Visite_Lab_Test_Aggregate_Fields = {
  __typename?: 'visite_lab_test_aggregate_fields'
  count: Maybe<Scalars['Int']>
  max: Maybe<Visite_Lab_Test_Max_Fields>
  min: Maybe<Visite_Lab_Test_Min_Fields>
}

/** aggregate fields of "visite_lab_test" */
export type Visite_Lab_Test_Aggregate_FieldsCountArgs = {
  columns: Maybe<Array<Visite_Lab_Test_Select_Column>>
  distinct: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "visite_lab_test" */
export type Visite_Lab_Test_Aggregate_Order_By = {
  count: Maybe<Order_By>
  max: Maybe<Visite_Lab_Test_Max_Order_By>
  min: Maybe<Visite_Lab_Test_Min_Order_By>
}

/** input type for inserting array relation for remote table "visite_lab_test" */
export type Visite_Lab_Test_Arr_Rel_Insert_Input = {
  data: Array<Visite_Lab_Test_Insert_Input>
  on_conflict: Maybe<Visite_Lab_Test_On_Conflict>
}

/** Boolean expression to filter rows from the table "visite_lab_test". All fields are combined with a logical 'AND'. */
export type Visite_Lab_Test_Bool_Exp = {
  _and: Maybe<Array<Maybe<Visite_Lab_Test_Bool_Exp>>>
  _not: Maybe<Visite_Lab_Test_Bool_Exp>
  _or: Maybe<Array<Maybe<Visite_Lab_Test_Bool_Exp>>>
  deleted: Maybe<Boolean_Comparison_Exp>
  lab_test: Maybe<Lab_Test_Bool_Exp>
  lab_test_id: Maybe<Uuid_Comparison_Exp>
  updated_at: Maybe<Timestamptz_Comparison_Exp>
  visite: Maybe<Visite_Bool_Exp>
  visite_id: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "visite_lab_test" */
export enum Visite_Lab_Test_Constraint {
  /** unique or primary key constraint */
  VisiteLabTestPkey = 'visite_lab_test_pkey'
}

/** input type for inserting data into table "visite_lab_test" */
export type Visite_Lab_Test_Insert_Input = {
  deleted: Maybe<Scalars['Boolean']>
  lab_test: Maybe<Lab_Test_Obj_Rel_Insert_Input>
  lab_test_id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
  visite: Maybe<Visite_Obj_Rel_Insert_Input>
  visite_id: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Visite_Lab_Test_Max_Fields = {
  __typename?: 'visite_lab_test_max_fields'
  lab_test_id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
  visite_id: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "visite_lab_test" */
export type Visite_Lab_Test_Max_Order_By = {
  lab_test_id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  visite_id: Maybe<Order_By>
}

/** aggregate min on columns */
export type Visite_Lab_Test_Min_Fields = {
  __typename?: 'visite_lab_test_min_fields'
  lab_test_id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
  visite_id: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "visite_lab_test" */
export type Visite_Lab_Test_Min_Order_By = {
  lab_test_id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  visite_id: Maybe<Order_By>
}

/** response of any mutation on the table "visite_lab_test" */
export type Visite_Lab_Test_Mutation_Response = {
  __typename?: 'visite_lab_test_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Visite_Lab_Test>
}

/** input type for inserting object relation for remote table "visite_lab_test" */
export type Visite_Lab_Test_Obj_Rel_Insert_Input = {
  data: Visite_Lab_Test_Insert_Input
  on_conflict: Maybe<Visite_Lab_Test_On_Conflict>
}

/** on conflict condition type for table "visite_lab_test" */
export type Visite_Lab_Test_On_Conflict = {
  constraint: Visite_Lab_Test_Constraint
  update_columns: Array<Visite_Lab_Test_Update_Column>
  where: Maybe<Visite_Lab_Test_Bool_Exp>
}

/** ordering options when selecting data from "visite_lab_test" */
export type Visite_Lab_Test_Order_By = {
  deleted: Maybe<Order_By>
  lab_test: Maybe<Lab_Test_Order_By>
  lab_test_id: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  visite: Maybe<Visite_Order_By>
  visite_id: Maybe<Order_By>
}

/** primary key columns input for table: "visite_lab_test" */
export type Visite_Lab_Test_Pk_Columns_Input = {
  lab_test_id: Scalars['uuid']
  visite_id: Scalars['uuid']
}

/** select columns of table "visite_lab_test" */
export enum Visite_Lab_Test_Select_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  LabTestId = 'lab_test_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisiteId = 'visite_id'
}

/** input type for updating data in table "visite_lab_test" */
export type Visite_Lab_Test_Set_Input = {
  deleted: Maybe<Scalars['Boolean']>
  lab_test_id: Maybe<Scalars['uuid']>
  updated_at: Maybe<Scalars['timestamptz']>
  visite_id: Maybe<Scalars['uuid']>
}

/** update columns of table "visite_lab_test" */
export enum Visite_Lab_Test_Update_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  LabTestId = 'lab_test_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisiteId = 'visite_id'
}

/** aggregate max on columns */
export type Visite_Max_Fields = {
  __typename?: 'visite_max_fields'
  id: Maybe<Scalars['uuid']>
  muac: Maybe<Scalars['Int']>
  patient_id: Maybe<Scalars['uuid']>
  test: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
  visit_date: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "visite" */
export type Visite_Max_Order_By = {
  id: Maybe<Order_By>
  muac: Maybe<Order_By>
  patient_id: Maybe<Order_By>
  test: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  visit_date: Maybe<Order_By>
}

/** aggregate min on columns */
export type Visite_Min_Fields = {
  __typename?: 'visite_min_fields'
  id: Maybe<Scalars['uuid']>
  muac: Maybe<Scalars['Int']>
  patient_id: Maybe<Scalars['uuid']>
  test: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
  visit_date: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "visite" */
export type Visite_Min_Order_By = {
  id: Maybe<Order_By>
  muac: Maybe<Order_By>
  patient_id: Maybe<Order_By>
  test: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  visit_date: Maybe<Order_By>
}

/** response of any mutation on the table "visite" */
export type Visite_Mutation_Response = {
  __typename?: 'visite_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Visite>
}

/** input type for inserting object relation for remote table "visite" */
export type Visite_Obj_Rel_Insert_Input = {
  data: Visite_Insert_Input
  on_conflict: Maybe<Visite_On_Conflict>
}

/** on conflict condition type for table "visite" */
export type Visite_On_Conflict = {
  constraint: Visite_Constraint
  update_columns: Array<Visite_Update_Column>
  where: Maybe<Visite_Bool_Exp>
}

/** ordering options when selecting data from "visite" */
export type Visite_Order_By = {
  deleted: Maybe<Order_By>
  id: Maybe<Order_By>
  lab_tests_aggregate: Maybe<Visite_Lab_Test_Aggregate_Order_By>
  muac: Maybe<Order_By>
  patient: Maybe<Patient_Order_By>
  patient_id: Maybe<Order_By>
  test: Maybe<Order_By>
  updated_at: Maybe<Order_By>
  visit_date: Maybe<Order_By>
}

/** primary key columns input for table: "visite" */
export type Visite_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "visite" */
export enum Visite_Select_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Muac = 'muac',
  /** column name */
  PatientId = 'patient_id',
  /** column name */
  Test = 'test',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitDate = 'visit_date'
}

/** input type for updating data in table "visite" */
export type Visite_Set_Input = {
  deleted: Maybe<Scalars['Boolean']>
  id: Maybe<Scalars['uuid']>
  muac: Maybe<Scalars['Int']>
  patient_id: Maybe<Scalars['uuid']>
  test: Maybe<Scalars['String']>
  updated_at: Maybe<Scalars['timestamptz']>
  visit_date: Maybe<Scalars['timestamptz']>
}

/** aggregate stddev on columns */
export type Visite_Stddev_Fields = {
  __typename?: 'visite_stddev_fields'
  muac: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "visite" */
export type Visite_Stddev_Order_By = {
  muac: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Visite_Stddev_Pop_Fields = {
  __typename?: 'visite_stddev_pop_fields'
  muac: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "visite" */
export type Visite_Stddev_Pop_Order_By = {
  muac: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Visite_Stddev_Samp_Fields = {
  __typename?: 'visite_stddev_samp_fields'
  muac: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "visite" */
export type Visite_Stddev_Samp_Order_By = {
  muac: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Visite_Sum_Fields = {
  __typename?: 'visite_sum_fields'
  muac: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "visite" */
export type Visite_Sum_Order_By = {
  muac: Maybe<Order_By>
}

/** update columns of table "visite" */
export enum Visite_Update_Column {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Id = 'id',
  /** column name */
  Muac = 'muac',
  /** column name */
  PatientId = 'patient_id',
  /** column name */
  Test = 'test',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VisitDate = 'visit_date'
}

/** aggregate var_pop on columns */
export type Visite_Var_Pop_Fields = {
  __typename?: 'visite_var_pop_fields'
  muac: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "visite" */
export type Visite_Var_Pop_Order_By = {
  muac: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Visite_Var_Samp_Fields = {
  __typename?: 'visite_var_samp_fields'
  muac: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "visite" */
export type Visite_Var_Samp_Order_By = {
  muac: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Visite_Variance_Fields = {
  __typename?: 'visite_variance_fields'
  muac: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "visite" */
export type Visite_Variance_Order_By = {
  muac: Maybe<Order_By>
}

export type AppConfigQueryVariables = Exact<{
  updated_at: Scalars['timestamptz']
  batchSize: Scalars['Int']
}>

export type AppConfigQuery = { __typename?: 'query_root' } & {
  metadata_app_config: Array<
    { __typename?: 'metadata_app_config' } & Pick<
      Metadata_App_Config,
      'id' | 'updated_at' | 'menu_order' | 'deleted'
    >
  >
}

export type InsertMetadataAppConfigMutationVariables = Exact<{
  objects:
    | Array<Metadata_App_Config_Insert_Input>
    | Metadata_App_Config_Insert_Input
}>

export type InsertMetadataAppConfigMutation = {
  __typename?: 'mutation_root'
} & {
  insert_metadata_app_config: Maybe<
    { __typename?: 'metadata_app_config_mutation_response' } & {
      returning: Array<
        { __typename?: 'metadata_app_config' } & Pick<Metadata_App_Config, 'id'>
      >
    }
  >
}

export type OnAppConfigSubscriptionVariables = Exact<{
  now: Scalars['timestamptz']
}>

export type OnAppConfigSubscription = { __typename?: 'subscription_root' } & {
  metadata_app_config: Array<
    { __typename?: 'metadata_app_config' } & Pick<
      Metadata_App_Config,
      'updated_at'
    >
  >
}

export type PropertyConfigQueryVariables = Exact<{
  updated_at: Scalars['timestamptz']
  batchSize: Scalars['Int']
}>

export type PropertyConfigQuery = { __typename?: 'query_root' } & {
  metadata_property_config: Array<
    { __typename?: 'metadata_property_config' } & Pick<
      Metadata_Property_Config,
      | 'id'
      | 'updated_at'
      | 'table_id'
      | 'deleted'
      | 'property_name'
      | 'component'
      | 'json_schema'
      | 'icon'
      | 'description'
      | 'title'
    >
  >
}

export type InsertMetadataPropertyConfigMutationVariables = Exact<{
  objects:
    | Array<Metadata_Property_Config_Insert_Input>
    | Metadata_Property_Config_Insert_Input
}>

export type InsertMetadataPropertyConfigMutation = {
  __typename?: 'mutation_root'
} & {
  insert_metadata_property_config: Maybe<
    { __typename?: 'metadata_property_config_mutation_response' } & {
      returning: Array<
        { __typename?: 'metadata_property_config' } & Pick<
          Metadata_Property_Config,
          'id'
        >
      >
    }
  >
}

export type OnPropertyConfigSubscriptionVariables = Exact<{
  now: Scalars['timestamptz']
}>

export type OnPropertyConfigSubscription = {
  __typename?: 'subscription_root'
} & {
  metadata_property_config: Array<
    { __typename?: 'metadata_property_config' } & Pick<
      Metadata_Property_Config,
      'updated_at'
    >
  >
}

export type TableConfigQueryVariables = Exact<{
  updated_at: Scalars['timestamptz']
  batchSize: Scalars['Int']
}>

export type TableConfigQuery = { __typename?: 'query_root' } & {
  metadata_table_config: Array<
    { __typename?: 'metadata_table_config' } & Pick<
      Metadata_Table_Config,
      | 'id'
      | 'updated_at'
      | 'deleted'
      | 'component'
      | 'description'
      | 'document_label'
      | 'document_title'
      | 'icon'
      | 'order'
      | 'title'
    >
  >
}

export type InsertMetadataTableConfigMutationVariables = Exact<{
  objects:
    | Array<Metadata_Table_Config_Insert_Input>
    | Metadata_Table_Config_Insert_Input
}>

export type InsertMetadataTableConfigMutation = {
  __typename?: 'mutation_root'
} & {
  insert_metadata_table_config: Maybe<
    { __typename?: 'metadata_table_config_mutation_response' } & {
      returning: Array<
        { __typename?: 'metadata_table_config' } & Pick<
          Metadata_Table_Config,
          'id'
        >
      >
    }
  >
}

export type OnTableConfigSubscriptionVariables = Exact<{
  now: Scalars['timestamptz']
}>

export type OnTableConfigSubscription = { __typename?: 'subscription_root' } & {
  metadata_table_config: Array<
    { __typename?: 'metadata_table_config' } & Pick<
      Metadata_Table_Config,
      'updated_at'
    >
  >
}

export type CoreTableFragment = { __typename?: 'metadata_table' } & Pick<
  Metadata_Table,
  'id' | 'name' | 'schema'
> & {
    primaryKey: Maybe<
      { __typename?: 'metadata_primary_key' } & Pick<
        Metadata_Primary_Key,
        'constraintName'
      > & {
          columns: Array<
            { __typename?: 'metadata_index_column' } & Pick<
              Metadata_Index_Column,
              'columnName'
            >
          >
        }
    >
  }

export type ColumnFragment = { __typename?: 'metadata_column_info' } & Pick<
  Metadata_Column_Info,
  'name' | 'udtName' | 'isNullable' | 'default'
>

export type TableFragment = { __typename?: 'metadata_table' } & {
  view: Maybe<
    { __typename?: 'metadata_view_info' } & Pick<Metadata_View_Info, 'id'>
  >
  dependentForeignKeys: Array<
    { __typename?: 'metadata_foreign_key_constraint' } & Pick<
      Metadata_Foreign_Key_Constraint,
      'tableId' | 'onDelete' | 'onUpdate' | 'columns'
    >
  >
  foreignKeys: Array<
    { __typename?: 'metadata_foreign_key_constraint' } & Pick<
      Metadata_Foreign_Key_Constraint,
      'columns'
    >
  >
  indexes: Array<
    { __typename?: 'metadata_index' } & Pick<Metadata_Index, 'name'> & {
        columns: Array<
          { __typename?: 'metadata_index_column' } & Pick<
            Metadata_Index_Column,
            'columnName'
          >
        >
      }
  >
  computedProperties: Array<
    { __typename?: 'metadata_computed_property' } & Pick<
      Metadata_Computed_Property,
      'name' | 'type' | 'nullable' | 'transformation' | 'template'
    >
  >
  relationships: Array<
    { __typename?: 'metadata_relationship' } & Pick<
      Metadata_Relationship,
      'name' | 'type' | 'remoteTableId'
    > & {
        mapping: Array<
          { __typename?: 'metadata_relationship_mapping' } & Pick<
            Metadata_Relationship_Mapping,
            'remoteColumnName'
          > & {
              column: Maybe<
                { __typename?: 'metadata_column_info' } & ColumnFragment
              >
            }
        >
      }
  >
  columns: Array<
    { __typename?: 'metadata_column_info' } & {
      primaryKey: Maybe<
        { __typename?: 'metadata_primary_key_column' } & Pick<
          Metadata_Primary_Key_Column,
          'constraintName'
        >
      >
      canSelect: Array<
        { __typename?: 'metadata_permission_select_columns' } & Pick<
          Metadata_Permission_Select_Columns,
          'roleName'
        >
      >
      canInsert: Array<
        { __typename?: 'metadata_permission_select_columns' } & Pick<
          Metadata_Permission_Select_Columns,
          'roleName'
        >
      >
      canUpdate: Array<
        { __typename?: 'metadata_permission_update_columns' } & Pick<
          Metadata_Permission_Update_Columns,
          'roleName'
        >
      >
    } & ColumnFragment
  >
} & CoreTableFragment

export type MetadataQueryVariables = Exact<{ [key: string]: never }>

export type MetadataQuery = { __typename?: 'query_root' } & {
  metadata_table: Array<{ __typename?: 'metadata_table' } & TableFragment>
}

export const CoreTableFragmentDoc = gql`
  fragment coreTable on metadata_table {
    id
    name
    schema
    primaryKey {
      constraintName
      columns {
        columnName
      }
    }
  }
`
export const ColumnFragmentDoc = gql`
  fragment column on metadata_column_info {
    name
    udtName
    isNullable
    default
  }
`
export const TableFragmentDoc = gql`
  fragment table on metadata_table {
    ...coreTable
    view {
      id
    }
    dependentForeignKeys {
      tableId
      onDelete
      onUpdate
      columns
    }
    foreignKeys {
      columns
    }
    indexes {
      name
      columns {
        columnName
      }
    }
    computedProperties {
      name
      type
      nullable
      transformation
      template
    }
    relationships {
      name
      type
      remoteTableId
      mapping {
        column {
          ...column
        }
        remoteColumnName
      }
    }
    columns {
      ...column
      primaryKey {
        constraintName
      }
      canSelect {
        roleName
      }
      canInsert {
        roleName
      }
      canUpdate {
        roleName
      }
    }
  }
  ${CoreTableFragmentDoc}
  ${ColumnFragmentDoc}
`
export const AppConfigDocument = gql`
  query appConfig($updated_at: timestamptz!, $batchSize: Int!) {
    metadata_app_config(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      menu_order
      deleted
    }
  }
`
export const InsertMetadataAppConfigDocument = gql`
  mutation insertMetadataAppConfig(
    $objects: [metadata_app_config_insert_input!]!
  ) {
    insert_metadata_app_config(
      objects: $objects
      on_conflict: {
        constraint: app_config_pkey
        update_columns: [deleted, menu_order]
      }
    ) {
      returning {
        id
      }
    }
  }
`
export const OnAppConfigDocument = gql`
  subscription onAppConfig($now: timestamptz!) {
    metadata_app_config(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`
export const PropertyConfigDocument = gql`
  query propertyConfig($updated_at: timestamptz!, $batchSize: Int!) {
    metadata_property_config(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      table_id
      deleted
      property_name
      component
      json_schema
      icon
      description
      title
    }
  }
`
export const InsertMetadataPropertyConfigDocument = gql`
  mutation insertMetadataPropertyConfig(
    $objects: [metadata_property_config_insert_input!]!
  ) {
    insert_metadata_property_config(
      objects: $objects
      on_conflict: {
        constraint: property_config_pkey
        update_columns: [
          table_id
          deleted
          property_name
          component
          json_schema
          icon
          description
          title
        ]
      }
    ) {
      returning {
        id
      }
    }
  }
`
export const OnPropertyConfigDocument = gql`
  subscription onPropertyConfig($now: timestamptz!) {
    metadata_property_config(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`
export const TableConfigDocument = gql`
  query tableConfig($updated_at: timestamptz!, $batchSize: Int!) {
    metadata_table_config(
      where: { updated_at: { _gt: $updated_at } }
      limit: $batchSize
      order_by: [{ updated_at: asc }, { id: asc }]
    ) {
      id
      updated_at
      deleted
      component
      description
      document_label
      document_title
      icon
      order
      title
    }
  }
`
export const InsertMetadataTableConfigDocument = gql`
  mutation insertMetadataTableConfig(
    $objects: [metadata_table_config_insert_input!]!
  ) {
    insert_metadata_table_config(
      objects: $objects
      on_conflict: {
        constraint: table_config_pkey
        update_columns: [
          deleted
          component
          description
          document_label
          document_title
          icon
          order
          title
        ]
      }
    ) {
      returning {
        id
      }
    }
  }
`
export const OnTableConfigDocument = gql`
  subscription onTableConfig($now: timestamptz!) {
    metadata_table_config(
      where: { updated_at: { _gt: $now } }
      order_by: { updated_at: asc }
    ) {
      updated_at
    }
  }
`
export const MetadataDocument = gql`
  query metadata {
    metadata_table {
      ...table
    }
  }
  ${TableFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    appConfig(
      variables: AppConfigQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<AppConfigQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AppConfigQuery>(AppConfigDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'appConfig'
      )
    },
    insertMetadataAppConfig(
      variables: InsertMetadataAppConfigMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<InsertMetadataAppConfigMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InsertMetadataAppConfigMutation>(
            InsertMetadataAppConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'insertMetadataAppConfig'
      )
    },
    onAppConfig(
      variables: OnAppConfigSubscriptionVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<OnAppConfigSubscription> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<OnAppConfigSubscription>(
            OnAppConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'onAppConfig'
      )
    },
    propertyConfig(
      variables: PropertyConfigQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PropertyConfigQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PropertyConfigQuery>(
            PropertyConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'propertyConfig'
      )
    },
    insertMetadataPropertyConfig(
      variables: InsertMetadataPropertyConfigMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<InsertMetadataPropertyConfigMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InsertMetadataPropertyConfigMutation>(
            InsertMetadataPropertyConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'insertMetadataPropertyConfig'
      )
    },
    onPropertyConfig(
      variables: OnPropertyConfigSubscriptionVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<OnPropertyConfigSubscription> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<OnPropertyConfigSubscription>(
            OnPropertyConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'onPropertyConfig'
      )
    },
    tableConfig(
      variables: TableConfigQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TableConfigQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TableConfigQuery>(TableConfigDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'tableConfig'
      )
    },
    insertMetadataTableConfig(
      variables: InsertMetadataTableConfigMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<InsertMetadataTableConfigMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InsertMetadataTableConfigMutation>(
            InsertMetadataTableConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'insertMetadataTableConfig'
      )
    },
    onTableConfig(
      variables: OnTableConfigSubscriptionVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<OnTableConfigSubscription> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<OnTableConfigSubscription>(
            OnTableConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'onTableConfig'
      )
    },
    metadata(
      variables?: MetadataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<MetadataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MetadataQuery>(MetadataDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'metadata'
      )
    }
  }
}
export type Sdk = ReturnType<typeof getSdk>
