import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Repo extends BaseEntity{
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    isPrivate: number

    @Column()
    url: string
}