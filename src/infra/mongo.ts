const mongoose:any = require('mongoose')

export class MongodbFactory {

    private static _instance;

    public static getConnection () {
        if ( !this._instance ) {
            const dbURI:string = this.getStringConnection();
            try {
                this._instance = mongoose;
                this._instance.Promise = global.Promise;
                this._instance.connect( dbURI ,  { useNewUrlParser: true, bufferMaxEntries: 0 } );
            } catch (e) {
                console.error(e);
            }
        };
        this.listens();
        return this._instance;
    }

    private static getStringConnection (): string {
        const _credential:any = require('./../config/.mongodb');
        return ( _credential.host === 'localhost' ) ?
            _credential.dialect+'://'+_credential.host+'/'+_credential.database+'?ssl='+_credential.ssl
            :
            _credential.dialect+'://'+_credential.user+':'+_credential.password+'@'+_credential.host+':'+_credential.port+'/'+_credential.database+'?ssl='+_credential.ssl;
    }

    private static listens() {
        this._instance.connection.addListener('connected', MongodbFactory.connected );
        this._instance.connection.addListener('error', MongodbFactory.error );
        this._instance.connection.addListener('disconnected', MongodbFactory.disconnected );
        this._instance.connection.addListener('open', MongodbFactory.open );
        this._instance.connection.addListener('SIGINT', MongodbFactory.SIGINT );
        this._instance.connection.addListener('reconnected', MongodbFactory.reconnected );
        this._instance.connection.addListener('connecting', MongodbFactory.connecting );
        this._instance.connection.addListener('disconnecting', MongodbFactory.disconnecting );
        this._instance.connection.addListener('close', MongodbFactory.close );
        this._instance.connection.addListener('fullsetup', MongodbFactory.fullsetup );
        this._instance.connection.addListener('all', MongodbFactory.all );
    }

    private static open() {
        console.log('Mongoose default connection is open');
    }

    private static connected() {
        console.log('Mongoose default connection open to ' + MongodbFactory.getStringConnection ());
    }

    private static connecting( ) {
        console.log('Mongoose default connecting open to ' + MongodbFactory.getStringConnection ());
    }

    private static reconnected( ) {
        console.log('Mongoose default reconnected open to ' + MongodbFactory.getStringConnection ());
    }

    private static error( err: Error ) {
        console.log('Mongoose default connection error: ' + err);
        process.exit( 1 );
    }

    private static disconnected() {
        console.log('Mongoose default connection disconnected');
    }

    private static disconnecting() {
        console.log('Mongoose default connection disconnecting');
    }

    private static close() {
        console.log('Mongoose default connection close');
    }

    private static fullsetup() {
        console.log('Mongoose default connection is fullsetup')
    }

    private static all() {
        console.log('Mongoose default connection is all')
    }

    private static SIGINT() {
        this._instance.connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }
}

