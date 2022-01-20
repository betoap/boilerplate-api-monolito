import { User, Room } from './../../../core/socket/index';
import { Proxy, Event } from './../../../helper';
import { Socket } from './../../../core/socket';

export default class GameSocket extends Socket {

  constructor() {
    super();
    Event.addEventListener( 'user:add', Proxy.create( this, this.addCharacter ) );
    this.io.on( 'msg:all', Proxy.create( this, this.messageAll ) );
    this.io.on( 'character:move', Proxy.create( this, this.move ) )
  }

  private addCharacter( data ) {
    const ctx = data.ctx;
    const user: User = data.user;
    // const position = { x: Math.floor( Math.random() * 6 - 4 ), y: Math.floor( Math.random() * 3 - 1) };
    const position = { x: 0, y: 0 };
    user.properties.character = new Character(
      `name ${ Math.floor( Math.random() * 9999 ) }`,
      'hero',
      10,
      position,
      'up'
    );
    this.move( ctx, { user, position } );
  }

  private move( ctx, data:any ) {
    ctx.socket.emit( 'character:move', data );
    ctx.socket.broadcast.to( data.user.roomName ).emit( 'character:move', data );
    // ctx.socket.emit( 'character:move', data );
    // ctx.socket.emit( 'character:move', { message: 'You has been disconnected' } );
    // ctx.socket.emit( 'character:move', { user: data.user.sid, position: data.position } );
  }

  // TODO
  // connect
  // disconect
  // entrieRoom
  // exitRoom
  // listMemberRoom
  // addUserRoom
  // move
  // createEnermies
  // removeEnermies
  // createBullet
  // removeBullet


  public messageAll( ctx: any, data) {
    const user = this.getUser( ctx.socket.id );
    if ( data.to ) {
      return this.io.socket.sockets.sockets[data.to].emit( 'msg:new', ctx.data );
    }
    ctx.socket.broadcast.to( user.roomName ).emit( 'msg:new', ctx.data );
  }

}


export class Character {

  public name: string;
  public classe: string;
  public level: number;
  public position: any;
  public direction: string;

  constructor( name: string, classe: string, level: number, position: any, direction: string ) {
    this.name = name;
    this.classe = classe;
    this.level = level;
    this.position = position;
    this.direction = direction;
  }

}
// ssh -i "aws-ubuntu-betoap.pem" ubuntu@ec2-35-172-135-126.compute-1.amazonaws.com
// cd ~/workspace/game-rpg-node
// rm -Rf /dist
// pm2 delete all
// pm2 start npm --name start:dev  -- start
