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

import * as GalleryEntity from './../../gallery/entity/gallery.entity';

@Table({
    tableName: 'photos'
})
export default class PhotoEntity extends Entity<PhotoEntity> {

    @AllowNull( true )
    @ForeignKey( () => GalleryEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    gallery_id: number;

    @BelongsTo(() => GalleryEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    gallery: GalleryEntity.default;

    @AllowNull( false )
    @Column( DataType.STRING )
    photo: string;

    @AllowNull( true )
    @Column( DataType.BOOLEAN )
    cover_is: Boolean;

    public static getRelations() {
        return [
            { model: GalleryEntity.default, required: false },
        ];
    }
}
