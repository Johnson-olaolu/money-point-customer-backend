import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column( {
        nullable : false
    })
    password : string
}