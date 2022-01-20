import Fs from 'fs';
import Path from 'path';
import koaRouter from 'koa-router';

export class Route extends koaRouter {

    protected _fs = Fs;
    protected _path = Path;
    protected controller: any;

    public response( ctx: any, next: any, status?: any, data?: object ): void {
        ctx.status = status;
        ctx.body = data;
        return next();
        // if( status >= 200 && status < 300 && res['token'] ) {
        //     ctx.set({ token: res['token'] });
        //     data.token = res["token"];
        // }
        // status = data.statusCode || status;
        // ctx.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        // ctx.header('Expires', '-1');
        // ctx.header('Pragma', 'no-cache');
        // if( ctx.query.sleepApi ) {
        //     return setTimeout( () => res.status(status).json(data), req.query.sleepApi * 1000 )
        // }
        // return res.status(status).json(data);
    }
}
