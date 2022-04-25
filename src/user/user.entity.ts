import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column( {
        nullable : false
    })
    firstName: string

    @Column( {
        nullable : false
    })
    lastName : string

    @Column({
        unique : true,
        nullable : false
    }) 
    email : string;

    @ManyToOne( () => Role , {
        nullable : false
    })
    role : Role

    @Column( {
        nullable : false
    })
    password : string
}