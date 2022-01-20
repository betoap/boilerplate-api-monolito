import { SequelizeService } from './../../../core/service';

import { UserFilter } from './../filter/user.filter';
import { UserRepository } from './../repository/user.repository';
import UserEntity from './../entity/user.entity';

export class UserService extends SequelizeService {

    public filter: UserFilter = new UserFilter;
    protected repository: UserRepository = new UserRepository;
    protected entity = UserEntity;

    public login( data ) {
      return this
        .repository
        .login( this.entity, data );
    }

}
