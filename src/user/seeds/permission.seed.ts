import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PermissionService } from '../permission.service';
import { permissions } from 'src/utils/permissions';


@Injectable()
export class PermissionSeed {
constructor(
    private readonly permissionService: PermissionService,
) { }

@Command({ command: 'create:permissions', describe: 'create permissions' })
async seedPermissions() {
    const existingPermissions = await this.permissionService.getAllPermisssions()
    for(const  permission of permissions) {
        const existingPermission = existingPermissions.some(r => r.name == permission.name)
        if(!existingPermission){
            const newPermission = await this.permissionService.createPermisssion(permission) 
            console.log(newPermission)
        }
    }
    
}

}