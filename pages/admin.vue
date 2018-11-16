<template>
    <main>
        <div class="container is-fluid">
            <button class="button" @click="sendPushNotification">Push</button>
            <sentiment-analysis-statistics />
            <engagement-answers-statistics />
            <users-table />
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
    methods: {
        sendPushNotification() {
            const toToken = "eXxJkTnfiVY:APA91bHIBpKYDOr4VI8adFAr32KeIsY57p7MdUHjc1ALsuzZh4suX32MepZfLGLMFGP9FrQP6O8YLM0AwL47uHdM49CLoWngPPKHOiIJA-115eVkWWKcbKTOW5xR1FK-sSWsS8XS88yJ";
            const serverKey = "AAAAYwIC9JQ:APA91bHFhwHiXtWjvpqQOBC8o8p38uVdXHPUeol6GkE_T-HZt7MokkH_sQrfUudH2PFxznd1z_uvObrEmDHS_CNeo6ma17QLk2wKuqCkW71KSaXVVWGlYIToyQwH2oysPyYTHxTT_ddh"

            const toTopic = "topics/all";

            var notificationData = {
                notification: {
                    title: "CLSHARE",
                    body: "You got a new message!",
                    click_action: "http://localhost:3000/",
                    icon: "https://cls-innovation.surge.sh/icon.png"
                },
                to: toToken
            }

            const thisUserId = this.$store.state.user.profile.uid;
            const userId = "BpVhoAnctmaadaqBdAN4i3S1Kw92";


            firestore.collection('users').doc(thisUserId).get().then(user => {
                notificationData.to = user.data().messagingToken;
                this.$axios.post('https://fcm.googleapis.com/fcm/send', notificationData, {
                        headers: {
                            "Authorization": `key=${serverKey}`
                        }
                });
            });

        },

    }
};
</script>
