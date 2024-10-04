import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import RepoCard from "../components/RepoCard";
import { Lang, Repo } from "../types";
import "../styles/Repos.css";
import { useEffect } from "react";
import api from "../services/apiConnexion";

export default function Repos() {
  const repo = useLoaderData();
  const [repos, setRepos] = useState<Repo[]>(repo as Repo[]);
  const [languages, setLanguages] = useState<Lang[]>([]);
  const [filter, setFilter] = useState<number[]>([]);
  const queryString = useLocation();
  const navigate = useNavigate();

  // needed to have the backend respond with filtered data based on the URL
  useEffect(() => {
    const fetchRepos = async (query: string) => {
      const response = await api.get(`/repos${query}`);
      setRepos(response.data);
    };
    fetchRepos(queryString.search);
  }, [filter]);

  // needed to get the availabe languages for filters
  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await api.get(`/languages`);
      setLanguages(response.data);
    };
    fetchLanguages();
  }, []);

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
    navigate(`${filter.length?`?languages=[${filter.toString()}]` : '/'}`);
  }, [filter]);

  return (
    <main>
      <ul className="filterbar">
        {languages.map((lang: Lang) => (
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
        {(repos as Array<any>).map((repo: Repo) => (
          <li key={repo.id}>
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
    </main>
  );
}
