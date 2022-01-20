import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { PrivilegeService } from '../service/privilege.service';
import { PrivilegeQuery } from './privilege.query';

import { RoleService } from './../../role/service/role.service';
import { ResourceService } from './../../resource/service/resource.service';

export class PrivilegeResolve extends PrivilegeQuery {

    @query
    queries(): string {
        return `
            getPrivileges( where: privilegeWhereInput, order: [[String!]!], first: Int, offset: Int ): [ privilege ]!
            getPrivilege( id: ID! ): privilege
        `;
    }

    @mutation
    mutation(): string {
        return `
            createPrivilege( input: privilegeCreateInput! ): mutationResponsePrivilege
            updatePrivilege( id: ID!, input: privilegeUpdateInput! ): mutationResponsePrivilege
            deletePrivilege( id: ID! ): mutationResponsePrivilege
        `;
    }

    @resolveQuery
    getPrivileges ( parent, params, context, info ) {
        const fields = super.getFields( info );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new PrivilegeService().findAll( obj );
    }

    @resolveQuery
    getPrivilege ( parent, params, context, info ) {
        const fields = super.getFields( info );
        return new PrivilegeService().findOne( { fields } );
    }

    @resolveMutation
    createPrivilege( parent, params, context, info ) {
        return new PrivilegeService().create(params.input);
    }

    @resolveMutation
    updatePrivilege( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PrivilegeService().update(params.input, id);
    }

    @resolveMutation
    deletePrivilege( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PrivilegeService().delete(id);
    }

    @resolveTrivial
    role ( parent, params, context, info ){
      const listId: Array<any> = parent.role.map( (role) => role.id );
      const fields = super.getFields( info, ['resource'] );
      const obj = super.resolvePamameters( fields, params, {id_in: listId} );
      return new RoleService().findAll(obj);
    }

    @resolveTrivial
    resource( parent, params, context, info ){
      const listiId = ( parent.resource ) ? parent.resource.id : parent.resource_id || 0;
      const fields = super.getFields( info, ['role', 'resource'] );
      const obj = super.resolvePamameters ( fields, params, {id_eq: listiId} );
      return new ResourceService().findAll(obj);
    }
}
