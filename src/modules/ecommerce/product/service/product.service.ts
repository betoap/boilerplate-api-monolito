import { SequelizeService } from './../../../../core/service';

import { ProductFilter } from './../filter/product.filter';
import { ProductRepository } from './../repository/product.repository';
import ProductEntity from './../entity/product.entity';

export class ProductService extends SequelizeService {

    public filter: ProductFilter = new ProductFilter;
    protected repository: ProductRepository = new ProductRepository;
    protected entity = ProductEntity;

}
