import { useLoaderData, useLocation } from "react-router-dom";
import { useState } from "react";
import RepoCard from "../components/RepoCard";
import { Repo } from "../types";
import "../styles/Repos.css";
import { useEffect } from "react";
import api from "../services/apiConnexion";

export default function Repos() {
  const repo = useLoaderData()
  const [repos, setRepos] = useState(repo);

  const queryString = useLocation();

  console.log(queryString);

  useEffect(() => {
    const fetchRepos = async (query: string) => {
      const response = await api.get(`/repos${query}`);
      setRepos(response.data);
    };
    fetchRepos(queryString.search);
  }, []);

  return (
    <main>
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
