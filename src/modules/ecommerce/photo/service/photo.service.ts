import { SequelizeService } from './../../../../core/service';

import { PhotoFilter } from './../filter/photo.filter';
import { PhotoRepository } from './../repository/photo.repository';
import PhotoEntity from './../entity/photo.entity';

export class PhotoService extends SequelizeService {

    public filter: PhotoFilter = new PhotoFilter;
    protected repository: PhotoRepository = new PhotoRepository;
    protected entity = PhotoEntity;

}
