import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { boolean } from 'joi';
import { CustomerSupportLevelRepository } from 'src/customer-support/customer-support-level.repository';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { CreateFaqDto } from './dto/createFaqDto';
import { UpdateCategoryDto } from './dto/updateCategoryDto';
import { UpdateFaqDto } from './dto/updateFaqDto';
import { Faq } from './faq.entity';
import { FaqRepository } from './faq.repository';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository,
        @InjectRepository(FaqRepository) private faqRepository: FaqRepository,
        @InjectRepository(CustomerSupportLevelRepository)
        private customerSupportLevelRepository: CustomerSupportLevelRepository,
    ) {}

    async getAllCategories(): Promise<{ success: Boolean; data: Category[] }> {
        const categories = await this.categoryRepository.find();
        for(const category of categories) {
            category.subCategories = JSON.parse(category.subCategories)
        }
        return {
            success: true,
            data: categories,
        };
    }

    async addNewCategory(
        createCategoryDto: CreateCategoryDto,
    ): Promise<{ success: Boolean; data: Category }> {
        const { title , description, subCategories, customerSupportLevels } =
            createCategoryDto;

        const customerSupportLevelArray = [];

        for (const level of customerSupportLevels) {
            const customerSupportLevel =
                await this.customerSupportLevelRepository.findOne(level);
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
        return {
            success: true,
            data: newCategory,
        };
    }

    async getSingleCategory(
        categoryId,
    ): Promise<{ success: Boolean; data: Category }> {
        const selectedCategory = await this.categoryRepository.findOne(
            categoryId,
        );

        if (!selectedCategory) {
            throw new NotFoundException('Could not find Category with this Id');
        }
        selectedCategory.subCategories  = JSON.parse(selectedCategory.subCategories)
        return {
            success: false,
            data: selectedCategory,
        };
    }

    async updateCategory(categoryId, updateCategoryDto: UpdateCategoryDto) {
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
                for (const levelId in customerSupportLevels) {
                    const customerSupportLevel =
                        await this.customerSupportLevelRepository.findOne(
                            levelId,
                        );
                    customerSupportLevelsArray.push(customerSupportLevel);
                }

                categoryToUpdate.customerSupportLevels =
                    customerSupportLevelsArray;
            }
            await categoryToUpdate.save();
            return {
                success: true,
                message: 'category updated successfully',
                data: categoryToUpdate,
            };
        } catch (error) {}
    }

    async deleteCategory(categoryId) {
        const categoryToDelete = await this.categoryRepository.findOne(
            categoryId,
        );

        if (!categoryToDelete) {
            throw new NotFoundException('Cannot find category with this Id');
        }

        await this.categoryRepository.delete(categoryId);

        return {
            success: true,
            message: 'category deleted successfully',
        };
    }

}
