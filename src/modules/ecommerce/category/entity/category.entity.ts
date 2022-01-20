import {
    Table,
    Column,
    AllowNull,
    DataType,
    BelongsToMany
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';
import * as ProductEntity from '../../product/entity/product.entity';
import * as ProductCategoryEntity from '../../product_category/entity/product_category.entity';

@Table({
    tableName: 'categories'
})
export default class CategoryEntity extends Entity<CategoryEntity> {

    @AllowNull( false )
    @Column( { type: DataType.STRING, unique: true } )
    name: string;

    @AllowNull( true )
    @Column( DataType.TEXT )
    description: string;

    @BelongsToMany(() => ProductEntity.default, () => ProductCategoryEntity.default )
    product: Array<ProductEntity.default>;

    public static getRelations() {
        return [
            { model: ProductEntity.default, through: {}, required: false },
        ];
    }

}
