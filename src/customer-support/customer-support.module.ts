import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSupportLevelRepository } from './customer-support-level.repository';
import { CustomerSupportController } from './customer-support.controller';
import { CustomerSupportService } from './customer-support.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerSupportLevelRepository])],
  controllers: [CustomerSupportController],
  providers: [CustomerSupportService]
})
export class CustomerSupportModule {}
