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
        refreshSentimentAnalysis() {
            this.$axios.get("https://platform.oswaldlabs.com/secure/sentiments/You are a very beautiful person", {
                headers: {
                    "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6ImFsbCIsImlhdCI6MTU0MjMwNDkwNywiZXhwIjoxNTQyNTY0MTA3fQ.L2d78shR5jhMemYCU_WiiyBhCG9isQ7_PYg91dDiPDA"
                }
            }).then(response => {
                console.log(response.data);
            });
        }
    }
};
</script>
