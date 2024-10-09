import {
  InputType,
  Mutation,
  Query,
  Resolver,
  Field,
  Arg,
  Int,
} from "type-graphql";
import { Repo } from "./repo.entity";
import { Lang } from "../languages/language.entity";
import { Status } from "../status/status.entity";

// import { In } from "typeorm";

@InputType()
class RepoInput implements Partial<Repo> {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field(() => [Int])
  languageIds: Array<number>;

  @Field(() => Int)
  statusId: number;
}

@Resolver(Repo)
export class RepoResolver {
  @Query(() => [Repo])
  async allRepos(@Arg("languageIds", { nullable: true }) languageIds: string) {
    let languageFilters: number[] = [];

    if (languageIds) {
      languageFilters = (languageIds as string)
        .split(",")
        .map((el) => parseInt(el));
    }
    const repos = await Repo.find({
      relations: ["status", "languages"],
    });
    return languageIds
      ? repos.filter((repo: Repo) => {
          return repo.languages?.some(
            (language: Lang) => languageFilters.includes(language.id)
          );
        })
      : repos;
  }

  @Query(() => Repo)
  async repo(@Arg("id") id: string) {
    return await Repo.findOneBy({ id: id });
  }

  @Mutation(() => Repo)
  async create(@Arg("repo") newRepo: RepoInput) {
    const repoToInsert = new Repo();

    repoToInsert.id = newRepo.id;
    repoToInsert.name = newRepo.name;
    repoToInsert.url = newRepo.url;

    const status = (await Status.findOneBy({ id: newRepo.statusId })) as Status; //Assume we'll always find the right status
    repoToInsert.status = status;

    const result = await repoToInsert.save();

    return result;
  }

  @Mutation(() => Repo)
  async delete(@Arg("id") id: string) {
    const repoToDelete = await Repo.findOneBy({ id: id });
    return repoToDelete && (await repoToDelete.remove());
  }
}
