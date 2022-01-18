// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from 'firebase/app';

export const environment = {
  firebase: {
    projectId: 'oc-mediatheque',
    appId: '1:873202799440:web:85bf5844c2cf6ef5b05255',
    databaseURL:
      'https://oc-mediatheque-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'oc-mediatheque.appspot.com/mediatheque_file_storage',
    apiKey: 'AIzaSyAnxu1utUf4q5O1OVnpJHyIvS5CyRRvopE',
    authDomain: 'oc-mediatheque.firebaseapp.com',
    messagingSenderId: '873202799440',
  },
  production: false,
};
export const firebaseApp = firebase.initializeApp(environment.firebase);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
