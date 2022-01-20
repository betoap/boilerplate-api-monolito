import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { TagService } from '../service/tag.service';
import { TagQuery } from './tag.query';
import { ProductService } from '../../product/service/product.service';


export class TagResolve extends TagQuery {

    @query
    queries(): string {
        return `
            getTags(
                where: tagWhereInput,
                include: [String],
                order: [[String!]!],
                first: Int,
                offset: Int
            ):tags
            getTag( id: ID!, include: [String] ): tags
        `;
    }

    @mutation
    mutation(): string {
        return `
            createTag( input: tagCreateInput! ): mutationResponseTag
            updateTag( id: ID!, input: tagUpdateInput! ): mutationResponseTag
            deleteTag( id: ID! ): mutationResponseTag
        `;
    }

    @resolveQuery
    getTags ( parent, params, context, info ) {
        const fields = super.getFields( info, ['product'] );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new TagService().findAll( obj );
    }

    @resolveQuery
    getTag ( parent, params, context, info ) {
        const fields = super.getFields( info, ['product'] );
        return new TagService().findOne( { fields } );
    }

    @resolveMutation
    createTag( parent, params, context, info ) {
        return new TagService().create(params.input);
    }

    @resolveMutation
    updateTag( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new TagService().update(params.input, id);
    }

    @resolveMutation
    deleteTag( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new TagService().delete(id);
    }

    @resolveTrivial
    product( parent, params, context, info ) {
        const listId = parent.product.map( ( product ) => product.id );
        const fields = super.getFields( info );
        const obj = super.resolvePamameters(fields, params, {id_in: listId});
        return new ProductService().findAll(obj);
    }
}
