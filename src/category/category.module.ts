import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqRepository } from './faq.repository';
import { CategoryRepository } from './category.repository';
import { FaqService } from './faq.service';
import { CustomerSupportModule } from 'src/customer-support/customer-support.module';

@Module({
  imports : [
    CustomerSupportModule,
    TypeOrmModule.forFeature([FaqRepository, CategoryRepository,])],
  providers: [CategoryService,FaqService],
  controllers: [CategoryController]
})
export class CategoryModule {}
