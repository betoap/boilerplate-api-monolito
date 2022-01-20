import { SequelizeRoute } from './../../../../core/router';

import { RoleController } from './../controller/role.controller';

export default class RoleRoute extends SequelizeRoute {

    protected controller: RoleController = new RoleController();

    constructor( config ) {
        super( config );
    }
}

