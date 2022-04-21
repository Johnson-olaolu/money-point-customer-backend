import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    name : string

    @Column()
    description : string

    @CreateDateColumn()
    createdAt : Date
}