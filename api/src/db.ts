import { DataSource } from "typeorm"
import { Repo } from "./repos/repos.entity";

export const dataSource = new DataSource({
    type: "sqlite",
    database: "../api/data/repomanager.db",
    entities: [Repo],
    synchronize: true,
});
   