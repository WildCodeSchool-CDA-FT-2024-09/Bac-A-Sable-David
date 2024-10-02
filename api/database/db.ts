import { DataSource } from "typeorm"
import { Repo } from "../src/repos/repo.entity";
import { Status } from "../src/status/status.entity"
import { Lang } from "../src/languages/language.entity";

export const dataSource = new DataSource({
    type: "sqlite",
    database: "../api/database/repomanager.db",
    entities: [Repo, Status, Lang],
    synchronize: true,
    logging:false, // permet de voir les opérations SQL qui sont faites
});
   