import {
    Table,
    Column,
    AllowNull,
    DataType,
    HasMany,
    BelongsToMany,
    ForeignKey
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';

import * as UserEntity from './../../../user/entity/user.entity';
import * as PrivilegeEntity from './../../privilege/entity/privilege.entity';
import * as RolePrivilegeEntity from './../../role_privilege/entity/role_privilege.entity';

@Table({
    tableName: 'roles'
})
export default class RoleEntity extends Entity<RoleEntity> {

    @AllowNull( false )
    @Column( DataType.STRING )
    name: string;

    @HasMany( () => UserEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    user: UserEntity.default;

    @BelongsToMany(() => PrivilegeEntity.default, () => RolePrivilegeEntity.default )
    privilege: Array<PrivilegeEntity.default>;

    public static getRelations() {
      return [
          { model: PrivilegeEntity.default, required: false, through: 'roles_privileges' },
          { model: UserEntity.default, required: false },
      ];
    }
}
