import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { PostService } from '../service/post.service';
import { PostQuery } from './post.query';

import { UserService } from './../../../user/service/user.service';
import { CommentService } from './../../comment/service/comment.service';

export class PostResolve extends PostQuery {

    @query
    queries(): string {
        return `
            getPosts( where: postWhereInput, order: [[String!]!], first: Int, offset: Int ): posts
            getPost( id: ID! ): posts
        `;
    }

    @mutation
    mutation(): string {
        return `
            createPost( input: postCreateInput! ): mutationResponsePost
            updatePost( id: ID!, input: postUpdateInput! ): mutationResponsePost
            deletePost( id: ID! ): mutationResponsePost
        `;
    }

    @resolveQuery
    getPosts ( parent, params, context, info ) {
        const fields = super.getFields( info, ['user', 'comment'] );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order:  params.order || undefined
        };
        return new PostService().findAll( obj );
    }

    @resolveQuery
    getPost ( parent, params, context, info ) {
        const fields = super.getFields( info, ['user', 'comment'] );
        return new PostService().findOne( { fields } );
    }

    @resolveMutation
    createPost( parent, params, context, info ) {
        return new PostService().create(params.input);
    }

    @resolveMutation
    updatePost( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PostService().update(params.input, id);
    }

    @resolveMutation
    deletePost( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PostService().delete(id);
    }

    @resolveTrivial
    user( parent, params, context, info ) {
        const userId = ( parent.user ) ? parent.user.id : parent.user_id || 0;
        const fields = super.getFields( info, ['comment', 'post'] );
        const obj = super.resolvePamameters(fields, params, { id_eq: userId });
        return new UserService().findAll(obj);
    }

    @resolveTrivial
    comment( parent, params, context, info ) {
      const listId: Array<any> = parent.comment.map( ( comment ) => comment.id );
      const fields = super.getFields( info, ['user', 'post'] );
      const obj = super.resolvePamameters(fields, params, { id_in: listId });
      return new CommentService().findAll(obj);
    }
}
