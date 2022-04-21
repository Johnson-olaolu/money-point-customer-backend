import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { PermissionRepository } from 'src/user/permission.repository';
import { RoleRepository } from 'src/user/role.respository';
import { RoleService } from 'src/user/role.service';
import { PermissionSeed } from 'src/user/seeds/permission.seed';
import { RoleSeed } from 'src/user/seeds/role.seed';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        CommandModule,
        UserModule,
        TypeOrmModule.forFeature([RoleRepository, PermissionRepository]),
    ],
    providers: [RoleSeed, PermissionSeed],
    exports: [RoleSeed, PermissionSeed],
})
export class SeedModule {}
