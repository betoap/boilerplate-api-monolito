import {
  query,
  mutation,
  resolveQuery,
  resolveMutation,
  resolveTrivial
} from 'graphql-query-mutation/annotations';

import { ReviewService } from '../service/review.service';
import { ReviewQuery } from './review.query';

import { ProductService } from './../../product/service/product.service';
import { UserService } from './../../../user/service/user.service';

export class ReviewResolve extends ReviewQuery {

    @query
    queries(): string {
        return `
            getReviews( where: reviewWhereInput, order: [[String!]!], first: Int, offset: Int ): reviews
            getReview( id: ID! ): reviews
        `;
    }

    @mutation
    mutation(): string {
        return `
            createReview( input: reviewCreateInput! ): mutationResponseReview
            updateReview( id: ID!, input: reviewUpdateInput! ): mutationResponseReview
            deleteReview( id: ID! ): mutationResponseReview
        `;
    }

    @resolveQuery
    getReviews ( parent, params, context, info ) {
        const fields = super.getFields( info );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new ReviewService().findAll( obj );
    }

    @resolveQuery
    getReview ( parent, params, context, info ) {
        const fields = super.getFields( info );
        return new ReviewService().findOne( { fields } );
    }

    @resolveMutation
    createReview( parent, params, context, info ) {
        return new ReviewService().create(params.input);
    }

    @resolveMutation
    updateReview( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new ReviewService().update(params.input, id);
    }

    @resolveMutation
    deleteReview( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new ReviewService().delete(id);
    }

    @resolveTrivial
    user( parent, params, context, info ) {
      const userId = ( parent.user ) ? parent.user.id : parent.user_id || 0;
      const fields = super.getFields( info );
      const obj = super.resolvePamameters(fields, params, {id_eq: userId});
      return new UserService().findAll(obj);
    }

    @resolveTrivial
    product( parent, params, context, info ) {
      const productId = ( parent.user ) ? parent.product.id : parent.product_id || 0;
      const fields = super.getFields( info, ['category', 'tag', 'review', 'gallery', 'relationship'] );
      const obj = super.resolvePamameters(fields, params, { id_eq: productId });
      return new ProductService().findAll(obj);
    }
}
