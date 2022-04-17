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
    constructor (
         @InjectRepository(TicketRepository) private ticketRepository: TicketRepository, 
         @InjectRepository(TicketLogsRepository) private ticketLogsRepository : TicketLogsRepository
    ) {}


    //create new Ticket 
    createNewTicket =async  (createTicketDto : CreateTicketDto)  : Promise<{success : true, data : Ticket}> => {
        const { title , description} = createTicketDto

        const presentDate = moment().format("YYYYMMDD")
        const uniqueCode = uniqid(`${title[0]}-`, `-${presentDate}`)
        const newTicketData =  {
            title : title,
            description : description,
            status : ticketStatusTypes.OPENED,
            uniqueCode : uniqueCode
        }

        
        const newTicket = await this.ticketRepository.createNewTicket(newTicketData);

        const newTicketLogData = {
            ticketId : newTicket.id,
            action : `new ticket ${newTicket.uniqueCode}:${newTicket.title} created`,
            actionDate : moment().toDate()
        }  
        await this.ticketLogsRepository.createNewTicketLog(newTicketLogData)      
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
        const ticketToDelete = await this.ticketRepository.findOne(ticketId)
        

        if(!ticketToDelete) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`)
        }

        await this.ticketRepository.delete(ticketId)  

        return {
            success : true, 
            message : `Ticket ${ticketToDelete.uniqueCode} deleted`
        }
    }

    async updateTicket(ticketId, updateTicketDto : UpdateTicketDto) : Promise<{success : boolean, message : string , data : Ticket}> {
        const ticketToUpdate = await this.ticketRepository.findOne(ticketId)
        const {title , description} = updateTicketDto

        if(!ticketToUpdate) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`)
        }

        let action = "";
        if(title) {
            ticketToUpdate.title = title
            action += ` changed title to ${title}`
        }
        if(description) {
            ticketToUpdate.description = description
            action += ` changed description to ${description}`
        }

        await ticketToUpdate.save()

        const newTicketLogData = {
            ticketId : ticketToUpdate.id,
            action : `new ticket ${ticketToUpdate.uniqueCode}:${ticketToUpdate.title} updated` + action,
            actionDate : new Date()
        }  

        await this.ticketLogsRepository.createNewTicketLog(newTicketLogData)
        return {
            success: true,
            message : `ticket ${ticketToUpdate.uniqueCode} updated`,
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

    async getAllTicketLogs () : Promise<{success : Boolean , data : TicketLog[]}>{
        const ticketLogs = await this.ticketLogsRepository.find()
        return {
            success : true,
            data : ticketLogs
        }
    }

    async getSingleTicketLogs (ticketId):Promise<{success : Boolean , data : TicketLog[]}> {
        const ticketToUpdateLog = await this.ticketRepository.findOne(ticketId)

        if(!ticketToUpdateLog) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`)
        }

        const ticketLogs = await this.ticketLogsRepository.find({ticketId : ticketId})
        return {
            success : true,
            data : ticketLogs
        }
    }
}
