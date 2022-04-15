import { Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Post()
    async createTicket() {
        return {};
    }

    @Get()
    async getAllTickets() {
        return [];
    }
}

