// import dotenv from 'dotenv';
// import express from "express";
// import cors from "cors";
// import router from "./router";

// // initialise the .env module
// dotenv.config();
// const port = process.env.PORT;

// const app = express();

// app.use(
//   cors({
//     origin: [
//       process.env.CLIENT_URL as string,
//     ]
//   })
// );

// app.use(express.json());

// app.use("/api", router);

// app.listen(port, async () => {
//   await dataSource.initialize();
//   console.log(`server listenning on http:/localhost/${port}`)
// }
// );
import "reflect-metadata";
import { dataSource } from "../database/db";
import { RepoResolver } from "./repos/repo.resolver";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import { LangResolver } from "./languages/language.resolver";

(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [RepoResolver,LangResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
