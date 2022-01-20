import { SequelizeController } from './../../../../core/controller';

import { GalleryService } from './../service/gallery.service';

export class GalleryController extends SequelizeController {

    protected service: GalleryService = new GalleryService;

}
