import {
  Table,
  Column,
  AllowNull,
  DataType,
  BelongsToMany
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';
import * as ProductEntity from '../../product/entity/product.entity';
import * as ProductPromotionEntity from './../../product_promotion/entity/product_promotion.entity';


@Table({
    tableName: 'promotions'
})
export default class PromotionEntity extends Entity<PromotionEntity> {

    @AllowNull( false )
    @Column( DataType.STRING )
    name: string;

    @AllowNull( true )
    @Column( DataType.INTEGER )
    percentage: number;

    @BelongsToMany( () => ProductEntity.default, () => ProductPromotionEntity.default )
    product: Array<ProductEntity.default>;

    public static getRelations() {
        return [
            { model: ProductEntity.default, through: {} },
        ];
    }

}
