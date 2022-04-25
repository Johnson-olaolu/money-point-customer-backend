import { EntityRepository, Repository } from "typeorm";
import { Category } from "./category.entity";
import { Faq } from "./faq.entity";

@EntityRepository(Faq)
export class FaqRepository extends Repository<Faq> {
    async createNewFaq (faqDetails : {question : string, solution : string, category : Category, subCategory : string}) {
        const newFaq = new Faq
        newFaq.question = faqDetails.question
        newFaq.solution = faqDetails.solution
        newFaq.category = faqDetails.category
        newFaq.subCategory = faqDetails.subCategory
        await newFaq.save()
        return newFaq;
    }
}