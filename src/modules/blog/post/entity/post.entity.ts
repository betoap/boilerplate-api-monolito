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

import * as UserEntity from './../../../user/entity/user.entity';
import * as CommentEntity from './../../comment/entity/comment.entity';

@Table({
    tableName: 'posts'
})
export default class PostEntity extends Entity<PostEntity> {

    @AllowNull( false )
    @ForeignKey( () => UserEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    user_id: number;

    @BelongsTo(() => UserEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    user: UserEntity.default ;

    @AllowNull( false )
    @Column( { type: DataType.STRING, unique: true } )
    title: string;

    @AllowNull( false )
    @Column( DataType.STRING )
    call: string;

    @AllowNull( false )
    @Column( { type: DataType.STRING, unique: true } )
    image: string;

    @AllowNull( false )
    @Column( DataType.TEXT )
    integrate: string;

    @HasMany(() => CommentEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    comment: CommentEntity.default;

    public static getRelations() {
        return [
            { model: CommentEntity.default, required: false },
            { model: UserEntity.default, required: true },
        ];
    }

}
