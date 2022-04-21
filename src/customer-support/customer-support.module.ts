import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { CustomerSupportLevelRepository } from './customer-support-level.repository';
import { CustomerSupportController } from './customer-support.controller';
import { CustomerSupportRepository } from './customer-support.repository';
import { CustomerSupportService } from './customer-support.service';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([
            UserRepository,
            CustomerSupportRepository,
            CustomerSupportLevelRepository,
        ]),
    ],
    controllers: [CustomerSupportController],
    providers: [CustomerSupportService],
})
export class CustomerSupportModule {}
