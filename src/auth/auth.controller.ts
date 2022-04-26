import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUserDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        const loginResponse = await this.authService.loginUser(loginUserDto);
        return loginResponse;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user')
    async getUser(@Request() req) {
        return req.user
    }
}
