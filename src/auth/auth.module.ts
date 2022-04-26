import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as dotenv from "dotenv"
import { JWTStrategy } from './jwt.strategy';
dotenv.config()

@Module({
  imports : [
    UserModule,
    PassportModule.register({defaultStrategy : "jwt"}),
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : {
        expiresIn: 360000
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
