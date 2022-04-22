import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerSupportLevelRepository } from "src/customer-support/customer-support-level.repository";
import { CategoryRepository } from "./category.repository";
import { CreateFaqDto } from "./dto/createFaqDto";
import { UpdateFaqDto } from "./dto/updateFaqDto";
import { Faq } from "./faq.entity";
import { FaqRepository } from "./faq.repository";

@Injectable() 
export class FaqService {
    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository,
        @InjectRepository(FaqRepository) private faqRepository: FaqRepository,
        @InjectRepository(CustomerSupportLevelRepository)
        private customerSupportLevelRepository: CustomerSupportLevelRepository,
    ) {}

    async addNewFaq(
        createFaqDto: CreateFaqDto,
    ): Promise<{ success: true; data: Faq }> {
        const { title, solution, categoryIds } = createFaqDto;

        const categoriesArray = [];
        for (const cId of categoryIds) {
            const category = await this.categoryRepository.findOne(cId);
            categoriesArray.push(category);
        }

        const faqDetails = {
            title,
            solution,
            categories: categoriesArray,
        };

        const newFaq = await this.faqRepository.createNewFaq(faqDetails);
        return {
            success: true,
            data: newFaq,
        };
    }

    async getAllFaq(): Promise<{ success: Boolean; data: Faq[] }> {
        const faqs = await this.faqRepository.find();
        return {
            success: true,
            data: faqs,
        };
    }

    async getSingleFaq(faqId): Promise<{ success: Boolean; data: Faq }> {
        const faq = await this.faqRepository.findOne();

        if (!faq) {
            throw new NotFoundException('Could not find faq with this Id');
        }
        return {
            success: true,
            data: faq,
        };
    }

    async updateFaq(faqId, updateFaqDto: UpdateFaqDto) : Promise<{success : Boolean, message: string, data : Faq}> {
        const faqToUpdate = await this.faqRepository.findOne(faqId);

        const { title, solution, categoryIds } = updateFaqDto;

        if (!faqToUpdate) {
            throw new NotFoundException('Could not find faq with this Id');
        }
        if (title) {
            faqToUpdate.title = title;
        }
        if (solution) {
            faqToUpdate.solution = solution;
        }
        if (categoryIds) {
            const categoriesArray = [];
            for (const cId of categoryIds) {
                const category = await this.categoryRepository.findOne(cId);
                categoriesArray.push(category);
            }
            faqToUpdate.categories = categoriesArray
        }

        await faqToUpdate.save()

        return {
            success : true, 
            message :"faq updated successfullly",
            data : faqToUpdate
        }
    }

    async deleteFaq(faqId) {
        const faqToDelete = await this.faqRepository.findOne(faqId)
        if (!faqToDelete) {
            throw new NotFoundException('Could not find faq with this Id');
        }
        await this.faqRepository.delete(faqId)

        return {
            success : true,
            message : "faq deleted successfully"
        }
    }
}