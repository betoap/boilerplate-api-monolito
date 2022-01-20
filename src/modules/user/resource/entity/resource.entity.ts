import {
    Table,
    Column,
    AllowNull,
    DataType,
    HasMany
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';

import * as PrivilegeEntity from './../../privilege/entity/privilege.entity';

@Table({
    tableName: 'resources'
})
export default class ResourceEntity extends Entity<ResourceEntity> {

    @AllowNull( false )
    @Column( DataType.STRING )
    name: string;

    @AllowNull( false )
    @Column( DataType.STRING )
    description: string;

    @HasMany( () => PrivilegeEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    privilege: PrivilegeEntity.default;
}
