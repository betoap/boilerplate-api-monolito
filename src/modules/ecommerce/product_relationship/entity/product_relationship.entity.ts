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

@Table({
    tableName: 'products_relationships'
})
export default class ProductRelationshipEntity extends Model<ProductRelationshipEntity> {

    @AllowNull( false )
    @ForeignKey( () => ProductEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    product_id: number;

    @AllowNull( false )
    @ForeignKey( () => ProductEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    relationship_id: number;

}
