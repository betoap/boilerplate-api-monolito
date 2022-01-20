import { Proxy, Dictionary } from './';

export class Coroutine {

  private static generateKey() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private static method: Dictionary<any, any> = new Dictionary();

  static startCoroutine(iterator: Iterator<any>, nextValue?:any): any {
    const key = this.generateKey();
    this.method.set(key, false);
    this.coroutina( iterator, nextValue, key);
    return key;
  }

  private static coroutina(iterator: Iterator<any>, nextValue?:any, key?: string): void {
    const stop = this.method.get( key );
    if( stop ) {
      return nextValue;
    }
    const { done, value } = iterator.next(nextValue);
    if ( done ) {
      return nextValue;
    }
    if (value.constructor === Promise) {
        value
          .then( Proxy.create( this, this.resolve, iterator, key ) )
          .catch( Proxy.create( this, this.reject ) );
    } else {
      this.coroutina(iterator, value);
    }
  }

  private static resolve( iterator: Iterator<any>, key:string, value: any ): void {
      this.coroutina(iterator, value, key);
  }

  private static reject( error: any): void {
      throw new Error( error );
  }

  static stopCoroutine( key: any ): void {
    if( this.method.has( key ) ) {
      this.method.set( key, true );
    }
  }

  static stopAllCoroutine( ): void{
    const keys = this.method.keys();
    for(var key of keys) {
      this.method.set( key, true );
    };
  }
}
