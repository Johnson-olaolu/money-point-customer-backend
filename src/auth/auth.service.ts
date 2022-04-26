import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/loginUserDto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async loginUser(
        loginUserDto: LoginUserDto,
    ): Promise<{ accessToken: string; data: User }> {
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
            return {
                accessToken: accessToken,
                data: user,
            };
        } else {
            throw new UnauthorizedException('Invalid password for user');
        }
    }
}
