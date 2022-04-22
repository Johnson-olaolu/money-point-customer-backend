import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqRepository } from './faq.repository';
import { CategoryRepository } from './category.repository';
import { CustomerSupportLevelRepository } from 'src/customer-support/customer-support-level.repository';
import { FaqService } from './faq.service';

@Module({
  imports : [TypeOrmModule.forFeature([FaqRepository, CategoryRepository, CustomerSupportLevelRepository])],
  providers: [CategoryService,FaqService],
  controllers: [CategoryController]
})
export class CategoryModule {}
