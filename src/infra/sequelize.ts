import { Sequelize } from 'sequelize-typescript';

export class ConnectFacoty {

  private static _instance: any;

  private static config(): Object {
    const _credential: Object = require('./../config/.sequelize');
    const paths = [
      `${__dirname}/../**/entity/*.entity.js`,
      `!${__dirname}/../core/**/*.js`,
      `!${__dirname}/../node_modules/**`,
      `!${__dirname}/../../node_modules/**`
    ];
    _credential['modelPaths'] = paths;
    return _credential;
  }

  public static getConnection(): Sequelize {
    if (!this._instance) {
      console.log('___________________________________________________');

      this._instance = new Sequelize(this.config());
    }
    return this._instance;
  }
}
