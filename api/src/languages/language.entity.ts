import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from "typeorm";
import { IsString } from "class-validator";
import { Repo } from "../repos/repo.entity";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @ManyToMany(() => Repo)
  @JoinTable()
  repos: Repo[]
}
