import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { IsString } from "class-validator";
import { Status } from "../status/status.entity";
import { Lang } from "../languages/language.entity";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field()
  @PrimaryColumn()
  @IsString()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  url: string;

  @Field(()=>Status)
  @ManyToOne(() => Status, (status) => status.id)
  status: Status;

  @Field(()=>[Lang], { nullable: true })
  @ManyToMany(() => Lang, (lang) => lang.repos)
  languages?: Lang[];
}
