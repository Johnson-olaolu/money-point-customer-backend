import { CustomerSupportLevel } from "src/customer-support/customer-support-level.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable : false,
        unique : false
    })
    title : string

    @Column({
        nullable : false,
        unique : false
    })
    description : string

    @ManyToMany( () => CustomerSupportLevel, {
        nullable : false,
        eager : true
    })
    @JoinTable()
    customerSupportLevels : CustomerSupportLevel[]

    @Column({
        nullable : false
    })
    subCategories : string
}