import { RoleService } from './../role/service/role.service';
import { Autentication } from './../service/autentication';
import {
  query,
  mutation,
  resolveQuery,
  resolveMutation,
  resolveTrivial
} from 'graphql-query-mutation/annotations';

import { UserService } from '../service/user.service';
import { UserQuery } from './user.query';

export class UserResolve extends UserQuery {

    @query
    queries(): string {
      return `
        getUsers ( where: userWhereInput, order: [[String!]!], first: Int, offset: Int ): users
        getUser( id: ID! ): user
      `;
    }

    @mutation
    mutation(): string {
      return `
        login(input: loginInput): mutationResponseUser
        createUser( input: userCreateInput! ): mutationResponseUser
        updateUser( id: ID!, input: userUpdateInput! ): mutationResponseUser
        deleteUser( id: ID! ): mutationResponseUser
      `;
    }

    @resolveQuery
    getUsers ( parent, params, context, info ) {
      Autentication.validate( context.ctx );
      const fields = super.getFields( info, ['role'] );
      const obj = {
          fields,
          where: params.where || undefined,
          limit: params.first || undefined,
          offset: params.offset || undefined,
          order: params.order || undefined
      };
      return new UserService().findAll( obj );
    }

    @resolveQuery
    async getUser ( parent, params, context, info ) {
      const fields = super.getFields( info );
      const obj = {
        fields,
        where: { id: parseInt( params.id ) }
      };
      const x = await new UserService().findOne( obj );
      return x;
    }


    @resolveMutation
    async login ( parent, params, context, info ) {
      const obj = {
        where: params.input || undefined,
      };
      return new UserService().login( obj );
    }

    @resolveMutation
    createUser( parent, params, context, info ) {
      return new UserService().create(params.input);
    }

    @resolveMutation
    updateUser( parent, params, context, info ) {
      const id = { id: parseInt( params.id ) };
      return new UserService().update(params.input, id);
    }

    @resolveMutation
    deleteUser( parent, params, context, info ) {
      const id = { id: parseInt( params.id ) };
      return new UserService().delete(id);
    }

    @resolveTrivial
    async role( parent, params, context, info ) {
      const roleId = ( parent.role ) ? parent.role.id : parent.role_id || 0;
      const fields = super.getFields( info, ['role', 'user', 'privilege'] );
      const obj = super.resolvePamameters(fields, params, {id_eq: roleId});
      return await new RoleService().findOne(obj);
    }
}
