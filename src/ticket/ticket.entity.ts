import { Category } from 'src/category/category.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
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
        nullable : false
    })
    email : string

    @ManyToOne(() => Category)
    @JoinColumn()
    category : Category

    @Column({
        unique : true
    })
    ticketRef: string;

    @Column({
        nullable : true
    })
    agentEmail : string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
