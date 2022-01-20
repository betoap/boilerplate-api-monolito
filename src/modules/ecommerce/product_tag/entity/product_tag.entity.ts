import {
    Model,
    Table,
    Column,
    AllowNull,
    DataType,
    ForeignKey,
    PrimaryKey
} from 'sequelize-typescript';

import * as ProductEntity from './../../product/entity/product.entity';
import * as TagEntity from './../../tag/entity/tag.entity';

@Table({
    tableName: 'products_tags'
})
export default class ProductTagEntity extends Model<ProductTagEntity> {

    @AllowNull( false )
    @ForeignKey( () => ProductEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    product_id: number;

    @AllowNull( false )
    @ForeignKey( () => TagEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    tag_id: number;

}
