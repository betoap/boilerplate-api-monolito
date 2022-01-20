import cluster from 'cluster';
import { cpus } from 'os';

import { HttpServer, SocketServer } from './../server';
import { ConnectFacoty } from './../infra/sequelize';
import { Proxy } from './../helper/proxy';
import { setTimeout } from 'timers';

class Clusters {

  private _clusterAmount: number;
  private _clusterConfig = require('./../config/.cluster');

  constructor() {
    this._clusterAmount = (
      !this._clusterConfig.amount ||
      this._clusterConfig.amount === 'MAX'
    ) ? cpus().length : this._clusterConfig.amount;
    this.init();
  }

  init(): void {
    if (cluster.isMaster) {
      console.log(`Using ${this._clusterAmount} of clusters.`);
      console.log(`Master ${process.pid} is running.`);

      // Fork workers.
      for (let i = 0; i < this._clusterAmount; ++i) {
        cluster.fork();
      }

      cluster.on('listening', (worker: cluster.Worker) => {
        console.log(`Cluster ${worker.process.pid} connected.`);
      });

      cluster.on('disconnect', (worker: cluster.Worker) => {
        console.log(`Cluster ${worker.process.pid} disconnected.`);
      });

      cluster.on('exit', (worker: cluster.Worker) => {
        console.log(`Cluster ${worker.process.pid} exited.`);
        cluster.fork();
      });

      cluster.on('exit', (worker: cluster.Worker) => {
        console.log(`worker ${worker.process.pid} died.`);
      });
    } else {
      this.startDatabase();
    }
  }

  private startServer() {
    console.clear();
    try {
      console.info('🏁 Iniciando Servidor');
      console.log(`Worker ${process.pid} started.`);
      const server = new HttpServer();
      server.start();
      new SocketServer(server);
    } catch (error) {
      this.handleError(error);
    }
  }

  private startDatabase(): void {
    try {
        // ConnectFacoty
        // .getConnection()
        // //.sync()
        // .then(
        //     Proxy.create( this, this.startServer )
        // )
        // .catch(
        //     Proxy.create( this, this.handleError )
        // );
        this.startServer();
    } catch ( error ) {
        console.error( `error: ${error}` );
    }
}


  private handleError(error): void {
    console.log(`Server failed to start`);
    console.error(error);
    process.exit(1);
  }

}

export default new Clusters();