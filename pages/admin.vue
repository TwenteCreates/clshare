<template>
    <main>
        <div class="container is-fluid">
            <sentiment-analysis-statistics />
            <engagement-answers-statistics />
            <users-table />

            <button class="button" @click="sendPushNotification">Push</button>
            <b-input v-model="pushUserId" />
        </div>
    </main>
</template>

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
    data () {
        return {
            pushUserId: ''
        }
    },
    methods: {
        sendPushNotification() {
            const serverKey = "AAAAYwIC9JQ:APA91bHFhwHiXtWjvpqQOBC8o8p38uVdXHPUeol6GkE_T-HZt7MokkH_sQrfUudH2PFxznd1z_uvObrEmDHS_CNeo6ma17QLk2wKuqCkW71KSaXVVWGlYIToyQwH2oysPyYTHxTT_ddh";

            firestore.collection('users').doc(this.pushUserId).get().then(user => {
                const toToken = user.data().messagingToken;
                if (!toToken) return;

                var notificationData = {
                    notification: {
                        title: "CLSHARE",
                        body: "You got a new message!",
                        click_action: "http://localhost:3000/",
                        icon: "https://cls-innovation.surge.sh/icon.png"
                    },
                    to: toToken
                }
                this.$axios.post('https://fcm.googleapis.com/fcm/send', notificationData, {
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": `key=${serverKey}`
                        }
                });
            });

        },

    }
};
</script>
