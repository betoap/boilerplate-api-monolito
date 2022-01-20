import { SequelizeRoute } from './../../../../core/router';

import { TagController } from './../controller/tag.controller';

export default class TagRoute extends SequelizeRoute {

    protected controller: TagController = new TagController();

    constructor( config ) {
        super( config );
    }
}

