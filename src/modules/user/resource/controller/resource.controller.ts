import { SequelizeController } from './../../../../core/controller';

import { ResourceService } from './../service/resource.service';

export class ResourceController extends SequelizeController {

    protected service: ResourceService = new ResourceService;

}
