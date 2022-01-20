import { SequelizeRoute } from './../../../../core/router';

import { PromotionController } from './../controller/promotion.controller';

export default class PromotionRoute extends SequelizeRoute {

    protected controller: PromotionController = new PromotionController();

    constructor( config ) {
        super( config );
    }
}

