import HttpStatus from 'http-status';

import { Route } from './route';
import { Proxy } from './../../helper/proxy';

export abstract class SequelizeRoute extends Route {

    constructor( config ) {
        super( config );
        this.routers();
    }

    private routers(): void {
        this.get( '/:id', Proxy.create(this, this._get ) );
        this.get( '/', Proxy.create(this, this._getAll ) );
        this.post( '/', Proxy.create(this, this._post ) );
        this.put( '/:id', Proxy.create(this, this._put ) );
        this.delete( '/:id', Proxy.create(this, this._delete ) );
    }

    protected _get( ctx, next ): void {
        return this
            .controller
            .get( ctx )
            .then( entity => this.response( ctx, next, HttpStatus.OK, entity ) )
            .catch( error => this.response( ctx, next, HttpStatus.NOT_FOUND, error ) );
    }

    protected _getAll( ctx, next ): void {
        return this
            .controller
            .getAll( ctx )
            .then( entity => this.response( ctx, next, HttpStatus.OK, entity ) )
            .catch( error => this.response( ctx, next, HttpStatus.NOT_FOUND, error ) );
    }

    protected _post( ctx, next ): void {
        return this
            .controller
            .post( ctx )
            .then( entity => this.response( ctx, next, HttpStatus.CREATED, entity ) )
            .catch( error => this.response( ctx, next, HttpStatus.UNPROCESSABLE_ENTITY, error ) );
    }

    protected _put( ctx, next ): void {
        return this
            .controller
            .put( ctx )
            .then( entity => this.response( ctx, next, HttpStatus.OK, entity ) )
            .catch( error => this.response( ctx, next, HttpStatus.UNPROCESSABLE_ENTITY, error ) );
    }

    protected _delete( ctx, next ): void {
        return this
            .controller
            .delete( ctx )
            .then( entity => this.response( ctx, next, HttpStatus.OK, entity ) )
            .catch( error => this.response( ctx, next, HttpStatus.UNPROCESSABLE_ENTITY, error ) );
    }

}
