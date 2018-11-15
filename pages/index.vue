<template>
	<main>
		<header>
			<img style="height: 1.25rem; margin-top: -0.25rem; vertical-align: middle" alt="CLShare logo" src="/clshare.png">
		</header>
		<h2>Groups</h2>
		<ul class="groups">
			<li>
				<router-link to="/chat/everyone?name=Everyone+at+CLS">
					<img alt="Image" src="/cls-pic.png" class="small-dp">
					<div>Everyone at CLS</div>
				</router-link>
			</li><li>
				<router-link to="/chat/london?name=CLS+in+London">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=london&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1" class="small-dp">
					<div>CLS in London</div>
				</router-link>
			</li><li>
				<router-link to="/chat/tech?name=Tech+staff">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=company+staff&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1" class="small-dp">
					<div>Tech staff</div>
				</router-link>
			</li><li>
				<router-link to="/chat/party?name=Party+Planning+Committee">
					<img alt="Image" src="https://tse2.mm.bing.net/th?q=office+party&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1" class="small-dp">
					<div>Party Plan 🎉</div>
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
.groups {
	display: flex;
	flex-wrap: wrap;
	li {
		display: block;
		flex: 0 0 50%;
    	max-width: 50%;
		padding: 0 1rem;
		&:nth-child(2n) {
			padding-left: 0.5rem;
		}
		&:nth-child(2n - 1) {
			padding-right: 0.5rem;
		}
	}
	a {
		display: block;
		width: 100%;
		box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
		border-radius: 0.25rem;
		overflow: hidden;
		margin-bottom: 1rem;
		img {
			border-radius: 0;
			display: block;
			width: 100%;
			padding: 0;
			height: auto;
		}
		div {
			padding: 1rem;
		}
	}
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .groups {
        li {
            flex: 0 0 25%;
        }
    }
}


</style>
