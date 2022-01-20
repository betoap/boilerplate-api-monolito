import Glob from 'glob';
import { IO } from './io';
import { HttpServer } from './';
import { Socket } from './../core/socket';

export class SocketServer extends IO {

  private socketConfig;
  private _glob;

  constructor( application: HttpServer ) {
    super( application );
    this._glob = Glob.Glob;
    this.socketConfig = require('./../config/.socket');
    try {
      this.attach( application.getServer().http );
      console.info('===========================================');
      console.info(`🌹 Server SOCKECT-WS running on ws://${application.serverConfig.domain}:${application.serverConfig.http.port} `);
    } catch ( error ) {
      console.error('🥀 Failed to start SOCKECT-WS server\n', error, (error && error.stack));
    }
    try {
      this.attach( application.getServer().https );
      console.info(`🌹 Server SOCKECT-WSS running on wss://${application.serverConfig.domain}:${application.serverConfig.https.port}`);
    } catch ( error ) {
      console.error('🥀 Failed to start SOCKECT-WSS server\n', error, (error && error.stack));
    }
    try {
      this.attach( application.getServer().http2 );
      console.info(`🌹 Server SOCKECT-HTTP2 running on http2://${application.serverConfig.domain}:${application.serverConfig.http2.port} `);
      console.info('===========================================');
    } catch ( error ) {
      console.error('🥀 Failed to start SOCKECT-HTTP2 server\n', error, (error && error.stack));
    }
    Socket._socket = this;
    Socket._maxConnection = this.socketConfig.maxConnection;
    Socket._maxConnectionPerRoom = this.socketConfig.maxConnectionPerRoom;
    Socket._roomDefault = this.socketConfig.roomDefault;
    this.loadModules();
  }

  private loadModules(){
    const pattern = '{./dist/modules/**/socket/index.js,./dist/modules/**/socket/*.socket.js}';
    const options = { sync: true, dot: true, mark: false, ignore: [ './dist/modules/core/socket/*.js' ] };
    const files = this._glob( pattern, options );
    files.found.forEach( ( archive ) => {
      let name = archive.replace( './dist/modules/', '' );
      name = ( name.split( '/socket/' )[0] ).toLowerCase();
      if ( name == '/core') return;
      const module = require( `../../${archive}` );
      new module.default();
    });
  }


}
