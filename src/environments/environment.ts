// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseurl: 'https://logingestorias.herokuapp.com',
  urlAuth: 'http://localhost:10443/totalplay/gestorias-auth/v1/auth',
  urlRequerimiento: 'http://localhost:10446/totalplay/gestoria-requerimiento/v1',
  urlCatalogo: 'http://localhost:10444/totalplay/gestoria-catalogos/v1',
  urlFiles: 'http://localhost:10447/totalplay/gestoria-archivos/v1/file',
  urlMailToken: 'https://dev.totalplay.amarello.cloud/oauth/client_credential/accesstoken?grant_type=client_credentials',
  urlMailSend:'https://dev.totalplay.amarello.cloud/mail/sendMail',
  userMail:"Exf15FRWxcunNj7by3AWzFF0WOzePRravZCaZ3zKe3ZEwlgN",
  passMail:"OG03A2DyoOWBd4mcI96GUYj07hZHPm29Zxe1Bj8lalXLTIsxjxFG5uAAJKfjWH4Q",
  tokenMail:"Basic RXhmMTVGUld4Y3VuTmo3YnkzQVd6RkYwV096ZVBScmF2WkNhWjN6S2UzWkV3bGdOOk9HMDNBMkR5b09XQmQ0bWNJOTZHVVlqMDdoWkhQbTI5WnhlMUJqOGxhbFhMVElzeGp4Rkc1dUFBSktmaldINFE="


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
