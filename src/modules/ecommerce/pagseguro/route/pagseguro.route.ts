import { SequelizeRoute } from './../../../../core/router';

import { PagseguroController } from './../controller/pagseguro.controller';

export default class PagseguroRoute extends SequelizeRoute {

    protected controller: PagseguroController = new PagseguroController();

    constructor( config ) {
        super( config );
    }
}

