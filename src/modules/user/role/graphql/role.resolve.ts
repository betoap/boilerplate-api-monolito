import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { RoleService } from '../service/role.service';
import { RoleQuery } from './role.query';

import { UserService } from './../../../user/service/user.service';
import { PrivilegeService } from './../../privilege/service/privilege.service';

export class RoleResolve extends RoleQuery {

    @query
    queries(): string {
        return `
            getRoles( where: roleWhereInput, order: [[String!]!], first: Int, offset: Int ): roles
            getRole( id: ID! ): role
        `;
    }

    @mutation
    mutation(): string {
        return `
            createRole( input: roleCreateInput! ): mutationResponseRole
            updateRole( id: ID!, input: roleUpdateInput! ): mutationResponseRole
            deleteRole( id: ID! ): mutationResponseRole
        `;
    }

    @resolveQuery
    getRoles ( parent, params, context, info ) {
        const fields = super.getFields( info );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new RoleService().findAll( obj );
    }

    @resolveQuery
    getRole ( parent, params, context, info ) {
      const fields = super.getFields( info );
      const obj = {
        fields,
        where: { id: parseInt( params.id ) }
      };
      return new RoleService().findOne( obj );
    }

    @resolveMutation
    createRole( parent, params, context, info ) {
        return new RoleService().create(params.input);
    }

    @resolveMutation
    updateRole( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new RoleService().update(params.input, id);
    }

    @resolveMutation
    deleteRole( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new RoleService().delete(id);
    }

    @resolveTrivial
    user( parent, params, context, info ) {
      const userId = ( parent.user ) ? parent.user.id : parent.user_id || 0;
      const fields = super.getFields( info );
      const obj = super.resolvePamameters(fields, params, { id_eq: userId });
      return new UserService().findAll(obj);
    }

    @resolveTrivial
    async privilege( parent, params, context, info ) {
      const listId: Array<any> = parent.privilege.map( ( privilege ) => privilege.id );
      const fields = super.getFields( info, ['user', 'role'] );
      const obj = super.resolvePamameters(fields, params, { id_in: listId });
      const x = await new PrivilegeService().findAll(obj);
      return x;
    }
}
