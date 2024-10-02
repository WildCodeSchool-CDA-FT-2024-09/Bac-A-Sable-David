import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, ManyToMany } from "typeorm";
import { IsString } from "class-validator";
import { Status } from "../status/status.entity";
import { Lang } from "../languages/language.entity";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Status, (status) => status.id)
  status: Status;

  @ManyToMany(()=>Lang, lang => lang.repos)
  langs?:Lang[]
}
