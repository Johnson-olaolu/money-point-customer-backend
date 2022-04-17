import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerSupportLevel } from './customer-support-level.entity';
import { CustomerSupportLevelRepository } from './customer-support-level.repository';
import { CreateCustomerSupportLevelDto } from './dto/createCustomerSupportLevelDto';
import { UpdateCustomerSupportLevelDto } from './dto/updateCustomerSupportLevelDto';

@Injectable()
export class CustomerSupportService {
    constructor(
        @InjectRepository(CustomerSupportLevelRepository)
        private customerSupportLevelRepository: CustomerSupportLevelRepository,
    ) {}

    async getAllCustomerSupportLevels(): Promise<{
        success: Boolean;
        data: CustomerSupportLevel[];
        }> {
        const levels = await this.customerSupportLevelRepository.find();
        return {
            success: true,
            data: levels,
        };
    }

    async createCustomerSupportLevel(
        createCustomerSupportLevelDto: CreateCustomerSupportLevelDto,
    ): Promise<{
        success: Boolean;
        data: CustomerSupportLevel;
    }> {
        const { name, description } = createCustomerSupportLevelDto;
        const newCustomerSupportLevelDetails = {
            name: name,
            description: description,
        };
        try {
            const newCustomerSupportLevel =
            await this.customerSupportLevelRepository.createCustomerSupportLevel(
                newCustomerSupportLevelDetails,
            );
            return {
                success: true,
                data: newCustomerSupportLevel,
            };
        } catch (error) {
            //console.log(error)
            throw new BadRequestException(error.detail)
        }
        
    }

    async updateCustomerSupportLevel(
        levelId: number,
        updateCustomerSupportLevelDto: UpdateCustomerSupportLevelDto,
    ) {
        const customerSupportLeveltoUpdate =
            await this.customerSupportLevelRepository.findOne(levelId);
        const { name, description } = updateCustomerSupportLevelDto;
        if (!customerSupportLeveltoUpdate) {
            throw new NotFoundException(`Ticket with id ${levelId} not found`);
        }

        if (name) {
            customerSupportLeveltoUpdate.name = name;
        }

        if (description) {
            customerSupportLeveltoUpdate.description = description;
        }

        await customerSupportLeveltoUpdate.save();

        return {
            success: true,
            data: customerSupportLeveltoUpdate,
        };
    }

    async deleteCustomerSupportLevel(
        levelId: number,
    ): Promise<{ success: Boolean; message: string }> {
        const customerSupportLeveltoDelete =
            await this.customerSupportLevelRepository.findOne(levelId);

        if (!customerSupportLeveltoDelete) {
            throw new NotFoundException(`Ticket with id ${levelId} not found`);
        }

        await this.customerSupportLevelRepository.delete(levelId);

        return {
            success: true,
            message: `Customer support level ${customerSupportLeveltoDelete.name} deleted`,
        };
    }
}
