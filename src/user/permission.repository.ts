import { EntityRepository, Repository } from "typeorm";
import { Permission } from "./permission.entity";

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
   async createPermission (permissionDetails : {name : string, description: string}) {
        const newPermission = new Permission
        newPermission.name = permissionDetails.name
        newPermission.description = permissionDetails.description

        await newPermission.save()
        return newPermission;
   }
}