import {
  Table,
  Column,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';

import * as ProductEntity from './../../product/entity/product.entity';
import * as UserEntity from './../../../user/entity/user.entity';

@Table({
    tableName: 'reviews'
})
export default class ReviewEntity extends Entity<ReviewEntity> {

    @AllowNull( false )
    @ForeignKey( () => ProductEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    product_id: number;

    @BelongsTo( () => ProductEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    product: ProductEntity.default;


    @AllowNull( false )
    @ForeignKey( () => UserEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    user_id: number;

    @BelongsTo(() => UserEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    user: UserEntity.default ;

    @AllowNull( true )
    @Column( DataType.TEXT )
    text: string;

    @AllowNull( false )
    @Column( DataType.INTEGER )
    note: number;

    public static getRelations() {
        return [
            { model: ProductEntity.default, required: false },
        ];
    }

}
