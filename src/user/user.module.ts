import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RoleRepository } from './role.respository';
import { RoleService } from './role.service';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';

@Module({
  imports : [TypeOrmModule.forFeature([UserRepository, RoleRepository, PermissionRepository])],
  providers: [UserService, RoleService, PermissionService],
  controllers: [UserController],
  exports : [UserService, RoleService, PermissionService]
})
export class UserModule {}
