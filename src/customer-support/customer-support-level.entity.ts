import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { CustomerSupport } from "./customer-support.entity";

@Entity()
export class CustomerSupportLevel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable : false,
        unique : true
    })
    name : string

    @Column({
        nullable : false
    })
    description : string

    @OneToMany( () => CustomerSupport, (customerSupport) => customerSupport.level)
    customerSupports : CustomerSupport[]

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}