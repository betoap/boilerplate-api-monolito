import { SequelizeRoute } from './../../../../core/router';

import { PrivilegeController } from './../controller/privilege.controller';

export default class PrivilegeRoute extends SequelizeRoute {

    protected controller: PrivilegeController = new PrivilegeController();

    constructor( config ) {
        super( config );
    }
}

