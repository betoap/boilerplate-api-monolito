import HttpStatus from 'http-status';
import { SequelizeRoute } from './../../../core/router';

import { Proxy } from './../../../helper/proxy';
import { UserController } from './../controller/user.controller';

export default class UserRoute extends SequelizeRoute {

    protected controller: UserController = new UserController();

    constructor( config ) {
      super( config );
      this.post( '/login', Proxy.create(this, this.login ) );
    }

    protected login( ctx, next ) {
      return this
          .controller
          .login( ctx )
          .then( entity => this.response( ctx, next, HttpStatus.CREATED, entity ) )
          .catch( error => this.response( ctx, next, HttpStatus.UNPROCESSABLE_ENTITY, error ) );
  }
}

