
import dotenv from 'dotenv';
import { DataSource } from "typeorm"
import { Repo } from "../src/repos/repo.entity";
import { Status } from "../src/status/status.entity"
import { Lang } from "../src/languages/language.entity";

// initialise the .env module
dotenv.config();


export const dataSource = new DataSource({
    type: "sqlite",
    database: "./database/repomanager.db",
    entities: [Repo, Status, Lang],
    synchronize: true,
    logging:false, // permet de voir les opérations SQL qui sont faites
});

// export const dataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST, // Nom de l'image associé à Postgres --name dans la commande
//     port: 5432,
//     username: "postgres",
//     password: process.env.POSTGRES_PASSWORD, // -e POSTGRES_PASSWORD=
//     database: "postgres",
//     entities: [Repo, Status, Lang],
//     synchronize: true,
//   });
   