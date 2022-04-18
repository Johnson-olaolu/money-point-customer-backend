import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createNewUser(createNewUserDetails: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<User> {
        const newUser = new User();
        const { firstName, lastName , email, password } = createNewUserDetails
        newUser.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        newUser.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        newUser.email = email
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password, salt);
        newUser.password = pass;

        await newUser.save();
        return newUser;
    }

    async comparePasswords(
        userPassword: string,
        password: string,
    ): Promise<Boolean> {
        const result = await bcrypt.compareSync(userPassword, password);
        return result;
    }
}