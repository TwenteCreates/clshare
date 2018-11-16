<template>
    <main>
        <div class="container is-fluid">
            <sentiment-analysis-statistics />
            <engagement-answers-statistics />
            <users-table />

            <button class="button" @click="sendPushNotification">Send event notification</button>
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

            firestore.collection('users').get().then(users => {
                users.forEach(user => {
                    const toToken = user.data().messagingToken;
                    if (toToken) {
                        var notificationData = {
                            notification: {
                                title: "CLSHARE",
                                body: "There is a new event for you!",
                                click_action: "https://cls-innovation.surge.sh/explore",
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
                    }
                })
            });
        },
    }
};
</script>
