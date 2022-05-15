import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import { AssignTicketDto } from './dto/assignTicketDto';
import { CreateTicketDto } from './dto/createTicketDto';
import { SendMessageDto } from './dto/sendMessageDto';
import { UpdateTicketDto } from './dto/updateTicketDto';
import { UpdateTicketStatusDto } from './dto/updateTicketStatusDto';
import { TicketLogsService } from './ticket-logs.service';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(
        private ticketService: TicketService,
        private ticketLogsService: TicketLogsService,
    ) {}

    @Post('/message/:ticketRef')
    async SendMessage(
        @Param('ticketRef') ticketRef: string,
        @Body() SendMessageDto: SendMessageDto,
    ) {
        return await this.ticketService.sendNewMessage(
            ticketRef,
            SendMessageDto,
        );
    }

    @Post('/assign-ticket')
    async assignTicket(@Body() assignTicketDto: AssignTicketDto) {
        return this.ticketService.assignCustomerSupportToTicket(assignTicketDto)
    }

    @Get('/ref/:ticketRef')
    async getTicketByRef(@Param('ticketRef') ticketRef: string) {
        return await this.ticketService.getTicketByRef(ticketRef);
    }

    @Patch('/status/:ticketId') 
    async updateTicketStatus (@Param('ticketId', ParseIntPipe) ticketId , @Body() updateTicketStatusDto : UpdateTicketStatusDto) {
        return await this.ticketService.updateTicketStatus(ticketId, updateTicketStatusDto.status)
    }

    @Get()
    async getAllTickets() {
        return await this.ticketService.getAllTickets();
    }

    @Post()
    async createNewTicket(@Body() createTicketDto: CreateTicketDto) {
        return await this.ticketService.createNewTicket(createTicketDto);
    }

    @Get('/logs')
    async getAllTicketLogs() {
        return await this.ticketLogsService.getAllTicketLogs();
    }

    @Get('/logs/:id')
    async getTicketLogs(@Param('id', ParseIntPipe) ticketId: number) {
        return await this.ticketLogsService.getSingleTicketLogs(ticketId);
    }

    @Get('/:id')
    async getTicketById(@Param('id', ParseIntPipe) ticketId: number) {
        return await this.ticketService.getTicketById(ticketId);
    }

    @Delete('/:id')
    async deleteTicket(@Param('id', ParseIntPipe) ticketId: number) {
        return await this.ticketService.deleteTicket(ticketId);
    }

    @Put('/:id')
    async updateTicket(
        @Param('id', ParseIntPipe) ticketId: number,
        @Body() updateTicketDto: UpdateTicketDto,
    ) {
        return await this.ticketService.updateTicket(ticketId, updateTicketDto);
    }
}
