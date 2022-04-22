import { EntityRepository, Repository } from "typeorm";
import { Category } from "./category.entity";
import { Faq } from "./faq.entity";

@EntityRepository(Faq)
export class FaqRepository extends Repository<Faq> {
    async createNewFaq (faqDetails : {title : string, solution : string, categories : Category[]}) {
        const newFaq = new Faq
        newFaq.title = faqDetails.title
        newFaq.solution = faqDetails.solution
        newFaq.categories = faqDetails.categories

        await newFaq.save()
        return newFaq;
    }
}