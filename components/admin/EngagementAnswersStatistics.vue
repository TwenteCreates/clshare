<template>
    <div>
        <button @click="addRandomMood">Add random mood</button>
        <engagement-answers-count-chart :answersCountChartData="processedMoodData"/>
    </div>
</template>

<style></style>

<script>
import firestore from '@/services/firestore';
import EngagementAnswersCountChart from '@/components/admin/EngagementAnswersCountChart';

export default {
    components: {
        EngagementAnswersCountChart,
    },
    data () {
        return {
            answers: [],
        }
    },
    methods: {
        observeAnswers() {
            const engagementAnswersCollection = firestore.collection('engagementAnswers');
            engagementAnswersCollection.onSnapshot(answersQuery => {
                this.answers = [];
                answersQuery.forEach((answerDoc) => {
                    // Add user data
                    const answer = answerDoc.data();
                    this.answers.push({...answer, id: answerDoc.id })
                });
            });
        },
        addRandomMood() {
            firestore.collection('engagementAnswers').add({
                mood: Math.random(),
                createdAt: new Date(),
                userId: this.$store.state.user.profile.uid
            });
        },

    },
    computed: {
        processedMoodData() {
            return {
                    labels: this.answers.map(answer => new Date(answer.createdAt.seconds).getMinutes()),
                    datasets: [
                        {
                            label: 'Average mood',
                            backgroundColor: '#f87979',
                            data: this.answers.map(answer => answer.mood),
                        }
                    ]
            }
        },
    },
    created () {
        this.observeAnswers();
    }
};
</script>
