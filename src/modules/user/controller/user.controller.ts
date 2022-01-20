import { SequelizeController } from './../../../core/controller';

import { UserService } from './../service/user.service';

export class UserController extends SequelizeController {

    protected service: UserService = new UserService;

    login( req ){
      return this.service.login( req );
    }

}
