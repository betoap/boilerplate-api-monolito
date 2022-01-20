import { Repository } from   './../../../../core/repository';

export class ProductRepository extends Repository {

    constructor() {
        super();
    }

    public async create( entity, data ): Promise<any> {
        const { categories, tags, relationships, ...product} = data;
        const newProduct = await super.create( entity, product );
        if ( categories ) newProduct.setCategory(categories);
        if ( tags ) newProduct.setTag(tags);
        if ( relationships ) newProduct.setRelationship(relationships);
        return newProduct;
    }

    public async update( entity, data, _where?: object ): Promise<any> {
        const { categories, tags, relationships, ...product } = data;
        const _product = await super.update( entity, product, _where );
        if ( _product.success.length > 0 ) {
            _product.success.forEach( _prod => {
                if ( categories ) {
                    const removeCategories = _prod.category.map( ( category ) => category.id );
                    _prod.removeCategory( removeCategories );
                    _prod.setCategory( categories );
                }
                if ( tags ) {
                    const removeTags = _prod.tag.map( ( tag ) => tag.id );
                    _prod.removeTag(removeTags );
                    _prod.setTag( tags );
                }
                if ( relationships ) {
                    const removeRelationships = _prod.relationship.map( ( relationship ) => relationship.id );
                    _prod.removeRelationship( removeRelationships );
                    _prod.setRelationship( relationships );
                }
            });
        }

        return _product;
    }

}
