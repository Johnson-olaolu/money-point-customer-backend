import { User } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CustomerSupportLevel } from "./customer-support-level.entity";
import { CustomerSupport } from "./customer-support.entity";

@EntityRepository(CustomerSupport)
export class CustomerSupportRepository extends Repository<CustomerSupport> {
    async createCustomerSupport (customerSupportDetails : { user : User , level : CustomerSupportLevel}) : Promise<CustomerSupport> {
        const { user , level} = customerSupportDetails
        const newCustomerSupport = new CustomerSupport
        newCustomerSupport.user = user
        newCustomerSupport.level = level

        newCustomerSupport.save()

        return newCustomerSupport;
    }
}