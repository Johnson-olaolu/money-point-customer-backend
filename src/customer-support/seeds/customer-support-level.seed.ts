import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CustomerSupportLevelService } from '../customer-support-level.service';

@Injectable()
export class CustomerSupportSeed {
    constructor (
        private customerSupportLevelService : CustomerSupportLevelService
    ) {}

    @Command({
        command: 'create:general-support',
        describe: 'create general support level',
    })
    async seedGerneralCustomerSupport() {
        const newCustomerSupportLevelDetails = {
            name: "General Support",
            description: "general support levels",
        };
        const response = await this.customerSupportLevelService.createCustomerSupportLevel(newCustomerSupportLevelDetails)
        console.log(response)
    }
}

