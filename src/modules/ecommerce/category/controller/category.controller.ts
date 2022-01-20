import { SequelizeController } from './../../../../core/controller';

import { CategoryService } from './../service/category.service';

export class CategoryController extends SequelizeController {

    protected service: CategoryService = new CategoryService;

}
