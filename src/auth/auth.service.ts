import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerSupport } from 'src/customer-support/customer-support.entity';
import { CustomerSupportRepository } from 'src/customer-support/customer-support.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/loginUserDto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        @InjectRepository(CustomerSupportRepository) private customerSupportRepository : CustomerSupportRepository,
        private jwtService: JwtService,
    ) {}

    async loginUser(
        loginUserDto: LoginUserDto,
    ): Promise<{ accessToken: string,  user: User, customerSupport? : CustomerSupport }> {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ email: email });
        if (!user) {
            throw new NotFoundException(`No user with email ${email}`);
        }
        if (
            await this.userRepository.comparePasswords(user.password, password)
        ) {
            const payload = { username: user.email, sub: user.id };
            const accessToken = this.jwtService.sign(payload);
            if (user.role.name == "customer-service") {
                const customerSupport = await this.customerSupportRepository.findOne({ user : user})
                return {
                    accessToken: accessToken,
                    user: user,
                    customerSupport : customerSupport
                };
            }
            return {
                accessToken: accessToken,
                user: user,
            };
        } else {
            throw new UnauthorizedException('Invalid password for user');
        }
    }

    async loginCustomerSupport ( loginUserDto : LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ email: email });
        if (!user) {
            throw new NotFoundException(`No user with email ${email}`);
        }
        if (
            await this.userRepository.comparePasswords(user.password, password)
        ) {
            const payload = { username: user.email, sub: user.id };
            const accessToken = this.jwtService.sign(payload);
            const customerSupport = await this.customerSupportRepository.findOne({ user : user})
            return {
                accessToken: accessToken,
                data: customerSupport,
            };
        } else {
            throw new UnauthorizedException('Invalid password for user');
        }
    }
}
