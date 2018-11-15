<template>
    <main>
        <b-table :data="users" :columns="columns"></b-table>
        <!-- {{users}} -->
    </main>
</template>

<style></style>

<script>
import { LOGOUT } from '@/store/user';
import firestore from '@/services/firestore';

export default {
 data() {
        return {
            users: [],
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                },
                {
                    field: 'name',
                    label: 'Name',
                },
                {
                    field: 'creationTime',
                    label: 'First login',
                    centered: true
                },
                {
                    field: 'lastSignInTime',
                    label: 'Last login',
                    centered: true
                },
            ]
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
