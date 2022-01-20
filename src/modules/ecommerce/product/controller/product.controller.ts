import { SequelizeController } from './../../../../core/controller';

import { ProductService } from './../service/product.service';

export class ProductController extends SequelizeController {

    protected service: ProductService = new ProductService;

}
