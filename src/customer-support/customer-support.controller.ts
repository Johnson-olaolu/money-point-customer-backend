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
import { CustomerSupportLevelService } from './customer-support-level.service';
import { CustomerSupportService } from './customer-support.service';
import { CreateCustomerSupportDto } from './dto/createCustomerSupportDto';
import { CreateCustomerSupportLevelDto } from './dto/createCustomerSupportLevelDto';
import { UpdateCustomerSupportLevelDto } from './dto/updateCustomerSupportLevelDto';

@Controller('customer-support')
export class CustomerSupportController {
    constructor(
        private customerSupportService: CustomerSupportService,
        private customerSupportLevelService : CustomerSupportLevelService
        ) {}

    @Get('/level')
    async getAllCustomerSupportLevels() {
        return await this.customerSupportLevelService.getAllCustomerSupportLevels();
    }

    @Post('/level')
    async createCustomerSupportLevel(
        @Body() createCustomerSupportLevel: CreateCustomerSupportLevelDto,
    ) {
        return await this.customerSupportLevelService.createCustomerSupportLevel(
            createCustomerSupportLevel,
        );
    }
    @Get('/level/:levelId')
    async getSingleCustomerSupportLevel(@Param("levelId", ParseIntPipe) levelId : number) {
        return await this.customerSupportLevelService.getSingleCustomerSupportLevel(levelId)
    }

    @Put('/level/:levelId')
    async updateCustomerSupportLevel(
        @Param('levelId', ParseIntPipe) levelId: number,
        @Body() updateCustomerSupportLevelDto: UpdateCustomerSupportLevelDto,
    ) {
        return await this.customerSupportLevelService.updateCustomerSupportLevel(levelId, updateCustomerSupportLevelDto)
    }

    @Delete('/level/:levelId')
    async deleteCustomerSupportLevel(@Param("levelId", ParseIntPipe) levelId : number) {
        return await this.customerSupportLevelService.deleteCustomerSupportLevel(levelId)
    }

    @Get()
    async getAllCustomerSupport() {
        return await this.customerSupportService.getAllCustomerSupport()
    }

    @Post()
    async createCustomerSupport ( @Body() createCustomerSupportDto : CreateCustomerSupportDto) {
        return await this.customerSupportService.createCustomerSupport(createCustomerSupportDto)
    }
}
