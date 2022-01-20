import { SequelizeController } from './../../../../core/controller';

import { TagService } from './../service/tag.service';

export class TagController extends SequelizeController {

    protected service: TagService = new TagService;

}
