/* eslint-disable */
import type { Instant } from '@js-joda/core';
import type { UUID } from 'node:crypto';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  EmailAddress: { input: string; output: string; }
  Instant: { input: Instant; output: Instant; }
  UUID: { input: UUID; output: UUID; }
};

export type Entity1 = {
  __typename: 'Entity1';
  created: Scalars['Instant']['output'];
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
  created: Scalars['Instant']['output'];
  description?: Maybe<Scalars['String']['output']>;
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
  entity1?: Maybe<Entity1>;
  entity2?: Maybe<Entity2>;
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
  emailAddress?: Maybe<Scalars['EmailAddress']['output']>;
  field1: Scalars['UUID']['output'];
};

export type ValidateInput = {
  emailAddress?: InputMaybe<Scalars['EmailAddress']['input']>;
  uuid?: InputMaybe<Scalars['UUID']['input']>;
};

export type Version = {
  __typename: 'Version';
  branch?: Maybe<Scalars['String']['output']>;
  buildDate?: Maybe<Scalars['String']['output']>;
  commitDate?: Maybe<Scalars['String']['output']>;
  sha?: Maybe<Scalars['String']['output']>;
  shortSha?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type ValidateQueryVariables = Exact<{
  entity1Id: Scalars['ID']['input'];
}>;


export type ValidateQuery = { __typename: 'Query', entity1?: { __typename: 'Entity1', id: string, name: string, created: Instant, entities2: { __typename: 'Entity2Connection', totalCount: number, edges: Array<{ __typename: 'Entity2Edge', cursor: string, node: { __typename: 'Entity2', id: string, created: Instant, description?: string | null } }>, nodes: Array<{ __typename: 'Entity2', id: string, created: Instant, description?: string | null, entity1: { __typename: 'Entity1Edge', cursor: string, node: { __typename: 'Entity1', id: string, name: string } } }> } } | null };


export const ValidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Validate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entity1Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entity1"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entity1Id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"entities2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"entity1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateQuery, ValidateQueryVariables>;