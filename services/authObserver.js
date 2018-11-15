import firebase from './firebase';
import store from '@/store';
import router from '@/router';

import { LOGIN_SUCCESS } from '@/store/user';

firebase.auth().onAuthStateChanged(userProfile => {
  if (userProfile) {
    store.commit(LOGIN_SUCCESS, userProfile);
    var redirect = router.currentRoute.query.redirect;
    if (redirect) {
      router.replace(redirect);
    }
    else {
      router.replace({ name: 'events' });
    }
  }
});
