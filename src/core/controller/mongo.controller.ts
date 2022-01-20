import { Controller } from './controller';

export abstract class MongoController extends Controller {

    constructor() {
        super();
    }

    get( req?: any ) {
        return this
            .service
            .find( req );
    }

    getAll( req?: any ) {
        return this
            .service
            .find( req );
    }

    post(req: any) {
        return this
            .service
            .post( req );
    }

    put(req: any) {
        return this
            .service
            .put( req );
    }

    delete(req: any) {
        return this
            .service
            .delete( req );
    }
}
