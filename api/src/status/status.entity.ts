import { Min, Max, IsString } from "class-validator"
import { Repo } from "../repos/repo.entity"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"

@Entity()
export class Status extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Min(1)
    @Max(2)
    id: number

    @Column()
    @IsString()
    name: string

    @OneToMany(()=> Repo, repo => repo.status)
    repos: Repo[]
}