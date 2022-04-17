import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketLogsRepository } from './ticket-log.repository';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';
import { TicketService } from './ticket.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([TicketRepository, TicketLogsRepository]),
  ],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
