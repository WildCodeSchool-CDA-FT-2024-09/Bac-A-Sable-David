import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  repos?: Maybe<Array<Repo>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  create: Repo;
  delete: Repo;
};


export type MutationCreateArgs = {
  repo: RepoInput;
};


export type MutationDeleteArgs = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allLanguages: Array<Lang>;
  allRepos: Array<Repo>;
  repo: Repo;
};


export type QueryAllReposArgs = {
  languageIds?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRepoArgs = {
  id: Scalars['String']['input'];
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['String']['output'];
  languages?: Maybe<Array<Lang>>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['String']['input'];
  languageIds: Array<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  statusId: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type GetAllReposQueryVariables = Exact<{
  languageIds: Scalars['String']['input'];
}>;


export type GetAllReposQuery = { __typename?: 'Query', allRepos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, languages?: Array<{ __typename?: 'Lang', name: string }> | null, status: { __typename?: 'Status', name: string } }>, allLanguages: Array<{ __typename?: 'Lang', id: number, name: string }> };


export const GetAllReposDocument = gql`
    query GetAllRepos($languageIds: String!) {
  allRepos(languageIds: $languageIds) {
    id
    name
    url
    languages {
      name
    }
    status {
      name
    }
  }
  allLanguages {
    id
    name
  }
}
    `;

/**
 * __useGetAllReposQuery__
 *
 * To run a query within a React component, call `useGetAllReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReposQuery({
 *   variables: {
 *      languageIds: // value for 'languageIds'
 *   },
 * });
 */
export function useGetAllReposQuery(baseOptions: Apollo.QueryHookOptions<GetAllReposQuery, GetAllReposQueryVariables> & ({ variables: GetAllReposQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReposQuery, GetAllReposQueryVariables>(GetAllReposDocument, options);
      }
export function useGetAllReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReposQuery, GetAllReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReposQuery, GetAllReposQueryVariables>(GetAllReposDocument, options);
        }
export function useGetAllReposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllReposQuery, GetAllReposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllReposQuery, GetAllReposQueryVariables>(GetAllReposDocument, options);
        }
export type GetAllReposQueryHookResult = ReturnType<typeof useGetAllReposQuery>;
export type GetAllReposLazyQueryHookResult = ReturnType<typeof useGetAllReposLazyQuery>;
export type GetAllReposSuspenseQueryHookResult = ReturnType<typeof useGetAllReposSuspenseQuery>;
export type GetAllReposQueryResult = Apollo.QueryResult<GetAllReposQuery, GetAllReposQueryVariables>;