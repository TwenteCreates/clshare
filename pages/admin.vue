<template>
    <main>
        <users-table />
        <engagement-answers-table />
    </main>
</template>

<style></style>

<script>
import { LOGOUT } from '@/store/user';
import firestore from '@/services/firestore';

import EngagementAnswersTable from '@/components/admin/EngagementAnswersTable';
import UsersTable from '@/components/admin/UsersTable';

export default {
    components: {
        EngagementAnswersTable,
        UsersTable,
    }
};
</script>
