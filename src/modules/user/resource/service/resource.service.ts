import { SequelizeService } from './../../../../core/service';

import { ResourceFilter } from './../filter/resource.filter';
import { ResourceRepository } from './../repository/resource.repository';
import ResourceEntity from './../entity/resource.entity';

export class ResourceService extends SequelizeService {

    public filter: ResourceFilter = new ResourceFilter;
    protected repository: ResourceRepository = new ResourceRepository;
    protected entity = ResourceEntity;

}
