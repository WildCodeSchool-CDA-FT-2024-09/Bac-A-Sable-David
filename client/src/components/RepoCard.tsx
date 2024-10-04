import { Link } from "react-router-dom";
import { Repo, Lang } from "../types";
import "../styles/RepoCard.css";

export default function RepoCard({ repo }: { repo: Repo }) {
  const { id, name, url, languages } = repo;

  return (
    <article className="repo-card">
      <h3>{name}</h3>
      <ul className="languages-list">
        {languages.map((language: Lang) => (
          <li>
            <p className="language-tag">{language.name}</p>
          </li>
        ))}
      </ul>
      <Link to={`/repo/${id}`}>view details</Link>
      <Link to={url}>view on Github</Link>
    </article>
  );
}
