import { SequelizeRoute } from './../../../../core/router';

import { ResourceController } from './../controller/resource.controller';

export default class ResourceRoute extends SequelizeRoute {

    protected controller: ResourceController = new ResourceController();

    constructor( config ) {
        super( config );
    }
}

