import { SequelizeController } from './../../../../core/controller';

import { PromotionService } from './../service/promotion.service';

export class PromotionController extends SequelizeController {

    protected service: PromotionService = new PromotionService;

}
