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
import * as CategoryEntity from './../../category/entity/category.entity';

@Table({
    tableName: 'products_categories'
})
export default class ProductCategoryEntity extends Model<ProductCategoryEntity> {

    @AllowNull( false )
    @ForeignKey( () => ProductEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    product_id: number;

    @AllowNull( false )
    @ForeignKey( () => CategoryEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    category_id: number;

}
