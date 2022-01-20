import { method } from './../../../core/service/api.service';
import * as jwt from 'jwt-simple';
import moment from 'moment';
import { query } from 'winston';
moment.locale('pt-BR');
const jwtConfig:any = require('./../../../config/.jwt');

export class Autentication {

  public static validate( ctx, next? ) {
    if( !next ) next = (o) => { return o; };
    let originalUrl = ctx.originalUrl.split('/').pop().replace('?', '');
    if(originalUrl === 'graphql' || originalUrl === 'playground') {
      originalUrl = ctx.method === 'GET' ? originalUrl : ctx.request.body.operationName;
      const query = ctx.request.body.query;
      if(query) {
        originalUrl = ( query.match('^mutation') ) ?
          ctx.request.body.query.split('(').shift().split(' ').pop() :
          ctx.request.body.query.split('{', 2).pop().trim().split('{').shift().trim();
      }
      if(ctx.request.body.operations){
        originalUrl = JSON.parse(ctx.request.body.operations).operationName;
      }
    }

    if(jwtConfig.moduleAccess.indexOf(originalUrl) >= 0 || ctx.originalUrl === '/') {
      return next();
    }

    const token = ctx.header[jwtConfig.header];
    if ( token && token.length >= 0 ) {
      try {
        const decoded = jwt.decode(token, jwtConfig.key);
        if ( decoded.exp  && decoded.exp <= Date.now() ) {
          ctx.status = 401;
          ctx.body = 'Não autorizado: o token exprirou.';
          return 'expressed';
          // throw new Error('Não autorizado: o token exprirou.');
        }
        ctx.userLogin = decoded;
        ctx.resource = 'algo aqui: resource';
        ctx.privilege = 'algo aqui: privilege';
        return next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = 'Não autorizado: token inválido.';
        return 'invalid';
        // throw new Error('Não autorizado: token inválido.');
      }
    }
    ctx.status = 401;
    ctx.body = 'Não autorizado: token não encontrado no HEADER.';

    return 'no-token';
    // throw new Error('Não autorizado: token não encontrado no HEADER.');
  }

    public tokenValidation( ctx, next ) {
      // return next();
      return Autentication.validate( ctx, next );
    }

    public static tokenGenerate( payload: any = {}): any {
        const response: any = {};
        const expire: boolean = jwtConfig.expire != undefined;
        let expires: any;
        if ( expire ) {
            expires = moment().add(jwtConfig.expire, 'minutes');
            response.expire = expires;
            payload.exp = expires;
        }
        let token = jwt.encode(payload, jwtConfig.key);
        response.token = token;
        return response;
    }
}

// const t = { id: 1, name: 'asd', email: 'email' };
// const _jwt = Autentication.tokenGenerate({}, t);
// console.log( _jwt );
