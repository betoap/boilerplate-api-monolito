import { Autentication } from './../modules/user/service/autentication';
// Lib OS
import Path from 'path';
import Http_ from 'http';
import Https from 'https';
import Http2 from 'http2';

// LIBs KOA
import Koa from 'koa';
import Favicon from 'koa-favicon';
import ResponseTime from 'koa-response-time';
import Cors from 'koa2-cors';
import Static from 'koa-static';
import Router from 'koa-router';
import Compress from 'koa-compress';
import Json from 'koa-json';
import BodyParser from 'koa-body';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';
import convert from 'koa-convert';
import koaPlayground from 'graphql-playground-middleware-koa';

// LIBs Third
import Winston from 'winston';
import Glob from 'glob';

// LIBs Owner
import { Logger } from './../helper/logger';
import { Graphql } from '../core/graphql';

export class HttpServer extends Koa {

  public serverConfig;
  private _corsConfig: object;
  private _compressConfig: object;
  private _log: Logger;
  private _jwtConfig;
  private _bodyParserConfig;
  private _glob;
  private _servers;

  constructor() {
    super();
    this._servers = {};
    this._glob = Glob.Glob;
    this._log = new Logger(Winston, './errors.log');
    this.serverConfig = require('./../config/.server');
    this._corsConfig = require('./../config/.cors');
    this._compressConfig = require('./../config/.compress');
    this._jwtConfig = require('./../config/.jwt');
    this._bodyParserConfig = require('./../config/.bodyparser');
    this.config();
    this.middlewares();
    this.routers();
  }

  public start(): void {
    try {
      this._servers.http =
        Http_
          .createServer(this.callback())
          .listen(this.serverConfig.http.port || 3000, () => {
            console.info('\n\r===========================================');
            console.info(`🌹 Server HTTP running on http://${this.serverConfig.domain}:${this.serverConfig.http.port}`);
          });
    } catch (error) {
      console.info('===========================================');
      console.error('🥀 Failed to start HTTP server\n', error, (error && error.stack));
      console.info('===========================================');
    }
    try {
      this._servers.https =
        Https
          .createServer(this.serverConfig.https.options, this.callback())
          .listen(this.serverConfig.https.port || 3001, () => {
            console.info(`🌹 Server HTTPS running on https://${this.serverConfig.domain}:${this.serverConfig.https.port}`);
          });
    } catch (error) {
      console.info('===========================================');
      console.error('🥀 Failed to start HTTPS server\n', error, (error && error.stack));
      console.info('===========================================');
    }

    try {
      this._servers.http2 =
        Http2
          .createSecureServer(this.serverConfig.https.options, this.callback())
          .listen(this.serverConfig.http2.port || 3002, () => {
            console.info(`🌹 Server HTTPS2 running on https://${this.serverConfig.domain}:${this.serverConfig.http2.port}`);
            console.info('===========================================');
          });
    } catch (error) {
      console.info('===========================================');
      console.error('🥀 Failed to start HTTPS2 server\n', error, (error && error.stack));
      console.info('===========================================');
    }
  }
  private config(): void {
    const p = Path.join(__dirname, '../public/upload/nova');
    console.log(p);

    this
      .use(ResponseTime({ hrtime: true }))
      .use(Cors(this._corsConfig))
      .use(BodyParser(this._bodyParserConfig)) // {dest: 'uploads/'}
      .use(Favicon(Path.join(__dirname, '../favicon.ico')))
      .use(Static(Path.join(__dirname, '../public/'))) // {dest: 'uploads/'}
      .use(Json())
      .use(this._log.config())
      .use(Compress(this._compressConfig))
  }

  private middlewares(): any {
    if (this._jwtConfig.active) {
      this.use(async (ctx, next) => {
        return new Autentication().tokenValidation(ctx, next);
      });
      // new Autentication().tokenValidation(this, ctx, next); // .validaToken();
    }

    const schema = new Graphql().execute();
    this.use(mount('/playground', convert(
      graphqlHTTP((request, header, ctx) => {
        if(ctx.header['content-type'].includes('multipart/form-data;') && ctx.request.body.operations) {
          let bodyReal:any = JSON.parse(ctx.request.body.operations);
          let body:any = bodyReal.variables;
          const map = JSON.parse(ctx.request.body.map);
          for( const file in map){
            const field = map[file].shift().replace('variables.', '');
            body = { ...body, [field]: ctx.request.files[file] };
          }
          ctx.request.body = { ...bodyReal, variables: body  };
        }

        return {
          schema,
          graphiql: true,
          pretty: true,
          context: { ctx },
        };
      })
    )));
  }

  private routers() {
    console.info(`===========================================`);
    console.info(`Definindo rotas REST para projeto`);
    console.info(`/`);
    const router = new Router();


    /***** PagSeguro *****/

    router.post('/retornoPagseguro', async (ctx, next) => {
      const fs = require('fs');
      fs.writeFile('./retornoPagseguro.txt', JSON.stringify(ctx), function (erro) {
        if (erro) {
          throw erro;
        }
      });
      ctx.body = ctx;
      ctx.status = 200;
      await next();
    });
    router.post('/revisaoPagseguro', async (ctx, next) => {
      const fs = require('fs');
      fs.writeFile('./revisaoPagseguro.txt', JSON.stringify(ctx), function (erro) {
        if (erro) {
          throw erro;
        }
      });
      ctx.body = ctx;
      ctx.status = 200;
      await next();
    });
    router.post('/notificacaoPagseguro', async (ctx, next) => {
      const fs = require('fs');
      fs.writeFile('./notificacaoPagseguro.txt', JSON.stringify(ctx), function (erro) {
        if (erro) {
          throw erro;
        }
      });
      ctx.body = ctx;
      ctx.status = 200;
      await next();
    });

    /*** ***/
    router.get('', async (ctx, next) => {
      ctx.body = { message: 'Bem vindo a api: Arte Com Carinho' };
      ctx.status = 200;
      await next();
    });

    // graphql
    router.get('/graphql', koaPlayground({ endpoint: '/playground' }));

    this
      .use(router.routes());

    const pattern = '{./dist/modules/**/route/index.js,./dist/modules/**/route/*.route.js,./dist/modules/**/route/*.routes.js}';
    const options = { sync: true, dot: true, mark: false, ignore: ['./dist/modules/core/route/*.js'] };
    const files = this._glob(pattern, options);
    files.found.forEach((archive) => {
      let name = archive.replace('./dist/modules/', '');
      name = (name.split('/route/')[0]).toLowerCase();
      if (name == '/core') return;
      const module = require(`../../${archive}`);
      const route = new module.default({ prefix: `/${name}` });
      console.info(`/${name}`);
      this.use(route.routes());
    });
    console.info(`===========================================`);
  }

  public getServer() {
    return this._servers;
  }
}

