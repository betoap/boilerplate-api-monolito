import Koa from 'koa';
import Winston from 'winston';

export class Logger {

  private _winstonInstance;
  private _pathFile: string;

  constructor( winstonInstance, pathFile: string ) {
      this._winstonInstance = winstonInstance;
      this._pathFile = pathFile;
  }

  public config() {
    this
      ._winstonInstance
      .configure({
          level: 'warn',
          transports: [
            // - Write all logs error (and below) to `error.log`.
            new Winston.transports.File({ filename: this._pathFile }),
            // - Write to all logs with specified level to console.
            new Winston.transports.Console({ format: Winston.format.combine(
              Winston.format.colorize(),
              Winston.format.simple()
            )})
          ]
      });

    return async(ctx: Koa.Context, next: () => Promise<any>) => {
      const start = new Date().getMilliseconds();
      await next();
      const ms = new Date().getMilliseconds() - start;
      let logLevel: string;
      if (ctx.status >= 500) {
        logLevel = 'error';
      } else if (ctx.status >= 400) {
        logLevel = 'warn';
      } else if (ctx.status >= 100) {
        logLevel = 'info';
      }
      const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;
      this._winstonInstance.log(logLevel, msg);
    };
  }
}
