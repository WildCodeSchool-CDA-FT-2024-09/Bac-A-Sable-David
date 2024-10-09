import { Query, Resolver } from "type-graphql";
import { Lang } from "./language.entity";

@Resolver(Lang)
export class LangResolver {
  @Query(() => [Lang])
  async allLanguages() {
    return await Lang.find();
  }
}
