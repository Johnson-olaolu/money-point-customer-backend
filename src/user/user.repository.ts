import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { Role } from './role.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createNewUser(createNewUserDetails: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role : Role
    }): Promise<User> {
        const newUser = new User();
        const { firstName, lastName , email, password , role } = createNewUserDetails
        newUser.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        newUser.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        newUser.email = email
        const salt =  bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password);
        newUser.password = pass;
        newUser.role = role;
        await newUser.save();
        return newUser;
    }

    async comparePasswords(
        userPassword: string,
        password: string,
    ): Promise<Boolean> {
        const result = await bcrypt.compareSync(password, userPassword);
        return result;
    }
}
