import { Repository } from '../repository/repository';
import { Service } from './service';

export abstract class SequelizeService extends Service {

    protected repository: Repository;
    protected entity;

    public constructor() {
        super();
        this.repository = new Repository();
    }

    public async find( data ): Promise<any> {
      try {
        const paginate = await this.returnWithCount( data );
        const response = await this.findAll( data );
        return Promise.resolve( { response, paginate });
      } catch (error) {
        return Promise.reject( error );
      }
    }

    public async findBy( data ): Promise<any> {
      try {
        const paginate = await this.returnWithCount( data );
        const response = await this.repository.findBy( this.entity, data );
        return Promise.resolve( { response, paginate });
      } catch (error) {
        return Promise.reject( error );
      }
    }

    public async findOne( data?: object ): Promise<any> {
      try {
        const response = await this.repository.findOne( this.entity, data );
        return Promise.resolve( response );
      } catch (error) {
        return Promise.reject( error );
      }
    }

    public async findAll( data?: object ): Promise<any> {
      try {
        const paginate = await this.returnWithCount( data );
        const response = await this.repository.findAll( this.entity, data );
        return Promise.resolve( { response, paginate } );
      } catch (error) {
        return Promise.reject( error );
      }
    }

    public count( data?: object ): Promise<any> {
        return this
            .repository
            .count( this.entity, data );
    }

    public save( data: object ): Promise<any> {
        const errors = this.filter.isValidCreate( data );
        if ( errors ) {
            return new Promise ( ( resolve, reject ) => {
                reject( errors );
            } );
        }
        return this
            .repository
            .create( this.entity, data );
    }

    public create( data: object ): Promise<any> {
        const errors = this.filter.isValidCreate( data );
        if ( errors ) {
            return new Promise ( ( resolve, reject ) => {
                reject( errors );
            } );
        }
        return this
            .repository
            .create( this.entity, data );
    }

    public update( data: object, where: object ): Promise<any> {
        const errors = this.filter.isValidUpdate( data );
        if ( errors ) {
            return new Promise ( ( resolve, reject ) => {
                reject( errors );
            } );
        }
        return this
            .repository
            .update( this.entity, data, where );
    }

    public delete( where: object ): Promise<any> {
        const errors = this.filter.isValidDelete( where );
        if ( errors ) {
            return new Promise ( ( resolve, reject ) => {
                reject( errors );
            } );
        }
        return this
            .repository
            .delete( this.entity, where );
    }

    private async returnWithCount( _data: any ){
      try {
        const data = { ..._data };
        const count = await this.repository.count( this.entity, data );
        const paginator: any = { count: count || 0, prevPage: 0, nextPage: 0 };
        if( count <=1 ) return Promise.resolve( paginator );
        data.offset = data.offset || 0;
        data.limit = data.limit || 0;
        if ( data.offset && data.offset < 0 ) data.offset = 0;
        if ( data.limit && data.limit <= 0 ) data.limit = 1;
        paginator.nextPage = Math.ceil( ( count / data.limit ) - 1 );
        paginator.prevPage = Math.ceil( ( count / data.limit ) - 1 ) - 1;
        if( data.offset > 0 ) {
          paginator.prevPage = data.offset - 1;
        }
        if( data.offset <= 0 ) {
          paginator.prevPage = 0;
        }
        if( data.limit * data.offset + 1 < count ) {
          paginator.nextPage = data.offset + 1;
        }
        if( data.limit * data.offset + 1 >= count ) {
          paginator.prevPage = paginator.nextPage - 1;
        }

        // if( count === 0 ) return Promise.reject({ code: 404 });
        return Promise.resolve( paginator );
      } catch (error) {
        return Promise.reject(error);
      }
    }
}
