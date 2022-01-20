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
import * as PhotoEntity from '../../photo/entity/photo.entity';
import * as ProductEntity from '../../product/entity/product.entity';

@Table({
    tableName: 'galleries'
})
export default class GalleryEntity extends Entity<GalleryEntity> {

    @AllowNull( false )
    @ForeignKey( () => ProductEntity.default )
    @PrimaryKey
    @Column( { type: DataType.BIGINT, unique: true } )
    product_id: number;

    @BelongsTo( () => ProductEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    product: ProductEntity.default;

    @AllowNull( false )
    @Column( DataType.STRING )
    name: string;

    @AllowNull( true )
    @Column( DataType.TEXT )
    description: string;

    @HasMany( () => PhotoEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    photo: PhotoEntity.default;

    public static getRelations() {
      return [
        { model: ProductEntity.default, required: false },
        { model: PhotoEntity.default, required: false },
      ];
    }

}
