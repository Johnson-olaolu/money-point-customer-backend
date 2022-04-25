import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { permissions } from "src/utils/permissions";
import { PermissionRepository } from "./permission.repository";
import { RoleRepository } from "./role.respository";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository) private roleRepository : RoleRepository,
        @InjectRepository(PermissionRepository) private permissionRepository : PermissionRepository
    ){}

    async createNewRole (newRoleDetails : {name : string, description : string}) {
        const newRole = await this.roleRepository.createRole(newRoleDetails)
        return newRole
    }

    async getAllRoles () {
        const existingRoles = await this.roleRepository.find()
        return existingRoles;
    }

    async updateRole (roleDetails : {name : string, description : string, permissions? : string[]}) {
        const selectedRole = await this.roleRepository.findOne({name : roleDetails.name})
        const permissionsArray = []

        for(const p of roleDetails.permissions) {
            const  selectedPermission = await this.permissionRepository.findOne({name :p })
            permissionsArray.push(selectedPermission)
        }
        selectedRole.description = roleDetails.description
        selectedRole.permissions = permissionsArray

        selectedRole.save()

        return selectedRole;
    }
}