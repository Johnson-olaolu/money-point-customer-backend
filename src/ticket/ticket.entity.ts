import { Category } from 'src/category/category.entity';
import { CustomerSupport } from 'src/customer-support/customer-support.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
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

    @ManyToOne(() => Category, {
        eager : true
    })
    @JoinColumn()
    category : Category

    @Column()
    subCategory : string

    @Column({
        unique : true
    })
    ticketRef: string;

    @Column({
        nullable : true
    })
    agentEmail : string

    @ManyToOne(()=> CustomerSupport, {
        eager : true
    })
    @JoinColumn()
    assigned : CustomerSupport

    @Column({
        default : false
    })
    escalated : boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
