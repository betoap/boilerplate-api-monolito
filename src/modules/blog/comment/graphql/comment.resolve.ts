import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { CommentService } from '../service/comment.service';
import { CommentQuery } from './comment.query';

import { UserService } from './../../../user/service/user.service';
import { PostService } from './../../post/service/post.service';

export class CommentResolve extends CommentQuery {

    @query
    queries(): string {
        return `
            getComments( where: commentWhereInput, order: [[String!]!], first: Int, offset: Int ): comments
            getComment( id: ID! ): comments
        `;
    }

    @mutation
    mutation(): string {
        return `
            createComment( input: commentCreateInput! ): mutationResponseComment
            updateComment( id: ID!, input: commentUpdateInput! ): mutationResponseComment
            deleteComment( id: ID! ): mutationResponseComment
        `;
    }

    @resolveQuery
    getComments ( parent, params, context, info ) {
        const fields = super.getFields( info, ['user', 'post'] );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new CommentService().findAll( obj );
    }

    @resolveQuery
    getComment ( parent, params, context, info ) {
        const fields = super.getFields( info );
        return new CommentService().findOne( { fields } );
    }

    @resolveMutation
    createComment( parent, params, context, info ) {
        return new CommentService().create(params.input);
    }

    @resolveMutation
    updateComment( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new CommentService().update(params.input, id);
    }

    @resolveMutation
    deleteComment( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new CommentService().delete(id);
    }

    @resolveTrivial
    user( parent, params, context, info ) {
        const userId = ( parent.user ) ? parent.user.id : parent.user_id || 0;
        const fields = super.getFields( info );
        const obj = super.resolvePamameters(fields, params, {id_eq: userId});
        return new UserService().findAll(obj);
    }

    @resolveTrivial
    post( parent, params, context, info ) {
        const postId = ( parent.post ) ? parent.post.id : parent.post_id || 0;
        const fields = super.getFields( info );
        const obj = super.resolvePamameters(fields, params, { id_eq: postId });
        return new PostService().findAll(obj);
    }
}
