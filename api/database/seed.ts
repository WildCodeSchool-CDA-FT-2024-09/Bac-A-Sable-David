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
    await queryRunner.query("TRUNCATE lang_repos_repo CASCADE");
    await queryRunner.query("TRUNCATE lang CASCADE");
    await queryRunner.query("TRUNCATE repo CASCADE");
    await queryRunner.query("TRUNCATE status CASCADE");

    await queryRunner.query(`ALTER SEQUENCE lang_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE status_id_seq RESTART WITH 1;`);
    await queryRunner.commitTransaction();

    // insert all languages
    await queryRunner.startTransaction();
    for (let language of languages) {
      const lang = new Lang();

      lang.name = language.name;

      await lang.save();
    }

    // insert all statuses
    for (let el of statuses) {
      const status = new Status();
      status.name = el.name;
      await status.save();
    }

    // insert all repos
    for (let el of repos) {
      const repo = new Repo();
      repo.id = el.id;
      repo.name = el.name;
      repo.url = el.url;

      repo.status = await Status.findOneOrFail({
        where: { id: el.isPrivate ? 2 : 1 },
      });

      repo.languages = await Lang.find({
        where: {
          name: In(el.languages.map((language) => language.node.name)),
        },
      });

      await repo.save();
    }
    await queryRunner.commitTransaction();
    console.info("Seeding successfull");

  } catch (e: any) {
    await queryRunner.rollbackTransaction();
    console.log(e);
  }

  await dataSource.destroy();
};

seed();
