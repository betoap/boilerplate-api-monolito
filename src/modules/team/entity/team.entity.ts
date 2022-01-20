import {
    Table,
    Column,
    AllowNull,
    DataType,
    ForeignKey,
    HasMany,
    BelongsTo,
    PrimaryKey
} from 'sequelize-typescript';

import { Entity } from './../../../core/entity';


@Table({
    tableName: 'teams'
})
export default class TeamEntity extends Entity<TeamEntity> {

    @AllowNull( false )
    @Column( DataType.STRING )
    name: string;

    @AllowNull( false )
    @Column( DataType.STRING )
    role: string;

    @AllowNull( true )
    @Column( DataType.TEXT )
    description: string;

    @AllowNull( true )
    @Column( DataType.STRING )
    photo: string;

    @AllowNull( true )
    @Column( DataType.STRING )
    facebook: string;

    @AllowNull( true )
    @Column( DataType.STRING )
    twitter: string;

    @AllowNull( true )
    @Column( DataType.STRING )
    linkedin: string;

}
