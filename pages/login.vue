<template>
    <main>
        <b-field label="Email">
            <b-input v-model="email"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password" password-reveal v-model="password"></b-input>
        </b-field>

        <button class="button" @click="loginWithCredentials">
            <b-icon icon="key"></b-icon>
            <span>Login with credentials</span>
        </button>

        <button class="button" @click="loginWithGoogle">
            <b-icon icon="google"></b-icon>
            <span>Login with Google</span>
        </button>
    </main>
</template>

<style></style>

<script>
import { LOGIN } from '@/store/user';
import { CREDENTIALS_LOGIN_PROVIDER, GOOGLE_LOGIN_PROVIDER, LINKEDIN_LOGIN_PROVIDER, FACEBOOK_LOGIN_PROVIDER } from '@/store/user/loginProviders';

export default {
  data () {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginWithCredentials(email, password) {
      this.$store.dispatch(LOGIN, { provider: CREDENTIALS_LOGIN_PROVIDER, credentials: { email, password }});
    },
    loginWithGoogle() {
       this.$store.dispatch(LOGIN, { provider: GOOGLE_LOGIN_PROVIDER });
    },
    loginWithFacebook() {
       alert('Not implemented yet');
    },
    loginWithLinkedin() {
       alert('Not implemented yet');
    },
    register(email, password) {
      alert('Not implemented yet');
    }
  }
};
</script>
