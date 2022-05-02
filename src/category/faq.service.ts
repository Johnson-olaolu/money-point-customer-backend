import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
    ) {}

    async addNewFaq(
        createFaqDto: CreateFaqDto,
    ): Promise< Faq > {
        const { question, solution, categoryId, subCategory} = createFaqDto;

        const category = await this.categoryRepository.findOne(categoryId);
        if(!category) {
            throw new NotFoundException(`Cannot find category with id ${categoryId}`)
        }
        const subCategories : string[] = JSON.parse(category.subCategories) 

        category.subCategories = JSON.parse(category.subCategories) 
        if(subCategories.includes(subCategory) == false){
            throw new NotFoundException(`Cannot find sub-category ${subCategory}`)
        }

        const faqDetails = {
            question,
            solution,
            category,
            subCategory
        };

        const newFaq = await this.faqRepository.createNewFaq(faqDetails);
        return newFaq
    }

    async getAllFaq(): Promise< Faq[] > {
        const faqs = await this.faqRepository.find();
        return faqs
    }

    async getSingleFaq(faqId): Promise<Faq > {
        const faq = await this.faqRepository.findOne(faqId);

        if (!faq) {
            throw new NotFoundException(`Could not find faq with this id: ${faqId}`);
        }
        return  faq
    }

    async updateFaq(faqId, updateFaqDto: UpdateFaqDto) : Promise<Faq> {
        const faqToUpdate = await this.faqRepository.findOne(faqId);

        const { question, solution, categoryId, subCategory} = updateFaqDto;

        if (!faqToUpdate) {
            throw new NotFoundException(`Could not find faq with this id: ${faqId}`);
        }
        if (question) {
            faqToUpdate.question = question;
        }
        if (solution) {
            faqToUpdate.solution = solution;
        }
        if (categoryId) {
            const category = await this.categoryRepository.findOne(categoryId);
            faqToUpdate.category =category
        }

        if(subCategory) {
            faqToUpdate.subCategory = subCategory
        }

        await faqToUpdate.save()

        return faqToUpdate
    }

    async deleteFaq(faqId) : Promise<string>{
        const faqToDelete = await this.faqRepository.findOne(faqId)
        if (!faqToDelete) {
            throw new NotFoundException(`Could not find faq with this id: ${faqId}`);
        }
        await this.faqRepository.delete(faqId)

        return `Faq ${faqToDelete.id}: ${faqToDelete.question} deleted successfully`

    }
}