import { Min, Max, IsString } from "class-validator"
import { Repo } from "../repos/repo.entity"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
@Entity()
export class Status extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    @Min(1)
    @Max(2)
    id: number

    @Field()
    @Column()
    @IsString()
    name: string

    @Field(()=>[Repo])
    @OneToMany(()=> Repo, repo => repo.status)
    repos: Repo[]
}