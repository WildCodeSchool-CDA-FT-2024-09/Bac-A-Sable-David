import { gql } from "@apollo/client";

export const GET_ALL_REPOS = gql`
  query GetAllRepos($languageIds: String) {
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
