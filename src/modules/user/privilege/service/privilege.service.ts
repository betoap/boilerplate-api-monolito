import { SequelizeService } from './../../../../core/service';

import { PrivilegeFilter } from './../filter/privilege.filter';
import { PrivilegeRepository } from './../repository/privilege.repository';
import PrivilegeEntity from './../entity/privilege.entity';

export class PrivilegeService extends SequelizeService {

    public filter: PrivilegeFilter = new PrivilegeFilter;
    protected repository: PrivilegeRepository = new PrivilegeRepository;
    protected entity = PrivilegeEntity;

}
