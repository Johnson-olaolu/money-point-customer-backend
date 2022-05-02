import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerSupportLevel } from "./customer-support-level.entity";
import { CustomerSupportLevelRepository } from "./customer-support-level.repository";
import { CreateCustomerSupportLevelDto } from "./dto/createCustomerSupportLevelDto";
import { UpdateCustomerSupportLevelDto } from "./dto/updateCustomerSupportLevelDto";

@Injectable()
export class CustomerSupportLevelService {
    constructor (
        @InjectRepository(CustomerSupportLevelRepository)
        private customerSupportLevelRepository: CustomerSupportLevelRepository,
        // @InjectRepository(CustomerSupportRepository)
        // private customerSupportRepository : CustomerSupportRepository,
        // private userService : UserService
    ) {}


    async getAllCustomerSupportLevels(): Promise<CustomerSupportLevel[]> {
        const levels = await this.customerSupportLevelRepository.find();
        return levels
    }

    async getSingleCustomerSupportLevel(levelId : number): Promise<CustomerSupportLevel> {
        const level = await this.customerSupportLevelRepository.findOne(levelId);
        return level
    }

    async createCustomerSupportLevel(
        createCustomerSupportLevelDto: CreateCustomerSupportLevelDto,
    ): Promise< CustomerSupportLevel> {
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
            return newCustomerSupportLevel
        } catch (error) {
            //console.log(error)
            throw new BadRequestException(error.detail)
        }
        
    }

    async getCustomerSupportLevel(levelId : number) : Promise<CustomerSupportLevel> {
        const customerSupportLevel = await this.customerSupportLevelRepository.findOne(levelId)
        return customerSupportLevel;
    }
    async updateCustomerSupportLevel(
        levelId: number,
        updateCustomerSupportLevelDto: UpdateCustomerSupportLevelDto,
    ) : Promise<CustomerSupportLevel> {
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

        return customerSupportLeveltoUpdate
    }

    async deleteCustomerSupportLevel(
        levelId: number,
    ): Promise< string> {
        const customerSupportLeveltoDelete =
            await this.customerSupportLevelRepository.findOne(levelId);

        if (!customerSupportLeveltoDelete) {
            throw new NotFoundException(`Ticket with id ${levelId} not found`);
        }

        await this.customerSupportLevelRepository.delete(levelId);

        return`Customer support level ${customerSupportLeveltoDelete.id}: ${customerSupportLeveltoDelete.name} deleted`
    }


}