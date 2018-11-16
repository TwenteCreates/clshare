<template>
    <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
                <p class="title">Daily</p>
                <p>Based on {{getDayDataSize}} submissions</p>
                <p class="subtitle">Average score: {{getDailyAverage}}</p>
            </div>

            <div class="tile is-child box">
                <p class="title">Monthly</p>
                <p>Based on {{getMonthDataSize}} submissions</p>
                <p class="subtitle">Average score: {{getMonthlyAverage}}</p>
            </div>

            <div class="tile is-child box">
                <p class="title">Yearly</p>
                <p>Based on {{getYearDataSize}} submissions</p>
                <p class="subtitle">Average score: {{getYearlyAverage}}</p>
            </div>
        </div>
        <div class="tile is-parent">
            <div class="tile is-child box">
                <p class="title">Average employees mood
                    <button class="button add-button" @click="addRandomMood"><b-icon pack="fas" icon="plus"/></button>
                </p>
                <engagement-answers-count-chart :answersCountChartData="getAnswersCountData"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .mood-averages {
        margin-top: 30px;
    }
    .add-button {
        float: right;
    }
</style>


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
        average(arr) {
            return arr.reduce((a, v) => a + v, 0 ) / arr.length;
        },
        getDayData() {
            if (!this.answers || !this.answers.length) return 0;
            const currentDay = new Date().getDay();
            return this.answers.filter(answer => answer.createdAt.toDate().getDay() === currentDay).map(answer => answer.mood);
        },
        getMonthData() {
            if (!this.answers || !this.answers.length) return 0;
            const currentMonth = new Date().getMonth();
            return this.answers.filter(answer => answer.createdAt.toDate().getMonth() === currentMonth).map(answer => answer.mood);
        },
        getYearData() {
            if (!this.answers || !this.answers.length) return 0;
            const currentYear = new Date().getYear();
            return this.answers.filter(answer => answer.createdAt.toDate().getYear() === currentYear).map(answer => answer.mood);
        },
    },
    computed: {
        getAnswersCountData() {
            return {
                labels: this.answers.map(answer => answer.createdAt.toDate().toLocaleDateString()),
                datasets: [
                    {
                        label: 'Average mood',
                        backgroundColor: '#0065b4',
                        data: this.answers.map(answer => answer.mood),
                    }
                ]
            }
        },
        getDayDataSize() {
            return this.getDayData().length;
        },
        getMonthDataSize() {
            return this.getMonthData().length;
        },
        getYearDataSize() {
            return this.getYearData().length;
        },
        getDailyAverage() {
            const dayData = this.getDayData();
            if (!dayData.length) return;
            return this.average(dayData).toFixed(2);
        },
        getMonthlyAverage() {
            const monthData = this.getMonthData();
            if (!monthData.length) return;
            return this.average(monthData).toFixed(2);
        },
        getYearlyAverage() {
            const yearData = this.getYearData();
            if (!yearData.length) return;
            return this.average(yearData).toFixed(2);
        },
    },
    created () {
        this.observeAnswers();
    }
};
</script>
