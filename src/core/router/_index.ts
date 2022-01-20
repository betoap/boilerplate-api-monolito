import Fs from 'fs';
import Path from 'path';
import koaRouter from 'koa-router';

export class Router extends koaRouter {

    protected _fs = Fs;
    protected _path = Path;

}
