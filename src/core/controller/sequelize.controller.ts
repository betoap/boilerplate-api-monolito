import { Controller } from './controller';

export abstract class SequelizeController extends Controller {

    constructor() {
        super();
    }

    get( req ) {
        return this
            .service
            .find( this.prepare( req ) );
    }

    getAll( req ) {
        return this
            .service
            .findAll( this.prepare( req ) );
    }

    post( req ) {
        return this
            .service
            .create( req.request.body );
    }

    put( req ) {
        return this
            .service
            .update( req.request.body, req.params );
    }

    delete( req ) {
        return this
            .service
            .delete( req.params );
    }

    private prepare( data ): IParams {
        const fields = data.request.query.fields || undefined;
        const order = data.request.query.order || undefined;
        delete data.request.query.fields;
        delete data.request.query.order;
        const query = data.request.query || {};
        const where = { ...query, ...data.params };
        return {
            fields,
            where,
            limit: undefined,
            offset: undefined,
            includes: undefined,
            order
        };
    }
}

export interface IParams {
    fields?: object;
    where?: object;
    limit?: number;
    offset?: number;
    includes?: Array<any>;
    order?: Array<string>;
}
