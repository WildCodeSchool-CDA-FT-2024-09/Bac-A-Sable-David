import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import RepoCard from "../components/RepoCard";
import { Lang, Repo } from "../types";
import "../styles/Repos.css";
import { useEffect } from "react";

const GET_ALL_REPOS = gql`
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

export default function Repos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [filter, setFilter] = useState<number[]>([]);
  const { loading, error, data } = useQuery(GET_ALL_REPOS, {
    variables: { languageIds: params.get("languageIds") },
  });

  const handleFilter = (id: number) => {
    if (filter.includes(id)) {
      const newFilter = [...filter];
      newFilter.pop(id);
      console.log(newFilter);
      setFilter(newFilter);
    } else {
      const newFilter = [...filter];
      newFilter.push(id);
      console.log(newFilter);
      setFilter(newFilter);
    }
  };
  
  useEffect(() => {
    params.set("languageIds", filter.toString());
    console.log(params);
    setSearchParams(params);
  }, [filter]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return (
    <main>
      {/* {JSON.stringify(data)} */}
      <ul className="filterbar">
        {data.allLanguages.map((lang: Lang) => (
          <li key={lang.id}>
            <button
              className={filter.includes(lang.id) ? "is-active" : ""}
              onClick={() => handleFilter(lang.id)}
            >
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
      <ul className="repos-container">
        {data.allRepos.map((repo: Repo) => (
          <li key={repo.id}>
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
    </main>
  );
}

//   const [languages, setLanguages] = useState<Lang[]>([]);

//   // needed to have the backend respond with filtered data based on the URL

//   // needed to get the availabe languages for filters
//   useEffect(() => {
//     const fetchLanguages = async () => {
//       const response = await api.get(`/languages`);
//       setLanguages(response.data);
//     };
//     fetchLanguages();
//   }, []);

//   return (

//   );
// }
