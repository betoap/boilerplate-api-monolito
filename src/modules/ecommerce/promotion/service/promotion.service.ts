import { SequelizeService } from './../../../../core/service';

import { PromotionFilter } from './../filter/promotion.filter';
import { PromotionRepository } from './../repository/promotion.repository';
import PromotionEntity from './../entity/promotion.entity';

export class PromotionService extends SequelizeService {

    public filter: PromotionFilter = new PromotionFilter;
    protected repository: PromotionRepository = new PromotionRepository;
    protected entity = PromotionEntity;

}
