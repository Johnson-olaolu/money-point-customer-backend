import { EntityRepository, Repository } from "typeorm";
import { Ticket } from "./ticket.entity";
import { ticketStatusTypes } from "./ticket.enum";

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
    createNewTicket =async (newTicketData : { title : string, description : string, status : ticketStatusTypes, ticketRef : string})  => {
        const newTicket = new Ticket
        newTicket.title = newTicketData.title;
        newTicket.description = newTicketData.description;
        newTicket.status = newTicketData.status;
        newTicket.ticketRef = newTicketData.ticketRef;
        await newTicket.save()
        return newTicket
    }
}