import { SequelizeController } from './../../../../core/controller';

import { RoleService } from './../service/role.service';

export class RoleController extends SequelizeController {

    protected service: RoleService = new RoleService;

}
