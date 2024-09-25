import fs from "fs";
import { Repo, Lang } from "../src/types";

(async () => {
  const repos: Repo[] = [];
  const languages: Lang[] = [];
  const reposLanguages: { repoId: string; languageId: number }[] = [];

  // read the list file
  const raw = await JSON.parse(
    fs.readFileSync("./data/list.json", { encoding: "utf-8" })
  );

  // iterate over raw
  for (let i: number = 0; i < raw.length; i++) {
    // push the repo
    repos.push({
      id: raw[i].id,
      isPrivate: raw[i].isPrivate ? 1 : 2,
      name: raw[i].name,
      url: raw[i].url,
    });

    const rawLanguages = raw[i].languages;
    for (let j: number = 0; j < rawLanguages.length; j++) {
      // push languages if they haven't been pushed already
      if (
        !languages.some((el: Lang) => el.name === rawLanguages[j].node.name)
      ) {
        languages.push({
          id: languages.length,
          name: rawLanguages[j].node.name,
        });
      }

      // push join table
      reposLanguages.push({
        repoId: raw[i].id,
        languageId: languages
          .map((el: Lang) => el.name)
          .indexOf(rawLanguages[j].node.name),
      });
    }
  }

  // write repos in file
  await fs.writeFile("./data/repo.json", JSON.stringify(repos), (err: any) => {
    if (err) console.log(err);
    else {
      console.log("repo file written successfully\n");
    }
  });

  // write languages
  await fs.writeFile(
    "./data/languages.json",
    JSON.stringify(languages),
    (err: any) => {
      if (err) console.log(err);
      else {
        console.log("Language file written successfully\n");
      }
    }
  );

  // write join table
  await fs.writeFile(
    "./data/reposLanguages.json",
    JSON.stringify(reposLanguages),
    (err: any) => {
      if (err) console.log(err);
      else {
        console.log("Join table file written successfully\n");
      }
    }
  );
})();
