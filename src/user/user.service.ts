import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.respository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor (
         @InjectRepository(UserRepository) private userRepository : UserRepository,
         @InjectRepository(RoleRepository) private roleRepository : RoleRepository
         ) {}

    async getAllUsers () : Promise<User[]> {
        const users =  await this.userRepository.find()
        return users
    }

    async createNewUser ( createUserDetails : { firstName : string, lastName : string, email : string, password: string, role : string})  {
        const { firstName, lastName, email,  password, role} = createUserDetails

        const selectedRole = await this.roleRepository.findOne({ name : role})
        const newUserDetails  = {
            firstName,
            lastName,
            email,
            password,
            role : selectedRole
        }
        const newUser = this.userRepository.createNewUser(newUserDetails)
        return newUser;
    }

    async getUser ( email :string ) : Promise<User> {
        const user = await this.userRepository.findOne({email : email})
        return user
    }
}
