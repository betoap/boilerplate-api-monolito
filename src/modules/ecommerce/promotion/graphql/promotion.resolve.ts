import {
    query,
    mutation,
    resolveQuery,
    resolveMutation
} from 'graphql-query-mutation/annotations';

import { PromotionService } from '../service/promotion.service';
import { PromotionQuery } from './promotion.query';


export class PromotionResolve extends PromotionQuery {

    @query
    queries(): string {
        return `
            getPromotions( where: promotionWhereInput, order: [[String!]!], first: Int, offset: Int ): promotions
            getPromotion( id: ID! ): promotions
        `;
    }

    @mutation
    mutation(): string {
        return `
            createPromotion( input: promotionCreateInput! ): mutationResponsePromotion
            updatePromotion( id: ID!, input: promotionUpdateInput! ): mutationResponsePromotion
            deletePromotion( id: ID! ): mutationResponsePromotion
        `;
    }

    @resolveQuery
    getPromotions ( parent, params, context, info ) {
        const fields = super.getFields( info );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new PromotionService().findAll( obj );
    }

    @resolveQuery
    getPromotion ( parent, params, context, info ) {
        const fields = super.getFields( info );
        return new PromotionService().findOne( { fields } );
    }

    @resolveMutation
    createPromotion( parent, params, context, info ) {
        return new PromotionService().create(params.input);
    }

    @resolveMutation
    updatePromotion( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PromotionService().update(params.input, id);
    }

    @resolveMutation
    deletePromotion( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PromotionService().delete(id);
    }
}
