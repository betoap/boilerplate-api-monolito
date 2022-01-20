import { Upload } from './../../../core/service/upload.service';
import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { TeamService } from '../service/team.service';
import { TeamQuery } from './team.query';


export class TeamResolve extends TeamQuery {

    @query
    queries(): string {
        return `
            getTeams( where: teamWhereInput, order: [[String!]!], first: Int, offset: Int ): teams
            getTeam( id: ID! ): teams
        `;
    }

    @mutation
    mutation(): string {
        return `
          createTeam( input: teamCreateInput! ): mutationResponseTeam
          updateTeam( id: ID!, input: teamUpdateInput! ): mutationResponseTeam
          deleteTeam( id: ID! ): mutationResponseTeam
        `;
    }

    @resolveQuery
    getTeams ( parent, params, context, info ) {
        const fields = super.getFields( info );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new TeamService().findAll( obj );
    }

    @resolveQuery
    async getTeam ( parent, params, context, info ) {
      const fields = super.getFields( info );
      const obj = {
        fields,
        where: { id: parseInt( params.id ) }
      };
      return await new TeamService().findOne( obj );
    }

    @resolveMutation
    async createTeam( parent, params, context, info ) {
      const path = `${__dirname}\\..\\..\\..\\public\\upload\\nova\\`;
      if( params.input.photo ){
        await Upload.save(params.input.photo, `${path}${params.input.photo.name}`);
        params.input.photo = `http://localhost:2000/upload/nova/${params.input.photo.name}`;
      }
      return new TeamService().create(params.input);
    }

    @resolveMutation
    async updateTeam( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        const path = `${__dirname}\\..\\..\\..\\public\\upload\\nova\\`;
        if( params.input.photo ){
          await Upload.save(params.input.photo, `${path}${params.input.photo.name}`);
          params.input.photo = `http://localhost:2000/upload/nova/${params.input.photo.name}`;
        }
        return new TeamService().update(params.input, id);
    }

    @resolveMutation
    deleteTeam( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new TeamService().delete(id);
    }
}
