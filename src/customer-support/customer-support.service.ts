import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerSupportLevel } from './customer-support-level.entity';
import { UserRepository } from '../user/user.repository';
import { CustomerSupportLevelRepository } from './customer-support-level.repository';
import { CreateCustomerSupportDto } from './dto/createCustomerSupportDto';
import { CustomerSupport } from './customer-support.entity';
import { CustomerSupportRepository } from './customer-support.repository';
import { UserService } from 'src/user/user.service';
import { UpdateCustomerSupportDto } from './dto/updateCustomerSupportDto';

@Injectable()
export class CustomerSupportService {
    constructor(
        @InjectRepository(CustomerSupportLevelRepository)
        private customerSupportLevelRepository: CustomerSupportLevelRepository,
        @InjectRepository(CustomerSupportRepository)
        private customerSupportRepository: CustomerSupportRepository,
        private userService: UserService,
    ) {}

    async createCustomerSupport(
        createCustomerSupportDto: CreateCustomerSupportDto,
    ): Promise<CustomerSupport> {
        const { firstName, lastName, email, levelId, password } =
            createCustomerSupportDto;

        try {
            const newUserDetails = {
                firstName,
                lastName,
                email,
                password,
                role: 'customer-service',
            };
            const customerSupportLevel =
                await this.customerSupportLevelRepository.findOne(levelId);

            if (!customerSupportLevel) {
                throw new NotFoundException(
                    `Customer Support Level not found for id ${levelId}`,
                );
            }

            const newUser = await this.userService.createNewUser(
                newUserDetails,
            );
          
            const newCustomerSupportDetails = {
                level: customerSupportLevel,
                user: newUser,
            };

            const newCustomerSupport =
                await this.customerSupportRepository.createCustomerSupport(
                    newCustomerSupportDetails,
                );

            return newCustomerSupport;
        } catch (error) {
            throw new BadRequestException(error.detail);
        }
    }

    async getAllCustomerSupport(): Promise<CustomerSupport[]> {
        const customerSupports = await this.customerSupportRepository.find();
        return customerSupports;
    }

    async getSingleCustomerSupport(customerSupportId : number ): Promise<CustomerSupport> {
        const customerSupport = await this.customerSupportRepository.findOne(customerSupportId)
        if(!customerSupport) {
            throw new NotFoundException(`Cannot find customer support for id ${customerSupportId}`)
        }
        return customerSupport
    }

    async deleteCustomerSupport(customerSupportId : number ) : Promise<string> {
        const customerSupport = await this.customerSupportRepository.findOne(customerSupportId)

        if(!customerSupport) {
            throw new NotFoundException(`Cannot find customer support for id ${customerSupportId}`)
        }
        await this.customerSupportRepository.delete(customerSupportId)
        return `Customer Support ${customerSupportId} deleted succesfully`
    }

    async updateCustomerSupport (customerSupportId : number, updateCustomerSupportDto : UpdateCustomerSupportDto) : Promise <CustomerSupport> {
        const { customerSupportLevelId} = updateCustomerSupportDto
        const customerSupport = await this.customerSupportRepository.findOne(customerSupportId)

        if(!customerSupportId) {
            throw new NotFoundException(`Cannot find customer support for id ${customerSupportId}`)
        }

        const customerSupportLevel = await this.customerSupportLevelRepository.findOne( customerSupportLevelId)
        if(!customerSupportLevel) {
            throw new NotFoundException(`Cannot find customer support Level for id ${customerSupportLevelId}`)
        }

        customerSupport.level = customerSupportLevel
        await customerSupport.save()

        return customerSupport
    }
}
