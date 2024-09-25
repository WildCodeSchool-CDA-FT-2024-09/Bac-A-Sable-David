import fs from "fs";

type Repo = {
    id: string;
    name: string;
    url: string;
    isPrivate: number;
}
(async() => {
    const raw = await JSON.parse(
        fs.readFileSync("./data/list.json", { encoding: "utf-8"})
    )
    console.log(raw)
    const repos: Repo[] = raw.map((rep:Record<string,string>)=>(
        {id: rep.id,
        // isPrivate: rep.isPrivate ? 1: 2,
        name : rep.name,
        url : rep.url}
    ))
    console.log(repos)
})()