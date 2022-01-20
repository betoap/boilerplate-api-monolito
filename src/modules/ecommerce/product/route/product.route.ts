import { SequelizeRoute } from './../../../../core/router';

import { ProductController } from './../controller/product.controller';

export default class ProductRoute extends SequelizeRoute {

    protected controller: ProductController = new ProductController();

    constructor( config ) {
        super( config );
    }
}

