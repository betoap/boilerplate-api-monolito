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

import { Entity } from './../../../../core/entity';


@Table({
    tableName: 'pagseguros'
})
export default class PagseguroEntity extends Entity<PagseguroEntity> {
    
    @AllowNull( false )
    @Column( DataType.STRING )
    status: string;
            
    @AllowNull( true )
    @Column( DataType.TEXT )
    description: string;
            
}
