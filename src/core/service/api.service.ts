import requestPromise from 'request-promise-native';
import { Service } from './service';

export abstract class ApiService extends Service {

    public endpoint: string;

    public constructor( ) {
        super();
    }

    public get( data ) {
        data = {
            query: { ...data.query },
            body: {},
            path: data['endpoint'],
            method: 'get'
        };
        return this.execute( data );
    }

    public post( data ) {
        data = {
            query: { ...data.query },
            body: { ...data.body },
            path: data['endpoint'],
            method: 'post'
        };
        return this.execute( data );
    }

    public put( data ) {
        data = {
            query: { ...data.query },
            body: { ...data.body },
            path: data['endpoint'] + data.url.split('?')[0],
            method: 'put'
        };
        return this.execute( data );
    }

    public delete( data ) {
        data = {
            query: { ...data.query },
            body: { ...data.body },
            path: data['endpoint'] + data.url.split('?')[0],
            method: 'delete'
        };
        return this.execute( data, 'delete' );
    }

    private getValidator( validator ): string {
        switch ( validator ) {
            case 'get':
                return undefined;
            case 'post':
                return 'isValidCreate';
            case 'put':
                return 'isValidUpdate';
            case 'delete':
                return 'isValidDelete';
        }
    }

    private execute( data: IRequest, method?: string ) {
        if ( this.filter && method ) {
            const validate = { ...data.body, ...data.query };
            const filterType = this.getValidator( data.method );
            if ( filterType ) {
                const erros = this.filter[filterType]( validate );
                if ( erros ) {
                    const faultDetail: Array<any> = [];
                    for ( const prop in erros ) {
                        faultDetail.push({ 'text': erros[prop], 'id': 'HTTP_ERROR_406' });
                    }
                    return new Promise ( ( resolve, reject ) => {
                        reject( faultDetail );
                    } );
                }
            }
        }
        data = this.configHeader( data );
        return requestPromise({
            method: data.method,
            uri: `${this.endpoint}/${data.path}${this.queryString( data.query )}`,
            headers: data.headers,
            json: data.body
        });
    }

    private configHeader( data ) {
        if ( ! data.headers ) data.headers = {};
        data.headers['content-type']    = 'application/json';
        return data;
    }

    private queryString( data: any ): string {
        return '?' + Object.keys( data  ).reduce( ( a, k ) => {
            if ( k !== 'region' ) {
              a.push( k + '=' + encodeURIComponent( data[k] ) );
            }
            return a;
        }, [] ).join( '&' );
    }
}

export interface IRequest {
    query?: any;
    method: method;
    path: string;
    endpoint?: string;
    headers?: any;
    body?: any;
}

export type method = 'get' | 'post' | 'put' | 'delete' | 'header';
