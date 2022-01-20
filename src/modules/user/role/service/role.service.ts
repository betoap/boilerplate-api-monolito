import { SequelizeService } from './../../../../core/service';

import { RoleFilter } from './../filter/role.filter';
import { RoleRepository } from './../repository/role.repository';
import RoleEntity from './../entity/role.entity';

export class RoleService extends SequelizeService {

    public filter: RoleFilter = new RoleFilter;
    protected repository: RoleRepository = new RoleRepository;
    protected entity = RoleEntity;

}
