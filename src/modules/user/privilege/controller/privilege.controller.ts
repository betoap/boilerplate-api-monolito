import { SequelizeController } from './../../../../core/controller';

import { PrivilegeService } from './../service/privilege.service';

export class PrivilegeController extends SequelizeController {

    protected service: PrivilegeService = new PrivilegeService;

}
