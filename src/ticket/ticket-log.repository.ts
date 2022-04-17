import { EntityRepository, Repository } from "typeorm";
import { TicketLog } from "./ticket-log.entity";

@EntityRepository(TicketLog)
export class TicketLogsRepository extends Repository<TicketLog> {
    async createNewTicketLog(ticketLogDetails : { action : string , actionDate : Date, ticketId}) {
        const newTicketLog = new TicketLog
        newTicketLog.action = ticketLogDetails.action
        newTicketLog.actionDate = ticketLogDetails.actionDate
        newTicketLog.ticketId = ticketLogDetails.ticketId
        await newTicketLog.save()
        return newTicketLog
    }
}