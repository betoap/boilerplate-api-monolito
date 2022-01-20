import { Autentication } from './../service/autentication';
import { Repository } from   './../../../core/repository';
import UserEntity from '../entity/user.entity';

export class UserRepository extends Repository {

  constructor() {
    super();
  }

  public async login( entity, params?:any ): Promise<any> {
    const _user: any = {};
    try {
      const paramsLogin = {...params.where};
      const paramsUser = {...params};
      delete paramsUser.where.password;
      delete paramsUser.where.password_eq;
      const user = await super.findOne( entity, paramsUser );
      if( user.id ) {
        const permissions = await this.getPermissions(user, paramsLogin);
        if(permissions) {
          _user.success = [user];
          const obj = {
            id: user.id,
            name: user.name,
            email: user.email,
            permissions
          }
          const token = Autentication.tokenGenerate( obj );
          _user.token = { token: token.token, expire: token.expire._d };
          return Promise.resolve( _user );
        }
      }
      _user.error = [{ error: 'Usuário / Senha inválidos' }];
      return Promise.resolve( _user );
    } catch (error) {
      _user.error = error;
      return Promise.reject( _user );
    }
  }

  private async getPermissions(user, params) {
    const { email, email_eq, password, password_eq } = params;
    const query = `
      select p.name privilege, r2.name resource
      from users u
      inner join roles r on r.id = u.role_id
      inner join roles_privileges rp on r.id = rp.role_id
      inner join \`privileges\` p on p.id = rp.privilege_id
      inner join resources r2 on r2.id = p.resource_id
      where u.email = :email and u.password = :password
      order by p.name;
    `.replace(/\n|\r/g, '').replace(' ', '').trim();
    const where = {
      email: email || email_eq,
      password: UserEntity.comparePassword(user, password || password_eq),
    }
    const _permissions = await super.query(
      query,
      where
    );
    super.commit();
    if( !_permissions[0] ) return false;
    const permissions = {};
    _permissions[0].forEach( (obj: any) => {
      permissions[obj.privilege] = [...permissions[obj.privilege] || [], obj.resource]
    });
    return permissions;
  }

}
