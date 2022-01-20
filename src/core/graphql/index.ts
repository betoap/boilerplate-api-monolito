import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import {
    Schema,
    Type,
    Query,
    Mutation,
    ResolveTrivial,
    Resolves
} from 'graphql-query-mutation';

import * as glob from 'glob';

export class Graphql {

    // Glob
    private _glob: any;

    constructor() {
        this._glob = glob.Glob;
    }

    private loadModules(): void {
        const pattern = '{./dist/modules/**/graphql/index.js,./dist/modules/**/graphql/*.graphql.js}';
        const options = { sync: true, dot: true, mark: false, ignore: [ './dist/modules/core/graphql/*.js' ] };
        const files = this._glob( pattern, options );
        files.found.forEach( ( archive ) => {
          let name = archive.replace( './dist/modules/', '' );
          name = ( name.split( '/graphql/' )[0] ).toLowerCase();
          if ( name == '/core') return;
          const module = require( `../../../${archive}` );
          new module.default();
        });
    }

    private scalar() {
      return ['scalar DateTime', 'scalar Upload', 'scalar Date'];
    }

    execute() {
      this.loadModules();
      const query = Query.getQueries();
      if ( query.length <= 65 ) return;
      return makeExecutableSchema({
        typeDefs: [
            Schema,
            query,
            Mutation.getMutations(),
            `${this.scalar()} ${Type.getTypes()}`
          ],
          resolvers: { ...ResolveTrivial.getResolveTrivials(), ...Resolves }
      });
    }
}
