import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { FirebaseApp } from 'src/services/firebase.service';
import { UserModule } from 'src/user/user.module';
import { TicketLogsRepository } from './ticket-log.repository';
import { TicketLogsService } from './ticket-logs.service';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';
import { TicketService } from './ticket.service';

@Module({
  imports : [
    CategoryModule,
    UserModule,
    TypeOrmModule.forFeature([TicketRepository, TicketLogsRepository]),
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketLogsService, FirebaseApp],
  exports: [TicketLogsService, TicketService]
})
export class TicketModule {}
