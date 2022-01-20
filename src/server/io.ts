import * as SocketIO from 'socket.io';
import compose from'koa-compose';

export class IO {

  protected _io;
  protected middleware;
  protected composed;
  protected listeners;
  protected connections;
  protected opts;
  protected socket;
  protected adapter;
  protected app;

  /**
   * @constructs
   * @param namespace <String> namespace identifier
   */
  constructor( app, opts? ) {
    this.app = app;
    if ( opts && !(typeof opts !== 'string' || opts && typeof opts !== 'object' ) ) {
      throw new Error( 'Incorrect argument passed to koaSocket constructor' );
    }

    // app._io reference
    this._io = null;

    /**
     * List of middlewares, these are composed into an execution chain and
     * evaluated with each event
     * @type <Array:Function>
     */
    this.middleware = [];

    /**
     * Composed middleware stack
     * @type <Function>
     */
    this.composed = null;

    /**
     * All of the listeners currently added to the IO instance
     * event:callback
     * @type <Map>
     */
    this.listeners = new Map();

    /**
     * All active connections
     * id:Socket
     * @type <Map>
     */
    this.connections = new Map();

    /**
     * Configuration options
     * @type <Object>
     */
    if ( typeof opts === 'string' ) {
      opts = {
        namespace: opts
      };
    }
    this.opts = Object.assign({
      /**
       * Namespace id
       * @type <String>
       * @default null
       */
       namespace: null,

       /**
        * Hidden instances do not append to the koa app, but still require attachment
        * @type <Boolean>
        * @default false
        */
       hidden: false,

       /**
        * Options to pass when instantiating socket.io
        * @type <Object>
        * @default {}
        */
       ioOptions: {}
    }, opts );

    /**
     * Holds the socketIO connection
     * @type <Socket.IO>
     */
    this.socket = null;

    this.app._io = SocketIO['default']();
    this.attachNamespace( this.opts.namespace );

    // Bind handlers
    this.onConnection = this.onConnection.bind( this );
    this.onDisconnect = this.onDisconnect.bind( this );
  }

  setOrigins( origins: Array<string> = ['*:*']){
    this.app._io.origins(origins);
  }

  /**
   * Attach to a koa application
   * @param app <Koa app> the koa app to use
   * @param https <Boolean> whether to activate HTTPS
   */
  attach( server ) {

    this.app._io.attach(server)
    // this.app._io = SocketIO.default( server, this.opts.ioOptions );

    if ( this.opts.namespace ) {
      this.attachNamespace( this.opts.namespace );
      return;
    }

    // Local aliases / passthrough socket.io functionality
    this.adapter = this.app._io.adapter.bind(this.app._io);

    // Attach default namespace
    this.app.io = this;

    // If there is no namespace then connect using the default
    this.socket = this.app._io;
    this.socket.on( 'connection', this.onConnection );
  }

  /**
   * Attaches the namespace to the server
   * @param app <Koa app> the koa app to use
   * @param id <String> namespace identifier
   */
  attachNamespace( id ) {
    if ( !this.app._io ) {
      throw new Error( 'Namespaces can only be attached once a socketIO instance has been attached' );
    }

    this.socket = this.app._io.of( id );
    this.socket.on( 'connection', this.onConnection );

    if ( this.opts.hidden ) {
      return;
    }

    if ( this.app[ id ] ) {
      throw new Error( 'Namespace ' + id + ' already attached to koa instance' );
    }

    this.app[ id ] = this;
  }

  /**
   * Pushes a middleware on to the stack
   * @param fn <Function> the middleware function to execute
   */
  use( fn ) {
    this.middleware.push( fn );
    this.composed = compose( this.middleware );

    this.updateConnections();

    return this;
  }

  /**
   * Adds a new listener to the stack
   * @param event <String> the event id
   * @param handler <Function> the callback to execute
   * @return this
   */
  on( event, handler ) {
    if(['connect', 'connection'].includes(event)) {
      this.socket.on(event, handler);
      return this;
    }

    let listeners = this.listeners.get( event );

    // If this is a new event then just set it
    if ( !listeners ) {
      this.listeners.set( event, [ handler ] );
      this.updateConnections();
      return this;
    }

    listeners.push( handler )
    this.listeners.set( event, listeners );
    this.updateConnections();
    return this;
  }

  /**
   * Removes a listener from the event
   * @param event <String> if omitted will remove all listeners
   * @param handler <Function> if omitted will remove all from the event
   * @return this
   */
  off( event, handler ) {
    if ( !event ) {
      this.listeners = new Map();
      this.updateConnections();
      return this;
    }

    if ( !handler ) {
      this.listeners.delete( event );
      this.updateConnections();
      return this;
    }

    let listeners = this.listeners.get( event );
    let i = listeners.length - 1;
    while( i ) {
      if ( listeners[ i ] === handler ) {
        break;
      }
      i--;
    }
    listeners.splice( i, 1 );

    this.updateConnections();
    return this;
  }

  /**
   * Broadcasts an event to all connections
   * @param event <String>
   * @param data <?>
   */
  broadcast( event, data ) {
    this.connections.forEach( ( socket, id ) => socket.emit( event, data ) );
  }

  /**
   * Perform an action on a room
   * @param room <String>
   * @return socket <Object>
   */
  to( room ) {
    return this.socket.to(room);
  }

  /**
   * Triggered for each new connection
   * Creates a new Socket instance and adds that to the stack and sets up the
   * disconnect event
   * @param sock <Socket.io Socket>
   * @private
   */
  onConnection( sock ) {
    /**
     * Adds a specific event and callback to this socket
     * @param event <String>
     * @param data <?>
     */
    sock._on = ( event, handler ) => sock.on( event, ( data, cb ) => {
      let packet = {
        event: event,
        data: data,
        socket: sock,
        acknowledge: cb
      };

      if ( !this.composed ) {
        handler( packet, data );
        return;
      }

      this.composed( packet, () =>
        handler( packet, data )
      );
    });

    /**
     * Registers the new list of listeners and middleware composition
     * @param listeners <Map> map of events and callbacks
     * @param middleware <Function> the composed middleware
     */
    sock.update = ( listeners ) => {
      sock.removeAllListeners();

      listeners.forEach( ( handlers, event ) => {
        if ( event === 'connection' ) {
          return;
        }

        handlers.forEach( handler => sock._on( event, handler ) );
      })
    };

    // Append listeners and composed middleware function
    sock.update( this.listeners );

    this.connections.set( sock.id, sock );
    sock.on( 'disconnect', () => this.onDisconnect( sock ) );

    // Trigger the connection event if attached to the socket listener map
    let handlers = this.listeners.get( 'connection' );
    if ( handlers ) {
      handlers.forEach( handler => handler({
        event: 'connection',
        data: sock,
        socket: sock
      }, sock.id ) );
    }
  }

  /**
   * Fired when the socket disconnects, simply reflects stack in the connections
   * stack
   * @param sock <Socket.io Socket>
   * @private
   */
  onDisconnect( sock ) {
    this.connections.delete( sock.id );
  }

  /**
   * Updates all existing connections with current listeners and middleware
   * @private
   */
  updateConnections() {
    this.connections.forEach( connection => connection.update( this.listeners, this.composed ) );
  }
}
