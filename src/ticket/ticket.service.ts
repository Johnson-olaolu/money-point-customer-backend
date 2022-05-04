import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { CreateTicketDto } from './dto/createTicketDto';
import { UpdateTicketDto } from './dto/updateTicketDto';
import { TicketLog } from './ticket-log.entity';
import { TicketLogsRepository } from './ticket-log.repository';
import { Ticket } from './ticket.entity';
import { ticketStatusTypes } from './ticket.enum';
import { TicketRepository } from './ticket.repository';
import * as uniqid from 'uniqid';
import { CategoryService } from 'src/category/category.service';
import { UserRepository } from 'src/user/user.repository';
import { RoleRepository } from 'src/user/role.respository';
import { FirebaseApp } from 'src/services/firebase.service';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TicketRepository)
        private ticketRepository: TicketRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private roleRepository: RoleRepository,
        @InjectRepository(TicketLogsRepository)
        private ticketLogsRepository: TicketLogsRepository,
        private categoryService: CategoryService,
        private firebaseApp: FirebaseApp,
    ) {}

    //create new Ticket
    createNewTicket = async (
        createTicketDto: CreateTicketDto,
    ): Promise<Ticket> => {
        const {
            title,
            description,
            agentEmail,
            categoryId,
            subCategory,
            email,
        } = createTicketDto;

        const presentDate = moment().format('YYYYMMDD');
        const ticketRef = uniqid(`${title[0]}-`, `-${presentDate}`);
        const category = await this.categoryService.getSingleCategory(
            categoryId,
        );

        if (!category) {
            throw new NotFoundException(
                `Cuold not find Category with id ${categoryId}`,
            );
        }
        if (category.subCategories.includes(subCategory) == false) {
            throw new NotFoundException(
                `Could not find sub category: ${subCategory} in category : ${category.title}`,
            );
        }

        if (agentEmail) {
            const agentRole = await this.roleRepository.findOne({
                name: 'agent',
            });
            const agent = await this.userRepository.findOne({
                email: agentEmail,
                role: agentRole,
            });

            if (!agent) {
                throw new NotFoundException(
                    `Cuold not find Agent with email ${agentEmail}`,
                );
            }
        }

        const newTicketData = {
            title: title,
            description: description,
            status: ticketStatusTypes.OPENED,
            ticketRef: ticketRef,
            category: category,
            agentEmail: agentEmail,
            email: email,
            subCategory: subCategory,
        };

        const newTicket = await this.ticketRepository.createNewTicket(
            newTicketData,
        );

        const firebaseTicketRef = this.firebaseApp.db().ref("ticket")

        const firebaseTicketData = {
            title: newTicket.title,
            description: newTicket.description,
            status: newTicket.status,
            ticketRef: newTicket.ticketRef,
            category: newTicket.category.title,
            agentEmail: newTicket.agentEmail,
            email: newTicket.email,
            subCategory: newTicket.subCategory,
            id : newTicket.id,
            createdAt : newTicket.created_at
        }
        firebaseTicketRef.child(ticketRef).set(firebaseTicketData)
        const newTicketLogData = {
            ticketId: newTicket.id,
            action: `new ticket ${newTicket.ticketRef}:${newTicket.title} created`,
            actionDate: moment().toDate(),
        };
        await this.ticketLogsRepository.createNewTicketLog(newTicketLogData);
        return newTicket;
    };

    async getAllTickets(): Promise<Ticket[]> {
        const tickets = await this.ticketRepository.find();
        return tickets;
    }

    async getTicketById(ticketId: number): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne(ticketId);

        if (!ticket) {
            throw new NotFoundException(
                `Could not find ticket with this id ${ticketId}`,
            );
        }
        return ticket;
    }

    async getTicketByRef(ticketRef: string): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({
            ticketRef: ticketRef,
        });

        if (!ticket) {
            throw new NotFoundException(
                `Could not find ticket with ticketRef: ${ticketRef}`,
            );
        }
        return ticket;
    }

    async deleteTicket(ticketId: number): Promise<string> {
        const ticketToDelete = await this.ticketRepository.findOne(ticketId);

        if (!ticketToDelete) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`);
        }

        await this.ticketRepository.delete(ticketId);

        return `Ticket ${ticketToDelete.ticketRef}: ${ticketToDelete.title} deleted`;
    }

    async updateTicket(
        ticketId: number,
        updateTicketDto: UpdateTicketDto,
    ): Promise<Ticket> {
        const ticketToUpdate = await this.ticketRepository.findOne(ticketId);
        const { title, description } = updateTicketDto;

        if (!ticketToUpdate) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`);
        }

        let action = '';
        if (title) {
            ticketToUpdate.title = title;
            action += ` changed title to ${title}`;
        }
        if (description) {
            ticketToUpdate.description = description;
            action += ` changed description to ${description}`;
        }

        await ticketToUpdate.save();

        const newTicketLogData = {
            ticketId: ticketToUpdate.id,
            action:
                `new ticket ${ticketToUpdate.ticketRef}:${ticketToUpdate.title} updated` +
                action,
            actionDate: new Date(),
        };

        await this.ticketLogsRepository.createNewTicketLog(newTicketLogData);
        return ticketToUpdate;
    }

    async updateTicketStatus(
        ticketId: number,
        ticketStatus: ticketStatusTypes,
    ): Promise<Ticket> {
        const ticketToUpdate = await this.ticketRepository.findOne(ticketId);

        if (!ticketToUpdate) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`);
        }

        ticketToUpdate.status = ticketStatus;

        await ticketToUpdate.save;

        return ticketToUpdate;
    }

    async testFirebase() {
        var ref = this.firebaseApp
            .db()
            .ref('restricted_access/secret_document');
        ref.once('value', function (snapshot) {
            console.log(snapshot.val());
        });
    }
}
