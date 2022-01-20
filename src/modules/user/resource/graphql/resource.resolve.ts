import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { ResourceService } from '../service/resource.service';
import { ResourceQuery } from './resource.query';

import { PrivilegeService } from './../../privilege/service/privilege.service';

export class ResourceResolve extends ResourceQuery {

    @query
    queries(): string {
        return `
            getResources( where: resourceWhereInput, order: [[String!]!], first: Int, offset: Int ): [ resource ]!
            getResource( id: ID! ): resource
        `;
    }

    @mutation
    mutation(): string {
        return `
            createResource( input: resourceCreateInput! ): mutationResponseResource
            updateResource( id: ID!, input: resourceUpdateInput! ): mutationResponseResource
            deleteResource( id: ID! ): mutationResponseResource
        `;
    }

    @resolveQuery
    getResources ( parent, params, context, info ) {
        const fields = super.getFields( info );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new ResourceService().findAll( obj );
    }

    @resolveQuery
    getResource ( parent, params, context, info ) {
        const fields = super.getFields( info );
        return new ResourceService().findOne( { fields } );
    }

    @resolveMutation
    createResource( parent, params, context, info ) {
        return new ResourceService().create(params.input);
    }

    @resolveMutation
    updateResource( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new ResourceService().update(params.input, id);
    }

    @resolveMutation
    deleteResource( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new ResourceService().delete(id);
    }

    @resolveTrivial
    privilege( parent, params, context, info ){
      const listId: Array<any> = parent.privilege.map( ( privilege )=> privilege.id );
      const fields = super.getFields( info );
      const obj = super.resolvePamameters( fields, params, {id_eq: listId} );
      return new PrivilegeService().findAll(obj);
    }
}
