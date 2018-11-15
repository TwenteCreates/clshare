<template>
    <div>
        <button @click="addRandomMood">Add random mood</button>
        <engagement-answers-count-chart :answersCountChartData="getAnswersCountData"/>
        <div class="mood-averages tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                <p class="title">Daily mood average</p>
                <p class="subtitle">{{getDailyAverage}}</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                <p class="title">Monthly mood average</p>
                <p class="subtitle">{{getMonhtlyAverage}}</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                <p class="title">Yearly mood average</p>
                <p class="subtitle">{{getYearlyAverage}}</p>
                </article>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .mood-averages {
        margin-top: 30px;
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
        }
    },
    computed: {
        getAnswersCountData() {
            return {
                labels: this.answers.map(answer => answer.createdAt.toDate().toLocaleDateString()),
                datasets: [
                    {
                        label: 'Average mood',
                        backgroundColor: '#f87979',
                        data: this.answers.map(answer => answer.mood),
                    }
                ]
            }
        },
        getDailyAverage() {
            if (!this.answers || !this.answers.length) return 0;
            const currentDay = new Date().getDay();
            const dayData = this.answers.filter(answer => answer.createdAt.toDate().getDay() === currentDay).map(answer => answer.mood);
            // console.log("Day dataset size", dayData.length, dayData);
            return this.average(dayData).toFixed(2);
        },
        getMonhtlyAverage() {
            if (!this.answers || !this.answers.length) return 0;
            const currentMonth = new Date().getMonth();
            const monthData = this.answers.filter(answer => answer.createdAt.toDate().getMonth() === currentMonth).map(answer => answer.mood);
            // console.log("Month dataset", monthData.length, monthData);
            return this.average(monthData).toFixed(2);
        },
        getYearlyAverage() {
            if (!this.answers || !this.answers.length) return 0;
            const currentYear = new Date().getYear();
            const yearData = this.answers.filter(answer => answer.createdAt.toDate().getYear() === currentYear).map(answer => answer.mood);
            // console.log("Year dataset", yearData.length, yearData);
            return this.average(yearData).toFixed(2);
        },
    },
    created () {
        this.observeAnswers();
    }
};
</script>
