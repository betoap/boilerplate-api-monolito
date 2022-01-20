import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { ProductService } from '../service/product.service';
import { ProductQuery } from './product.query';

import { GalleryService } from './../../gallery/service/gallery.service';
import { ReviewService } from '../../review/service/review.service';
import { TagService } from '../../tag/service/tag.service';
import { CategoryService } from '../../category/service/category.service';


export class ProductResolve extends ProductQuery {

    @query
    queries(): string {
        return `
            getProducts( where: productWhereInput, order: [[String!]!], first: Int, offset: Int ): products
            getProduct( id: ID! ): products
        `;
    }

    @mutation
    mutation(): string {
        return `
            createProduct( input: productCreateInput! ): mutationResponseProduct
            updateProduct( id: ID!, input: productUpdateInput! ): mutationResponseProduct
            deleteProduct( id: ID! ): mutationResponseProduct
        `;
    }

    @resolveQuery
    getProducts ( parent, params, context, info ) {
        const fields = super.getFields( info, ['category', 'tag', 'review', 'gallery', 'relationship', 'promotion'] );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new ProductService().findAll( obj );
    }

    @resolveQuery
    getProduct ( parent, params, context, info ) {
        const fields = super.getFields( info, ['category', 'tag', 'review', 'gallery', 'relationship'] );
        return new ProductService().findOne( { fields } );
    }

    @resolveMutation
    createProduct( parent, params, context, info ) {
      return new ProductService().create(params.input);
    }

    @resolveMutation
    updateProduct( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new ProductService().update(params.input, id);
    }

    @resolveMutation
    deleteProduct( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new ProductService().delete(id);
    }

    @resolveTrivial
    gallery( parent, params, context, info ) {
      const galleryId = ( parent.gallery ) ? parent.gallery.id : parent.gallery_id || 0;
      const fields = super.getFields( info, ['photo'] );
      const obj = super.resolvePamameters(fields, params, {id_eq: galleryId});
      return new GalleryService().findAll(obj);
    }

    @resolveTrivial
    review( parent, params, context, info ) {
      const listId: Array<any> = parent.review.map( ( review ) => review.id );
      const fields = super.getFields( info );
      const obj = super.resolvePamameters(fields, params, {id_in: listId});
      return new ReviewService().findAll(obj);
    }

    @resolveTrivial
    tag( parent, params, context, info ) {
        const listId = parent.tag.map( ( tag ) => tag.id );
        const fields = super.getFields( info );
        const obj = super.resolvePamameters(fields, params, {id_in: listId});
        return new TagService().findAll(obj);
    }

    @resolveTrivial
    category( parent, params, context, info ) {
        const listId = parent.category.map( ( category ) => category.id );
        const fields = super.getFields( info, ['product'] );
        const obj = super.resolvePamameters(fields, params, {id_in: listId});
        return new CategoryService().findAll(obj);
    }

    @resolveTrivial
    relationship( parent, params, context, info ) {
        const listId = parent.relationship.map( ( relationship ) => relationship.id );
        const fields = super.getFields( info, ['category', 'tag', 'review', 'gallery', 'relationship'] );
        const obj = super.resolvePamameters( fields, params, { id_in: listId } );
        return new ProductService().findAll( obj );
    }
}
