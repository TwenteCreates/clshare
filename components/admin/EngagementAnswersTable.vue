<template>
    <div>
        <div v-for="user in answers" :key="user.id">
            {{user.answers}}
        </div>
    </div>
</template>

<style></style>

<script>
import firestore from '@/services/firestore';

export default {
 data() {
        return {
            answers: {},
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
                    field: 'mood',
                    label: 'mood',
                    centered: true
                },
                {
                    field: 'createdAt',
                    label: 'Date',
                    centered: true
                },
            ]
        }
    },
    methods: {
        observeAnswers() {
            const usersCollection = firestore.collection('users');
            usersCollection.onSnapshot(usersQuerySnapshot => {
                this.answers = {};
                usersQuerySnapshot.forEach((userDoc) => {
                    // Add user data
                    const user = userDoc.data();
                    this.answers[userDoc.id] = { user: { ...user, id: userDoc.id }, answers: []};
                    // Add engagement answers
                    usersCollection.doc(userDoc.id).collection('engagementAnswers').onSnapshot(answersQuerySnaphot => {
                        answersQuerySnaphot.forEach((answerDoc) => {
                            const answer = answerDoc.data();
                            this.answers[userDoc.id].answers.push({ ...answer, id: answerDoc.id });
                        });
                    });
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
        this.observeAnswers();
    }
};
</script>
