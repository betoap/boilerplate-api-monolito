import { Route } from './route';
import { Proxy } from './../../helper/proxy';

export abstract class MongoRoute extends Route {

    constructor( config ) {
        super( config );
        this.routers();
    }

    private routers(): void {
        this.get('/', Proxy.create(this, this._get));
        this.post('/', Proxy.create(this, this._post));
        this.put('/:id', Proxy.create(this, this._put));
        this.delete('/:id', Proxy.create(this, this._delete));
    }

    protected async _get( ctx, next ): Promise<void> {
        return await this.response( ctx, next );
    }

    protected async _post( ctx, next ): Promise<void> {
        return await this.response( ctx, next );
    }

    protected async _put( ctx, next ): Promise<void> {
        return await this.response( ctx, next );
    }

    protected async _delete( ctx, next ): Promise<void> {
        return await this.response( ctx, next );
    }

}
