import {
    Table,
    Column,
    AllowNull,
    DataType,
    ForeignKey,
    BelongsToMany,
    BelongsTo,
    PrimaryKey
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';

import * as RoleEntity from './../../role/entity/role.entity';
import * as RolePrivilegeEntity from './../../role_privilege/entity/role_privilege.entity';
import * as ResourceEntity from './../../resource/entity/resource.entity';

@Table({
    tableName: 'privileges'
})
export default class PrivilegeEntity extends Entity<PrivilegeEntity> {

    @AllowNull( false )
    @Column( DataType.STRING )
    name: string;

    @AllowNull( false )
    @Column( DataType.STRING )
    permission: string;

    @AllowNull( false )
    @ForeignKey( () => ResourceEntity.default )
    @PrimaryKey
    @Column( DataType.STRING )
    resource_id: string;

    @BelongsTo( () => ResourceEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    resource: ResourceEntity.default;

    @BelongsToMany(() => RoleEntity.default, () => RolePrivilegeEntity.default )
    role: Array<RoleEntity.default>;

    public static getRelations() {
      return [
          { model: RoleEntity.default, required: false, through: 'roles_privileges' },
      ];
    }
}
