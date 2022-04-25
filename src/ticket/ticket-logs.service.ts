import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketLog } from "./ticket-log.entity";
import { TicketLogsRepository } from "./ticket-log.repository";
import { TicketRepository } from "./ticket.repository";

@Injectable()
export class TicketLogsService {
    constructor(
        @InjectRepository(TicketLogsRepository) private ticketLogsRepository : TicketLogsRepository,
        @InjectRepository(TicketRepository) private ticketRepository : TicketRepository
    ) {}

    async getAllTicketLogs () : Promise<TicketLog[]>{
        const ticketLogs = await this.ticketLogsRepository.find()
       return ticketLogs

    }

    async getSingleTicketLogs (ticketId : number):Promise<TicketLog[]> {
        const ticketLog = await this.ticketRepository.findOne(ticketId)

        if(!ticketLog) {
            throw new NotFoundException(`Ticket with id ${ticketId} not found`)
        }

        const ticketLogs = await this.ticketLogsRepository.find({ticketId : ticketId})
        return  ticketLogs

    }
}