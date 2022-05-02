import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { CreateFaqDto } from './dto/createFaqDto';
import { UpdateCategoryDto } from './dto/updateCategoryDto';
import { UpdateFaqDto } from './dto/updateFaqDto';
import { FaqService } from './faq.service';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService : CategoryService,
        private faqService : FaqService
    ){}

    @Get()
    async getAllCategories () {
        return await this.categoryService.getAllCategories()
    }

    @Post()
    async createNewCategory (@Body() createCategoryDto : CreateCategoryDto) {
        return await this.categoryService.addNewCategory(createCategoryDto)
    }

    @Get("/faq")
    async getAllFaq () {
        return await this.faqService.getAllFaq()
    }

    @Get("/faq/:faqId")
    async getSingleFaq (@Param("faqId", ParseIntPipe) faqId : number) {
        return await this.faqService.getSingleFaq(faqId)
    }

    @Post("/faq")
    async createNewFaq (@Body() createFaqDto : CreateFaqDto) {
        return await this.faqService.addNewFaq(createFaqDto)
    }

    @Get("/:categoryId")
    async getSingleCategory(@Param("categoryId", ParseIntPipe) categoryId : number) {
        return await this.categoryService.getSingleCategory(categoryId)
    }

    @Put("/:categoryId")
    async updateCategory (@Param("categoryId", ParseIntPipe) categoryId : number, @Body() updateCategoryDto : UpdateCategoryDto) {
        return await this.categoryService.updateCategory(categoryId, updateCategoryDto)
    }

    @Put("/faq/:faqId") 
    async updateFaq (@Param("faqId", ParseIntPipe) faqId : number, @Body() updateFaqDto : UpdateFaqDto) {
        return await this.faqService.updateFaq(faqId, updateFaqDto)
    }

    @Delete("/:categoryId") 
    async deleteCategory (@Param("categoryId", ParseIntPipe) categoryId : number) {
        return await this.categoryService.deleteCategory(categoryId)
    }

    @Delete("/faq/:faqId") 
    async deleteFaq(@Param("faqId", ParseIntPipe) faqId : number) {
        return await this.faqService.deleteFaq(faqId)
    }
 }
