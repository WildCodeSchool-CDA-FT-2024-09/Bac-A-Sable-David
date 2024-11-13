import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { Query, Resolver, Arg, Ctx } from "type-graphql";

const me = {
  email: "a",
  password: "b",
};

dotenv.config();

@Resolver()
export class UserResolver {
  @Query(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } }
  ) {
    console.info(email, password);

    if (email === me.email) {
      if (password === me.password) {
        //generate JWT token
        const token = jwt.sign(
          { email: "tex@test.com", name: "me", role:"admin" },
          process.env.API_SECRET_KEY as string
        );
        const expiryDate=new Date(new Date()) //TODO : modify this
        context.res.setHeader("Set-Cookie", `AuthToken=${token};httpOnly;secure;SameSite=Strict;expires=${expiryDate}`); // see set cookie on MDN
        return true;
      }
    }
    return false;
  }
}
