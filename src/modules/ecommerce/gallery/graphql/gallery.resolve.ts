import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { GalleryService } from '../service/gallery.service';
import { GalleryQuery } from './gallery.query';
import { PhotoService } from '../../photo/service/photo.service';
import { ProductService } from '../../product/service/product.service';


export class GalleryResolve extends GalleryQuery {

    @query
    queries(): string {
      return `
        getGalleries( where: galleryWhereInput, order: [[String!]!], first: Int, offset: Int ): galleries
        getGallery( id: ID! ): galleries
      `;
    }

    @mutation
    mutation(): string {
      return `
        createGallery( input: galleryCreateInput! ): mutationResponseGallery
        updateGallery( id: ID!, input: galleryUpdateInput! ): mutationResponseGallery
        deleteGallery( id: ID! ): mutationResponseGallery
      `;
    }

    @resolveQuery
    getGalleries ( parent, params, context, info ) {
      const fields = super.getFields(info, ['photo'] );
      const obj = {
        fields,
        where: params.where || undefined,
        limit: params.first || undefined,
        offset: params.offset || undefined,
        order: params.order || undefined
      };
      return new GalleryService().findAll( obj );
    }

    @resolveQuery
    getGallery ( parent, params, context, info ) {
      const fields = super.getFields( info, ['photo'] );
      return new GalleryService().findOne( { fields } );
    }

    @resolveMutation
    createGallery( parent, params, context, info ) {
      return new GalleryService().create(params.input);
    }

    @resolveMutation
    updateGallery( parent, params, context, info ) {
      const id = { id: parseInt( params.id ) };
      return new GalleryService().update(params.input, id);
    }

    @resolveMutation
    deleteGallery( parent, params, context, info ) {
      const id = { id: parseInt( params.id ) };
      return new GalleryService().delete(id);
    }

    @resolveTrivial
    photo( parent, params, context, info ) {
      const listId = parent.photo.map( ( photo ) => photo.id );
      const fields = super.getFields( info );
      const obj = super.resolvePamameters(fields, params, { id_in: listId } );
      return new PhotoService().findAll(obj);
    }

    @resolveTrivial
    product( parent, params, context, info ) {
      const productId = ( parent.user ) ? parent.product.id : parent.product_id || 0;
      const fields = super.getFields( info, ['category', 'tag', 'review', 'gallery', 'relationship'] );
      const obj = super.resolvePamameters(fields, params, { id_eq: productId });
      return new ProductService().findAll(obj);
    }
}
