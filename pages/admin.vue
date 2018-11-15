<template>
    <main>
        <div class="container is-fluid">
            <sentiment-analysis-statistics />
            <engagement-answers-statistics />
            <users-table />
        </div>
    </main>
</template>

<style></style>

<script>
import { LOGOUT } from '@/store/user';
import firestore from '@/services/firestore';

import EngagementAnswersStatistics from '@/components/admin/EngagementAnswersStatistics';
import UsersTable from '@/components/admin/UsersTable';
import SentimentAnalysisStatistics from '@/components/admin/SentimentAnalysisStatistics';

export default {
    components: {
        EngagementAnswersStatistics,
        UsersTable,
        SentimentAnalysisStatistics,
    },
    methods: {}
};
</script>
