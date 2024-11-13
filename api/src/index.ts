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
import setCookie from "set-cookie-parser";
import * as jwt from "jsonwebtoken";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import { LangResolver } from "./languages/language.resolver";
import { UserResolver } from "./user/user.resolver";

(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [RepoResolver, LangResolver, UserResolver],
    authChecker: ({ context }, criteria): boolean => {
      // if user is connected, is admin and @Authorized("admin")
      if (
        criteria.length &&
        criteria.some((crit) => context.cookie.role === crit)
      )
        return true;

      // if user is connected and @Authorized()
      if (context.cookie) return true;

      return false;
    },
  }); // ensuite on utilise @Authorized pour gérer les queries

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (!req.headers.cookie) return { res };
      const cookies = setCookie.parse(req.headers.cookie as string, {
        map: true,
      });
      if (!cookies.AuthToken) return { res };
      const payload = jwt.verify(
        cookies.AuthToken.value,
        process.env.API_SECRET_KEY as string
      );
      if (!payload) return { res };
      return { res, cookie: payload };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
