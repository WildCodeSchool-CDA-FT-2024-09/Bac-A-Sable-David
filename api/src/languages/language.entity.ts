import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IsString } from "class-validator";
import { Repo } from "../repos/repo.entity";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Lang extends BaseEntity {
  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsString()
  name: string;

  @Field(()=>[Repo], { nullable: true })
  @ManyToMany(() => Repo, (repo) => repo.languages)
  @JoinTable()
  repos?: Repo[];
}
