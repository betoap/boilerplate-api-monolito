import { Service } from './service';

export abstract class MongoService extends Service {

    protected document: any;

    constructor( ) {
        super();
    }

    public find( data: object ): Promise<any> {
        return this
            .document
            .find( data );
    }

    public count( data: object ): Promise<any> {
        return this
            .document
            .count( data );
    }

    public post( data: any, document?: any ): Promise<any> {
        const errors = this.filter.isValidCreate( data );
        if ( errors ) {
            return new Promise ( ( resolve, reject ) => {
                reject( errors );
            } );
        }
        document = document || this.document;
        return document
            .setData( data )
            .post();
    }

    public put( data: any ): Promise<any> {
        const errors = this.filter.isValidUpdate( data );
        if ( errors ) {
            return new Promise ( ( resolve, reject ) => {
                reject( errors );
            } );
        }
        return this
            .document
            .setData( data )
            .put( data );
    }

    public delete( data: any ): Promise<any> {
        const errors = this.filter.isValidDelete( data );
        if ( errors ) {
            return new Promise ( ( resolve, reject ) => {
                reject( errors );
            } );
        }
        return this
            .document
            .delete( data );
    }
}
