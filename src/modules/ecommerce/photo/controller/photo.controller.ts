import { SequelizeController } from './../../../../core/controller';

import { PhotoService } from './../service/photo.service';

export class PhotoController extends SequelizeController {

    protected service: PhotoService = new PhotoService;

}
