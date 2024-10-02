import { useLoaderData } from "react-router-dom";
import RepoCard from "../components/RepoCard";
import {Repo } from "../types"
import "../styles/Repos.css"

export default function Repos() {
  const repos = useLoaderData();
  console.log(repos);

  return (
    <ul className="repos-container">
      {(repos as Array<any>).map((repo: Repo) => (
        <li key={repo.id}>
          <RepoCard repo={repo} />
        </li>
      ))}
    </ul>
  );
}
