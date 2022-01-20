import { Repository } from   './../../../../core/repository';

export class CategoryRepository extends Repository {

    constructor() {
        super();
    }

    public async create( entity, data ): Promise<any> {
        const { products, ...category} = data;
        const newCategory = await super.create( entity, category );
        if ( products ) newCategory.setProduct(products);
        return newCategory;
    }

    public async update( entity, data, _where?: object ): Promise<any> {
        const { product, ...category } = data;
        const _category = await super.update( entity, category, _where );
        if ( _category.success.length > 0 && product ) {
            _category.success.forEach( _cat => {
                const removeProducts = _cat.product.map( ( product ) => product.id );
                _cat.removeProduct( removeProducts );
                _cat.setProduct( product );
            });
        }
        return Promise.resolve(_category);
    }

}
