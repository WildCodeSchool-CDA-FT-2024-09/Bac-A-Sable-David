import fs from "fs";
import { Repo, Lang } from "../src/types";

(async () => {
  const repos: Repo[] = [];
  const languages: Lang[] = [];

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

    // push languages if they haven't been pushed already
    const rawLanguages = raw[i].languages;
    for (let j: number = 0; j < rawLanguages.length; j++) {
      if (languages.some((el: Lang) => el.name === rawLanguages[j].node.name)) {
        //do nothing
      } else {
        languages.push({
          id: languages.length + 1,
          name: rawLanguages[j].node.name,
        });
      }
    }
  }

  // write repos in file
  await fs.writeFile("./data/repo.json", JSON.stringify(repos), (err: any) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
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
})();
