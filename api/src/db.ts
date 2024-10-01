import { DataSource } from "typeorm"
import { Repo } from "./repos/repo.entity";
import { Status } from "./status/status.entity"
import { Lang } from "./languages/language.entity";

export const dataSource = new DataSource({
    type: "sqlite",
    database: "../api/data/repomanager.db",
    entities: [Repo, Status, Lang],
    synchronize: true,
});
   