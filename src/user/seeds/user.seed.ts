import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Command } from "nestjs-command";
import { RoleRepository } from "../role.respository";
import { UserRepository } from "../user.repository";

@Injectable()
export class UserSeed{
    constructor(
        @InjectRepository(UserRepository) private userRepository : UserRepository,
        @InjectRepository(RoleRepository) private roleRepository : RoleRepository
        ) { }

    @Command({command : "create:superAdmin", describe : "create super admin for the website"})
    async seedSuperAdmin () {
        const superAdminRole = await this.roleRepository.findOne({name : "super-admin"})
        const superAdminDetails = {
            firstName : "super",
            lastName : "admin",
            email : "johnsonolaolu@gmail.com",
            password : "super-admin",
            role : superAdminRole,
        }
        
        const superAdmin = await this.userRepository.createNewUser(superAdminDetails)
        console.log(superAdmin)
    }
}