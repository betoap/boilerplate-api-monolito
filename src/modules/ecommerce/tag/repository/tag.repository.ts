import { Repository } from   './../../../../core/repository';

export class TagRepository extends Repository {

    constructor() {
        super();
    }

    public async create( entity, data ): Promise<any> {
        const { products, ...tag} = data;
        const newTag = await super.create( entity, tag );
        if ( products ) newTag.setProduct(products);
        return newTag;
    }

    public async update( entity, data, _where?: object ): Promise<any> {
        const { product, ...tag } = data;
        const _tag = await super.update( entity, tag, _where );
        if ( _tag.success.length > 0 && product ) {
            _tag.success.forEach( _cat => {
                const removeProducts = _cat.product.map( ( product ) => product.id );
                _cat.removeProduct( removeProducts );
                _cat.setProduct( product );
            });
        }
    }

}
