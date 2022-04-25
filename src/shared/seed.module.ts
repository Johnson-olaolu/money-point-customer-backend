import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { PermissionRepository } from 'src/user/permission.repository';
import { RoleRepository } from 'src/user/role.respository';
import { PermissionSeed } from 'src/user/seeds/permission.seed';
import { RoleSeed } from 'src/user/seeds/role.seed';
import { UserSeed } from 'src/user/seeds/user.seed';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';

@Module({
    imports: [
        CommandModule,
        UserModule,
        TypeOrmModule.forFeature([RoleRepository, PermissionRepository, UserRepository]),
    ],
    providers: [RoleSeed, PermissionSeed, UserSeed],
    exports: [RoleSeed, PermissionSeed, UserSeed],
})
export class SeedModule {}
