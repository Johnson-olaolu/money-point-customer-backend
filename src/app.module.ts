import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomerSupportModule } from './customer-support/customer-support.module';
import { SeedModule } from './shared/seed.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        TicketModule,
        CustomerSupportModule,
        UserModule,
        SeedModule,
        CategoryModule,
        ConfigModule.forRoot({
            isGlobal : true
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
