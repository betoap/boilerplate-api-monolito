
import {
    query,
    mutation,
    type
} from 'graphql-query-mutation/annotations';
import graphqlFields from 'graphql-fields';

export interface IGraphqlBase {
    queries(): string;
    mutation?(): string;
}

export abstract class GraphqlBase {

    public static _name: string;

    public getFields( info, excludes: Array<string> = [], includes: Array<string> = [] ) {
        excludes.push('__typename');
        const fieldObj = graphqlFields( info )['response'] || graphqlFields( info );
        let fields: Array<any> = Object.keys( fieldObj);
        if ( fields.indexOf( 'id' ) === -1 ) {
            fieldObj['id'] = {};
            fields.unshift( 'id' );
        }
        fields = [...new Set([...fields, ...includes])];
        fields = fields.filter( ( _field ) => excludes.indexOf( _field ) === -1 );
        return fields.map( ( _field ) => {
            return (
                Object.keys(fieldObj[_field]) &&
                Object.keys(fieldObj[_field]).length > 0 ) ? `${_field}_id` : _field;
        });
    }

    public resolvePamameters(fields, params, where = {}){
      where = { ...params.where, ...where };
      return {
        fields,
        where: where || undefined,
        limit: params.first || undefined,
        offset: params.offset || undefined,
        order: params.order || undefined
      };
    }

    @query
    queries(): string {
        return `
        `;
    }

    @mutation
    mutation(): string {
        return `
        `;
    }

    @type
    paginate(): string {
      return `{
        count: String!
        nextPage: String!
        prevPage: String!
      }`;
    }

    @type
    token(): string {
      return `{
        token: String!
        expire: Date
      }`;
    }
}
