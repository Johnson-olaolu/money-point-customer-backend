import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}