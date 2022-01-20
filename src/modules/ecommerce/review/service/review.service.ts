import { SequelizeService } from './../../../../core/service';

import { ReviewFilter } from './../filter/review.filter';
import { ReviewRepository } from './../repository/review.repository';
import ReviewEntity from './../entity/review.entity';

export class ReviewService extends SequelizeService {

    public filter: ReviewFilter = new ReviewFilter;
    protected repository: ReviewRepository = new ReviewRepository;
    protected entity = ReviewEntity;

}
