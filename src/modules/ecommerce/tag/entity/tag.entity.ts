import {
    Table,
    Column,
    AllowNull,
    DataType,
    BelongsToMany
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';
import * as ProductEntity from '../../product/entity/product.entity';
import * as ProductTagEntity from '../../product_tag/entity/product_tag.entity';


@Table({
    tableName: 'tags'
})
export default class TagEntity extends Entity<TagEntity> {

    @AllowNull( false )
    @Column( { type: DataType.STRING, unique: true } )
    name: string;

    @AllowNull( true )
    @Column( DataType.TEXT )
    description: string;

    @BelongsToMany( () => ProductEntity.default, () => ProductTagEntity.default )
    product: Array<ProductEntity.default>;

    public static getRelations() {
        return [
            { model: ProductEntity.default, through: {} },
        ];
    }

}
