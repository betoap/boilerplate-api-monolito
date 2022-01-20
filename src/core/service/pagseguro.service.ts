import { Curl } from 'node-libcurl';
import xmlParser from 'xml2json';
import querystring, { ParsedUrlQueryInput } from 'querystring';

const pagseguroConfig: any  = require('./../../config/.pagseguro');

enum STATUSCODE {
    'Pendente',
    'Aguardando pagamento',
    'Em análise',
    'Pago',
    'Em Disputa',
    'Devolvido',
    'Cancelado'
}

interface PagSeguroItem {
    id: string;
    description: string;
    price: string;
    quantity: number;
    weight: number;
}

export class PagSeguroService {

  private curl: Curl;
  private url: string;
  private mode: string;
  private items: querystring.ParsedUrlQueryInput;
  private countItem;

  constructor() {
    this.items = { currency: pagseguroConfig.currency };
    this.countItem = 1;
    this.mode = pagseguroConfig.mode || 'sandbox';
    this.curl = new Curl();
    this.url = `https://ws.${this.mode}.pagseguro.uol.com.br/v2/checkout?email=${pagseguroConfig.credentials.email}&token=${pagseguroConfig.credentials.token}`;
    this.curl.setOpt(Curl.option.URL, this.url);
    this.curl.setOpt(Curl.option.FOLLOWLOCATION, true);
    this.curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
    this.curl.setOpt(Curl.option.HTTP_TRANSFER_DECODING, true);
    this.curl.setOpt(Curl.option.HTTP_VERSION, 2);
    this.curl.setOpt(Curl.option.HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded; charset=UTF-8']);

    this.curl.on('error', ( error ) => {
      if ( pagseguroConfig.debug ) console.log( error );
      this.curl.close.bind(this.curl);
      return Promise.reject( error );
    });
  }

  public addItem( item: PagSeguroItem ) {
    this.items[`itemId${this.countItem}`] = item.id;
    this.items[`itemDescription${this.countItem}`] = item.description;
    this.items[`itemAmount${this.countItem}`] = item.price;
    this.items[`itemQuantity${this.countItem}`] = item.quantity;
    this.countItem ++;
  }

  public addItems( items: Array<PagSeguroItem> ) {
    items.forEach(item => {
      this.addItem(item);
    });
  }

  private prepareItems() {
    this.curl.setOpt(Curl.option.POSTFIELDS, querystring.stringify(this.items));
  }

  public send() {
    return new Promise( ( resolve, reject ) => {
      try {
        this.prepareItems();
        this.curl.perform();
        this.curl.on('end', (statusCode, body, headers) => {
          if ( pagseguroConfig.debug ) this.debugLog(statusCode, body, headers);
          const sessionId: string = JSON.parse(xmlParser.toJson(body)).checkout.code;
          resolve({id: sessionId});
          return this.curl.close();
        });
      } catch (error) {
        return reject( error );
      }
    });
  }

  public debugLog(statusCode, body, headers) {
    console.info( 'Start pagseguro checkout' );
    console.info( statusCode );
    console.info( '---' );
    console.info( body );
    console.info( '---' );
    console.info( headers );
    console.info( '---' );
    console.info( this.curl.getInfo( Curl.info.TOTAL_TIME ) );
    console.info( 'End pagseguro checkout' );
  }
}
