import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

var config = {
    apiKey: "AIzaSyDjzm-a6qa539Ji9mTYtsC1DhXwvuZ9dAs",
    authDomain: "cls-innovation.firebaseapp.com",
    databaseURL: "https://cls-innovation.firebaseio.com",
    projectId: "cls-innovation",
    storageBucket: "cls-innovation.appspot.com",
    messagingSenderId: "1023072544920"
};

firebase.initializeApp(config);

export default firebase;
