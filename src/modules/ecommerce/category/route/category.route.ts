import { SequelizeRoute } from './../../../../core/router';

import { CategoryController } from './../controller/category.controller';

export default class CategoryRoute extends SequelizeRoute {

    protected controller: CategoryController = new CategoryController();

    constructor( config ) {
        super( config );
    }
}

