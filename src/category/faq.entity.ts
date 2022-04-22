import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Faq extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    title : string

    @Column()
    solution : string

    @ManyToMany( () => Category)
    @JoinTable()
    categories : Category[]

}