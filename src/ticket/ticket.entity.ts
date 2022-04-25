import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TicketLog } from './ticket-log.entity';
import { ticketStatusTypes } from './ticket.enum';

@Entity()
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable : false
    })
    title: string;

    @Column({
        nullable : false
    })
    description: string;

    @Column({
        nullable : false
    })
    status: ticketStatusTypes;

    @Column({
        unique : true
    })
    ticketRef: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
