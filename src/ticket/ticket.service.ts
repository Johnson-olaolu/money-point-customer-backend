import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/createTicketDto';
import { UpdateTicketDto } from './dto/updateTicketDto';
import { Ticket } from './ticket.entity';
import { ticketStatusTypes } from './ticket.enum';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
    constructor ( @InjectRepository(TicketRepository) private ticketRepository: TicketRepository) {}


    //create new Ticket 
    createNewTicket =async  (createTicketDto : CreateTicketDto)  : Promise<{success : true, data : Ticket}> => {
        const { title , description} = createTicketDto

        let newTicketData =  {
            title : title,
            description : description,
            status : ticketStatusTypes.OPENED,
            uniqueCode : "testcode"
        }
        
        const newTicket = await this.ticketRepository.createNewTicket(newTicketData);

        return {
            success : true,
            data : newTicket
        }
    }

    async getAllTickets () : Promise<{success : true, data : Ticket[]}>  {
        const tickets = await this.ticketRepository.find()
        return {
            success : true,
            data : tickets
        }
    }

    async getTicketById (ticketId) : Promise<{success: boolean, data : Ticket}> {
        const ticket = await this.ticketRepository.findOne(ticketId)

        return {
            success : true,
            data : ticket
        }
    } 

    async deleteTicket (ticketId) : Promise<{success : boolean, message : string}> {
        const result =  await this.ticketRepository.delete(ticketId)

        if(!result.affected) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`)
        }

        return {
            success : true, 
            message : `Ticket ${ticketId} deleted`
        }
    }

    async updateTicket(ticketId, updateTicketDto : UpdateTicketDto) : Promise<{success : boolean, message : string , data : Ticket}> {
        const ticketToUpdate = await this.ticketRepository.findOne(ticketId)
        const {title , description} = updateTicketDto

        if(!ticketToUpdate) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`)
        }

        if(title) {
            ticketToUpdate.title = title
        }
        if(description) {
            ticketToUpdate.description = description
        }

        await ticketToUpdate.save

        return {
            success: true ,
            message : `ticket ${ticketToUpdate.id} updated`,
            data : ticketToUpdate
        }
    }

    async updateTicketStatus (ticketId, ticketStatus : ticketStatusTypes) : Promise<{success : boolean, message : string , data : Ticket}> {
        const ticketToUpdate = await this.ticketRepository.findOne(ticketId)

        if(!ticketToUpdate) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`)
        }

        ticketToUpdate.status  = ticketStatus;

        await ticketToUpdate.save

        return {
            success: true ,
            message : `ticket ${ticketToUpdate.id} status updated to ${ticketStatus}`,
            data : ticketToUpdate
        }
    } 
}
