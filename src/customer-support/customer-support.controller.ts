import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CustomerSupportLevelRepository } from './customer-support-level.repository';
import { CustomerSupportService } from './customer-support.service';
import { CreateCustomerSupportDto } from './dto/createCustomerSupportDto';
import { CreateCustomerSupportLevelDto } from './dto/createCustomerSupportLevelDto';
import { UpdateCustomerSupportLevelDto } from './dto/updateCustomerSupportLevelDto';

@Controller('customer-support')
export class CustomerSupportController {
    constructor(private customerSupportService: CustomerSupportService) {}

    @Get('/level')
    async getAllCustomerSupportLevels() {
        return await this.customerSupportService.getAllCustomerSupportLevels();
    }

    @Post('/level')
    async createCustomerSupportLevel(
        @Body() createCustomerSupportLevel: CreateCustomerSupportLevelDto,
    ) {
        return await this.customerSupportService.createCustomerSupportLevel(
            createCustomerSupportLevel,
        );
    }

    @Put('/level/:levelId')
    async updateCustomerSupportLevel(
        @Param('levelId', ParseIntPipe) levelId: number,
        @Body() updateCustomerSupportLevelDto: UpdateCustomerSupportLevelDto,
    ) {
        return await this.customerSupportService.updateCustomerSupportLevel(levelId, updateCustomerSupportLevelDto)
    }

    @Delete('/level/:levelId')
    async deleteCustomerSupportLevel(@Param("levelId", ParseIntPipe) levelId : number) {
        return await this.customerSupportService.deleteCustomerSupportLevel(levelId)
    }

    @Post()
    async createCustomerSupport ( @Body() createCustomerSupportDto : CreateCustomerSupportDto) {
        return await this.customerSupportService.createCustomerSupport(createCustomerSupportDto)
    }
}
