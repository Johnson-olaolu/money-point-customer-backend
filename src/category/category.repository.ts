import { CustomerSupportLevel } from 'src/customer-support/customer-support-level.entity';
import { json } from 'stream/consumers';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async createCategory(categoryDetails: {
        title: string;
        description: string;
        customerSupportLevel: CustomerSupportLevel[];
        subCategories: string[];
    })  : Promise<Category> {
        const newCategory = new Category();
        newCategory.title = categoryDetails.title;
        newCategory.description = categoryDetails.description;
        newCategory.customerSupportLevels = categoryDetails.customerSupportLevel;
        const categoriesString = JSON.stringify(categoryDetails.subCategories)
        newCategory.subCategories = categoriesString;

        await newCategory.save();
        return newCategory;
    }
}
