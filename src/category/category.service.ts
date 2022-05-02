import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerSupportLevelService } from 'src/customer-support/customer-support-level.service';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { UpdateCategoryDto } from './dto/updateCategoryDto';
import { FaqRepository } from './faq.repository';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository,
        @InjectRepository(FaqRepository) private faqRepository: FaqRepository,
        private customerSupportLevelService : CustomerSupportLevelService
    ) {}

    async getAllCategories(): Promise< Category[]> {
        const categories = await this.categoryRepository.find();
        for(const category of categories) {
            category.subCategories = JSON.parse(category.subCategories)
        }
        return categories
    }

    async addNewCategory(
        createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        const { title , description, subCategories, customerSupportLevels } =
            createCategoryDto;

        const customerSupportLevelArray = [];

        for (const levelId of customerSupportLevels) {
            const customerSupportLevel =
                await this.customerSupportLevelService.getCustomerSupportLevel(levelId)
            if(!customerSupportLevel) {
                throw new NotFoundException(`Cannot find customer support level for this id : ${levelId}`)
            }
            customerSupportLevelArray.push(customerSupportLevel);
        }

        const newCategoryDetails = {
            title,
            description,
            subCategories,
            customerSupportLevel: customerSupportLevelArray,
        };

        const newCategory = await this.categoryRepository.createCategory(
            newCategoryDetails,
        );

        newCategory.subCategories = JSON.parse(newCategory.subCategories)
       
        return newCategory
    }

    async getSingleCategory(
        categoryId,
    ): Promise<Category> {
        const selectedCategory = await this.categoryRepository.findOne(
            categoryId,
        );

        if (!selectedCategory) {
            throw new NotFoundException('Could not find Category with this Id');
        }
        selectedCategory.subCategories  = JSON.parse(selectedCategory.subCategories)
        return selectedCategory
    }

    async updateCategory(categoryId, updateCategoryDto: UpdateCategoryDto) : Promise<Category> {
        const categoryToUpdate = await this.categoryRepository.findOne(
            categoryId,
        );

        const { title, description, subCategories, customerSupportLevels } =
            updateCategoryDto;
        if (!categoryToUpdate) {
            throw new NotFoundException('Could not find Category with this Id');
        }

        try {
            if (title) {
                categoryToUpdate.title = title;
            }
            if (description) {
                categoryToUpdate.description = description;
            }
            if (subCategories) {
                const subCategoriesString = JSON.stringify(subCategories);
                categoryToUpdate.subCategories = subCategoriesString;
            }
            if (customerSupportLevels) {
                const customerSupportLevelsArray = [];
                for (const levelId of customerSupportLevels) {
                    const customerSupportLevel =
                        await this.customerSupportLevelService.getCustomerSupportLevel(levelId)
                    customerSupportLevelsArray.push(customerSupportLevel);
                }

                categoryToUpdate.customerSupportLevels =
                    customerSupportLevelsArray;
            }
            await categoryToUpdate.save();
            categoryToUpdate.subCategories = JSON.parse(categoryToUpdate.subCategories)
            return categoryToUpdate
        } catch (error) {}
    }

    async deleteCategory(categoryId) : Promise<string>{
        const categoryToDelete = await this.categoryRepository.findOne(
            categoryId,
        );

        if (!categoryToDelete) {
            throw new NotFoundException('Cannot find category with this Id');
        }

        await this.categoryRepository.delete(categoryId);

        return  'category deleted successfully'
    }

}
