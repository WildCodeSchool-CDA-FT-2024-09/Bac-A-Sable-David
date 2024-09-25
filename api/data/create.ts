import fs from "fs";

type Repo = {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
};

type Lang = {
  id: number;
  name: string;
};

(async () => {
  // read the list file
  const raw = await JSON.parse(
    fs.readFileSync("./data/list.json", { encoding: "utf-8" })
  );

  // extract repos information
  const repos: Repo[] = raw.map((rep: Record<string, string>) => ({
    id: rep.id,
    isPrivate: rep.isPrivate ? 1 : 2,
    name: rep.name,
    url: rep.url,
  }));

  // extract languages
  const languages: Lang[] = raw.map((rep: Record<string, string>) => ({
    id: rep.id,
    isPrivate: rep.isPrivate ? 1 : 2,
    name: rep.name,
    url: rep.url,
  }));

  await fs.writeFile("./data/repo.json", JSON.stringify(repos), (err: any) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    }
  });

  await fs.writeFile("./data/languges.json", JSON.stringify(repos), (err: any) => {
    if (err) console.log(err);
    else {
      console.log("Language file written successfully\n");
    }
  });
})();
