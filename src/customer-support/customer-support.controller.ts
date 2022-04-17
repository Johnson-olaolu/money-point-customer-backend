import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CustomerSupportService } from './customer-support.service';
import { CreateCustomerSupportLevelDto } from './dto/createCustomerSupportLevelDto';

@Controller('customer-support')
export class CustomerSupportController {
    constructor( private customerSupportService : CustomerSupportService) {}

    @Get("/level") 
    async getAllCustomerSupportLevels () {
        return  await this.customerSupportService.getAllCustomerSupportLevels()
    }

    @Post("/level") 
    async createCustomerSupportLevel (@Body() createCustomerSupportLevel : CreateCustomerSupportLevelDto) {
        return await this.customerSupportService.createCustomerSupportLevel(createCustomerSupportLevel)
    }

    @Put("/level/:levelId")
    async updateCustomerSupportLevel () {
        return {}
    }

    @Delete("/level/:levelId")
    async deleteCustomerSupportLevel () {
        return {}
    }
}
