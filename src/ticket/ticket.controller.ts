import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateTicketDto } from './dto/createTicketDto';
import { UpdateTicketDto } from './dto/updateTicketDto';
import { UpdateTicketStatusDto } from './dto/updateTicketStatusDto';
import { Ticket } from './ticket.entity';
import { ticketStatusTypes } from './ticket.enum';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Get()
    async getAllTickets() {
        return  await this.ticketService.getAllTickets();
    }

    @Post()
    async createNewTicket( @Body() createTicketDto : CreateTicketDto) {
        return  await this.ticketService.createNewTicket(createTicketDto);
    }
    
    @Get("/:id")
    async getTicketById(@Param("id", ParseIntPipe) ticketId : Number ) {
        return await this.ticketService.getTicketById(ticketId)
    }

    @Delete("/:id")
    async deleteTicket  (@Param("id" , ParseIntPipe) ticketId : number ) {
        return await this.ticketService.deleteTicket(ticketId)
   }

   @Put("/:id")
   async updateTicket (@Param( "id", ParseIntPipe) ticketId : Number, @Body() updateTicketDto : UpdateTicketDto) {
        return await this.ticketService.updateTicket(ticketId, updateTicketDto)
   }

   @Put("/update-status/:id")
   async updateTicketStatus (@Param( "id", ParseIntPipe) ticketId : Number, @Body() body : UpdateTicketStatusDto) {
       const { status } = body
        return await this.ticketService.updateTicketStatus(ticketId, status)
   }
}

