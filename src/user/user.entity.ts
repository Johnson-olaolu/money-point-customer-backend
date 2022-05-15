import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column( {
        nullable : false
    })
    firstName: string

    @Column( {
        nullable : false
    })
    lastName : string

    @Column({
        unique : true,
        nullable : false
    }) 
    email : string;

    @ManyToOne( () => Role , {
        nullable : false,
        eager : true
    })
    role : Role

    @Column( {
        nullable : false
    })
    password : string

    async comparePasswords(
        userPassword: string,
        password: string,
    ): Promise<Boolean> {
        const result = await bcrypt.compareSync(userPassword, password);
        return result;
    }
}