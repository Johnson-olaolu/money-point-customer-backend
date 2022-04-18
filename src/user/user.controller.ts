import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private userService : UserService) {}

    @Get()
    async getAllUsers () {
        return await this.userService.getAllUsers()
    }
}
