import { EntityRepository, Repository } from "typeorm";
import { Ticket } from "./ticket.entity";

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
    createNewTicket =async (newTicketData) => {
        const newTicket = new Ticket
        newTicket.title = newTicketData.title;
        newTicket.description = newTicketData.description;
        newTicket.status = newTicketData.status;
        newTicket.uniqueCode = newTicketData.uniqueCode;
        await newTicket.save()
        return newTicket
    }
}