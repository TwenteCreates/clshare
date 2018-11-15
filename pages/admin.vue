<template>
    <main>
        {{users}}
    </main>
</template>

<style></style>

<script>
import { LOGOUT } from '@/store/user';
import firestore from '@/services/firestore';

export default {
  data () {
      return {
        users: null
      }
  },
  methods: {
    observeUsers() {
      firestore.collection('users').onSnapshot(querySnapshot => {
        this.users = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          this.users.push({...user, id: doc.id});
        });
      });
    },
    async deleteUser(user) {
      try {
        await firestore.collection('users').doc(user.id).delete();
      } catch(error) {
        alert(error);
      }
    }
  },
  created () {
    this.observeUsers();
  }
};
</script>
