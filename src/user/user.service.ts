import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor ( @InjectRepository(UserRepository) private userRepository : UserRepository) {}

    async getAllUsers () : Promise<{success : Boolean, data : User[]}> {
        const users =  await this.userRepository.find()
        return {
            success : true ,
            data : users
        }
    }
}
