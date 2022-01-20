import { Model, Sequelize } from 'sequelize-typescript';

import { ConnectFacoty } from './../../infra/sequelize';
import { Transaction } from 'sequelize/types';

export class Repository {

    protected connection: Sequelize;
    private _transaction: Transaction;

    constructor() {
      this.connection = ConnectFacoty.getConnection();
      this._transaction = undefined;
    }

    public query(query: string, values?) {
      return this.transaction().then((t) => {
        return this.connection.query({query, values});
      });
    }

    public async transaction(autocommit: boolean = true) {
      try {
        this._transaction = await this.connection.transaction({ autocommit });
      } catch ( error ) {
        return Promise.reject( error );
      }
    }

    public commit() {
        let action: Promise<any>;
        try {
            action = this._transaction.commit();
            return action;
        } catch ( error ) {
            action = this._transaction.rollback();
        }
        this._transaction = undefined;
        return action;
    }

    public find( entity, params?: IParams ): Promise<any> {
        return this.findAll( entity, params );
    }

    public findBy( entity, params: IParams ): Promise<any> {
        if ( Object.keys( params.where ).length === 0 )
            return Promise.reject( 'Error: Cannot read property "where" ' );
        return this.findAll( entity, params );
    }

    public findOne( entity, params?: IParams ): Promise<any> {
        try {
            let where = undefined;
            if ( params.where ) {
                const w = new Wheres();
                const _w = w.objectToArray( params.where );
                where = w.mountQuery( _w ) || undefined;
            }
            if ( !params.includes ) params.includes = entity.getRelations();
            return entity.findOne({
                where: where,
                attributes: params.fields,
                include: params.includes,
                transaction: this._transaction
            });
        } catch ( error ) {
            return Promise.reject( error );
        }
    }

    public findAll( entity, params?: IParams ): Promise<any> {
        let where = undefined;
        if ( params.where ) {
            const w = new Wheres();
            const _w = w.objectToArray( params.where );
            where = w.mountQuery( _w ) || undefined;
        }
        if ( !params.order ) params.order = [];
        if ( !params.includes ) params.includes = entity.getRelations();
        if ( !params.offset || params.offset < 0 ) params.offset = 0;
        if ( params.limit && params.limit <= 0 ) params.limit = 1;
        params.offset = ( params.limit ) ? params.offset * params.limit : undefined;
        try {
          return entity.findAll({
            where: where,
            attributes: params.fields,
            offset: params.offset,
            limit: params.limit,
            order: [ ...params.order ],
            include: params.includes,
            transaction: this._transaction
          });
        } catch ( error ) {
          return Promise.reject( error );
        }
    }

    public count( entity, params?: IParams ): Promise<any> {
        try {
            let where = undefined;
            if ( params.where ) {
                const w = new Wheres();
                const _w = w.objectToArray( params.where );
                where = w.mountQuery( _w ) || undefined;
            }
            return entity.count({
                where: where,
                transaction: this._transaction
            });
        } catch ( error ) {
            return Promise.reject( error );
        }
    }

    public get( entity, params?: IParams ): Promise<any> {
        return this.find( entity, params );
    }

    public async create( entity, data: object ): Promise<any> {
        try {
            const response = { error: [], success: [] };
            const resp = await entity.create( data, { transaction: this._transaction } );
            response.success.push( resp );
            return Promise.resolve( response );
        } catch ( error ) {
            return Promise.reject( error );
        }
    }

    public async update( entity, data: object, _where?: object ): Promise<any> {
        let errors;
        try {
            errors = entity.isValid( data );
        } catch ( error ) {
            return Promise.reject( 'Error: Cannot read property "isValid"' );
        }
        if ( !errors ) {
            try {
                const response = { error: [], success: [] };
                const entities: Array<Model<any>> = await this.findBy( entity, this.prepare( _where ) );
                for (const _entity of entities) {
                    try {
                        await entity.update( data, { where: { id: _entity.id }, transaction: this._transaction } );
                        const resp = await this.findOne( entity, { where: { id: _entity.id } });
                        response.success.push( resp );
                    } catch ( error ) {
                        response.error.push( { _entity, error } );
                    }
                }
                return Promise.resolve( response );
            } catch ( error ) {
                return Promise.reject( error );
            }
        }
        return Promise.reject( errors );
    }

    public async delete( entity, _where?: object ): Promise<any> {
        let errors;
        try {
            errors = entity.isValid( _where );
        } catch ( error ) {
            return Promise.reject( 'Error: Cannot read property "isValid"' );
        }
        if ( !errors ) {
            try {
                const response = { error: [], success: [] };
                const entities: Array<Model<any>> = await this.findBy( entity, this.prepare( _where ) );
                for (const _entity of entities) {
                    try {
                        await entity.destroy( { where: { id: _entity.id }, transaction: this._transaction } );
                        response.success.push( _entity );
                    } catch ( error ) {
                        response.error.push( { _entity, error } );
                    }
                }
                return Promise.resolve( response );
            } catch ( error ) {
                return Promise.reject( error );
            }
        }
        return Promise.reject( errors );
    }



    private prepare( where ): IParams {
        return {
            fields: undefined,
            where,
            limit: undefined,
            offset: undefined
        };
    }
}

class Wheres {

    public objectToArray( data ): Array<object> {
        return Object.keys( data ).map( (key) => new Object( {[key]: data[key]} ) );
    }

    public mountQuery ( arr: Array<object> ) {
        let response = {};
        arr.forEach( (item: any) => {
            const key1 = Object.keys( item )[0];
            if ( key1 === 'AND' || key1 === 'OR' ) {
                const _key1: any = this.getAndOr( key1 );
                response[_key1] = response[_key1] ? response[_key1] : [];
                item[key1].forEach( item1 => {
                    const key2 = Object.keys( item1 )[0];
                    if ( key2 === 'AND' || key2 === 'OR' ) {
                        const _key2: any = this.getAndOr( key2 );
                        response[_key1] = response[_key1][_key2] ? { ...response[_key1] } : { [_key2]: []};
                        item1[key2].forEach( item2 => {
                            response[_key1][_key2].push( this.getType( item2 ) );
                        });
                        return;
                    }
                    response[_key1].push( this.getType( item1 ) );
                });
                return;
            }
            response = { ...response, ...this.getType( item ) };
        });
        return response;
    }

    getType( data ) {
        const field = { field: undefined, value: undefined };
        for ( const _field in data ) {
            field.field = _field;
            field.value = data[_field];
        }
        return this.whereType(field);
    }

    private types(): Array<string> {
        return [
             '_not',
             '_in',
             '_not_in',
             '_eq',
             '_not_eq',
             '_lt',
             '_lte',
             '_gt',
             '_gte',
             '_contains',
             '_not_contains',
             '_starts_with',
             '_not_starts_with',
             '_ends_with',
             '_not_ends_with'
           ];
    }

    private searchField ( field ) {
        const condition = this.types().reduce( ( acc, condition ) => {
          return ( new RegExp( condition + '$', 'gm').test( field ) ) ?  { length: Math.max( acc.length, condition.length ), condition } : acc;
        }, { length: 0, condition: undefined } );
        const fieldLength = field.length;
        return { field: field.substring(-fieldLength, fieldLength - condition.length), condition: condition.condition };
    }

    private getAndOr( type: string ) {
        const Op = Sequelize['Op'];
        switch ( type ) {
            case 'OR':
              return Op.or;
            case 'AND':
            default:
              return Op.and;
        }
    }

    private whereType( objQuery ) {
        const field = this.searchField( objQuery.field );
        const Op = Sequelize['Op'];
        const response = {};
        switch ( field.condition ) {
          case '_eq':
            response[field.field] = { [Op.eq]: objQuery.value };
            break;
          case '_not':
            response[field.field] = { [Op.not]: objQuery.value };
            break;
          case '_in':
            response[field.field] = { [Op.in]: objQuery.value };
            break;
          case '_not_in':
            response[field.field] = { [Op.notIn]: objQuery.value };
            break;
          case '_lt':
            response[field.field] = { [Op.lt]: objQuery.value };
            break;
          case '_lte':
            response[field.field] = { [Op.lte]: objQuery.value };
            break;
          case '_gt':
            response[field.field] = { [Op.gt]: objQuery.value };
            break;
          case '_gte':
            response[field.field] = { [Op.gte]: objQuery.value };
            break;
          case '_contains':
            response[field.field] = { [Op.substring]: objQuery.value };
            break;
          case '_not_contains':
            response[field.field] = { [Op.lt]: objQuery.value };
            break;
          case '_starts_with':
            response[field.field] = { [Op.starstWith]: objQuery.value };
            break;
          // case '_not_starts_with':
          //   response[field.field] = { [Op.endsWith]: objQuery.value };
          //   break;
          case '_ends_with':
            response[field.field] = { [Op.endsWith]: objQuery.value };
            break;
          // case '_not_ends_with':
          //   response[field.field] = { [Op.lt]: objQuery.value };
          //   break;
          default:
            response[field.field] = { [Op.eq]: objQuery.value };
            break;
        }
        return response;
    }
}

export interface IParams {
    fields?: object;
    where?: object;
    limit?: number;
    offset?: number;
    order?: Array<string>;
    includes?: Array<any>;
}
