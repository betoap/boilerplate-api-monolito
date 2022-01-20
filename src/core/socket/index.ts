import { Proxy, Dictionary, Event } from './../../helper';

export abstract class Socket {

  public static _socket: any;
  public static _listUser: Dictionary<string, User> = new Dictionary();
  public static _maxConnection: number;
  public static _maxConnectionPerRoom: number;
  public static _roomDefault: string;

  protected io: any;
  protected roomDefault: string;
  protected listUser: Dictionary<string, User>;
  protected rooms: Dictionary<string, Room> = new Dictionary<string, Room>();
  protected event: Event;

  public constructor() {
    this.io = Socket._socket;
    this.listUser = Socket._listUser;
    this.roomDefault = Socket._roomDefault;
    this.io.on( 'connection', Proxy.create( this, this.connection ) );
    this.io.on( 'disconnect', Proxy.create( this, this.disconnect ) );
    this.io.on( 'login:user', Proxy.create( this, this.addUser ) );
    this.io.on( 'user:me', Proxy.create( this, this.getUser ) );
    this.io.on( 'user:member', Proxy.create( this, this.getMember ) );
    this.io.on( 'room:members', Proxy.create( this, this.getMembers ) );
    this.io.on( 'room:rooms', Proxy.create( this, this.getRooms ) );
    this.io.on( 'room:room', Proxy.create( this, this.room ) );
  }

  private connection( socket ) {
    socket.emit( 'login:preconnection', { message: 'Please do login' } );
    console.log(socket.id);
    let sequenceNumberByClient = new Map();
    sequenceNumberByClient.set(socket, 1);
    // sends each client its current sequence number
    setInterval(() => {
      for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
          client.emit("seq-num", sequenceNumber);
          sequenceNumberByClient.set(client, sequenceNumber + 1);
      }
    }, 1000);

  }

  private disconnect( ctx ) {
    const user = this.getUser( ctx.socket.id );
    if( !user ) return;
    ctx.socket.emit( 'login:loggout', { message: 'You has been disconnected' } );
    this.leaveRoom( ctx.socket, user.roomName )
    this.removeUser( ctx.socket.id );
    ctx.socket.broadcast.to( user.roomName ).emit( 'user:disconnected', { message: 'User abandoned room', user } );
  }

  public addUser( ctx, data ) {
    if ( this.checkLimitUser( ctx.socket ) ) return;
    const user: User = new User( ctx.socket.id, data.id , data.name, this.roomDefault );
    this.listUser.set( ctx.socket.id, user );
    const room = this.enterRoom( ctx.socket, user.roomName, false );
    if ( room ) {
      Event.dispatchEvent( 'user:add', { ctx, user } );
      ctx.socket.emit( 'user:connected', user );
      this.updateList( ctx.socket, user, room );
    }
  }

  public removeUser( sid: string ) {
    this.listUser.delete( sid );
  }

  public getUser( sid: string ) {
    return this.listUser.get( sid );
  }

  public user( ctx ) {
    const socket = ctx.socket;
    const user: User = this.getUser( socket.id );
    socket.emit( 'user:me', user );
  }

  private checkLimitUser( socket ) {
    if( Socket._maxConnection <= this.listUser.size ) {
      socket.emit( 'login:reject', { message: 'Full room' } );
      socket.disconnect();
      return true;
    }
    return false;
  }

  protected getRoom( name ): Room {
    if( this.rooms.has(name) ) {
      return this.rooms.get(name);
    }
    this.rooms.set( name, new Room( name ) );
    return this.rooms.get(name);
  }

  protected enterRoom( socket, roomName, isUpdateList: boolean = true ) {
    const user = this.getUser( socket.id );
    if( !user ) return;
    const room: Room = this.getRoom( roomName );
    const userHasRoom: any = room.hasMember( user );
    if( user.roomName === roomName && userHasRoom ) return room;
    if( Socket._maxConnectionPerRoom <= room.countMembers ) {
      socket.emit( 'room:reject', { message: 'Full room' } );
      return;
    }
    if( user.roomName !== roomName ) this.leaveRoom( socket, user.roomName );
    user.roomName = roomName;
    room.addUser( user );
    socket.join( user.roomName );
    if( isUpdateList ) {
      socket.emit( 'room:enter', { roomName: user.roomName } );
      this.updateList( socket, user, room );
    }
    return room;
  }

  protected leaveRoom( socket, roomName: string ) {
    const user = this.getUser( socket.id );
    const room = this.getRoom( roomName );
    if ( !user || !room || roomName !== user.roomName ) return;
    room.removeUser( user );
    socket.leave( user.roomName );
    socket.emit( 'room:leave', { roomName: user.roomName }  );
    this.updateList( socket, user, room );
  }

  private updateList( socket, user, room ){
    socket.emit( 'user:list', { members: room.members } );
    socket.broadcast.to( user.roomName ).emit( 'user:new', user );
  }


  private getMember( ctx, data ) {
    const socket = ctx.socket;
    const user: User = this.getUser( data.sid );
    socket.emit( 'user:member', user );
  }

  private getMembers( ctx, data ) {
    const socket = ctx.socket;
    let roomName: string = data.roomName;
    if( !data.roomName ) {
      const user: User = this.getUser( ctx.socket.id );
      roomName = user.roomName;
    }
    const room: Room = this.getRoom( roomName );
    socket.emit( 'room:members', { members: room.members } );
  }

  private room( ctx, data ) {
    const socket = ctx.socket;
    let roomName: string = data.roomName;
    if( !data.roomName ) {
      const user: User = this.getUser( ctx.socket.id );
      roomName = user.roomName;
    }
    const room: Room = this.getRoom( roomName );
    socket.emit( 'room:room', room );
  }

  private getRooms( ctx ) {
    const socket = ctx.socket;
    socket.emit( 'room:rooms', this.rooms );
  }

}

export class User {

  public sid: string;
  public id: string;
  public name: string;
  public roomName: string;
  public properties: any;

  constructor( sid?: string, id?: string, name?: string, roomName?: string ) {
    this.sid = sid;
    this.id = id;
    this.name = name;
    this.roomName = roomName;
    this.properties = {};
  }

}

export class Room {
  private _name: string;
  private _members: Array<User>;

  constructor( name?: string ) {
    this._name = name;
    this._members = new Array<User>();
  }
  public set name ( name: string ) {
    if( this._name !== name ) {
      this._name = name;
    }
  }
  public get name ( ): string {
      return this._name;
  }
  public addUser( user: User ): boolean {
    const userExist = this._members.find( ( _user: User ) => _user.sid === user.sid );
    if( !userExist ) {
      this._members  = [...this._members, user];
      return true;
    }
    return false;
  }
  public removeUser( user: User ): void {
    this._members = this._members.filter( ( _user: User ) => _user.sid !== user.sid );
  }

  public get countMembers(): number {
    return this._members.length;
  }

  public get members(){
    return this._members;
  }

  public hasMember( user: User ) {
    this.members.find( ( member ) => {
      return member.sid === user.sid;
    });
  }
}
