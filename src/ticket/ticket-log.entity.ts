import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity()
export class TicketLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    
    @ManyToOne( () => Ticket , {
        nullable : false,
        onDelete : "CASCADE"
    })
    ticketId : Number;

    @Column({
        nullable :false
    })
    action : string;

    @Column({
        nullable : false
    })
    actionDate : Date;
}