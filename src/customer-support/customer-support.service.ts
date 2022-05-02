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
}
