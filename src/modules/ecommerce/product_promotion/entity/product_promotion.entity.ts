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
import * as PromotionEntity from './../../promotion/entity/promotion.entity';

@Table({
    tableName: 'products_promotions'
})
export default class ProductPromotionEntity extends Model<ProductPromotionEntity> {

    @AllowNull( false )
    @ForeignKey( () => ProductEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    product_id: number;

    @AllowNull( false )
    @ForeignKey( () => PromotionEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    promotion_id: number;

}
