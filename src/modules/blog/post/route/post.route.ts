import { SequelizeRoute } from './../../../../core/router';

import { PostController } from './../controller/post.controller';

export default class PostRoute extends SequelizeRoute {

    protected controller: PostController = new PostController();

    constructor( config ) {
        super( config );
    }
}

