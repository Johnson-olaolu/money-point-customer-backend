import { EntityRepository, Repository } from 'typeorm';
import { Role } from './role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    async createRole(roleDetails: {
        name: string;
        description: string;
    }): Promise<Role> {
        const newRole = new Role();
        newRole.name = roleDetails.name;
        newRole.description = roleDetails.description;
        await newRole.save();
        return newRole;
    }
}
