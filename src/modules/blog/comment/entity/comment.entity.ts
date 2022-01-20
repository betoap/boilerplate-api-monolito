import {
    Table,
    Column,
    AllowNull,
    DataType,
    ForeignKey,
    PrimaryKey,
    BelongsTo
} from 'sequelize-typescript';

import { Entity } from './../../../../core/entity';

import * as UserEntity from './../../../user/entity/user.entity';
import * as PostEntity from './../../post/entity/post.entity';

@Table({
    tableName: 'comments'
})
export default class CommentEntity extends Entity<CommentEntity> {

    @AllowNull( false )
    @ForeignKey( () => UserEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    user_id: number;

    @BelongsTo( () => UserEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    user: UserEntity.default;

    @AllowNull( false )
    @ForeignKey( () => PostEntity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )
    post_id: number;

    @BelongsTo( () => PostEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE'} )
    post: PostEntity.default;

    @AllowNull( false )
    @Column( DataType.TEXT )
    content: string;

    public static getRelations() {
      return [
        { model: PostEntity.default, required: true },
        { model: UserEntity.default, required: true },
      ];
    }

}
