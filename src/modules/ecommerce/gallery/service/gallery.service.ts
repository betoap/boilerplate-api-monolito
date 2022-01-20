import { SequelizeService } from './../../../../core/service';

import { GalleryFilter } from './../filter/gallery.filter';
import { GalleryRepository } from './../repository/gallery.repository';
import GalleryEntity from './../entity/gallery.entity';

export class GalleryService extends SequelizeService {

    public filter: GalleryFilter = new GalleryFilter;
    protected repository: GalleryRepository = new GalleryRepository;
    protected entity = GalleryEntity;

}
