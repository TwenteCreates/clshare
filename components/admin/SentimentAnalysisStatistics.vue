<template>
    <div>
        <button @click="refreshSentimentAnalysis">Refresh sentiment analysis</button>
    </div>
</template>

<style lang="scss" scoped>
    .mood-averages {
        margin-top: 30px;
    }
</style>


<script>
import firestore from '@/services/firestore';

export default {
    data () {
        return {
            answers: [],
        }
    },
    methods: {
        refreshSentimentAnalysis() {
            firestore.collection('users').get().then(usersSnapshot => {
                usersSnapshot.forEach(userDoc => {
                    const user = userDoc.data();
                    let accText = '';
                    firestore.collection('conversations').where('from', '==', userDoc.id).get()
                    .then(conversationsSnapshot => {
                         conversationsSnapshot.forEach(conversationDoc => {
                             accText += conversationDoc.data().text;
                         })
                    })
                    .then(() => {
                        this.getSentimentScore(accText).then(sentimentResult => {
                            const { score } = sentimentResult.data;

                            // Add sentiment score to the user
                            firestore.collection('users').doc(userDoc.id).set({
                                sentimentScore: score
                            }, { merge: true });

                            // Save the analysis score
                            firestore.collection('sentimentAnalyses').add({
                                createdAt: new Date(),
                                sentimentScore: score
                            });
                        })
                    });
                })
            });
        },
        getSentimentScore(text) {
            return this.$axios.get(`https://platform.oswaldlabs.com/secure/sentiments/${text}`, {
                headers: {
                    "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6ImFsbCIsImlhdCI6MTU0MjMwNDkwNywiZXhwIjoxNTQyNTY0MTA3fQ.L2d78shR5jhMemYCU_WiiyBhCG9isQ7_PYg91dDiPDA"
                }
            });
        }
    }
};
</script>
