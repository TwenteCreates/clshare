<template>
	<main>
		<header>
			<img style="height: 1.25rem; margin-top: -0.25rem; vertical-align: middle" alt="CLShare logo" src="/clshare.png">
		</header>
		<h2>Groups</h2>
		<ul class="groups">
			<li>
				<router-link to="/chat/everyone?name=Everyone+at+CLS">
					<img alt="Image" src="/cls-pic.png">
					<div>Everyone at CLS</div>
				</router-link>
			</li><li>
				<router-link to="/chat/london?name=CLS+in+London">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=london&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1">
					<div>CLS in London</div>
				</router-link>
			</li><li>
				<router-link to="/chat/tech?name=Tech+staff">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=company+staff&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1">
					<div>Tech staff</div>
				</router-link>
			</li><li>
				<router-link to="/chat/party?name=Party+Planning+Committee">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=office+party&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1">
					<div>Party Plan 🎉</div>
				</router-link>
			</li>
		</ul>
		<h2>Conversations</h2>
		<ul>
			<li v-if="item.id !== $store.state.user.profile.uid" v-for="(item, index) in users" :key="'u_' + index">
				<router-link :to="`/chat/${item.id}?name=${item.name}`">
					<img alt="Image" :src="item.photoUrl" class="small-dp">
					{{item.name}}
				</router-link>
			</li>
			<li>
				<router-link to="/bot">
					<img alt="Image" src="/bot.png" class="small-dp">
					CLS Bot
				</router-link>
			</li>
		</ul>
	</main>
</template>

<script>
import firestore from "@/services/firestore";
export default {
	data() {
		return {
			users: []
		}
	},
	created() {
		if (!this.$store.state.user.loggedIn) this.$router.push("/loginui");
		this.observeMessages();
	},
	methods: {
		observeMessages() {
			firestore.collection("users").onSnapshot(querySnapshot => {
				this.users = [];
				querySnapshot.forEach(doc => {
					const event = doc.data();
					this.users.push({...event, id: doc.id});
				});
			});
		}
	}
}
</script>


<style lang="scss" scoped>
.small-dp {
	height: 4rem;
	padding: 0.5rem;
	border-radius: 100%;
	margin-left: 0.5rem;
	vertical-align: middle;
}
</style>
