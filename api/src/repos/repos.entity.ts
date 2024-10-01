import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm"
import {Min, Max, IsString} from "class-validator"

@Entity()
export class Repo extends BaseEntity{
    @PrimaryColumn()
    @IsString()
    id: string

    @Column()
    name: string

    @Column()
    @Min(1)
    @Max(2)
    isPrivate: number

    @Column()
    url: string
}