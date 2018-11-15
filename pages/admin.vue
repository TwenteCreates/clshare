<template>
    <main>
        <div class="container is-fluid">
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

export default {
    components: {
        EngagementAnswersStatistics,
        UsersTable,
    }
};
</script>
