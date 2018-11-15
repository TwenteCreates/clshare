<template>
	<main>
		<header>Moments</header>
		<h2>Groups</h2>
		<ul>
			<li>
				<router-link to="/chat/everyone?name=Everyone+at+CLS">
					<img alt="Image" src="https://logo.clearbit.com/cls-group.com" class="small-dp">
					Everyone at CLS
				</router-link>
				<router-link to="/chat/london?name=CLS+in+London">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=london&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1" class="small-dp">
					CLS in London
				</router-link>
				<router-link to="/chat/london?name=HR+staff+members">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=company+staff&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1" class="small-dp">
					HR staff members
				</router-link>
				<router-link to="/chat/party?name=Party+Planning+Committee">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=office+party&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1" class="small-dp">
					Party Planning Committee
				</router-link>
			</li>
		</ul>
		<h2>Coworkers</h2>
		<ul>
			<li v-if="item.id !== $store.state.user.profile.uid" v-for="(item, index) in users" :key="'u_' + index">
				<router-link :to="`/chat/${item.id}?name=${item.name}`">
					<img alt="Image" :src="item.photoUrl" class="small-dp">
					{{item.name}}
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
		if (!this.$store.state.user.loggedIn) this.$router.push("/login");
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
h2 {
	font-size: 95%;
	text-transform: uppercase;
	margin-bottom: 1rem;
	font-weight: 500;
	padding-left: 1rem;
}
ul {
	margin: 0;
	padding: 0;
	list-style: none;
}
li {
	margin-top: 0 !important;
}
li a {
	display: block;
	background-color: #fff;
	color: inherit;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.small-dp {
	height: 4rem;
	padding: 0.5rem;
	border-radius: 100%;
	vertical-align: middle;
}
</style>
