import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomerSupportModule } from './customer-support/customer-support.module';
import { QueryErrorFilter } from './middleware/constraintErrorHndler';
import { TicketModule } from './ticket/ticket.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, TicketModule, CustomerSupportModule],
    controllers: [AppController],
    providers: [AppService],
    
})
export class AppModule {}
