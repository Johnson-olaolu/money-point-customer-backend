import { CustomerSupportLevel } from "src/customer-support/customer-support-level.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    title : string

    @Column()
    description : string

    @ManyToMany( () => CustomerSupportLevel)
    @JoinTable()
    customerSupportLevels : CustomerSupportLevel[]

    @Column()
    subCategories : string


}