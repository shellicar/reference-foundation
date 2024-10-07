import type { UUID } from 'node:crypto';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { AppContext } from '../core/graphql/types';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  EmailAddress: { input: string; output: string; }
  UUID: { input: UUID; output: UUID; }
};

export type Entity1 = {
  __typename: 'Entity1';
  entities2: Entity2Connection;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Entity1Edge = {
  __typename: 'Entity1Edge';
  cursor: Scalars['String']['output'];
  node: Entity1;
};

export type Entity2 = {
  __typename: 'Entity2';
  description: Maybe<Scalars['String']['output']>;
  entity1: Entity1Edge;
  id: Scalars['ID']['output'];
};

export type Entity2Connection = {
  __typename: 'Entity2Connection';
  edges: Array<Entity2Edge>;
  nodes: Array<Entity2>;
  totalCount: Scalars['Int']['output'];
};

export type Entity2Edge = {
  __typename: 'Entity2Edge';
  cursor: Scalars['String']['output'];
  node: Entity2;
};

export type Query = {
  __typename: 'Query';
  entity1: Maybe<Entity1>;
  entity2: Maybe<Entity2>;
  validate: Validate;
  version: Version;
};


export type QueryEntity1Args = {
  id: Scalars['ID']['input'];
};


export type QueryEntity2Args = {
  id: Scalars['ID']['input'];
};


export type QueryValidateArgs = {
  input: ValidateInput;
};

export type Validate = {
  __typename: 'Validate';
  emailAddress: Maybe<Scalars['EmailAddress']['output']>;
  field1: Scalars['UUID']['output'];
};

export type ValidateInput = {
  emailAddress?: InputMaybe<Scalars['EmailAddress']['input']>;
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};

export type Version = {
  __typename: 'Version';
  branch: Maybe<Scalars['String']['output']>;
  buildDate: Maybe<Scalars['String']['output']>;
  commitDate: Maybe<Scalars['String']['output']>;
  sha: Maybe<Scalars['String']['output']>;
  shortSha: Maybe<Scalars['String']['output']>;
  version: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Entity1: ResolverTypeWrapper<Entity1>;
  Entity1Edge: ResolverTypeWrapper<Entity1Edge>;
  Entity2: ResolverTypeWrapper<Entity2>;
  Entity2Connection: ResolverTypeWrapper<Entity2Connection>;
  Entity2Edge: ResolverTypeWrapper<Entity2Edge>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UUID: ResolverTypeWrapper<UUID>;
  Validate: ResolverTypeWrapper<Omit<Validate, 'field1'> & { field1: ResolversTypes['UUID'] }>;
  ValidateInput: ValidateInput;
  Version: ResolverTypeWrapper<Version>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Entity1: Entity1;
  Entity1Edge: Entity1Edge;
  Entity2: Entity2;
  Entity2Connection: Entity2Connection;
  Entity2Edge: Entity2Edge;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  String: Scalars['String']['output'];
  UUID: UUID;
  Validate: Omit<Validate, 'field1'> & { field1: ResolversParentTypes['UUID'] };
  ValidateInput: ValidateInput;
  Version: Version;
};

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type Entity1Resolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Entity1'] = ResolversParentTypes['Entity1']> = {
  entities2?: Resolver<ResolversTypes['Entity2Connection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Entity1EdgeResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Entity1Edge'] = ResolversParentTypes['Entity1Edge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Entity1'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Entity2Resolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Entity2'] = ResolversParentTypes['Entity2']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entity1?: Resolver<ResolversTypes['Entity1Edge'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Entity2ConnectionResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Entity2Connection'] = ResolversParentTypes['Entity2Connection']> = {
  edges?: Resolver<Array<ResolversTypes['Entity2Edge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Entity2']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Entity2EdgeResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Entity2Edge'] = ResolversParentTypes['Entity2Edge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Entity2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  entity1?: Resolver<Maybe<ResolversTypes['Entity1']>, ParentType, ContextType, RequireFields<QueryEntity1Args, 'id'>>;
  entity2?: Resolver<Maybe<ResolversTypes['Entity2']>, ParentType, ContextType, RequireFields<QueryEntity2Args, 'id'>>;
  validate?: Resolver<ResolversTypes['Validate'], ParentType, ContextType, RequireFields<QueryValidateArgs, 'input'>>;
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type ValidateResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Validate'] = ResolversParentTypes['Validate']> = {
  emailAddress?: Resolver<Maybe<ResolversTypes['EmailAddress']>, ParentType, ContextType>;
  field1?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VersionResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Version'] = ResolversParentTypes['Version']> = {
  branch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  buildDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commitDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sha?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortSha?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = AppContext> = {
  EmailAddress?: GraphQLScalarType;
  Entity1?: Entity1Resolvers<ContextType>;
  Entity1Edge?: Entity1EdgeResolvers<ContextType>;
  Entity2?: Entity2Resolvers<ContextType>;
  Entity2Connection?: Entity2ConnectionResolvers<ContextType>;
  Entity2Edge?: Entity2EdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  Validate?: ValidateResolvers<ContextType>;
  Version?: VersionResolvers<ContextType>;
};

