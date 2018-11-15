import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/messaging';

var config = process.env.firebaseConfig;

firebase.initializeApp(config);

export default firebase;
