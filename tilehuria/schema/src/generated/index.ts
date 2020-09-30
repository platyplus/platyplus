import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { DocumentNode } from 'graphql'
export type Maybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  citext: string
  jsonb: { [key: string]: unknown }
  numeric: number
  smallint: number
  timestamptz: Date
  uuid: string
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: Maybe<Scalars['Boolean']>
  _gt?: Maybe<Scalars['Boolean']>
  _gte?: Maybe<Scalars['Boolean']>
  _in?: Maybe<Array<Scalars['Boolean']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Boolean']>
  _lte?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Scalars['Boolean']>
  _nin?: Maybe<Array<Scalars['Boolean']>>
}

/** expression to compare columns of type Float. All fields are combined with logical 'AND'. */
export type FloatComparisonExp = {
  _eq?: Maybe<Scalars['Float']>
  _gt?: Maybe<Scalars['Float']>
  _gte?: Maybe<Scalars['Float']>
  _in?: Maybe<Array<Scalars['Float']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Float']>
  _lte?: Maybe<Scalars['Float']>
  _neq?: Maybe<Scalars['Float']>
  _nin?: Maybe<Array<Scalars['Float']>>
}

export type InsertAreaOfInterestActionOutput = {
  __typename?: 'InsertAreaOfInterestActionOutput'
  areaOfInterest?: Maybe<AreaOfInterest>
  areaOfInterestId: Scalars['uuid']
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: Maybe<Scalars['Int']>
  _gt?: Maybe<Scalars['Int']>
  _gte?: Maybe<Scalars['Int']>
  _in?: Maybe<Array<Scalars['Int']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Int']>
  _lte?: Maybe<Scalars['Int']>
  _neq?: Maybe<Scalars['Int']>
  _nin?: Maybe<Array<Scalars['Int']>>
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: Maybe<Scalars['String']>
  _gt?: Maybe<Scalars['String']>
  _gte?: Maybe<Scalars['String']>
  _ilike?: Maybe<Scalars['String']>
  _in?: Maybe<Array<Scalars['String']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _like?: Maybe<Scalars['String']>
  _lt?: Maybe<Scalars['String']>
  _lte?: Maybe<Scalars['String']>
  _neq?: Maybe<Scalars['String']>
  _nilike?: Maybe<Scalars['String']>
  _nin?: Maybe<Array<Scalars['String']>>
  _nlike?: Maybe<Scalars['String']>
  _nsimilar?: Maybe<Scalars['String']>
  _similar?: Maybe<Scalars['String']>
}

export type TileSetInfoOutput = {
  __typename?: 'TileSetInfoOutput'
  size?: Maybe<Scalars['Int']>
  tileSet?: Maybe<TileSet>
  tileSetId: Scalars['ID']
}

/** columns and relationships of "area_of_interest" */
export type AreaOfInterest = {
  __typename?: 'area_of_interest'
  id: Scalars['uuid']
  maxZoom?: Maybe<Scalars['Int']>
  minZoom?: Maybe<Scalars['Int']>
  name: Scalars['String']
  source: Scalars['jsonb']
  /** An array relationship */
  tileSets: Array<TileSet>
  /** An aggregated array relationship */
  tileSets_aggregate: TileSetAggregate
  tilesCount?: Maybe<Scalars['numeric']>
  /** An object relationship */
  user?: Maybe<Users>
  userId?: Maybe<Scalars['uuid']>
  xyzCoordinates?: Maybe<Scalars['jsonb']>
}

/** columns and relationships of "area_of_interest" */
export type AreaOfInterestSourceArgs = {
  path?: Maybe<Scalars['String']>
}

/** columns and relationships of "area_of_interest" */
export type AreaOfInterestTileSetsArgs = {
  distinct_on?: Maybe<Array<TileSetSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileSetOrderBy>>
  where?: Maybe<TileSetBoolExp>
}

/** columns and relationships of "area_of_interest" */
export type AreaOfInterestTileSetsAggregateArgs = {
  distinct_on?: Maybe<Array<TileSetSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileSetOrderBy>>
  where?: Maybe<TileSetBoolExp>
}

/** columns and relationships of "area_of_interest" */
export type AreaOfInterestXyzCoordinatesArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "area_of_interest" */
export type AreaOfInterestAggregate = {
  __typename?: 'area_of_interest_aggregate'
  aggregate?: Maybe<AreaOfInterestAggregateFields>
  nodes: Array<AreaOfInterest>
}

/** aggregate fields of "area_of_interest" */
export type AreaOfInterestAggregateFields = {
  __typename?: 'area_of_interest_aggregate_fields'
  avg?: Maybe<AreaOfInterestAvgFields>
  count?: Maybe<Scalars['Int']>
  max?: Maybe<AreaOfInterestMaxFields>
  min?: Maybe<AreaOfInterestMinFields>
  stddev?: Maybe<AreaOfInterestStddevFields>
  stddev_pop?: Maybe<AreaOfInterestStddevPopFields>
  stddev_samp?: Maybe<AreaOfInterestStddevSampFields>
  sum?: Maybe<AreaOfInterestSumFields>
  var_pop?: Maybe<AreaOfInterestVarPopFields>
  var_samp?: Maybe<AreaOfInterestVarSampFields>
  variance?: Maybe<AreaOfInterestVarianceFields>
}

/** aggregate fields of "area_of_interest" */
export type AreaOfInterestAggregateFieldsCountArgs = {
  columns?: Maybe<Array<AreaOfInterestSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "area_of_interest" */
export type AreaOfInterestAggregateOrderBy = {
  avg?: Maybe<AreaOfInterestAvgOrderBy>
  count?: Maybe<OrderBy>
  max?: Maybe<AreaOfInterestMaxOrderBy>
  min?: Maybe<AreaOfInterestMinOrderBy>
  stddev?: Maybe<AreaOfInterestStddevOrderBy>
  stddev_pop?: Maybe<AreaOfInterestStddevPopOrderBy>
  stddev_samp?: Maybe<AreaOfInterestStddevSampOrderBy>
  sum?: Maybe<AreaOfInterestSumOrderBy>
  var_pop?: Maybe<AreaOfInterestVarPopOrderBy>
  var_samp?: Maybe<AreaOfInterestVarSampOrderBy>
  variance?: Maybe<AreaOfInterestVarianceOrderBy>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type AreaOfInterestAppendInput = {
  source?: Maybe<Scalars['jsonb']>
  xyzCoordinates?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "area_of_interest" */
export type AreaOfInterestArrRelInsertInput = {
  data: Array<AreaOfInterestInsertInput>
  on_conflict?: Maybe<AreaOfInterestOnConflict>
}

/** aggregate avg on columns */
export type AreaOfInterestAvgFields = {
  __typename?: 'area_of_interest_avg_fields'
  maxZoom?: Maybe<Scalars['Float']>
  minZoom?: Maybe<Scalars['Float']>
  tilesCount?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "area_of_interest" */
export type AreaOfInterestAvgOrderBy = {
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
}

/** Boolean expression to filter rows from the table "area_of_interest". All fields are combined with a logical 'AND'. */
export type AreaOfInterestBoolExp = {
  _and?: Maybe<Array<Maybe<AreaOfInterestBoolExp>>>
  _not?: Maybe<AreaOfInterestBoolExp>
  _or?: Maybe<Array<Maybe<AreaOfInterestBoolExp>>>
  id?: Maybe<UuidComparisonExp>
  maxZoom?: Maybe<IntComparisonExp>
  minZoom?: Maybe<IntComparisonExp>
  name?: Maybe<StringComparisonExp>
  source?: Maybe<JsonbComparisonExp>
  tileSets?: Maybe<TileSetBoolExp>
  tilesCount?: Maybe<NumericComparisonExp>
  user?: Maybe<UsersBoolExp>
  userId?: Maybe<UuidComparisonExp>
  xyzCoordinates?: Maybe<JsonbComparisonExp>
}

/** unique or primary key constraints on table "area_of_interest" */
export enum AreaOfInterestConstraint {
  /** unique or primary key constraint */
  AreaOfInterestPkey = 'area_of_interest_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AreaOfInterestDeleteAtPathInput = {
  source?: Maybe<Array<Maybe<Scalars['String']>>>
  xyzCoordinates?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AreaOfInterestDeleteElemInput = {
  source?: Maybe<Scalars['Int']>
  xyzCoordinates?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AreaOfInterestDeleteKeyInput = {
  source?: Maybe<Scalars['String']>
  xyzCoordinates?: Maybe<Scalars['String']>
}

/** input type for incrementing integer column in table "area_of_interest" */
export type AreaOfInterestIncInput = {
  maxZoom?: Maybe<Scalars['Int']>
  minZoom?: Maybe<Scalars['Int']>
  tilesCount?: Maybe<Scalars['numeric']>
}

/** input type for inserting data into table "area_of_interest" */
export type AreaOfInterestInsertInput = {
  id?: Maybe<Scalars['uuid']>
  maxZoom?: Maybe<Scalars['Int']>
  minZoom?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['jsonb']>
  tileSets?: Maybe<TileSetArrRelInsertInput>
  tilesCount?: Maybe<Scalars['numeric']>
  user?: Maybe<UsersObjRelInsertInput>
  userId?: Maybe<Scalars['uuid']>
  xyzCoordinates?: Maybe<Scalars['jsonb']>
}

/** aggregate max on columns */
export type AreaOfInterestMaxFields = {
  __typename?: 'area_of_interest_max_fields'
  id?: Maybe<Scalars['uuid']>
  maxZoom?: Maybe<Scalars['Int']>
  minZoom?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  tilesCount?: Maybe<Scalars['numeric']>
  userId?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "area_of_interest" */
export type AreaOfInterestMaxOrderBy = {
  id?: Maybe<OrderBy>
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  name?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
  userId?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type AreaOfInterestMinFields = {
  __typename?: 'area_of_interest_min_fields'
  id?: Maybe<Scalars['uuid']>
  maxZoom?: Maybe<Scalars['Int']>
  minZoom?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  tilesCount?: Maybe<Scalars['numeric']>
  userId?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "area_of_interest" */
export type AreaOfInterestMinOrderBy = {
  id?: Maybe<OrderBy>
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  name?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
  userId?: Maybe<OrderBy>
}

/** response of any mutation on the table "area_of_interest" */
export type AreaOfInterestMutationResponse = {
  __typename?: 'area_of_interest_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<AreaOfInterest>
}

/** input type for inserting object relation for remote table "area_of_interest" */
export type AreaOfInterestObjRelInsertInput = {
  data: AreaOfInterestInsertInput
  on_conflict?: Maybe<AreaOfInterestOnConflict>
}

/** on conflict condition type for table "area_of_interest" */
export type AreaOfInterestOnConflict = {
  constraint: AreaOfInterestConstraint
  update_columns: Array<AreaOfInterestUpdateColumn>
  where?: Maybe<AreaOfInterestBoolExp>
}

/** ordering options when selecting data from "area_of_interest" */
export type AreaOfInterestOrderBy = {
  id?: Maybe<OrderBy>
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  name?: Maybe<OrderBy>
  source?: Maybe<OrderBy>
  tileSets_aggregate?: Maybe<TileSetAggregateOrderBy>
  tilesCount?: Maybe<OrderBy>
  user?: Maybe<UsersOrderBy>
  userId?: Maybe<OrderBy>
  xyzCoordinates?: Maybe<OrderBy>
}

/** primary key columns input for table: "area_of_interest" */
export type AreaOfInterestPkColumnsInput = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AreaOfInterestPrependInput = {
  source?: Maybe<Scalars['jsonb']>
  xyzCoordinates?: Maybe<Scalars['jsonb']>
}

/** select columns of table "area_of_interest" */
export enum AreaOfInterestSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  MaxZoom = 'maxZoom',
  /** column name */
  MinZoom = 'minZoom',
  /** column name */
  Name = 'name',
  /** column name */
  Source = 'source',
  /** column name */
  TilesCount = 'tilesCount',
  /** column name */
  UserId = 'userId',
  /** column name */
  XyzCoordinates = 'xyzCoordinates'
}

/** input type for updating data in table "area_of_interest" */
export type AreaOfInterestSetInput = {
  id?: Maybe<Scalars['uuid']>
  maxZoom?: Maybe<Scalars['Int']>
  minZoom?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['jsonb']>
  tilesCount?: Maybe<Scalars['numeric']>
  userId?: Maybe<Scalars['uuid']>
  xyzCoordinates?: Maybe<Scalars['jsonb']>
}

/** aggregate stddev on columns */
export type AreaOfInterestStddevFields = {
  __typename?: 'area_of_interest_stddev_fields'
  maxZoom?: Maybe<Scalars['Float']>
  minZoom?: Maybe<Scalars['Float']>
  tilesCount?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "area_of_interest" */
export type AreaOfInterestStddevOrderBy = {
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
}

/** aggregate stddev_pop on columns */
export type AreaOfInterestStddevPopFields = {
  __typename?: 'area_of_interest_stddev_pop_fields'
  maxZoom?: Maybe<Scalars['Float']>
  minZoom?: Maybe<Scalars['Float']>
  tilesCount?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "area_of_interest" */
export type AreaOfInterestStddevPopOrderBy = {
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
}

/** aggregate stddev_samp on columns */
export type AreaOfInterestStddevSampFields = {
  __typename?: 'area_of_interest_stddev_samp_fields'
  maxZoom?: Maybe<Scalars['Float']>
  minZoom?: Maybe<Scalars['Float']>
  tilesCount?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "area_of_interest" */
export type AreaOfInterestStddevSampOrderBy = {
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
}

/** aggregate sum on columns */
export type AreaOfInterestSumFields = {
  __typename?: 'area_of_interest_sum_fields'
  maxZoom?: Maybe<Scalars['Int']>
  minZoom?: Maybe<Scalars['Int']>
  tilesCount?: Maybe<Scalars['numeric']>
}

/** order by sum() on columns of table "area_of_interest" */
export type AreaOfInterestSumOrderBy = {
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
}

/** update columns of table "area_of_interest" */
export enum AreaOfInterestUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  MaxZoom = 'maxZoom',
  /** column name */
  MinZoom = 'minZoom',
  /** column name */
  Name = 'name',
  /** column name */
  Source = 'source',
  /** column name */
  TilesCount = 'tilesCount',
  /** column name */
  UserId = 'userId',
  /** column name */
  XyzCoordinates = 'xyzCoordinates'
}

/** aggregate var_pop on columns */
export type AreaOfInterestVarPopFields = {
  __typename?: 'area_of_interest_var_pop_fields'
  maxZoom?: Maybe<Scalars['Float']>
  minZoom?: Maybe<Scalars['Float']>
  tilesCount?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "area_of_interest" */
export type AreaOfInterestVarPopOrderBy = {
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
}

/** aggregate var_samp on columns */
export type AreaOfInterestVarSampFields = {
  __typename?: 'area_of_interest_var_samp_fields'
  maxZoom?: Maybe<Scalars['Float']>
  minZoom?: Maybe<Scalars['Float']>
  tilesCount?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "area_of_interest" */
export type AreaOfInterestVarSampOrderBy = {
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
}

/** aggregate variance on columns */
export type AreaOfInterestVarianceFields = {
  __typename?: 'area_of_interest_variance_fields'
  maxZoom?: Maybe<Scalars['Float']>
  minZoom?: Maybe<Scalars['Float']>
  tilesCount?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "area_of_interest" */
export type AreaOfInterestVarianceOrderBy = {
  maxZoom?: Maybe<OrderBy>
  minZoom?: Maybe<OrderBy>
  tilesCount?: Maybe<OrderBy>
}

/** columns and relationships of "auth.account_providers" */
export type AuthAccountProviders = {
  __typename?: 'auth_account_providers'
  /** An object relationship */
  account: AuthAccounts
  account_id: Scalars['uuid']
  auth_provider: Scalars['String']
  auth_provider_unique_id: Scalars['String']
  created_at: Scalars['timestamptz']
  id: Scalars['uuid']
  /** An object relationship */
  provider: AuthProviders
  updated_at: Scalars['timestamptz']
}

/** aggregated selection of "auth.account_providers" */
export type AuthAccountProvidersAggregate = {
  __typename?: 'auth_account_providers_aggregate'
  aggregate?: Maybe<AuthAccountProvidersAggregateFields>
  nodes: Array<AuthAccountProviders>
}

/** aggregate fields of "auth.account_providers" */
export type AuthAccountProvidersAggregateFields = {
  __typename?: 'auth_account_providers_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<AuthAccountProvidersMaxFields>
  min?: Maybe<AuthAccountProvidersMinFields>
}

/** aggregate fields of "auth.account_providers" */
export type AuthAccountProvidersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.account_providers" */
export type AuthAccountProvidersAggregateOrderBy = {
  count?: Maybe<OrderBy>
  max?: Maybe<AuthAccountProvidersMaxOrderBy>
  min?: Maybe<AuthAccountProvidersMinOrderBy>
}

/** input type for inserting array relation for remote table "auth.account_providers" */
export type AuthAccountProvidersArrRelInsertInput = {
  data: Array<AuthAccountProvidersInsertInput>
  on_conflict?: Maybe<AuthAccountProvidersOnConflict>
}

/** Boolean expression to filter rows from the table "auth.account_providers". All fields are combined with a logical 'AND'. */
export type AuthAccountProvidersBoolExp = {
  _and?: Maybe<Array<Maybe<AuthAccountProvidersBoolExp>>>
  _not?: Maybe<AuthAccountProvidersBoolExp>
  _or?: Maybe<Array<Maybe<AuthAccountProvidersBoolExp>>>
  account?: Maybe<AuthAccountsBoolExp>
  account_id?: Maybe<UuidComparisonExp>
  auth_provider?: Maybe<StringComparisonExp>
  auth_provider_unique_id?: Maybe<StringComparisonExp>
  created_at?: Maybe<TimestamptzComparisonExp>
  id?: Maybe<UuidComparisonExp>
  provider?: Maybe<AuthProvidersBoolExp>
  updated_at?: Maybe<TimestamptzComparisonExp>
}

/** unique or primary key constraints on table "auth.account_providers" */
export enum AuthAccountProvidersConstraint {
  /** unique or primary key constraint */
  AccountProvidersAccountIdAuthProviderKey = 'account_providers_account_id_auth_provider_key',
  /** unique or primary key constraint */
  AccountProvidersAuthProviderAuthProviderUniqueIdKey = 'account_providers_auth_provider_auth_provider_unique_id_key',
  /** unique or primary key constraint */
  AccountProvidersPkey = 'account_providers_pkey'
}

/** input type for inserting data into table "auth.account_providers" */
export type AuthAccountProvidersInsertInput = {
  account?: Maybe<AuthAccountsObjRelInsertInput>
  account_id?: Maybe<Scalars['uuid']>
  auth_provider?: Maybe<Scalars['String']>
  auth_provider_unique_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  provider?: Maybe<AuthProvidersObjRelInsertInput>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type AuthAccountProvidersMaxFields = {
  __typename?: 'auth_account_providers_max_fields'
  account_id?: Maybe<Scalars['uuid']>
  auth_provider?: Maybe<Scalars['String']>
  auth_provider_unique_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "auth.account_providers" */
export type AuthAccountProvidersMaxOrderBy = {
  account_id?: Maybe<OrderBy>
  auth_provider?: Maybe<OrderBy>
  auth_provider_unique_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  updated_at?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type AuthAccountProvidersMinFields = {
  __typename?: 'auth_account_providers_min_fields'
  account_id?: Maybe<Scalars['uuid']>
  auth_provider?: Maybe<Scalars['String']>
  auth_provider_unique_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "auth.account_providers" */
export type AuthAccountProvidersMinOrderBy = {
  account_id?: Maybe<OrderBy>
  auth_provider?: Maybe<OrderBy>
  auth_provider_unique_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  updated_at?: Maybe<OrderBy>
}

/** response of any mutation on the table "auth.account_providers" */
export type AuthAccountProvidersMutationResponse = {
  __typename?: 'auth_account_providers_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<AuthAccountProviders>
}

/** input type for inserting object relation for remote table "auth.account_providers" */
export type AuthAccountProvidersObjRelInsertInput = {
  data: AuthAccountProvidersInsertInput
  on_conflict?: Maybe<AuthAccountProvidersOnConflict>
}

/** on conflict condition type for table "auth.account_providers" */
export type AuthAccountProvidersOnConflict = {
  constraint: AuthAccountProvidersConstraint
  update_columns: Array<AuthAccountProvidersUpdateColumn>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** ordering options when selecting data from "auth.account_providers" */
export type AuthAccountProvidersOrderBy = {
  account?: Maybe<AuthAccountsOrderBy>
  account_id?: Maybe<OrderBy>
  auth_provider?: Maybe<OrderBy>
  auth_provider_unique_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  provider?: Maybe<AuthProvidersOrderBy>
  updated_at?: Maybe<OrderBy>
}

/** primary key columns input for table: "auth.account_providers" */
export type AuthAccountProvidersPkColumnsInput = {
  id: Scalars['uuid']
}

/** select columns of table "auth.account_providers" */
export enum AuthAccountProvidersSelectColumn {
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
export type AuthAccountProvidersSetInput = {
  account_id?: Maybe<Scalars['uuid']>
  auth_provider?: Maybe<Scalars['String']>
  auth_provider_unique_id?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** update columns of table "auth.account_providers" */
export enum AuthAccountProvidersUpdateColumn {
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
export type AuthAccountRoles = {
  __typename?: 'auth_account_roles'
  /** An object relationship */
  account: AuthAccounts
  account_id: Scalars['uuid']
  created_at: Scalars['timestamptz']
  id: Scalars['uuid']
  role: Scalars['String']
  /** An object relationship */
  roleByRole: AuthRoles
}

/** aggregated selection of "auth.account_roles" */
export type AuthAccountRolesAggregate = {
  __typename?: 'auth_account_roles_aggregate'
  aggregate?: Maybe<AuthAccountRolesAggregateFields>
  nodes: Array<AuthAccountRoles>
}

/** aggregate fields of "auth.account_roles" */
export type AuthAccountRolesAggregateFields = {
  __typename?: 'auth_account_roles_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<AuthAccountRolesMaxFields>
  min?: Maybe<AuthAccountRolesMinFields>
}

/** aggregate fields of "auth.account_roles" */
export type AuthAccountRolesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<AuthAccountRolesSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.account_roles" */
export type AuthAccountRolesAggregateOrderBy = {
  count?: Maybe<OrderBy>
  max?: Maybe<AuthAccountRolesMaxOrderBy>
  min?: Maybe<AuthAccountRolesMinOrderBy>
}

/** input type for inserting array relation for remote table "auth.account_roles" */
export type AuthAccountRolesArrRelInsertInput = {
  data: Array<AuthAccountRolesInsertInput>
  on_conflict?: Maybe<AuthAccountRolesOnConflict>
}

/** Boolean expression to filter rows from the table "auth.account_roles". All fields are combined with a logical 'AND'. */
export type AuthAccountRolesBoolExp = {
  _and?: Maybe<Array<Maybe<AuthAccountRolesBoolExp>>>
  _not?: Maybe<AuthAccountRolesBoolExp>
  _or?: Maybe<Array<Maybe<AuthAccountRolesBoolExp>>>
  account?: Maybe<AuthAccountsBoolExp>
  account_id?: Maybe<UuidComparisonExp>
  created_at?: Maybe<TimestamptzComparisonExp>
  id?: Maybe<UuidComparisonExp>
  role?: Maybe<StringComparisonExp>
  roleByRole?: Maybe<AuthRolesBoolExp>
}

/** unique or primary key constraints on table "auth.account_roles" */
export enum AuthAccountRolesConstraint {
  /** unique or primary key constraint */
  AccountRolesPkey = 'account_roles_pkey',
  /** unique or primary key constraint */
  UserRolesAccountIdRoleKey = 'user_roles_account_id_role_key'
}

/** input type for inserting data into table "auth.account_roles" */
export type AuthAccountRolesInsertInput = {
  account?: Maybe<AuthAccountsObjRelInsertInput>
  account_id?: Maybe<Scalars['uuid']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  role?: Maybe<Scalars['String']>
  roleByRole?: Maybe<AuthRolesObjRelInsertInput>
}

/** aggregate max on columns */
export type AuthAccountRolesMaxFields = {
  __typename?: 'auth_account_roles_max_fields'
  account_id?: Maybe<Scalars['uuid']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  role?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "auth.account_roles" */
export type AuthAccountRolesMaxOrderBy = {
  account_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  role?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type AuthAccountRolesMinFields = {
  __typename?: 'auth_account_roles_min_fields'
  account_id?: Maybe<Scalars['uuid']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  role?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.account_roles" */
export type AuthAccountRolesMinOrderBy = {
  account_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  role?: Maybe<OrderBy>
}

/** response of any mutation on the table "auth.account_roles" */
export type AuthAccountRolesMutationResponse = {
  __typename?: 'auth_account_roles_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<AuthAccountRoles>
}

/** input type for inserting object relation for remote table "auth.account_roles" */
export type AuthAccountRolesObjRelInsertInput = {
  data: AuthAccountRolesInsertInput
  on_conflict?: Maybe<AuthAccountRolesOnConflict>
}

/** on conflict condition type for table "auth.account_roles" */
export type AuthAccountRolesOnConflict = {
  constraint: AuthAccountRolesConstraint
  update_columns: Array<AuthAccountRolesUpdateColumn>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** ordering options when selecting data from "auth.account_roles" */
export type AuthAccountRolesOrderBy = {
  account?: Maybe<AuthAccountsOrderBy>
  account_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  role?: Maybe<OrderBy>
  roleByRole?: Maybe<AuthRolesOrderBy>
}

/** primary key columns input for table: "auth.account_roles" */
export type AuthAccountRolesPkColumnsInput = {
  id: Scalars['uuid']
}

/** select columns of table "auth.account_roles" */
export enum AuthAccountRolesSelectColumn {
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
export type AuthAccountRolesSetInput = {
  account_id?: Maybe<Scalars['uuid']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  role?: Maybe<Scalars['String']>
}

/** update columns of table "auth.account_roles" */
export enum AuthAccountRolesUpdateColumn {
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
export type AuthAccounts = {
  __typename?: 'auth_accounts'
  /** An array relationship */
  account_providers: Array<AuthAccountProviders>
  /** An aggregated array relationship */
  account_providers_aggregate: AuthAccountProvidersAggregate
  /** An array relationship */
  account_roles: Array<AuthAccountRoles>
  /** An aggregated array relationship */
  account_roles_aggregate: AuthAccountRolesAggregate
  active: Scalars['Boolean']
  created_at: Scalars['timestamptz']
  custom_register_data?: Maybe<Scalars['jsonb']>
  default_role: Scalars['String']
  email?: Maybe<Scalars['citext']>
  id: Scalars['uuid']
  is_anonymous: Scalars['Boolean']
  mfa_enabled: Scalars['Boolean']
  new_email?: Maybe<Scalars['citext']>
  otp_secret?: Maybe<Scalars['String']>
  password_hash?: Maybe<Scalars['String']>
  /** An array relationship */
  refresh_tokens: Array<AuthRefreshTokens>
  /** An aggregated array relationship */
  refresh_tokens_aggregate: AuthRefreshTokensAggregate
  /** An object relationship */
  role: AuthRoles
  ticket: Scalars['uuid']
  ticket_expires_at: Scalars['timestamptz']
  updated_at: Scalars['timestamptz']
  /** An object relationship */
  user: Users
  user_id: Scalars['uuid']
}

/** columns and relationships of "auth.accounts" */
export type AuthAccountsAccountProvidersArgs = {
  distinct_on?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountProvidersOrderBy>>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** columns and relationships of "auth.accounts" */
export type AuthAccountsAccountProvidersAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountProvidersOrderBy>>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** columns and relationships of "auth.accounts" */
export type AuthAccountsAccountRolesArgs = {
  distinct_on?: Maybe<Array<AuthAccountRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountRolesOrderBy>>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** columns and relationships of "auth.accounts" */
export type AuthAccountsAccountRolesAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountRolesOrderBy>>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** columns and relationships of "auth.accounts" */
export type AuthAccountsCustomRegisterDataArgs = {
  path?: Maybe<Scalars['String']>
}

/** columns and relationships of "auth.accounts" */
export type AuthAccountsRefreshTokensArgs = {
  distinct_on?: Maybe<Array<AuthRefreshTokensSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRefreshTokensOrderBy>>
  where?: Maybe<AuthRefreshTokensBoolExp>
}

/** columns and relationships of "auth.accounts" */
export type AuthAccountsRefreshTokensAggregateArgs = {
  distinct_on?: Maybe<Array<AuthRefreshTokensSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRefreshTokensOrderBy>>
  where?: Maybe<AuthRefreshTokensBoolExp>
}

/** aggregated selection of "auth.accounts" */
export type AuthAccountsAggregate = {
  __typename?: 'auth_accounts_aggregate'
  aggregate?: Maybe<AuthAccountsAggregateFields>
  nodes: Array<AuthAccounts>
}

/** aggregate fields of "auth.accounts" */
export type AuthAccountsAggregateFields = {
  __typename?: 'auth_accounts_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<AuthAccountsMaxFields>
  min?: Maybe<AuthAccountsMinFields>
}

/** aggregate fields of "auth.accounts" */
export type AuthAccountsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<AuthAccountsSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.accounts" */
export type AuthAccountsAggregateOrderBy = {
  count?: Maybe<OrderBy>
  max?: Maybe<AuthAccountsMaxOrderBy>
  min?: Maybe<AuthAccountsMinOrderBy>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type AuthAccountsAppendInput = {
  custom_register_data?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "auth.accounts" */
export type AuthAccountsArrRelInsertInput = {
  data: Array<AuthAccountsInsertInput>
  on_conflict?: Maybe<AuthAccountsOnConflict>
}

/** Boolean expression to filter rows from the table "auth.accounts". All fields are combined with a logical 'AND'. */
export type AuthAccountsBoolExp = {
  _and?: Maybe<Array<Maybe<AuthAccountsBoolExp>>>
  _not?: Maybe<AuthAccountsBoolExp>
  _or?: Maybe<Array<Maybe<AuthAccountsBoolExp>>>
  account_providers?: Maybe<AuthAccountProvidersBoolExp>
  account_roles?: Maybe<AuthAccountRolesBoolExp>
  active?: Maybe<BooleanComparisonExp>
  created_at?: Maybe<TimestamptzComparisonExp>
  custom_register_data?: Maybe<JsonbComparisonExp>
  default_role?: Maybe<StringComparisonExp>
  email?: Maybe<CitextComparisonExp>
  id?: Maybe<UuidComparisonExp>
  is_anonymous?: Maybe<BooleanComparisonExp>
  mfa_enabled?: Maybe<BooleanComparisonExp>
  new_email?: Maybe<CitextComparisonExp>
  otp_secret?: Maybe<StringComparisonExp>
  password_hash?: Maybe<StringComparisonExp>
  refresh_tokens?: Maybe<AuthRefreshTokensBoolExp>
  role?: Maybe<AuthRolesBoolExp>
  ticket?: Maybe<UuidComparisonExp>
  ticket_expires_at?: Maybe<TimestamptzComparisonExp>
  updated_at?: Maybe<TimestamptzComparisonExp>
  user?: Maybe<UsersBoolExp>
  user_id?: Maybe<UuidComparisonExp>
}

/** unique or primary key constraints on table "auth.accounts" */
export enum AuthAccountsConstraint {
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
export type AuthAccountsDeleteAtPathInput = {
  custom_register_data?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AuthAccountsDeleteElemInput = {
  custom_register_data?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AuthAccountsDeleteKeyInput = {
  custom_register_data?: Maybe<Scalars['String']>
}

/** input type for inserting data into table "auth.accounts" */
export type AuthAccountsInsertInput = {
  account_providers?: Maybe<AuthAccountProvidersArrRelInsertInput>
  account_roles?: Maybe<AuthAccountRolesArrRelInsertInput>
  active?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['timestamptz']>
  custom_register_data?: Maybe<Scalars['jsonb']>
  default_role?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['citext']>
  id?: Maybe<Scalars['uuid']>
  is_anonymous?: Maybe<Scalars['Boolean']>
  mfa_enabled?: Maybe<Scalars['Boolean']>
  new_email?: Maybe<Scalars['citext']>
  otp_secret?: Maybe<Scalars['String']>
  password_hash?: Maybe<Scalars['String']>
  refresh_tokens?: Maybe<AuthRefreshTokensArrRelInsertInput>
  role?: Maybe<AuthRolesObjRelInsertInput>
  ticket?: Maybe<Scalars['uuid']>
  ticket_expires_at?: Maybe<Scalars['timestamptz']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user?: Maybe<UsersObjRelInsertInput>
  user_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type AuthAccountsMaxFields = {
  __typename?: 'auth_accounts_max_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  default_role?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['citext']>
  id?: Maybe<Scalars['uuid']>
  new_email?: Maybe<Scalars['citext']>
  otp_secret?: Maybe<Scalars['String']>
  password_hash?: Maybe<Scalars['String']>
  ticket?: Maybe<Scalars['uuid']>
  ticket_expires_at?: Maybe<Scalars['timestamptz']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "auth.accounts" */
export type AuthAccountsMaxOrderBy = {
  created_at?: Maybe<OrderBy>
  default_role?: Maybe<OrderBy>
  email?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  new_email?: Maybe<OrderBy>
  otp_secret?: Maybe<OrderBy>
  password_hash?: Maybe<OrderBy>
  ticket?: Maybe<OrderBy>
  ticket_expires_at?: Maybe<OrderBy>
  updated_at?: Maybe<OrderBy>
  user_id?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type AuthAccountsMinFields = {
  __typename?: 'auth_accounts_min_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  default_role?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['citext']>
  id?: Maybe<Scalars['uuid']>
  new_email?: Maybe<Scalars['citext']>
  otp_secret?: Maybe<Scalars['String']>
  password_hash?: Maybe<Scalars['String']>
  ticket?: Maybe<Scalars['uuid']>
  ticket_expires_at?: Maybe<Scalars['timestamptz']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "auth.accounts" */
export type AuthAccountsMinOrderBy = {
  created_at?: Maybe<OrderBy>
  default_role?: Maybe<OrderBy>
  email?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  new_email?: Maybe<OrderBy>
  otp_secret?: Maybe<OrderBy>
  password_hash?: Maybe<OrderBy>
  ticket?: Maybe<OrderBy>
  ticket_expires_at?: Maybe<OrderBy>
  updated_at?: Maybe<OrderBy>
  user_id?: Maybe<OrderBy>
}

/** response of any mutation on the table "auth.accounts" */
export type AuthAccountsMutationResponse = {
  __typename?: 'auth_accounts_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<AuthAccounts>
}

/** input type for inserting object relation for remote table "auth.accounts" */
export type AuthAccountsObjRelInsertInput = {
  data: AuthAccountsInsertInput
  on_conflict?: Maybe<AuthAccountsOnConflict>
}

/** on conflict condition type for table "auth.accounts" */
export type AuthAccountsOnConflict = {
  constraint: AuthAccountsConstraint
  update_columns: Array<AuthAccountsUpdateColumn>
  where?: Maybe<AuthAccountsBoolExp>
}

/** ordering options when selecting data from "auth.accounts" */
export type AuthAccountsOrderBy = {
  account_providers_aggregate?: Maybe<AuthAccountProvidersAggregateOrderBy>
  account_roles_aggregate?: Maybe<AuthAccountRolesAggregateOrderBy>
  active?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  custom_register_data?: Maybe<OrderBy>
  default_role?: Maybe<OrderBy>
  email?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  is_anonymous?: Maybe<OrderBy>
  mfa_enabled?: Maybe<OrderBy>
  new_email?: Maybe<OrderBy>
  otp_secret?: Maybe<OrderBy>
  password_hash?: Maybe<OrderBy>
  refresh_tokens_aggregate?: Maybe<AuthRefreshTokensAggregateOrderBy>
  role?: Maybe<AuthRolesOrderBy>
  ticket?: Maybe<OrderBy>
  ticket_expires_at?: Maybe<OrderBy>
  updated_at?: Maybe<OrderBy>
  user?: Maybe<UsersOrderBy>
  user_id?: Maybe<OrderBy>
}

/** primary key columns input for table: "auth.accounts" */
export type AuthAccountsPkColumnsInput = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AuthAccountsPrependInput = {
  custom_register_data?: Maybe<Scalars['jsonb']>
}

/** select columns of table "auth.accounts" */
export enum AuthAccountsSelectColumn {
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
export type AuthAccountsSetInput = {
  active?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['timestamptz']>
  custom_register_data?: Maybe<Scalars['jsonb']>
  default_role?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['citext']>
  id?: Maybe<Scalars['uuid']>
  is_anonymous?: Maybe<Scalars['Boolean']>
  mfa_enabled?: Maybe<Scalars['Boolean']>
  new_email?: Maybe<Scalars['citext']>
  otp_secret?: Maybe<Scalars['String']>
  password_hash?: Maybe<Scalars['String']>
  ticket?: Maybe<Scalars['uuid']>
  ticket_expires_at?: Maybe<Scalars['timestamptz']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['uuid']>
}

/** update columns of table "auth.accounts" */
export enum AuthAccountsUpdateColumn {
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

/** columns and relationships of "auth.providers" */
export type AuthProviders = {
  __typename?: 'auth_providers'
  /** An array relationship */
  account_providers: Array<AuthAccountProviders>
  /** An aggregated array relationship */
  account_providers_aggregate: AuthAccountProvidersAggregate
  provider: Scalars['String']
}

/** columns and relationships of "auth.providers" */
export type AuthProvidersAccountProvidersArgs = {
  distinct_on?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountProvidersOrderBy>>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** columns and relationships of "auth.providers" */
export type AuthProvidersAccountProvidersAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountProvidersOrderBy>>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** aggregated selection of "auth.providers" */
export type AuthProvidersAggregate = {
  __typename?: 'auth_providers_aggregate'
  aggregate?: Maybe<AuthProvidersAggregateFields>
  nodes: Array<AuthProviders>
}

/** aggregate fields of "auth.providers" */
export type AuthProvidersAggregateFields = {
  __typename?: 'auth_providers_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<AuthProvidersMaxFields>
  min?: Maybe<AuthProvidersMinFields>
}

/** aggregate fields of "auth.providers" */
export type AuthProvidersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<AuthProvidersSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.providers" */
export type AuthProvidersAggregateOrderBy = {
  count?: Maybe<OrderBy>
  max?: Maybe<AuthProvidersMaxOrderBy>
  min?: Maybe<AuthProvidersMinOrderBy>
}

/** input type for inserting array relation for remote table "auth.providers" */
export type AuthProvidersArrRelInsertInput = {
  data: Array<AuthProvidersInsertInput>
  on_conflict?: Maybe<AuthProvidersOnConflict>
}

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export type AuthProvidersBoolExp = {
  _and?: Maybe<Array<Maybe<AuthProvidersBoolExp>>>
  _not?: Maybe<AuthProvidersBoolExp>
  _or?: Maybe<Array<Maybe<AuthProvidersBoolExp>>>
  account_providers?: Maybe<AuthAccountProvidersBoolExp>
  provider?: Maybe<StringComparisonExp>
}

/** unique or primary key constraints on table "auth.providers" */
export enum AuthProvidersConstraint {
  /** unique or primary key constraint */
  ProvidersPkey = 'providers_pkey'
}

/** input type for inserting data into table "auth.providers" */
export type AuthProvidersInsertInput = {
  account_providers?: Maybe<AuthAccountProvidersArrRelInsertInput>
  provider?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type AuthProvidersMaxFields = {
  __typename?: 'auth_providers_max_fields'
  provider?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "auth.providers" */
export type AuthProvidersMaxOrderBy = {
  provider?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type AuthProvidersMinFields = {
  __typename?: 'auth_providers_min_fields'
  provider?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.providers" */
export type AuthProvidersMinOrderBy = {
  provider?: Maybe<OrderBy>
}

/** response of any mutation on the table "auth.providers" */
export type AuthProvidersMutationResponse = {
  __typename?: 'auth_providers_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<AuthProviders>
}

/** input type for inserting object relation for remote table "auth.providers" */
export type AuthProvidersObjRelInsertInput = {
  data: AuthProvidersInsertInput
  on_conflict?: Maybe<AuthProvidersOnConflict>
}

/** on conflict condition type for table "auth.providers" */
export type AuthProvidersOnConflict = {
  constraint: AuthProvidersConstraint
  update_columns: Array<AuthProvidersUpdateColumn>
  where?: Maybe<AuthProvidersBoolExp>
}

/** ordering options when selecting data from "auth.providers" */
export type AuthProvidersOrderBy = {
  account_providers_aggregate?: Maybe<AuthAccountProvidersAggregateOrderBy>
  provider?: Maybe<OrderBy>
}

/** primary key columns input for table: "auth.providers" */
export type AuthProvidersPkColumnsInput = {
  provider: Scalars['String']
}

/** select columns of table "auth.providers" */
export enum AuthProvidersSelectColumn {
  /** column name */
  Provider = 'provider'
}

/** input type for updating data in table "auth.providers" */
export type AuthProvidersSetInput = {
  provider?: Maybe<Scalars['String']>
}

/** update columns of table "auth.providers" */
export enum AuthProvidersUpdateColumn {
  /** column name */
  Provider = 'provider'
}

/** columns and relationships of "auth.refresh_tokens" */
export type AuthRefreshTokens = {
  __typename?: 'auth_refresh_tokens'
  /** An object relationship */
  account: AuthAccounts
  account_id: Scalars['uuid']
  created_at: Scalars['timestamptz']
  expires_at: Scalars['timestamptz']
  refresh_token: Scalars['uuid']
}

/** aggregated selection of "auth.refresh_tokens" */
export type AuthRefreshTokensAggregate = {
  __typename?: 'auth_refresh_tokens_aggregate'
  aggregate?: Maybe<AuthRefreshTokensAggregateFields>
  nodes: Array<AuthRefreshTokens>
}

/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokensAggregateFields = {
  __typename?: 'auth_refresh_tokens_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<AuthRefreshTokensMaxFields>
  min?: Maybe<AuthRefreshTokensMinFields>
}

/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokensAggregateFieldsCountArgs = {
  columns?: Maybe<Array<AuthRefreshTokensSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.refresh_tokens" */
export type AuthRefreshTokensAggregateOrderBy = {
  count?: Maybe<OrderBy>
  max?: Maybe<AuthRefreshTokensMaxOrderBy>
  min?: Maybe<AuthRefreshTokensMinOrderBy>
}

/** input type for inserting array relation for remote table "auth.refresh_tokens" */
export type AuthRefreshTokensArrRelInsertInput = {
  data: Array<AuthRefreshTokensInsertInput>
  on_conflict?: Maybe<AuthRefreshTokensOnConflict>
}

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export type AuthRefreshTokensBoolExp = {
  _and?: Maybe<Array<Maybe<AuthRefreshTokensBoolExp>>>
  _not?: Maybe<AuthRefreshTokensBoolExp>
  _or?: Maybe<Array<Maybe<AuthRefreshTokensBoolExp>>>
  account?: Maybe<AuthAccountsBoolExp>
  account_id?: Maybe<UuidComparisonExp>
  created_at?: Maybe<TimestamptzComparisonExp>
  expires_at?: Maybe<TimestamptzComparisonExp>
  refresh_token?: Maybe<UuidComparisonExp>
}

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum AuthRefreshTokensConstraint {
  /** unique or primary key constraint */
  RefreshTokensPkey = 'refresh_tokens_pkey'
}

/** input type for inserting data into table "auth.refresh_tokens" */
export type AuthRefreshTokensInsertInput = {
  account?: Maybe<AuthAccountsObjRelInsertInput>
  account_id?: Maybe<Scalars['uuid']>
  created_at?: Maybe<Scalars['timestamptz']>
  expires_at?: Maybe<Scalars['timestamptz']>
  refresh_token?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type AuthRefreshTokensMaxFields = {
  __typename?: 'auth_refresh_tokens_max_fields'
  account_id?: Maybe<Scalars['uuid']>
  created_at?: Maybe<Scalars['timestamptz']>
  expires_at?: Maybe<Scalars['timestamptz']>
  refresh_token?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokensMaxOrderBy = {
  account_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  expires_at?: Maybe<OrderBy>
  refresh_token?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type AuthRefreshTokensMinFields = {
  __typename?: 'auth_refresh_tokens_min_fields'
  account_id?: Maybe<Scalars['uuid']>
  created_at?: Maybe<Scalars['timestamptz']>
  expires_at?: Maybe<Scalars['timestamptz']>
  refresh_token?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokensMinOrderBy = {
  account_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  expires_at?: Maybe<OrderBy>
  refresh_token?: Maybe<OrderBy>
}

/** response of any mutation on the table "auth.refresh_tokens" */
export type AuthRefreshTokensMutationResponse = {
  __typename?: 'auth_refresh_tokens_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<AuthRefreshTokens>
}

/** input type for inserting object relation for remote table "auth.refresh_tokens" */
export type AuthRefreshTokensObjRelInsertInput = {
  data: AuthRefreshTokensInsertInput
  on_conflict?: Maybe<AuthRefreshTokensOnConflict>
}

/** on conflict condition type for table "auth.refresh_tokens" */
export type AuthRefreshTokensOnConflict = {
  constraint: AuthRefreshTokensConstraint
  update_columns: Array<AuthRefreshTokensUpdateColumn>
  where?: Maybe<AuthRefreshTokensBoolExp>
}

/** ordering options when selecting data from "auth.refresh_tokens" */
export type AuthRefreshTokensOrderBy = {
  account?: Maybe<AuthAccountsOrderBy>
  account_id?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  expires_at?: Maybe<OrderBy>
  refresh_token?: Maybe<OrderBy>
}

/** primary key columns input for table: "auth.refresh_tokens" */
export type AuthRefreshTokensPkColumnsInput = {
  refresh_token: Scalars['uuid']
}

/** select columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokensSelectColumn {
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
export type AuthRefreshTokensSetInput = {
  account_id?: Maybe<Scalars['uuid']>
  created_at?: Maybe<Scalars['timestamptz']>
  expires_at?: Maybe<Scalars['timestamptz']>
  refresh_token?: Maybe<Scalars['uuid']>
}

/** update columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokensUpdateColumn {
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
export type AuthRoles = {
  __typename?: 'auth_roles'
  /** An array relationship */
  account_roles: Array<AuthAccountRoles>
  /** An aggregated array relationship */
  account_roles_aggregate: AuthAccountRolesAggregate
  /** An array relationship */
  accounts: Array<AuthAccounts>
  /** An aggregated array relationship */
  accounts_aggregate: AuthAccountsAggregate
  role: Scalars['String']
}

/** columns and relationships of "auth.roles" */
export type AuthRolesAccountRolesArgs = {
  distinct_on?: Maybe<Array<AuthAccountRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountRolesOrderBy>>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** columns and relationships of "auth.roles" */
export type AuthRolesAccountRolesAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountRolesOrderBy>>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** columns and relationships of "auth.roles" */
export type AuthRolesAccountsArgs = {
  distinct_on?: Maybe<Array<AuthAccountsSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountsOrderBy>>
  where?: Maybe<AuthAccountsBoolExp>
}

/** columns and relationships of "auth.roles" */
export type AuthRolesAccountsAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountsSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountsOrderBy>>
  where?: Maybe<AuthAccountsBoolExp>
}

/** aggregated selection of "auth.roles" */
export type AuthRolesAggregate = {
  __typename?: 'auth_roles_aggregate'
  aggregate?: Maybe<AuthRolesAggregateFields>
  nodes: Array<AuthRoles>
}

/** aggregate fields of "auth.roles" */
export type AuthRolesAggregateFields = {
  __typename?: 'auth_roles_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<AuthRolesMaxFields>
  min?: Maybe<AuthRolesMinFields>
}

/** aggregate fields of "auth.roles" */
export type AuthRolesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<AuthRolesSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "auth.roles" */
export type AuthRolesAggregateOrderBy = {
  count?: Maybe<OrderBy>
  max?: Maybe<AuthRolesMaxOrderBy>
  min?: Maybe<AuthRolesMinOrderBy>
}

/** input type for inserting array relation for remote table "auth.roles" */
export type AuthRolesArrRelInsertInput = {
  data: Array<AuthRolesInsertInput>
  on_conflict?: Maybe<AuthRolesOnConflict>
}

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export type AuthRolesBoolExp = {
  _and?: Maybe<Array<Maybe<AuthRolesBoolExp>>>
  _not?: Maybe<AuthRolesBoolExp>
  _or?: Maybe<Array<Maybe<AuthRolesBoolExp>>>
  account_roles?: Maybe<AuthAccountRolesBoolExp>
  accounts?: Maybe<AuthAccountsBoolExp>
  role?: Maybe<StringComparisonExp>
}

/** unique or primary key constraints on table "auth.roles" */
export enum AuthRolesConstraint {
  /** unique or primary key constraint */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "auth.roles" */
export type AuthRolesInsertInput = {
  account_roles?: Maybe<AuthAccountRolesArrRelInsertInput>
  accounts?: Maybe<AuthAccountsArrRelInsertInput>
  role?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type AuthRolesMaxFields = {
  __typename?: 'auth_roles_max_fields'
  role?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "auth.roles" */
export type AuthRolesMaxOrderBy = {
  role?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type AuthRolesMinFields = {
  __typename?: 'auth_roles_min_fields'
  role?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "auth.roles" */
export type AuthRolesMinOrderBy = {
  role?: Maybe<OrderBy>
}

/** response of any mutation on the table "auth.roles" */
export type AuthRolesMutationResponse = {
  __typename?: 'auth_roles_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<AuthRoles>
}

/** input type for inserting object relation for remote table "auth.roles" */
export type AuthRolesObjRelInsertInput = {
  data: AuthRolesInsertInput
  on_conflict?: Maybe<AuthRolesOnConflict>
}

/** on conflict condition type for table "auth.roles" */
export type AuthRolesOnConflict = {
  constraint: AuthRolesConstraint
  update_columns: Array<AuthRolesUpdateColumn>
  where?: Maybe<AuthRolesBoolExp>
}

/** ordering options when selecting data from "auth.roles" */
export type AuthRolesOrderBy = {
  account_roles_aggregate?: Maybe<AuthAccountRolesAggregateOrderBy>
  accounts_aggregate?: Maybe<AuthAccountsAggregateOrderBy>
  role?: Maybe<OrderBy>
}

/** primary key columns input for table: "auth.roles" */
export type AuthRolesPkColumnsInput = {
  role: Scalars['String']
}

/** select columns of table "auth.roles" */
export enum AuthRolesSelectColumn {
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "auth.roles" */
export type AuthRolesSetInput = {
  role?: Maybe<Scalars['String']>
}

/** update columns of table "auth.roles" */
export enum AuthRolesUpdateColumn {
  /** column name */
  Role = 'role'
}

/** expression to compare columns of type citext. All fields are combined with logical 'AND'. */
export type CitextComparisonExp = {
  _eq?: Maybe<Scalars['citext']>
  _gt?: Maybe<Scalars['citext']>
  _gte?: Maybe<Scalars['citext']>
  _ilike?: Maybe<Scalars['String']>
  _in?: Maybe<Array<Scalars['citext']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _like?: Maybe<Scalars['String']>
  _lt?: Maybe<Scalars['citext']>
  _lte?: Maybe<Scalars['citext']>
  _neq?: Maybe<Scalars['citext']>
  _nilike?: Maybe<Scalars['String']>
  _nin?: Maybe<Array<Scalars['citext']>>
  _nlike?: Maybe<Scalars['String']>
  _nsimilar?: Maybe<Scalars['String']>
  _similar?: Maybe<Scalars['String']>
}

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>
  _eq?: Maybe<Scalars['jsonb']>
  _gt?: Maybe<Scalars['jsonb']>
  _gte?: Maybe<Scalars['jsonb']>
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>
  _in?: Maybe<Array<Scalars['jsonb']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['jsonb']>
  _lte?: Maybe<Scalars['jsonb']>
  _neq?: Maybe<Scalars['jsonb']>
  _nin?: Maybe<Array<Scalars['jsonb']>>
}

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root'
  /** delete single row from the table: "area_of_interest" */
  deleteAreaOfInterest?: Maybe<AreaOfInterest>
  /** delete data from the table: "area_of_interest" */
  deleteAreaOfInterests?: Maybe<AreaOfInterestMutationResponse>
  /** delete single row from the table: "tile_provider" */
  deleteTileProvider?: Maybe<TileProvider>
  /** delete data from the table: "tile_provider" */
  deleteTileProviders?: Maybe<TileProviderMutationResponse>
  /** delete single row from the table: "tile_set" */
  deleteTileSet?: Maybe<TileSet>
  /** delete data from the table: "tile_set" */
  deleteTileSets?: Maybe<TileSetMutationResponse>
  /** delete data from the table: "auth.account_providers" */
  delete_auth_account_providers?: Maybe<AuthAccountProvidersMutationResponse>
  /** delete single row from the table: "auth.account_providers" */
  delete_auth_account_providers_by_pk?: Maybe<AuthAccountProviders>
  /** delete data from the table: "auth.account_roles" */
  delete_auth_account_roles?: Maybe<AuthAccountRolesMutationResponse>
  /** delete single row from the table: "auth.account_roles" */
  delete_auth_account_roles_by_pk?: Maybe<AuthAccountRoles>
  /** delete data from the table: "auth.accounts" */
  delete_auth_accounts?: Maybe<AuthAccountsMutationResponse>
  /** delete single row from the table: "auth.accounts" */
  delete_auth_accounts_by_pk?: Maybe<AuthAccounts>
  /** delete data from the table: "auth.providers" */
  delete_auth_providers?: Maybe<AuthProvidersMutationResponse>
  /** delete single row from the table: "auth.providers" */
  delete_auth_providers_by_pk?: Maybe<AuthProviders>
  /** delete data from the table: "auth.refresh_tokens" */
  delete_auth_refresh_tokens?: Maybe<AuthRefreshTokensMutationResponse>
  /** delete single row from the table: "auth.refresh_tokens" */
  delete_auth_refresh_tokens_by_pk?: Maybe<AuthRefreshTokens>
  /** delete data from the table: "auth.roles" */
  delete_auth_roles?: Maybe<AuthRolesMutationResponse>
  /** delete single row from the table: "auth.roles" */
  delete_auth_roles_by_pk?: Maybe<AuthRoles>
  /** delete data from the table: "users" */
  delete_users?: Maybe<UsersMutationResponse>
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>
  /** insert a single row into the table: "area_of_interest" */
  insertAreaOfInterest?: Maybe<AreaOfInterest>
  /** insert data into the table: "area_of_interest" */
  insertAreasOfInterest?: Maybe<AreaOfInterestMutationResponse>
  /** insert a single row into the table: "tile_provider" */
  insertTileProvider?: Maybe<TileProvider>
  /** insert data into the table: "tile_provider" */
  insertTileProviders?: Maybe<TileProviderMutationResponse>
  /** insert a single row into the table: "tile_set" */
  insertTileSet?: Maybe<TileSet>
  /** insert data into the table: "tile_set" */
  insertTileSets?: Maybe<TileSetMutationResponse>
  /** insert data into the table: "auth.account_providers" */
  insert_auth_account_providers?: Maybe<AuthAccountProvidersMutationResponse>
  /** insert a single row into the table: "auth.account_providers" */
  insert_auth_account_providers_one?: Maybe<AuthAccountProviders>
  /** insert data into the table: "auth.account_roles" */
  insert_auth_account_roles?: Maybe<AuthAccountRolesMutationResponse>
  /** insert a single row into the table: "auth.account_roles" */
  insert_auth_account_roles_one?: Maybe<AuthAccountRoles>
  /** insert data into the table: "auth.accounts" */
  insert_auth_accounts?: Maybe<AuthAccountsMutationResponse>
  /** insert a single row into the table: "auth.accounts" */
  insert_auth_accounts_one?: Maybe<AuthAccounts>
  /** insert data into the table: "auth.providers" */
  insert_auth_providers?: Maybe<AuthProvidersMutationResponse>
  /** insert a single row into the table: "auth.providers" */
  insert_auth_providers_one?: Maybe<AuthProviders>
  /** insert data into the table: "auth.refresh_tokens" */
  insert_auth_refresh_tokens?: Maybe<AuthRefreshTokensMutationResponse>
  /** insert a single row into the table: "auth.refresh_tokens" */
  insert_auth_refresh_tokens_one?: Maybe<AuthRefreshTokens>
  /** insert data into the table: "auth.roles" */
  insert_auth_roles?: Maybe<AuthRolesMutationResponse>
  /** insert a single row into the table: "auth.roles" */
  insert_auth_roles_one?: Maybe<AuthRoles>
  /** insert data into the table: "users" */
  insert_users?: Maybe<UsersMutationResponse>
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>
  /** update single row of the table: "area_of_interest" */
  updateAreaOfInterest?: Maybe<AreaOfInterest>
  /** update data of the table: "area_of_interest" */
  updateAreasOfInterest?: Maybe<AreaOfInterestMutationResponse>
  /** update single row of the table: "tile_provider" */
  updateTileProvider?: Maybe<TileProvider>
  /** update data of the table: "tile_provider" */
  updateTileProviders?: Maybe<TileProviderMutationResponse>
  /** update single row of the table: "tile_set" */
  updateTileSet?: Maybe<TileSet>
  /** update data of the table: "tile_set" */
  updateTileSets?: Maybe<TileSetMutationResponse>
  /** update data of the table: "auth.account_providers" */
  update_auth_account_providers?: Maybe<AuthAccountProvidersMutationResponse>
  /** update single row of the table: "auth.account_providers" */
  update_auth_account_providers_by_pk?: Maybe<AuthAccountProviders>
  /** update data of the table: "auth.account_roles" */
  update_auth_account_roles?: Maybe<AuthAccountRolesMutationResponse>
  /** update single row of the table: "auth.account_roles" */
  update_auth_account_roles_by_pk?: Maybe<AuthAccountRoles>
  /** update data of the table: "auth.accounts" */
  update_auth_accounts?: Maybe<AuthAccountsMutationResponse>
  /** update single row of the table: "auth.accounts" */
  update_auth_accounts_by_pk?: Maybe<AuthAccounts>
  /** update data of the table: "auth.providers" */
  update_auth_providers?: Maybe<AuthProvidersMutationResponse>
  /** update single row of the table: "auth.providers" */
  update_auth_providers_by_pk?: Maybe<AuthProviders>
  /** update data of the table: "auth.refresh_tokens" */
  update_auth_refresh_tokens?: Maybe<AuthRefreshTokensMutationResponse>
  /** update single row of the table: "auth.refresh_tokens" */
  update_auth_refresh_tokens_by_pk?: Maybe<AuthRefreshTokens>
  /** update data of the table: "auth.roles" */
  update_auth_roles?: Maybe<AuthRolesMutationResponse>
  /** update single row of the table: "auth.roles" */
  update_auth_roles_by_pk?: Maybe<AuthRoles>
  /** update data of the table: "users" */
  update_users?: Maybe<UsersMutationResponse>
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
}

/** mutation root */
export type MutationRootDeleteAreaOfInterestArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type MutationRootDeleteAreaOfInterestsArgs = {
  where: AreaOfInterestBoolExp
}

/** mutation root */
export type MutationRootDeleteTileProviderArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type MutationRootDeleteTileProvidersArgs = {
  where: TileProviderBoolExp
}

/** mutation root */
export type MutationRootDeleteTileSetArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type MutationRootDeleteTileSetsArgs = {
  where: TileSetBoolExp
}

/** mutation root */
export type MutationRootDeleteAuthAccountProvidersArgs = {
  where: AuthAccountProvidersBoolExp
}

/** mutation root */
export type MutationRootDeleteAuthAccountProvidersByPkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type MutationRootDeleteAuthAccountRolesArgs = {
  where: AuthAccountRolesBoolExp
}

/** mutation root */
export type MutationRootDeleteAuthAccountRolesByPkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type MutationRootDeleteAuthAccountsArgs = {
  where: AuthAccountsBoolExp
}

/** mutation root */
export type MutationRootDeleteAuthAccountsByPkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type MutationRootDeleteAuthProvidersArgs = {
  where: AuthProvidersBoolExp
}

/** mutation root */
export type MutationRootDeleteAuthProvidersByPkArgs = {
  provider: Scalars['String']
}

/** mutation root */
export type MutationRootDeleteAuthRefreshTokensArgs = {
  where: AuthRefreshTokensBoolExp
}

/** mutation root */
export type MutationRootDeleteAuthRefreshTokensByPkArgs = {
  refresh_token: Scalars['uuid']
}

/** mutation root */
export type MutationRootDeleteAuthRolesArgs = {
  where: AuthRolesBoolExp
}

/** mutation root */
export type MutationRootDeleteAuthRolesByPkArgs = {
  role: Scalars['String']
}

/** mutation root */
export type MutationRootDeleteUsersArgs = {
  where: UsersBoolExp
}

/** mutation root */
export type MutationRootDeleteUsersByPkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type MutationRootInsertAreaOfInterestArgs = {
  object: AreaOfInterestInsertInput
  on_conflict?: Maybe<AreaOfInterestOnConflict>
}

/** mutation root */
export type MutationRootInsertAreasOfInterestArgs = {
  objects: Array<AreaOfInterestInsertInput>
  on_conflict?: Maybe<AreaOfInterestOnConflict>
}

/** mutation root */
export type MutationRootInsertTileProviderArgs = {
  object: TileProviderInsertInput
  on_conflict?: Maybe<TileProviderOnConflict>
}

/** mutation root */
export type MutationRootInsertTileProvidersArgs = {
  objects: Array<TileProviderInsertInput>
  on_conflict?: Maybe<TileProviderOnConflict>
}

/** mutation root */
export type MutationRootInsertTileSetArgs = {
  object: TileSetInsertInput
  on_conflict?: Maybe<TileSetOnConflict>
}

/** mutation root */
export type MutationRootInsertTileSetsArgs = {
  objects: Array<TileSetInsertInput>
  on_conflict?: Maybe<TileSetOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthAccountProvidersArgs = {
  objects: Array<AuthAccountProvidersInsertInput>
  on_conflict?: Maybe<AuthAccountProvidersOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthAccountProvidersOneArgs = {
  object: AuthAccountProvidersInsertInput
  on_conflict?: Maybe<AuthAccountProvidersOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthAccountRolesArgs = {
  objects: Array<AuthAccountRolesInsertInput>
  on_conflict?: Maybe<AuthAccountRolesOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthAccountRolesOneArgs = {
  object: AuthAccountRolesInsertInput
  on_conflict?: Maybe<AuthAccountRolesOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthAccountsArgs = {
  objects: Array<AuthAccountsInsertInput>
  on_conflict?: Maybe<AuthAccountsOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthAccountsOneArgs = {
  object: AuthAccountsInsertInput
  on_conflict?: Maybe<AuthAccountsOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthProvidersArgs = {
  objects: Array<AuthProvidersInsertInput>
  on_conflict?: Maybe<AuthProvidersOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthProvidersOneArgs = {
  object: AuthProvidersInsertInput
  on_conflict?: Maybe<AuthProvidersOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthRefreshTokensArgs = {
  objects: Array<AuthRefreshTokensInsertInput>
  on_conflict?: Maybe<AuthRefreshTokensOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthRefreshTokensOneArgs = {
  object: AuthRefreshTokensInsertInput
  on_conflict?: Maybe<AuthRefreshTokensOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthRolesArgs = {
  objects: Array<AuthRolesInsertInput>
  on_conflict?: Maybe<AuthRolesOnConflict>
}

/** mutation root */
export type MutationRootInsertAuthRolesOneArgs = {
  object: AuthRolesInsertInput
  on_conflict?: Maybe<AuthRolesOnConflict>
}

/** mutation root */
export type MutationRootInsertUsersArgs = {
  objects: Array<UsersInsertInput>
  on_conflict?: Maybe<UsersOnConflict>
}

/** mutation root */
export type MutationRootInsertUsersOneArgs = {
  object: UsersInsertInput
  on_conflict?: Maybe<UsersOnConflict>
}

/** mutation root */
export type MutationRootUpdateAreaOfInterestArgs = {
  _append?: Maybe<AreaOfInterestAppendInput>
  _delete_at_path?: Maybe<AreaOfInterestDeleteAtPathInput>
  _delete_elem?: Maybe<AreaOfInterestDeleteElemInput>
  _delete_key?: Maybe<AreaOfInterestDeleteKeyInput>
  _inc?: Maybe<AreaOfInterestIncInput>
  _prepend?: Maybe<AreaOfInterestPrependInput>
  _set?: Maybe<AreaOfInterestSetInput>
  pk_columns: AreaOfInterestPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateAreasOfInterestArgs = {
  _append?: Maybe<AreaOfInterestAppendInput>
  _delete_at_path?: Maybe<AreaOfInterestDeleteAtPathInput>
  _delete_elem?: Maybe<AreaOfInterestDeleteElemInput>
  _delete_key?: Maybe<AreaOfInterestDeleteKeyInput>
  _inc?: Maybe<AreaOfInterestIncInput>
  _prepend?: Maybe<AreaOfInterestPrependInput>
  _set?: Maybe<AreaOfInterestSetInput>
  where: AreaOfInterestBoolExp
}

/** mutation root */
export type MutationRootUpdateTileProviderArgs = {
  _set?: Maybe<TileProviderSetInput>
  pk_columns: TileProviderPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateTileProvidersArgs = {
  _set?: Maybe<TileProviderSetInput>
  where: TileProviderBoolExp
}

/** mutation root */
export type MutationRootUpdateTileSetArgs = {
  _inc?: Maybe<TileSetIncInput>
  _set?: Maybe<TileSetSetInput>
  pk_columns: TileSetPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateTileSetsArgs = {
  _inc?: Maybe<TileSetIncInput>
  _set?: Maybe<TileSetSetInput>
  where: TileSetBoolExp
}

/** mutation root */
export type MutationRootUpdateAuthAccountProvidersArgs = {
  _set?: Maybe<AuthAccountProvidersSetInput>
  where: AuthAccountProvidersBoolExp
}

/** mutation root */
export type MutationRootUpdateAuthAccountProvidersByPkArgs = {
  _set?: Maybe<AuthAccountProvidersSetInput>
  pk_columns: AuthAccountProvidersPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateAuthAccountRolesArgs = {
  _set?: Maybe<AuthAccountRolesSetInput>
  where: AuthAccountRolesBoolExp
}

/** mutation root */
export type MutationRootUpdateAuthAccountRolesByPkArgs = {
  _set?: Maybe<AuthAccountRolesSetInput>
  pk_columns: AuthAccountRolesPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateAuthAccountsArgs = {
  _append?: Maybe<AuthAccountsAppendInput>
  _delete_at_path?: Maybe<AuthAccountsDeleteAtPathInput>
  _delete_elem?: Maybe<AuthAccountsDeleteElemInput>
  _delete_key?: Maybe<AuthAccountsDeleteKeyInput>
  _prepend?: Maybe<AuthAccountsPrependInput>
  _set?: Maybe<AuthAccountsSetInput>
  where: AuthAccountsBoolExp
}

/** mutation root */
export type MutationRootUpdateAuthAccountsByPkArgs = {
  _append?: Maybe<AuthAccountsAppendInput>
  _delete_at_path?: Maybe<AuthAccountsDeleteAtPathInput>
  _delete_elem?: Maybe<AuthAccountsDeleteElemInput>
  _delete_key?: Maybe<AuthAccountsDeleteKeyInput>
  _prepend?: Maybe<AuthAccountsPrependInput>
  _set?: Maybe<AuthAccountsSetInput>
  pk_columns: AuthAccountsPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateAuthProvidersArgs = {
  _set?: Maybe<AuthProvidersSetInput>
  where: AuthProvidersBoolExp
}

/** mutation root */
export type MutationRootUpdateAuthProvidersByPkArgs = {
  _set?: Maybe<AuthProvidersSetInput>
  pk_columns: AuthProvidersPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateAuthRefreshTokensArgs = {
  _set?: Maybe<AuthRefreshTokensSetInput>
  where: AuthRefreshTokensBoolExp
}

/** mutation root */
export type MutationRootUpdateAuthRefreshTokensByPkArgs = {
  _set?: Maybe<AuthRefreshTokensSetInput>
  pk_columns: AuthRefreshTokensPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateAuthRolesArgs = {
  _set?: Maybe<AuthRolesSetInput>
  where: AuthRolesBoolExp
}

/** mutation root */
export type MutationRootUpdateAuthRolesByPkArgs = {
  _set?: Maybe<AuthRolesSetInput>
  pk_columns: AuthRolesPkColumnsInput
}

/** mutation root */
export type MutationRootUpdateUsersArgs = {
  _set?: Maybe<UsersSetInput>
  where: UsersBoolExp
}

/** mutation root */
export type MutationRootUpdateUsersByPkArgs = {
  _set?: Maybe<UsersSetInput>
  pk_columns: UsersPkColumnsInput
}

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: Maybe<Scalars['numeric']>
  _gt?: Maybe<Scalars['numeric']>
  _gte?: Maybe<Scalars['numeric']>
  _in?: Maybe<Array<Scalars['numeric']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['numeric']>
  _lte?: Maybe<Scalars['numeric']>
  _neq?: Maybe<Scalars['numeric']>
  _nin?: Maybe<Array<Scalars['numeric']>>
}

/** column ordering options */
export enum OrderBy {
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

/** query root */
export type QueryRoot = {
  __typename?: 'query_root'
  /** fetch data from the table: "area_of_interest" using primary key columns */
  areaOfInterest?: Maybe<AreaOfInterest>
  /** fetch aggregated fields from the table: "area_of_interest" */
  areaOfInterestAggregate: AreaOfInterestAggregate
  /** fetch data from the table: "area_of_interest" */
  areasOfInterest: Array<AreaOfInterest>
  /** fetch data from the table: "auth.account_providers" */
  auth_account_providers: Array<AuthAccountProviders>
  /** fetch aggregated fields from the table: "auth.account_providers" */
  auth_account_providers_aggregate: AuthAccountProvidersAggregate
  /** fetch data from the table: "auth.account_providers" using primary key columns */
  auth_account_providers_by_pk?: Maybe<AuthAccountProviders>
  /** fetch data from the table: "auth.account_roles" */
  auth_account_roles: Array<AuthAccountRoles>
  /** fetch aggregated fields from the table: "auth.account_roles" */
  auth_account_roles_aggregate: AuthAccountRolesAggregate
  /** fetch data from the table: "auth.account_roles" using primary key columns */
  auth_account_roles_by_pk?: Maybe<AuthAccountRoles>
  /** fetch data from the table: "auth.accounts" */
  auth_accounts: Array<AuthAccounts>
  /** fetch aggregated fields from the table: "auth.accounts" */
  auth_accounts_aggregate: AuthAccountsAggregate
  /** fetch data from the table: "auth.accounts" using primary key columns */
  auth_accounts_by_pk?: Maybe<AuthAccounts>
  /** fetch data from the table: "auth.providers" */
  auth_providers: Array<AuthProviders>
  /** fetch aggregated fields from the table: "auth.providers" */
  auth_providers_aggregate: AuthProvidersAggregate
  /** fetch data from the table: "auth.providers" using primary key columns */
  auth_providers_by_pk?: Maybe<AuthProviders>
  /** fetch data from the table: "auth.refresh_tokens" */
  auth_refresh_tokens: Array<AuthRefreshTokens>
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  auth_refresh_tokens_aggregate: AuthRefreshTokensAggregate
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  auth_refresh_tokens_by_pk?: Maybe<AuthRefreshTokens>
  /** fetch data from the table: "auth.roles" */
  auth_roles: Array<AuthRoles>
  /** fetch aggregated fields from the table: "auth.roles" */
  auth_roles_aggregate: AuthRolesAggregate
  /** fetch data from the table: "auth.roles" using primary key columns */
  auth_roles_by_pk?: Maybe<AuthRoles>
  /** fetch data from the table: "tile_provider" using primary key columns */
  tileProvider?: Maybe<TileProvider>
  /** fetch aggregated fields from the table: "tile_provider" */
  tileProviderAggregate: TileProviderAggregate
  /** fetch data from the table: "tile_provider" */
  tileProviders: Array<TileProvider>
  /** fetch data from the table: "tile_set" using primary key columns */
  tileSet?: Maybe<TileSet>
  /** fetch aggregated fields from the table: "tile_set" */
  tileSetAggregate: TileSetAggregate
  /** fetch data from the table: "tile_set" */
  tileSets: Array<TileSet>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: UsersAggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

/** query root */
export type QueryRootAreaOfInterestArgs = {
  id: Scalars['uuid']
}

/** query root */
export type QueryRootAreaOfInterestAggregateArgs = {
  distinct_on?: Maybe<Array<AreaOfInterestSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AreaOfInterestOrderBy>>
  where?: Maybe<AreaOfInterestBoolExp>
}

/** query root */
export type QueryRootAreasOfInterestArgs = {
  distinct_on?: Maybe<Array<AreaOfInterestSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AreaOfInterestOrderBy>>
  where?: Maybe<AreaOfInterestBoolExp>
}

/** query root */
export type QueryRootAuthAccountProvidersArgs = {
  distinct_on?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountProvidersOrderBy>>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** query root */
export type QueryRootAuthAccountProvidersAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountProvidersOrderBy>>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** query root */
export type QueryRootAuthAccountProvidersByPkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type QueryRootAuthAccountRolesArgs = {
  distinct_on?: Maybe<Array<AuthAccountRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountRolesOrderBy>>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** query root */
export type QueryRootAuthAccountRolesAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountRolesOrderBy>>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** query root */
export type QueryRootAuthAccountRolesByPkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type QueryRootAuthAccountsArgs = {
  distinct_on?: Maybe<Array<AuthAccountsSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountsOrderBy>>
  where?: Maybe<AuthAccountsBoolExp>
}

/** query root */
export type QueryRootAuthAccountsAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountsSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountsOrderBy>>
  where?: Maybe<AuthAccountsBoolExp>
}

/** query root */
export type QueryRootAuthAccountsByPkArgs = {
  id: Scalars['uuid']
}

/** query root */
export type QueryRootAuthProvidersArgs = {
  distinct_on?: Maybe<Array<AuthProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthProvidersOrderBy>>
  where?: Maybe<AuthProvidersBoolExp>
}

/** query root */
export type QueryRootAuthProvidersAggregateArgs = {
  distinct_on?: Maybe<Array<AuthProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthProvidersOrderBy>>
  where?: Maybe<AuthProvidersBoolExp>
}

/** query root */
export type QueryRootAuthProvidersByPkArgs = {
  provider: Scalars['String']
}

/** query root */
export type QueryRootAuthRefreshTokensArgs = {
  distinct_on?: Maybe<Array<AuthRefreshTokensSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRefreshTokensOrderBy>>
  where?: Maybe<AuthRefreshTokensBoolExp>
}

/** query root */
export type QueryRootAuthRefreshTokensAggregateArgs = {
  distinct_on?: Maybe<Array<AuthRefreshTokensSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRefreshTokensOrderBy>>
  where?: Maybe<AuthRefreshTokensBoolExp>
}

/** query root */
export type QueryRootAuthRefreshTokensByPkArgs = {
  refresh_token: Scalars['uuid']
}

/** query root */
export type QueryRootAuthRolesArgs = {
  distinct_on?: Maybe<Array<AuthRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRolesOrderBy>>
  where?: Maybe<AuthRolesBoolExp>
}

/** query root */
export type QueryRootAuthRolesAggregateArgs = {
  distinct_on?: Maybe<Array<AuthRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRolesOrderBy>>
  where?: Maybe<AuthRolesBoolExp>
}

/** query root */
export type QueryRootAuthRolesByPkArgs = {
  role: Scalars['String']
}

/** query root */
export type QueryRootTileProviderArgs = {
  id: Scalars['uuid']
}

/** query root */
export type QueryRootTileProviderAggregateArgs = {
  distinct_on?: Maybe<Array<TileProviderSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileProviderOrderBy>>
  where?: Maybe<TileProviderBoolExp>
}

/** query root */
export type QueryRootTileProvidersArgs = {
  distinct_on?: Maybe<Array<TileProviderSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileProviderOrderBy>>
  where?: Maybe<TileProviderBoolExp>
}

/** query root */
export type QueryRootTileSetArgs = {
  id: Scalars['uuid']
}

/** query root */
export type QueryRootTileSetAggregateArgs = {
  distinct_on?: Maybe<Array<TileSetSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileSetOrderBy>>
  where?: Maybe<TileSetBoolExp>
}

/** query root */
export type QueryRootTileSetsArgs = {
  distinct_on?: Maybe<Array<TileSetSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileSetOrderBy>>
  where?: Maybe<TileSetBoolExp>
}

/** query root */
export type QueryRootUsersArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<UsersOrderBy>>
  where?: Maybe<UsersBoolExp>
}

/** query root */
export type QueryRootUsersAggregateArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<UsersOrderBy>>
  where?: Maybe<UsersBoolExp>
}

/** query root */
export type QueryRootUsersByPkArgs = {
  id: Scalars['uuid']
}

/** expression to compare columns of type smallint. All fields are combined with logical 'AND'. */
export type SmallintComparisonExp = {
  _eq?: Maybe<Scalars['smallint']>
  _gt?: Maybe<Scalars['smallint']>
  _gte?: Maybe<Scalars['smallint']>
  _in?: Maybe<Array<Scalars['smallint']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['smallint']>
  _lte?: Maybe<Scalars['smallint']>
  _neq?: Maybe<Scalars['smallint']>
  _nin?: Maybe<Array<Scalars['smallint']>>
}

/** subscription root */
export type SubscriptionRoot = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "area_of_interest" using primary key columns */
  areaOfInterest?: Maybe<AreaOfInterest>
  /** fetch aggregated fields from the table: "area_of_interest" */
  areaOfInterestAggregate: AreaOfInterestAggregate
  /** fetch data from the table: "area_of_interest" */
  areasOfInterest: Array<AreaOfInterest>
  /** fetch data from the table: "auth.account_providers" */
  auth_account_providers: Array<AuthAccountProviders>
  /** fetch aggregated fields from the table: "auth.account_providers" */
  auth_account_providers_aggregate: AuthAccountProvidersAggregate
  /** fetch data from the table: "auth.account_providers" using primary key columns */
  auth_account_providers_by_pk?: Maybe<AuthAccountProviders>
  /** fetch data from the table: "auth.account_roles" */
  auth_account_roles: Array<AuthAccountRoles>
  /** fetch aggregated fields from the table: "auth.account_roles" */
  auth_account_roles_aggregate: AuthAccountRolesAggregate
  /** fetch data from the table: "auth.account_roles" using primary key columns */
  auth_account_roles_by_pk?: Maybe<AuthAccountRoles>
  /** fetch data from the table: "auth.accounts" */
  auth_accounts: Array<AuthAccounts>
  /** fetch aggregated fields from the table: "auth.accounts" */
  auth_accounts_aggregate: AuthAccountsAggregate
  /** fetch data from the table: "auth.accounts" using primary key columns */
  auth_accounts_by_pk?: Maybe<AuthAccounts>
  /** fetch data from the table: "auth.providers" */
  auth_providers: Array<AuthProviders>
  /** fetch aggregated fields from the table: "auth.providers" */
  auth_providers_aggregate: AuthProvidersAggregate
  /** fetch data from the table: "auth.providers" using primary key columns */
  auth_providers_by_pk?: Maybe<AuthProviders>
  /** fetch data from the table: "auth.refresh_tokens" */
  auth_refresh_tokens: Array<AuthRefreshTokens>
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  auth_refresh_tokens_aggregate: AuthRefreshTokensAggregate
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  auth_refresh_tokens_by_pk?: Maybe<AuthRefreshTokens>
  /** fetch data from the table: "auth.roles" */
  auth_roles: Array<AuthRoles>
  /** fetch aggregated fields from the table: "auth.roles" */
  auth_roles_aggregate: AuthRolesAggregate
  /** fetch data from the table: "auth.roles" using primary key columns */
  auth_roles_by_pk?: Maybe<AuthRoles>
  /** fetch data from the table: "tile_provider" using primary key columns */
  tileProvider?: Maybe<TileProvider>
  /** fetch aggregated fields from the table: "tile_provider" */
  tileProviderAggregate: TileProviderAggregate
  /** fetch data from the table: "tile_provider" */
  tileProviders: Array<TileProvider>
  /** fetch data from the table: "tile_set" using primary key columns */
  tileSet?: Maybe<TileSet>
  /** fetch aggregated fields from the table: "tile_set" */
  tileSetAggregate: TileSetAggregate
  /** fetch data from the table: "tile_set" */
  tileSets: Array<TileSet>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: UsersAggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

/** subscription root */
export type SubscriptionRootAreaOfInterestArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type SubscriptionRootAreaOfInterestAggregateArgs = {
  distinct_on?: Maybe<Array<AreaOfInterestSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AreaOfInterestOrderBy>>
  where?: Maybe<AreaOfInterestBoolExp>
}

/** subscription root */
export type SubscriptionRootAreasOfInterestArgs = {
  distinct_on?: Maybe<Array<AreaOfInterestSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AreaOfInterestOrderBy>>
  where?: Maybe<AreaOfInterestBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthAccountProvidersArgs = {
  distinct_on?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountProvidersOrderBy>>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthAccountProvidersAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountProvidersOrderBy>>
  where?: Maybe<AuthAccountProvidersBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthAccountProvidersByPkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type SubscriptionRootAuthAccountRolesArgs = {
  distinct_on?: Maybe<Array<AuthAccountRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountRolesOrderBy>>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthAccountRolesAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountRolesOrderBy>>
  where?: Maybe<AuthAccountRolesBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthAccountRolesByPkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type SubscriptionRootAuthAccountsArgs = {
  distinct_on?: Maybe<Array<AuthAccountsSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountsOrderBy>>
  where?: Maybe<AuthAccountsBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthAccountsAggregateArgs = {
  distinct_on?: Maybe<Array<AuthAccountsSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthAccountsOrderBy>>
  where?: Maybe<AuthAccountsBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthAccountsByPkArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type SubscriptionRootAuthProvidersArgs = {
  distinct_on?: Maybe<Array<AuthProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthProvidersOrderBy>>
  where?: Maybe<AuthProvidersBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthProvidersAggregateArgs = {
  distinct_on?: Maybe<Array<AuthProvidersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthProvidersOrderBy>>
  where?: Maybe<AuthProvidersBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthProvidersByPkArgs = {
  provider: Scalars['String']
}

/** subscription root */
export type SubscriptionRootAuthRefreshTokensArgs = {
  distinct_on?: Maybe<Array<AuthRefreshTokensSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRefreshTokensOrderBy>>
  where?: Maybe<AuthRefreshTokensBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthRefreshTokensAggregateArgs = {
  distinct_on?: Maybe<Array<AuthRefreshTokensSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRefreshTokensOrderBy>>
  where?: Maybe<AuthRefreshTokensBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthRefreshTokensByPkArgs = {
  refresh_token: Scalars['uuid']
}

/** subscription root */
export type SubscriptionRootAuthRolesArgs = {
  distinct_on?: Maybe<Array<AuthRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRolesOrderBy>>
  where?: Maybe<AuthRolesBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthRolesAggregateArgs = {
  distinct_on?: Maybe<Array<AuthRolesSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AuthRolesOrderBy>>
  where?: Maybe<AuthRolesBoolExp>
}

/** subscription root */
export type SubscriptionRootAuthRolesByPkArgs = {
  role: Scalars['String']
}

/** subscription root */
export type SubscriptionRootTileProviderArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type SubscriptionRootTileProviderAggregateArgs = {
  distinct_on?: Maybe<Array<TileProviderSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileProviderOrderBy>>
  where?: Maybe<TileProviderBoolExp>
}

/** subscription root */
export type SubscriptionRootTileProvidersArgs = {
  distinct_on?: Maybe<Array<TileProviderSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileProviderOrderBy>>
  where?: Maybe<TileProviderBoolExp>
}

/** subscription root */
export type SubscriptionRootTileSetArgs = {
  id: Scalars['uuid']
}

/** subscription root */
export type SubscriptionRootTileSetAggregateArgs = {
  distinct_on?: Maybe<Array<TileSetSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileSetOrderBy>>
  where?: Maybe<TileSetBoolExp>
}

/** subscription root */
export type SubscriptionRootTileSetsArgs = {
  distinct_on?: Maybe<Array<TileSetSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileSetOrderBy>>
  where?: Maybe<TileSetBoolExp>
}

/** subscription root */
export type SubscriptionRootUsersArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<UsersOrderBy>>
  where?: Maybe<UsersBoolExp>
}

/** subscription root */
export type SubscriptionRootUsersAggregateArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<UsersOrderBy>>
  where?: Maybe<UsersBoolExp>
}

/** subscription root */
export type SubscriptionRootUsersByPkArgs = {
  id: Scalars['uuid']
}

/** columns and relationships of "tile_provider" */
export type TileProvider = {
  __typename?: 'tile_provider'
  id: Scalars['uuid']
  name: Scalars['String']
  slug: Scalars['String']
  /** An array relationship */
  tileSets: Array<TileSet>
  /** An aggregated array relationship */
  tileSets_aggregate: TileSetAggregate
  url: Scalars['String']
}

/** columns and relationships of "tile_provider" */
export type TileProviderTileSetsArgs = {
  distinct_on?: Maybe<Array<TileSetSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileSetOrderBy>>
  where?: Maybe<TileSetBoolExp>
}

/** columns and relationships of "tile_provider" */
export type TileProviderTileSetsAggregateArgs = {
  distinct_on?: Maybe<Array<TileSetSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<TileSetOrderBy>>
  where?: Maybe<TileSetBoolExp>
}

/** aggregated selection of "tile_provider" */
export type TileProviderAggregate = {
  __typename?: 'tile_provider_aggregate'
  aggregate?: Maybe<TileProviderAggregateFields>
  nodes: Array<TileProvider>
}

/** aggregate fields of "tile_provider" */
export type TileProviderAggregateFields = {
  __typename?: 'tile_provider_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<TileProviderMaxFields>
  min?: Maybe<TileProviderMinFields>
}

/** aggregate fields of "tile_provider" */
export type TileProviderAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TileProviderSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "tile_provider" */
export type TileProviderAggregateOrderBy = {
  count?: Maybe<OrderBy>
  max?: Maybe<TileProviderMaxOrderBy>
  min?: Maybe<TileProviderMinOrderBy>
}

/** input type for inserting array relation for remote table "tile_provider" */
export type TileProviderArrRelInsertInput = {
  data: Array<TileProviderInsertInput>
  on_conflict?: Maybe<TileProviderOnConflict>
}

/** Boolean expression to filter rows from the table "tile_provider". All fields are combined with a logical 'AND'. */
export type TileProviderBoolExp = {
  _and?: Maybe<Array<Maybe<TileProviderBoolExp>>>
  _not?: Maybe<TileProviderBoolExp>
  _or?: Maybe<Array<Maybe<TileProviderBoolExp>>>
  id?: Maybe<UuidComparisonExp>
  name?: Maybe<StringComparisonExp>
  slug?: Maybe<StringComparisonExp>
  tileSets?: Maybe<TileSetBoolExp>
  url?: Maybe<StringComparisonExp>
}

/** unique or primary key constraints on table "tile_provider" */
export enum TileProviderConstraint {
  /** unique or primary key constraint */
  TileProviderNameKey = 'tile_provider_name_key',
  /** unique or primary key constraint */
  TileProviderPkey = 'tile_provider_pkey',
  /** unique or primary key constraint */
  TileProviderSlugKey = 'tile_provider_slug_key'
}

/** input type for inserting data into table "tile_provider" */
export type TileProviderInsertInput = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  tileSets?: Maybe<TileSetArrRelInsertInput>
  url?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type TileProviderMaxFields = {
  __typename?: 'tile_provider_max_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "tile_provider" */
export type TileProviderMaxOrderBy = {
  id?: Maybe<OrderBy>
  name?: Maybe<OrderBy>
  slug?: Maybe<OrderBy>
  url?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type TileProviderMinFields = {
  __typename?: 'tile_provider_min_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "tile_provider" */
export type TileProviderMinOrderBy = {
  id?: Maybe<OrderBy>
  name?: Maybe<OrderBy>
  slug?: Maybe<OrderBy>
  url?: Maybe<OrderBy>
}

/** response of any mutation on the table "tile_provider" */
export type TileProviderMutationResponse = {
  __typename?: 'tile_provider_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<TileProvider>
}

/** input type for inserting object relation for remote table "tile_provider" */
export type TileProviderObjRelInsertInput = {
  data: TileProviderInsertInput
  on_conflict?: Maybe<TileProviderOnConflict>
}

/** on conflict condition type for table "tile_provider" */
export type TileProviderOnConflict = {
  constraint: TileProviderConstraint
  update_columns: Array<TileProviderUpdateColumn>
  where?: Maybe<TileProviderBoolExp>
}

/** ordering options when selecting data from "tile_provider" */
export type TileProviderOrderBy = {
  id?: Maybe<OrderBy>
  name?: Maybe<OrderBy>
  slug?: Maybe<OrderBy>
  tileSets_aggregate?: Maybe<TileSetAggregateOrderBy>
  url?: Maybe<OrderBy>
}

/** primary key columns input for table: "tile_provider" */
export type TileProviderPkColumnsInput = {
  id: Scalars['uuid']
}

/** select columns of table "tile_provider" */
export enum TileProviderSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "tile_provider" */
export type TileProviderSetInput = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

/** update columns of table "tile_provider" */
export enum TileProviderUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  Url = 'url'
}

/** columns and relationships of "tile_set" */
export type TileSet = {
  __typename?: 'tile_set'
  /** An object relationship */
  areaOfInterest: AreaOfInterest
  areaOfInterestId: Scalars['uuid']
  format: Scalars['String']
  id: Scalars['uuid']
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['smallint']>
  size?: Maybe<Scalars['Int']>
  /** An object relationship */
  tileProvider: TileProvider
  tileProviderId: Scalars['uuid']
}

/** aggregated selection of "tile_set" */
export type TileSetAggregate = {
  __typename?: 'tile_set_aggregate'
  aggregate?: Maybe<TileSetAggregateFields>
  nodes: Array<TileSet>
}

/** aggregate fields of "tile_set" */
export type TileSetAggregateFields = {
  __typename?: 'tile_set_aggregate_fields'
  avg?: Maybe<TileSetAvgFields>
  count?: Maybe<Scalars['Int']>
  max?: Maybe<TileSetMaxFields>
  min?: Maybe<TileSetMinFields>
  stddev?: Maybe<TileSetStddevFields>
  stddev_pop?: Maybe<TileSetStddevPopFields>
  stddev_samp?: Maybe<TileSetStddevSampFields>
  sum?: Maybe<TileSetSumFields>
  var_pop?: Maybe<TileSetVarPopFields>
  var_samp?: Maybe<TileSetVarSampFields>
  variance?: Maybe<TileSetVarianceFields>
}

/** aggregate fields of "tile_set" */
export type TileSetAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TileSetSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "tile_set" */
export type TileSetAggregateOrderBy = {
  avg?: Maybe<TileSetAvgOrderBy>
  count?: Maybe<OrderBy>
  max?: Maybe<TileSetMaxOrderBy>
  min?: Maybe<TileSetMinOrderBy>
  stddev?: Maybe<TileSetStddevOrderBy>
  stddev_pop?: Maybe<TileSetStddevPopOrderBy>
  stddev_samp?: Maybe<TileSetStddevSampOrderBy>
  sum?: Maybe<TileSetSumOrderBy>
  var_pop?: Maybe<TileSetVarPopOrderBy>
  var_samp?: Maybe<TileSetVarSampOrderBy>
  variance?: Maybe<TileSetVarianceOrderBy>
}

/** input type for inserting array relation for remote table "tile_set" */
export type TileSetArrRelInsertInput = {
  data: Array<TileSetInsertInput>
  on_conflict?: Maybe<TileSetOnConflict>
}

/** aggregate avg on columns */
export type TileSetAvgFields = {
  __typename?: 'tile_set_avg_fields'
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "tile_set" */
export type TileSetAvgOrderBy = {
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
}

/** Boolean expression to filter rows from the table "tile_set". All fields are combined with a logical 'AND'. */
export type TileSetBoolExp = {
  _and?: Maybe<Array<Maybe<TileSetBoolExp>>>
  _not?: Maybe<TileSetBoolExp>
  _or?: Maybe<Array<Maybe<TileSetBoolExp>>>
  areaOfInterest?: Maybe<AreaOfInterestBoolExp>
  areaOfInterestId?: Maybe<UuidComparisonExp>
  format?: Maybe<StringComparisonExp>
  id?: Maybe<UuidComparisonExp>
  progress?: Maybe<FloatComparisonExp>
  quality?: Maybe<SmallintComparisonExp>
  size?: Maybe<IntComparisonExp>
  tileProvider?: Maybe<TileProviderBoolExp>
  tileProviderId?: Maybe<UuidComparisonExp>
}

/** unique or primary key constraints on table "tile_set" */
export enum TileSetConstraint {
  /** unique or primary key constraint */
  TileSetPkey = 'tile_set_pkey'
}

/** input type for incrementing integer column in table "tile_set" */
export type TileSetIncInput = {
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['smallint']>
  size?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "tile_set" */
export type TileSetInsertInput = {
  areaOfInterest?: Maybe<AreaOfInterestObjRelInsertInput>
  areaOfInterestId?: Maybe<Scalars['uuid']>
  format?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['smallint']>
  size?: Maybe<Scalars['Int']>
  tileProvider?: Maybe<TileProviderObjRelInsertInput>
  tileProviderId?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type TileSetMaxFields = {
  __typename?: 'tile_set_max_fields'
  areaOfInterestId?: Maybe<Scalars['uuid']>
  format?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['smallint']>
  size?: Maybe<Scalars['Int']>
  tileProviderId?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "tile_set" */
export type TileSetMaxOrderBy = {
  areaOfInterestId?: Maybe<OrderBy>
  format?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
  tileProviderId?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type TileSetMinFields = {
  __typename?: 'tile_set_min_fields'
  areaOfInterestId?: Maybe<Scalars['uuid']>
  format?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['smallint']>
  size?: Maybe<Scalars['Int']>
  tileProviderId?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "tile_set" */
export type TileSetMinOrderBy = {
  areaOfInterestId?: Maybe<OrderBy>
  format?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
  tileProviderId?: Maybe<OrderBy>
}

/** response of any mutation on the table "tile_set" */
export type TileSetMutationResponse = {
  __typename?: 'tile_set_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<TileSet>
}

/** input type for inserting object relation for remote table "tile_set" */
export type TileSetObjRelInsertInput = {
  data: TileSetInsertInput
  on_conflict?: Maybe<TileSetOnConflict>
}

/** on conflict condition type for table "tile_set" */
export type TileSetOnConflict = {
  constraint: TileSetConstraint
  update_columns: Array<TileSetUpdateColumn>
  where?: Maybe<TileSetBoolExp>
}

/** ordering options when selecting data from "tile_set" */
export type TileSetOrderBy = {
  areaOfInterest?: Maybe<AreaOfInterestOrderBy>
  areaOfInterestId?: Maybe<OrderBy>
  format?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
  tileProvider?: Maybe<TileProviderOrderBy>
  tileProviderId?: Maybe<OrderBy>
}

/** primary key columns input for table: "tile_set" */
export type TileSetPkColumnsInput = {
  id: Scalars['uuid']
}

/** select columns of table "tile_set" */
export enum TileSetSelectColumn {
  /** column name */
  AreaOfInterestId = 'areaOfInterestId',
  /** column name */
  Format = 'format',
  /** column name */
  Id = 'id',
  /** column name */
  Progress = 'progress',
  /** column name */
  Quality = 'quality',
  /** column name */
  Size = 'size',
  /** column name */
  TileProviderId = 'tileProviderId'
}

/** input type for updating data in table "tile_set" */
export type TileSetSetInput = {
  areaOfInterestId?: Maybe<Scalars['uuid']>
  format?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['smallint']>
  size?: Maybe<Scalars['Int']>
  tileProviderId?: Maybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type TileSetStddevFields = {
  __typename?: 'tile_set_stddev_fields'
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "tile_set" */
export type TileSetStddevOrderBy = {
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
}

/** aggregate stddev_pop on columns */
export type TileSetStddevPopFields = {
  __typename?: 'tile_set_stddev_pop_fields'
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "tile_set" */
export type TileSetStddevPopOrderBy = {
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
}

/** aggregate stddev_samp on columns */
export type TileSetStddevSampFields = {
  __typename?: 'tile_set_stddev_samp_fields'
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "tile_set" */
export type TileSetStddevSampOrderBy = {
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
}

/** aggregate sum on columns */
export type TileSetSumFields = {
  __typename?: 'tile_set_sum_fields'
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['smallint']>
  size?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "tile_set" */
export type TileSetSumOrderBy = {
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
}

/** update columns of table "tile_set" */
export enum TileSetUpdateColumn {
  /** column name */
  AreaOfInterestId = 'areaOfInterestId',
  /** column name */
  Format = 'format',
  /** column name */
  Id = 'id',
  /** column name */
  Progress = 'progress',
  /** column name */
  Quality = 'quality',
  /** column name */
  Size = 'size',
  /** column name */
  TileProviderId = 'tileProviderId'
}

/** aggregate var_pop on columns */
export type TileSetVarPopFields = {
  __typename?: 'tile_set_var_pop_fields'
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "tile_set" */
export type TileSetVarPopOrderBy = {
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
}

/** aggregate var_samp on columns */
export type TileSetVarSampFields = {
  __typename?: 'tile_set_var_samp_fields'
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "tile_set" */
export type TileSetVarSampOrderBy = {
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
}

/** aggregate variance on columns */
export type TileSetVarianceFields = {
  __typename?: 'tile_set_variance_fields'
  progress?: Maybe<Scalars['Float']>
  quality?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "tile_set" */
export type TileSetVarianceOrderBy = {
  progress?: Maybe<OrderBy>
  quality?: Maybe<OrderBy>
  size?: Maybe<OrderBy>
}

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: Maybe<Scalars['timestamptz']>
  _gt?: Maybe<Scalars['timestamptz']>
  _gte?: Maybe<Scalars['timestamptz']>
  _in?: Maybe<Array<Scalars['timestamptz']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['timestamptz']>
  _lte?: Maybe<Scalars['timestamptz']>
  _neq?: Maybe<Scalars['timestamptz']>
  _nin?: Maybe<Array<Scalars['timestamptz']>>
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users'
  /** An object relationship */
  account?: Maybe<AuthAccounts>
  /** An array relationship */
  area_of_interests: Array<AreaOfInterest>
  /** An aggregated array relationship */
  area_of_interests_aggregate: AreaOfInterestAggregate
  avatar_url?: Maybe<Scalars['String']>
  created_at: Scalars['timestamptz']
  display_name?: Maybe<Scalars['String']>
  id: Scalars['uuid']
  updated_at: Scalars['timestamptz']
}

/** columns and relationships of "users" */
export type UsersAreaOfInterestsArgs = {
  distinct_on?: Maybe<Array<AreaOfInterestSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AreaOfInterestOrderBy>>
  where?: Maybe<AreaOfInterestBoolExp>
}

/** columns and relationships of "users" */
export type UsersAreaOfInterestsAggregateArgs = {
  distinct_on?: Maybe<Array<AreaOfInterestSelectColumn>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<AreaOfInterestOrderBy>>
  where?: Maybe<AreaOfInterestBoolExp>
}

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'users_aggregate'
  aggregate?: Maybe<UsersAggregateFields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'users_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<UsersMaxFields>
  min?: Maybe<UsersMinFields>
}

/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UsersSelectColumn>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "users" */
export type UsersAggregateOrderBy = {
  count?: Maybe<OrderBy>
  max?: Maybe<UsersMaxOrderBy>
  min?: Maybe<UsersMinOrderBy>
}

/** input type for inserting array relation for remote table "users" */
export type UsersArrRelInsertInput = {
  data: Array<UsersInsertInput>
  on_conflict?: Maybe<UsersOnConflict>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: Maybe<Array<Maybe<UsersBoolExp>>>
  _not?: Maybe<UsersBoolExp>
  _or?: Maybe<Array<Maybe<UsersBoolExp>>>
  account?: Maybe<AuthAccountsBoolExp>
  area_of_interests?: Maybe<AreaOfInterestBoolExp>
  avatar_url?: Maybe<StringComparisonExp>
  created_at?: Maybe<TimestamptzComparisonExp>
  display_name?: Maybe<StringComparisonExp>
  id?: Maybe<UuidComparisonExp>
  updated_at?: Maybe<TimestamptzComparisonExp>
}

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  account?: Maybe<AuthAccountsObjRelInsertInput>
  area_of_interests?: Maybe<AreaOfInterestArrRelInsertInput>
  avatar_url?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  display_name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'users_max_fields'
  avatar_url?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  display_name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "users" */
export type UsersMaxOrderBy = {
  avatar_url?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  display_name?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  updated_at?: Maybe<OrderBy>
}

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'users_min_fields'
  avatar_url?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  display_name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "users" */
export type UsersMinOrderBy = {
  avatar_url?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  display_name?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  updated_at?: Maybe<OrderBy>
}

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'users_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput
  on_conflict?: Maybe<UsersOnConflict>
}

/** on conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint
  update_columns: Array<UsersUpdateColumn>
  where?: Maybe<UsersBoolExp>
}

/** ordering options when selecting data from "users" */
export type UsersOrderBy = {
  account?: Maybe<AuthAccountsOrderBy>
  area_of_interests_aggregate?: Maybe<AreaOfInterestAggregateOrderBy>
  avatar_url?: Maybe<OrderBy>
  created_at?: Maybe<OrderBy>
  display_name?: Maybe<OrderBy>
  id?: Maybe<OrderBy>
  updated_at?: Maybe<OrderBy>
}

/** primary key columns input for table: "users" */
export type UsersPkColumnsInput = {
  id: Scalars['uuid']
}

/** select columns of table "users" */
export enum UsersSelectColumn {
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
export type UsersSetInput = {
  avatar_url?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  display_name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** update columns of table "users" */
export enum UsersUpdateColumn {
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

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: Maybe<Scalars['uuid']>
  _gt?: Maybe<Scalars['uuid']>
  _gte?: Maybe<Scalars['uuid']>
  _in?: Maybe<Array<Scalars['uuid']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['uuid']>
  _lte?: Maybe<Scalars['uuid']>
  _neq?: Maybe<Scalars['uuid']>
  _nin?: Maybe<Array<Scalars['uuid']>>
}

export type AreaOfInterestFragmentFragment = {
  __typename?: 'area_of_interest'
} & Pick<
  AreaOfInterest,
  'id' | 'name' | 'source' | 'minZoom' | 'maxZoom' | 'tilesCount'
> & {
    tileSets: Array<
      { __typename?: 'tile_set' } & Pick<
        TileSet,
        | 'id'
        | 'progress'
        | 'size'
        | 'format'
        | 'quality'
        | 'tileProviderId'
        | 'areaOfInterestId'
      > & {
          tileProvider: { __typename?: 'tile_provider' } & Pick<
            TileProvider,
            'id' | 'name' | 'slug' | 'url'
          >
          areaOfInterest: { __typename?: 'area_of_interest' } & Pick<
            AreaOfInterest,
            'name' | 'userId'
          >
        }
    >
  }

export type InsertAoiMutationVariables = Exact<{
  name: Scalars['String']
  source: Scalars['jsonb']
  minZoom: Scalars['Int']
  maxZoom: Scalars['Int']
  tileSetsAdd: Array<TileSetInsertInput>
}>

export type InsertAoiMutation = { __typename?: 'mutation_root' } & {
  insertAreaOfInterest?: Maybe<
    { __typename?: 'area_of_interest' } & AreaOfInterestFragmentFragment
  >
}

export type ListAllAreasOfInterestQueryVariables = Exact<{
  [key: string]: never
}>

export type ListAllAreasOfInterestQuery = { __typename?: 'query_root' } & {
  areasOfInterest: Array<
    { __typename?: 'area_of_interest' } & Pick<
      AreaOfInterest,
      'id' | 'name' | 'tilesCount'
    > & {
        tileSets_aggregate: { __typename?: 'tile_set_aggregate' } & {
          aggregate?: Maybe<
            { __typename?: 'tile_set_aggregate_fields' } & Pick<
              TileSetAggregateFields,
              'count'
            >
          >
        }
      }
  >
}

export type RemoveOneAreaOfInterestMutationVariables = Exact<{
  id: Scalars['uuid']
}>

export type RemoveOneAreaOfInterestMutation = {
  __typename?: 'mutation_root'
} & {
  deleteAreaOfInterest?: Maybe<
    { __typename?: 'area_of_interest' } & Pick<AreaOfInterest, 'id'>
  >
}

export type SelectOneAreaOfInterestSubscriptionVariables = Exact<{
  id: Scalars['uuid']
}>

export type SelectOneAreaOfInterestSubscription = {
  __typename?: 'subscription_root'
} & {
  areaOfInterest?: Maybe<
    { __typename?: 'area_of_interest' } & AreaOfInterestFragmentFragment
  >
}

export type UpdateAoiMutationVariables = Exact<{
  id: Scalars['uuid']
  name: Scalars['String']
  source: Scalars['jsonb']
  minZoom: Scalars['Int']
  maxZoom: Scalars['Int']
  tileSetsRemoveIds: Array<Scalars['uuid']>
  tileSetsAdd: Array<TileSetInsertInput>
}>

export type UpdateAoiMutation = { __typename?: 'mutation_root' } & {
  updateAreaOfInterest?: Maybe<
    { __typename?: 'area_of_interest' } & AreaOfInterestFragmentFragment
  >
  deleteTileSets?: Maybe<
    { __typename?: 'tile_set_mutation_response' } & Pick<
      TileSetMutationResponse,
      'affected_rows'
    >
  >
  insertTileSets?: Maybe<
    { __typename?: 'tile_set_mutation_response' } & Pick<
      TileSetMutationResponse,
      'affected_rows'
    >
  >
}

export type ProviderFragmentFragment = { __typename?: 'tile_provider' } & Pick<
  TileProvider,
  'id' | 'name' | 'slug' | 'url'
> & {
    tileSets_aggregate: { __typename?: 'tile_set_aggregate' } & {
      aggregate?: Maybe<
        { __typename?: 'tile_set_aggregate_fields' } & Pick<
          TileSetAggregateFields,
          'count'
        >
      >
    }
  }

export type InsertProviderMutationVariables = Exact<{
  name: Scalars['String']
  slug: Scalars['String']
  url: Scalars['String']
}>

export type InsertProviderMutation = { __typename?: 'mutation_root' } & {
  insertTileProvider?: Maybe<
    { __typename?: 'tile_provider' } & ProviderFragmentFragment
  >
}

export type ListAllTileProvidersQueryVariables = Exact<{ [key: string]: never }>

export type ListAllTileProvidersQuery = { __typename?: 'query_root' } & {
  tileProviders: Array<
    { __typename?: 'tile_provider' } & ProviderFragmentFragment
  >
}

export type RemoveOneTileProviderMutationVariables = Exact<{
  id: Scalars['uuid']
}>

export type RemoveOneTileProviderMutation = { __typename?: 'mutation_root' } & {
  deleteTileProvider?: Maybe<
    { __typename?: 'tile_provider' } & Pick<TileProvider, 'id'>
  >
}

export type SelectOneProviderSubscriptionVariables = Exact<{
  id: Scalars['uuid']
}>

export type SelectOneProviderSubscription = {
  __typename?: 'subscription_root'
} & {
  tileProvider?: Maybe<
    { __typename?: 'tile_provider' } & ProviderFragmentFragment
  >
}

export type TileSetFragmentFragment = { __typename?: 'tile_set' } & Pick<
  TileSet,
  'id' | 'progress' | 'size' | 'format' | 'quality'
> & {
    tileProvider: { __typename?: 'tile_provider' } & Pick<
      TileProvider,
      'id' | 'name' | 'slug' | 'url'
    >
    areaOfInterest: { __typename?: 'area_of_interest' } & Pick<
      AreaOfInterest,
      'name' | 'userId'
    >
  }

export type InsertOneTileSetMutationVariables = Exact<{
  format: Scalars['String']
  quality: Scalars['smallint']
  areaOfInterestId: Scalars['uuid']
}>

export type InsertOneTileSetMutation = { __typename?: 'mutation_root' } & {
  insertTileSet?: Maybe<{ __typename?: 'tile_set' } & TileSetFragmentFragment>
}

export type UpdateOneTileSetMutationVariables = Exact<{
  id: Scalars['uuid']
  format: Scalars['String']
  quality: Scalars['smallint']
}>

export type UpdateOneTileSetMutation = { __typename?: 'mutation_root' } & {
  updateTileSet?: Maybe<{ __typename?: 'tile_set' } & TileSetFragmentFragment>
}

export const AreaOfInterestFragmentFragmentDoc: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'areaOfInterestFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'area_of_interest' }
      },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'id' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'name' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'source' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'minZoom' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'maxZoom' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tilesCount' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tileSets' },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'progress' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'size' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'format' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quality' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tileProviderId' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tileProvider' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'name' },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'slug' },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'url' },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'areaOfInterestId' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'areaOfInterest' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'name' },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userId' },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
export const ProviderFragmentFragmentDoc: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'providerFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'tile_provider' }
      },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'id' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'name' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'slug' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'url' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tileSets_aggregate' },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'count' },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
export const TileSetFragmentFragmentDoc: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'tileSetFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'tile_set' }
      },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'id' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'progress' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'size' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'format' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quality' },
            arguments: [],
            directives: []
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tileProvider' },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'slug' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'url' },
                  arguments: [],
                  directives: []
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'areaOfInterest' },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userId' },
                  arguments: [],
                  directives: []
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
export const InsertAoiDocument: TypedDocumentNode<
  InsertAoiMutation,
  InsertAoiMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'insertAoi' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'source' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'jsonb' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'minZoom' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'maxZoom' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tileSetsAdd' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'tile_set_insert_input' }
                }
              }
            }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertAreaOfInterest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'object' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'source' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'source' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'minZoom' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'minZoom' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'maxZoom' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'maxZoom' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tileSets' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'data' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'tileSetsAdd' }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'areaOfInterestFragment' },
                  directives: []
                }
              ]
            }
          }
        ]
      }
    },
    ...AreaOfInterestFragmentFragmentDoc.definitions
  ]
}
export const ListAllAreasOfInterestDocument: TypedDocumentNode<
  ListAllAreasOfInterestQuery,
  ListAllAreasOfInterestQueryVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listAllAreasOfInterest' },
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'areasOfInterest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'EnumValue', value: 'asc' }
                    }
                  ]
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tilesCount' },
                  arguments: [],
                  directives: []
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tileSets_aggregate' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aggregate' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                              arguments: [],
                              directives: []
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
export const RemoveOneAreaOfInterestDocument: TypedDocumentNode<
  RemoveOneAreaOfInterestMutation,
  RemoveOneAreaOfInterestMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeOneAreaOfInterest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteAreaOfInterest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                  arguments: [],
                  directives: []
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
export const SelectOneAreaOfInterestDocument: TypedDocumentNode<
  SelectOneAreaOfInterestSubscription,
  SelectOneAreaOfInterestSubscriptionVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'selectOneAreaOfInterest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'areaOfInterest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'areaOfInterestFragment' },
                  directives: []
                }
              ]
            }
          }
        ]
      }
    },
    ...AreaOfInterestFragmentFragmentDoc.definitions
  ]
}
export const UpdateAoiDocument: TypedDocumentNode<
  UpdateAoiMutation,
  UpdateAoiMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateAoi' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'source' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'jsonb' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'minZoom' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'maxZoom' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tileSetsRemoveIds' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'uuid' }
                }
              }
            }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tileSetsAdd' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'tile_set_insert_input' }
                }
              }
            }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAreaOfInterest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' }
                      }
                    }
                  ]
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'source' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'source' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'minZoom' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'minZoom' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'maxZoom' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'maxZoom' }
                      }
                    }
                  ]
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'areaOfInterestFragment' },
                  directives: []
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteTileSets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'tileSetsRemoveIds' }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                  arguments: [],
                  directives: []
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertTileSets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'objects' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tileSetsAdd' }
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                  arguments: [],
                  directives: []
                }
              ]
            }
          }
        ]
      }
    },
    ...AreaOfInterestFragmentFragmentDoc.definitions
  ]
}
export const InsertProviderDocument: TypedDocumentNode<
  InsertProviderMutation,
  InsertProviderMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'insertProvider' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertTileProvider' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'object' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'slug' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'slug' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'url' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'url' }
                      }
                    }
                  ]
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'providerFragment' },
                  directives: []
                }
              ]
            }
          }
        ]
      }
    },
    ...ProviderFragmentFragmentDoc.definitions
  ]
}
export const ListAllTileProvidersDocument: TypedDocumentNode<
  ListAllTileProvidersQuery,
  ListAllTileProvidersQueryVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listAllTileProviders' },
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tileProviders' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'EnumValue', value: 'asc' }
                    }
                  ]
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'providerFragment' },
                  directives: []
                }
              ]
            }
          }
        ]
      }
    },
    ...ProviderFragmentFragmentDoc.definitions
  ]
}
export const RemoveOneTileProviderDocument: TypedDocumentNode<
  RemoveOneTileProviderMutation,
  RemoveOneTileProviderMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeOneTileProvider' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteTileProvider' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                  arguments: [],
                  directives: []
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
export const SelectOneProviderDocument: TypedDocumentNode<
  SelectOneProviderSubscription,
  SelectOneProviderSubscriptionVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'selectOneProvider' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tileProvider' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'providerFragment' },
                  directives: []
                }
              ]
            }
          }
        ]
      }
    },
    ...ProviderFragmentFragmentDoc.definitions
  ]
}
export const InsertOneTileSetDocument: TypedDocumentNode<
  InsertOneTileSetMutation,
  InsertOneTileSetMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'insertOneTileSet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'format' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'quality' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'smallint' }
            }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'areaOfInterestId' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertTileSet' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'object' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'format' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'format' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'quality' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'quality' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'areaOfInterestId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'areaOfInterestId' }
                      }
                    }
                  ]
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'tileSetFragment' },
                  directives: []
                }
              ]
            }
          }
        ]
      }
    },
    ...TileSetFragmentFragmentDoc.definitions
  ]
}
export const UpdateOneTileSetDocument: TypedDocumentNode<
  UpdateOneTileSetMutation,
  UpdateOneTileSetMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateOneTileSet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'format' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          },
          directives: []
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'quality' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'smallint' }
            }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateTileSet' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' }
                      }
                    }
                  ]
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'format' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'format' }
                      }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'quality' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'quality' }
                      }
                    }
                  ]
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'tileSetFragment' },
                  directives: []
                }
              ]
            }
          }
        ]
      }
    },
    ...TileSetFragmentFragmentDoc.definitions
  ]
}
export const namedOperations = {
  Query: {
    listAllAreasOfInterest: 'listAllAreasOfInterest',
    listAllTileProviders: 'listAllTileProviders'
  },
  Mutation: {
    insertAoi: 'insertAoi',
    removeOneAreaOfInterest: 'removeOneAreaOfInterest',
    updateAoi: 'updateAoi',
    insertProvider: 'insertProvider',
    removeOneTileProvider: 'removeOneTileProvider',
    insertOneTileSet: 'insertOneTileSet',
    updateOneTileSet: 'updateOneTileSet'
  },
  Subscription: {
    selectOneAreaOfInterest: 'selectOneAreaOfInterest',
    selectOneProvider: 'selectOneProvider'
  },
  Fragment: {
    areaOfInterestFragment: 'areaOfInterestFragment',
    providerFragment: 'providerFragment',
    tileSetFragment: 'tileSetFragment'
  }
}
