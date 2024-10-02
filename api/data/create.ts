import fs from "fs";
import { Lang } from "../src/types";

const create = async () => {
  const languages: Lang[] = [];
  // const statuses: {id : number, name: string}[] = [{id: 1, name:'private'},{id: 2, name:'public'}]

  // read the list file
  const raw = await JSON.parse(
    fs.readFileSync("./data/list.json", { encoding: "utf-8" })
  );

  // iterate over list
  for (let i: number = 0; i < raw.length; i++) {

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
    }
  }

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

};

create();
