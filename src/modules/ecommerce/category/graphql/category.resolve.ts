import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { CategoryService } from '../service/category.service';
import { CategoryQuery } from './category.query';
import { ProductService } from '../../product/service/product.service';

export class CategoryResolve extends CategoryQuery {

    @query
    queries(): string {
        return `
            getCategories( where: categoryWhereInput, order: [[String!]!], first: Int, offset: Int ): categories
            getCategory( id: ID! ): categories
        `;
    }

    @mutation
    mutation(): string {
        return `
            createCategory( input: categoryCreateInput! ): mutationResponseCategory
            updateCategory( id: ID!, input: categoryUpdateInput! ): mutationResponseCategory
            deleteCategory( id: ID! ): mutationResponseCategory
        `;
    }

    @resolveQuery
    getCategories ( parent, params, context, info ) {
        const fields = super.getFields( info, ['product'] );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new CategoryService().findAll( obj );
    }

    @resolveQuery
    getCategory ( parent, params, context, info ) {
        const fields = super.getFields( info, ['product'] );
        return new CategoryService().findOne( { fields } );
    }

    @resolveMutation
    createCategory( parent, params, context, info ) {
        return new CategoryService().create(params.input);
    }

    @resolveMutation
    updateCategory( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new CategoryService().update(params.input, id);
    }

    @resolveMutation
    deleteCategory( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new CategoryService().delete(id);
    }

    @resolveTrivial
    product( parent, params, context, info ) {
        const listId = parent.product.map( ( product ) => product.id );
        const fields = super.getFields( info, ['category', 'tag', 'review', 'gallery', 'relationship'] );
        const obj = super.resolvePamameters(fields, params, { id_in: listId });
        return new ProductService().findAll(obj);
    }

}
