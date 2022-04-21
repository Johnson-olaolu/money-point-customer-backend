import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RoleService } from '../role.service';
import { roles } from 'src/utils/roles';


@Injectable()
export class RoleSeed {
constructor(
    private readonly roleService: RoleService,
) { }

@Command({ command: 'create:roles', describe: 'create roles' })
async createRoles() {
    const existingRoles = await this.roleService.getAllRoles()
    for(const  role of roles) {
        const existingRole = existingRoles.some(r => r.name == role.name)
        if(!existingRole){
            const newRole = await this.roleService.createNewRole(role) 
            console.log(newRole)
        }
    }
    
}

@Command({ command: 'update:roles-permissions', describe: 'add and update permissions for roles' })
    async updateRolePermissions () {
        for (const role of roles) {
            const updatedRole = await this.roleService.updateRole(role)
            console.log(updatedRole)
        }
    }

}