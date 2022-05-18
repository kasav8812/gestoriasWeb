// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseurl: 'https://logingestorias.herokuapp.com',
  urlAuth: 'http://localhost:10443/totalplay/gestorias-auth/v1/auth',
  urlRequerimiento: 'http://localhost:10446/totalplay/gestoria-requerimiento/v1',
  urlCatalogo: 'http://localhost:10444/totalplay/gestoria-catalogos/v1',
  urlFile: 'http://localhost:10447/file',
  urlFiles:'http://localhost:10447/totalplay/gestoria-archivos/v1'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
