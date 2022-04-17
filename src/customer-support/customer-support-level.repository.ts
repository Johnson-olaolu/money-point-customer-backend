import { EntityRepository, Repository } from 'typeorm';
import { CustomerSupportLevel } from './customer-support-level.entity';

@EntityRepository(CustomerSupportLevel)
export class CustomerSupportLevelRepository extends Repository<CustomerSupportLevel> {
    async createCustomerSupportLevel(customerSupportLevelDetails: {
        name: string;
        description: string;
    }) {
        const newCustomerSupportLevel = new CustomerSupportLevel();
        newCustomerSupportLevel.name = customerSupportLevelDetails.name;
        newCustomerSupportLevel.description =
            customerSupportLevelDetails.description;
        await newCustomerSupportLevel.save();
        return newCustomerSupportLevel;
    }
}
