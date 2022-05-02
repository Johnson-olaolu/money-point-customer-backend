import { User } from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerSupportLevel } from "./customer-support-level.entity";


@Entity()
export class CustomerSupport extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @OneToOne( () => User , {
        nullable : false,
        eager : true,
        onDelete : "CASCADE"
    })
    @JoinColumn()
    user : User

    @ManyToOne( () => CustomerSupportLevel ,{
        nullable: false,
        eager : true,
        onUpdate: "CASCADE"
    })
    level : CustomerSupportLevel 

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}