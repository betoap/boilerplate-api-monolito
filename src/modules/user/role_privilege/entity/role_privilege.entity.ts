import {
    Model,
    Table,
    Column,
    AllowNull,
    DataType,
    ForeignKey,
    PrimaryKey
} from 'sequelize-typescript';

import * as RoleEntity from './../../role/entity/role.entity';
import * as PrivilegeEntity from './../../privilege/entity/privilege.entity';

@Table({
    tableName: 'roles_privileges'
})
export default class RolePrivilegeEntity extends Model<RolePrivilegeEntity> {

    @AllowNull( false )
    @ForeignKey( () => RoleEntity.default )
    @PrimaryKey
    @Column( DataType.NUMBER )
    role_id: number;

    @AllowNull( false )
    @ForeignKey( () => PrivilegeEntity.default )
    @PrimaryKey
    @Column( DataType.STRING )
    privilege_id: number;

}
