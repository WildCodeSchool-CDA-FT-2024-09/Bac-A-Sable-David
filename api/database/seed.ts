import { dataSource } from "./db";
import languages from "../data/languages.json";
import statuses from "../data/status.json";
import repos from "../data/list.json";
import { Lang } from "../src/languages/language.entity";
import { Status } from "../src/status/status.entity";
import { Repo } from "../src/repos/repo.entity";
import { In } from "typeorm";

const seed = async () => {
  console.log("Seeding starting ..");
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  try {
    // Delete everything and also the auto-generated indexes
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM lang_repos_repo");
    await queryRunner.query("DELETE FROM lang");
    await queryRunner.query("DELETE FROM repo");
    await queryRunner.query("DELETE FROM status");
    await queryRunner.query(
      'DELETE FROM sqlite_sequence WHERE name="status" OR name = "lang"'
    );

    // insert all languages
    await Promise.all(
      languages.map(async (el) => {
        const lang = new Lang();

        lang.name = el.name;

        return lang.save();
      })
    );

    // insert all statuses
    await Promise.all(
      statuses.map(async (el) => {
        const status = new Status();

        status.name = el.name;

        return status.save();
      })
    );

    // insert all repos
    await Promise.all(
      repos.map(async (el) => {
        const repo = new Repo();
        repo.id = el.id;
        repo.name = el.name;
        repo.url = el.url;

        repo.status = await Status.findOneOrFail({
          where: { id: el.isPrivate ? 2 : 1 },
        });

        repo.langs = await Lang.find({
          where: {
            name: In(el.languages.map((language) => language.node.name)),
          },
        });

        return repo.save();
      })
    );

    await queryRunner.commitTransaction();
  } catch (e: any) {
    await queryRunner.rollbackTransaction();
    console.log(e);
  }
};

seed();
