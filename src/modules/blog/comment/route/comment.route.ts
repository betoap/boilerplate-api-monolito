import { SequelizeRoute } from './../../../../core/router';

import { CommentController } from './../controller/comment.controller';

export default class CommentRoute extends SequelizeRoute {

    protected controller: CommentController = new CommentController();

    constructor( config ) {
        super( config );
    }
}

