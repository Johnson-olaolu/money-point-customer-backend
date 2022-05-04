import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Faq extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        nullable : false
    })
    question : string

    @Column({
        nullable : false
    })
    solution : string

    @ManyToOne( () => Category, {
        nullable : false,
        eager : true,
        onDelete : "CASCADE"
    })
    category : Category

    @Column()
    subCategory : string
}