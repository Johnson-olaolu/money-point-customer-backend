import { CustomerSupportLevel } from "src/customer-support/customer-support-level.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable : false
    })
    title : string

    @Column({
        nullable : false
    })
    description : string

    @ManyToMany( () => CustomerSupportLevel)
    @JoinTable()
    customerSupportLevels : CustomerSupportLevel[]

    @Column({
        nullable : false
    })
    subCategories : string
}