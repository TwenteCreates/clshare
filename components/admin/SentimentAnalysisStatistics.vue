<template>
    <div>
        <button @click="refreshSentimentAnalysis">Refresh sentiment analysis</button>
        <sentiment-analyses-chart :sentimentAnalysesChartData="getSentimentAnalysesChartData" />
    </div>
</template>

<style lang="scss" scoped>
</style>


<script>
import firestore from '@/services/firestore';

import SentimentAnalysesChart from '@/components/admin/SentimentAnalysesChart';

export default {
    components: {
        SentimentAnalysesChart,
    },
    data () {
        return {
            analyses: [],
        }
    },
    computed: {
        getSentimentAnalysesChartData() {
            return {
                labels: this.analyses.map(analysis => analysis.createdAt.toDate().toLocaleDateString()),
                datasets: [
                    {
                        label: 'Average sentiment score in conversation',
                        backgroundColor: '#f87979',
                        data: this.analyses.map(analysis => analysis.sentimentScore),
                    }
                ]
            }
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
                                sentimentScore: score.toFixed(2)
                            }, { merge: true });

                            // Save the analysis score
                            firestore.collection('sentimentAnalyses').add({
                                createdAt: new Date(),
                                sentimentScore: score.toFixed(2)
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
        },
        observeSentimentAnalyses() {
            const sentimentAnalysesCollection = firestore.collection('sentimentAnalyses');
            sentimentAnalysesCollection.onSnapshot(saQuery => {
                this.analyses = [];
                saQuery.forEach((analysisDoc) => {
                    const analysis = analysisDoc.data();
                    this.analyses.push({...analysis, id: analysisDoc.id })
                });
            });
        },
    },
    mounted() {
        this.observeSentimentAnalyses();
    }
};
</script>
