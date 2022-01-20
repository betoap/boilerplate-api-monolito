import { SequelizeController } from './../../../../core/controller';

import { ReviewService } from './../service/review.service';

export class ReviewController extends SequelizeController {

    protected service: ReviewService = new ReviewService;

}
