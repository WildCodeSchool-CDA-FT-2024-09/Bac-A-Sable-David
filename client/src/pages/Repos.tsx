import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RepoCard from "../components/RepoCard";
import { useGetAllReposQuery, Lang, Repo } from "../generated/graphql-types";
import "../styles/Repos.css";

export default function Repos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [filter, setFilter] = useState<number[]>([]);
  const { loading, error, data } = useGetAllReposQuery({
    variables: { languageIds: params.get("languageIds") as string },
  });

  console.log('ugly console log')

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
    if (filter.length) {
      params.set("languageIds", filter.toString());
      console.log(params);
      setSearchParams(params);
    } else {
      setSearchParams();
    }
  }, [filter]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return (
    <main>
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
        {data && data.allRepos.map((repo: Repo) => (
          <li key={repo.id}>
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
    </main>
  );
}
