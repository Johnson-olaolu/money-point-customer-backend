import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
// import { Strategy } from "passport-local";
import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";

interface JwtPayload {
    sub: number,
    username : string
}

@Injectable()
export class JWTStrategy extends PassportStrategy( Strategy ) {
    constructor (
        @InjectRepository(UserRepository) private userRepository : UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })

    }

    async validate ( payload : JwtPayload) : Promise <User> {
        const { sub, username } = payload
        const user = await this.userRepository.findOne(sub)
        return user
    }
}