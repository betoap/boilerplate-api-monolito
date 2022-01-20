const KOA = require('koa');
const ROUTER = require('koa-router');
const fs = require('fs');

const koa = new KOA();
const router = new ROUTER();



var readFileThunk = function(src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  });
}

router.get('/', async ( ctx, next ) => {
  ctx.type = 'html';
  ctx.status = 200;
  ctx.body = 'asdfas'
  ctx.body = await readFileThunk(__dirname + '/index.html');
  next();
});

koa.use( router.routes() );
koa.listen( 5000 );

// ws://127.0.0.1:4567/socket.io/?EIO=4&transport=websocket
// ws://localhost:4100/socket.io/?EIO=3&transport=websocket
// ws://localhost:4100/socket.io/?EIO=4&transport=websocket

// browser-sync start -s -w