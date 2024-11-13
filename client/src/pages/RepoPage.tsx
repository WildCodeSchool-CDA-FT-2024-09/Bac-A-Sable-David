import { useLoaderData } from "react-router-dom";
import "../styles/Repos.css";
import "../styles/LanguagesFilters.css"
import { Repo } from "../types";

export default function Repos() {
  const {name} = useLoaderData() as Repo;

  return <main>{name}</main>;
}
