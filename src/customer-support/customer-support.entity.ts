import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerSupportLevel } from "./customer-support-level.entity";


@Entity()
export class CustomerSupport extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @OneToOne( () => User)
    @JoinColumn()
    user : User

    @ManyToOne( () => CustomerSupportLevel)
    level : CustomerSupportLevel 
}