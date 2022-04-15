import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ticketStatusTypes } from "./ticket.model";

@Entity()
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    description : string;

    @Column()
    status : ticketStatusTypes

    @Column()
    uniqueCode : string;

    @Column()
    created_at : Date;

    @Column()
    updated_at : Date
}

