import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TicketModule } from './ticket/ticket.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, TicketModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
