import { Controller } from './controller';

export abstract class ApiController extends Controller {

    constructor() {
        super();
    }

    get( req: any = {} ) {
        req.endpoint = this.service.endpoint;
        return this
            .service
            .get( req );
    }

    post( req: any = {} ) {
        req.endpoint = this.service.endpoint;
        return this
            .service
            .post( req );
    }

    put( req: any = {} ) {
        req.endpoint = this.service.endpoint;
        return this
            .service
            .put( req );
    }

    delete( req: any = {} ) {
        req.endpoint = this.service.endpoint;
        return this
            .service
            .delete( req );
    }
}
