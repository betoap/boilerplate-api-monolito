import { SequelizeService } from './../../../../core/service';

import { CategoryFilter } from './../filter/category.filter';
import { CategoryRepository } from './../repository/category.repository';
import CategoryEntity from './../entity/category.entity';

export class CategoryService extends SequelizeService {

    public filter: CategoryFilter = new CategoryFilter;
    protected repository: CategoryRepository = new CategoryRepository;
    protected entity = CategoryEntity;

}
