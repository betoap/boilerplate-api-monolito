import { SequelizeRoute } from './../../../../core/router';

import { ReviewController } from './../controller/review.controller';

export default class ReviewRoute extends SequelizeRoute {

    protected controller: ReviewController = new ReviewController();

    constructor( config ) {
        super( config );
    }
}

