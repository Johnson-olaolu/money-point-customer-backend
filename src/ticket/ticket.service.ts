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

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TicketRepository)
        private ticketRepository: TicketRepository,
        @InjectRepository(TicketLogsRepository)
        private ticketLogsRepository: TicketLogsRepository,
    ) {}

    //create new Ticket
    createNewTicket = async (
        createTicketDto: CreateTicketDto,
    ): Promise<Ticket> => {
        const { title, description } = createTicketDto;

        const presentDate = moment().format('YYYYMMDD');
        const ticketRef = uniqid(`${title[0]}-`, `-${presentDate}`);
        const newTicketData = {
            title: title,
            description: description,
            status: ticketStatusTypes.OPENED,
            ticketRef: ticketRef,
        };

        const newTicket = await this.ticketRepository.createNewTicket(
            newTicketData,
        );

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

    async getTicketById(ticketId : number): Promise<Ticket > {
        const ticket = await this.ticketRepository.findOne(ticketId);

        return ticket;
    }

    async getTicketByRef(ticketRef : string) : Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({ticketRef : ticketRef})

        if(!ticket) {
            throw new NotFoundException(`Could not find ticket with ticketRef: ${ticketRef}`)
        }
        return ticket
    }

    async deleteTicket(
        ticketId : number,
    ): Promise<string > {
        const ticketToDelete = await this.ticketRepository.findOne(ticketId);

        if (!ticketToDelete) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`);
        }

        await this.ticketRepository.delete(ticketId);

        return `Ticket ${ticketToDelete.ticketRef}: ${ticketToDelete.title} deleted`
    }

    async updateTicket(
        ticketId : number,
        updateTicketDto: UpdateTicketDto,
    ): Promise<Ticket > {
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
        return  ticketToUpdate
    }

    async updateTicketStatus(
        ticketId : number,
        ticketStatus: ticketStatusTypes,
    ): Promise<Ticket> {
        const ticketToUpdate = await this.ticketRepository.findOne(ticketId);

        if (!ticketToUpdate) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`);
        }

        ticketToUpdate.status = ticketStatus;

        await ticketToUpdate.save;

        return  ticketToUpdate
    }
}
