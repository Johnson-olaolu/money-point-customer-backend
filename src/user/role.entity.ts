import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable : false,
        unique :true 
    }) 
    name : string

    @Column()
    description : string

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions : Permission[]

    @CreateDateColumn()
    createdAt : Date
}