<template>
	<main>
		<header>Moments</header>
		<section class="messages">
			<article v-for="(item, index) in messages" :key="'m_' + index" :class="item.from === $store.state.user.profile.uid ? 'mine' : 'not_mine'">
				<div class="bubble">{{item.text}}</div>
			</article>
			<div v-if="typing !== 'nobody' && typing !== $store.state.user.profile.uid">
				{{typing}} is typing...
			</div>
		</section>
		<footer>
			<form @submit.prevent="send">
				<b-field>
					<b-input @input="setTyping" expanded v-model="text" size="is-medium" placeholder="Type your message..." icon="message" />
					<p class="control">
						<button type="submit" class="button is-medium">Send</button>
					</p>
				</b-field>
			</form>
		</footer>
	</main>
</template>

<script>
import firestore from "@/services/firestore";
import Push from "push.js";
export default {
	data() {
		return {
			text: "",
			messages: [],
			typing: "nobody"
		}
	},
	created() {
		if (!this.$store.state.user.loggedIn) this.$router.push("/login");
		this.observeMessages();
	},
	methods: {
		setTyping() {
			firestore.collection("metadata").doc("metadata").set({
				typing: this.$store.state.user.profile.uid
			});
		},
		send() {
			if (!this.text || !this.text.trim()) return;
			firestore.collection("conversations").add({
				createdAt: new Date(),
				updatedAt: new Date(),
				from: this.$store.state.user.profile.uid,
				to: this.$route.params.id,
				text: this.text
			});
			this.text = "";
			setTimeout(() => {
				firestore.collection("metadata").doc("metadata").set({
					typing: "nobody"
				});
			}, 10);
		},
		observeMessages() {
			firestore.collection("conversations").orderBy("createdAt").onSnapshot(querySnapshot => {
				this.messages = [];
				querySnapshot.forEach(doc => {
					const event = doc.data();
					this.messages.push({...event, id: doc.id});
				});
				setTimeout(() => {
					window.scrollTo(0, document.body.scrollHeight);
				}, 10);
			});
			firestore.collection("metadata").onSnapshot(querySnapshot => {
				this.typing = querySnapshot.docs[0].data().typing;
			});
		}
	}
}
</script>

<style lang="scss" scoped>
footer {
	background-color: #fff;
	left: 0; right: 0;
	bottom: 4rem;
	position: fixed;
	z-index: 6;
}
.messages {
	padding: 0 1rem;
	padding-bottom: 6rem;
	article {
		display: flex;
		&.mine {
			justify-content: flex-end;
			.bubble {
				background-color: #2980b9;
				color: #fff;
				border-bottom-right-radius: 0.5rem;
			}
		}
		&.not_mine .bubble {
			border-bottom-left-radius: 0.5rem;
		}
	}
}
.bubble {
	background-color: #fff;
	display: inline-block;
	padding: 0.75rem 1.25rem;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
	border-radius: 1.5rem;
	margin-bottom: 1rem;
}
</style>
