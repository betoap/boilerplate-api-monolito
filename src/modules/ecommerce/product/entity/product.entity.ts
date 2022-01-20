import {
  Table,
  Column,
  AllowNull,
  DataType,
  HasMany,
  HasOne,
  BelongsToMany
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';

import * as GalleryEntity from './../../gallery/entity/gallery.entity';
import * as TagEntity from '../../tag/entity/tag.entity';
import * as ReviewEntity from '../../review/entity/review.entity';
import * as ProductTagEntity from '../../product_tag/entity/product_tag.entity';
import * as CategoryEntity from '../../category/entity/category.entity';
import * as ProductCategoryEntity from '../../product_category/entity/product_category.entity';
import * as PromotionEntity from './../../promotion/entity/promotion.entity';
import * as ProductPromotionEntity from './../../product_promotion/entity/product_promotion.entity';
import * as ProductRelationshipEntity from '../../product_relationship/entity/product_relationship.entity';

@Table({
    tableName: 'products'
})
export default class ProductEntity extends Entity<ProductEntity> {

    @AllowNull( false )
    @Column( { type: DataType.STRING, unique: true } )
    name: string;

    @AllowNull( false )
    @Column( DataType.STRING )
    call: string;

    @AllowNull( false )
    @Column( DataType.TEXT )
    description: string;

    @AllowNull( false )
    @Column( DataType.FLOAT )
    price: number;

    @HasOne( () => GalleryEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
    gallery: GalleryEntity.default;

    @HasMany( () => ReviewEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE' } )
    review: ReviewEntity.default;

    @BelongsToMany( () => TagEntity.default, () => ProductTagEntity.default )
    tag: Array<TagEntity.default>;

    @BelongsToMany( () => CategoryEntity.default, () => ProductCategoryEntity.default )
    category: Array<CategoryEntity.default>;

    @BelongsToMany( () => PromotionEntity.default, () => ProductPromotionEntity.default )
    promotion: Array<PromotionEntity.default>;

    @BelongsToMany(  () => ProductEntity, () => ProductRelationshipEntity.default, 'relationship_id', 'product_id')
    relationship: Array<ProductEntity>;

    public static getRelations() {
        return [
            { model: GalleryEntity.default, required: false },
            { model: ReviewEntity.default, required: false },
            { model: TagEntity.default, through: {}, required: false },
            { model: CategoryEntity.default, through: {}, required: false },
            { model: PromotionEntity.default, through: {}, required: false },
            { model: ProductEntity, through: {}, required: false },
        ];
    }

}

