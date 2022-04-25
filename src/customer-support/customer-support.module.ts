import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CustomerSupportLevelRepository } from './customer-support-level.repository';
import { CustomerSupportLevelService } from './customer-support-level.service';
import { CustomerSupportController } from './customer-support.controller';
import { CustomerSupportRepository } from './customer-support.repository';
import { CustomerSupportService } from './customer-support.service';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([
            CustomerSupportRepository,
            CustomerSupportLevelRepository,
        ]),
    ],
    controllers: [CustomerSupportController],
    providers: [CustomerSupportService, CustomerSupportLevelService],
    exports : [CustomerSupportService, CustomerSupportLevelService]
})
export class CustomerSupportModule {}
