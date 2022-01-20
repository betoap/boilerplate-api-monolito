import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { PhotoService } from '../service/photo.service';
import { PhotoQuery } from './photo.query';

import { GalleryService } from './../../gallery/service/gallery.service';

export class PhotoResolve extends PhotoQuery {

    @query
    queries(): string {
        return `
            getPhotos( where: photoWhereInput, order: [[String!]!], first: Int, offset: Int ): photos
            getPhoto( id: ID! ): photos
        `;
    }

    @mutation
    mutation(): string {
        return `
            createPhoto( input: photoCreateInput! ): mutationResponsePhoto
            updatePhoto( id: ID!, input: photoUpdateInput! ): mutationResponsePhoto
            deletePhoto( id: ID! ): mutationResponsePhoto
        `;
    }

    @resolveQuery
    getPhotos ( parent, params, context, info ) {
        const fields = super.getFields( info );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new PhotoService().findAll( obj );
    }

    @resolveQuery
    getPhoto ( parent, params, context, info ) {
        const fields = super.getFields( info, ['gallery'] );
        return new PhotoService().findOne( { fields } );
    }

    @resolveMutation
    createPhoto( parent, params, context, info ) {
        return new PhotoService().create(params.input);
    }

    @resolveMutation
    updatePhoto( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PhotoService().update(params.input, id);
    }

    @resolveMutation
    deletePhoto( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PhotoService().delete(id);
    }

    @resolveTrivial
    gallery( parent, params, context, info ) {
      const fields = super.getFields( info, ['photo'] );
      const obj = super.resolvePamameters(fields, params, { id_eq: parent.gallery_id });
      return new GalleryService().findAll(obj);
    }
}
