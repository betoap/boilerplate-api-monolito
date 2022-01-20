export class Querystring {

public static getQuerystring (): any {
  return location.search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, pair) => {
      const [key, value] = pair.map(decodeURIComponent);
      return ({ ...obj, [key]: value });
    }, {});
  }

}
