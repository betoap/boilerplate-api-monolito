import {
    query,
    mutation,
    resolveQuery,
    resolveMutation,
    resolveTrivial
} from 'graphql-query-mutation/annotations';

import { PagseguroService } from '../service/pagseguro.service';
import { PagseguroQuery } from './pagseguro.query';


export class PagseguroResolve extends PagseguroQuery {

    @query
    queries(): string {
        return `
            getPagseguros( where: pagseguroWhereInput, order: [[String!]!], first: Int, offset: Int ): [ pagseguro ]!
            getPagseguro( id: ID! ): pagseguro
        `;
    }

    @mutation
    mutation(): string {
        return `
            createPagseguro( input: pagseguroCreateInput! ): mutationResponsePagseguro
            updatePagseguro( id: ID!, input: pagseguroUpdateInput! ): mutationResponsePagseguro
            deletePagseguro( id: ID! ): mutationResponsePagseguro
        `;
    }

    @resolveQuery
    getPagseguros ( parent, params, context, info ) {
        const fields = super.getFields( info );
        const obj = {
            fields,
            where: params.where || undefined,
            limit: params.first || undefined,
            offset: params.offset || undefined,
            order: params.order || undefined
        };
        return new PagseguroService().findAll( obj );
    }

    @resolveQuery
    getPagseguro ( parent, params, context, info ) {
        const fields = super.getFields( info );
        return new PagseguroService().findOne( { fields } );
    }

    @resolveMutation
    createPagseguro( parent, params, context, info ) {
        return new PagseguroService().create(params.input);
    }

    @resolveMutation
    updatePagseguro( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PagseguroService().update(params.input, id);
    }

    @resolveMutation
    deletePagseguro( parent, params, context, info ) {
        const id = { id: parseInt( params.id ) };
        return new PagseguroService().delete(id);
    }
}
