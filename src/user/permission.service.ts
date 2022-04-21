import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./permission.entity";
import { PermissionRepository } from "./permission.repository";

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(PermissionRepository) private permissionRepository : PermissionRepository){}

    async createPermisssion (permissionDetails) : Promise<Permission>  {
        const newPermission = await this.permissionRepository.createPermission(permissionDetails)
        return newPermission
    }

    async getAllPermisssions () : Promise<Permission[]> {
        const permissions = await this.permissionRepository.find()
        return permissions
    }
}