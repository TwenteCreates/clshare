<template>
	<main>
		<header>{{$route.query.name || "Moments"}}</header>
		<button @click="isComponentModalActive = true" style="border-radius: 0; border-right: 0" type="button" class="button is-medium bot-btn"><b-icon size="is-small" pack="fas" icon="robot" /></button>
		<b-modal :active.sync="isComponentModalActive" has-modal-card>
			<div class="modal-card" style="width: auto">
				<header class="modal-card-head">
					<p class="modal-card-title">CLS Bot</p>
				</header>
				<section class="modal-card-body">
					<p>To call CLS Bot to this conversation, select an action:</p>
					<button @click="botAction('phone')" class="button is-fullwidth">
						<b-icon size="is-small" style="margin-right: 0.2rem" pack="fas" icon="phone" />
						Set up a phone call
					</button>
					<button @click="botAction('meeting')" class="button is-fullwidth">
						<b-icon size="is-small" style="margin-right: 0.2rem" pack="fas" icon="calendar" />
						Set up a coffee meeting
					</button>
				</section>
			</div>
		</b-modal>
		<section v-if="!messages.length" class="empty-state">
			<h2>No moments here</h2>
			<p>Start messaging now!</p>
		</section>
		<section v-else class="messages">
			<article v-if="item.text !== 'bot__meta:START' && item.text !== 'bot__meta:STOP'" v-for="(item, index) in messages" :key="'m_' + index" :class="((item.from === $store.state.user.profile.uid && !item.from_bot) ? 'mine' : 'not_mine') + ' ' + (item.prevSame ? 'prev_same' : 'prev_not_same') + ' ' + (item.nextSame ? 'next_same' : 'next_not_same')">
				<img v-if="item.from_bot" alt="Image" src="https://logo.clearbit.com/cls-group.com" class="small-dp">
				<img v-else alt="Image" :src="getUser(item.from).photoUrl" class="small-dp">
				<div class="bubble">{{item.text}}</div>
			</article>
			<article v-else style="text-align: center; margin: 0.5rem 0 1.5rem 0">
				<div v-if="item.text === 'bot__meta:START'" style="width: 100%">CLS Bot has entered this chat</div>
				<div v-else style="width: 100%">CLS Bot has left this chat</div>
			</article>
			<div v-if="false && typing !== 'nobody' && typing !== $store.state.user.profile.uid">
				{{getUser(typing).name}} is typing...
			</div>
		</section>
		<footer>
			<form @submit.prevent="send">
				<b-field>
					<b-input @input="setTyping" expanded v-model="text" size="is-medium" placeholder="Type your message..." icon="message" />
					<p class="control">
						<button style="background: #1d3176; color: #fff; border-radius: 0; border-right: 0" type="submit" class="button is-primary is-medium">
							Send<b-icon size="is-small" style="margin-left: 0.2rem" pack="fas" icon="arrow-right" />
						</button>
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
			users: [],
			messages: [],
			typing: "nobody",
			isComponentModalActive: false
		}
	},
	created() {
		if (!this.$store.state.user.loggedIn) this.$router.push("/login");
		this.observeMessages();
	},
	methods: {
		botAction(action) {
			this.isComponentModalActive = false;
			switch(action) {
				case "phone":
					this.botSays("bot__meta:START");
					this.botSays("Great, I'm looking for times that work for both of you.", 2);
					this.botSays("For both of you, it looks like Tuesday " + (Math.floor(Math.random() * 5) + 1) + ":00 pm works.", 2000);
					this.botSays("I've added an event on both of your calendars and shared each others' phone numbers.", 5000);
					this.botSays("Let me know if there's anything else I can do!", 7000);
					this.botSays("bot__meta:STOP", 7001);
					break;
				case "calendar":
					this.botSays("bot__meta:START");
					this.botSays("Great, I'm looking for times that work for both of you.", 2);
					this.botSays("For both of you, it looks like Friday " + (Math.floor(Math.random() * 5) + 1) + ":00 pm works.", 2000);
					this.botSays("I've added an event on both of your calendars.", 5000);
					this.botSays("Let me know if there's anything else I can do!", 7000);
					this.botSays("bot__meta:STOP", 7001);
					break;
			}
		},
		botSays(text, timeout = 1) {
			setTimeout(() => {
				firestore.collection("conversations").add({
					createdAt: new Date(),
					updatedAt: new Date(),
					from_bot: true,
					from: this.$store.state.user.profile.uid,
					to: this.$route.params.id,
					concerned_users: [this.$store.state.user.profile.uid, this.$route.params.id],
					text
				});
			}, timeout);
		},
		getUser(id) {
			let result = {};
			this.users.forEach(user => {
				if (user.id === id) result = user;
			});
			return result;
		},
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
				concerned_users: [this.$store.state.user.profile.uid, this.$route.params.id],
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
				const messages = [];
				for (let i = 0; i < querySnapshot.docs.length; i++) {
					const doc = querySnapshot.docs[i];
					const event = querySnapshot.docs[i].data();
					if (["everyone", "london", "hr", "party", "pokemon", "yoga", "running", "reading"].includes(this.$route.params.id)) {
						if (this.$route.params.id === event.to) messages.push({...event, id: doc.id});
					} else {
						if (
							(this.$store.state.user.profile.uid === event.from && this.$route.params.id === event.to) ||
							(this.$store.state.user.profile.uid === event.to && this.$route.params.id === event.from)
						) {
							messages.push({...event, id: doc.id});
						}
					}
				}
				for (let i = 0; i < messages.length; i++) {
					const event = messages[i];
					if (i > 0) {
						if (!event.from_bot && event.from === messages[i - 1].from) {
							event.prevSame = true;
						} else {
							event.prevSame = false;
						}
					} else {
						event.prevSame = false;
					}
					if (i < messages.length - 1) {
						if (event.from === messages[i + 1].from) {
							event.nextSame = true;
						} else {
							event.nextSame = false;
						}
					} else {
						event.nextSame = false;
					}
				}
				this.messages = messages;
				setTimeout(() => {
					window.scrollTo(0, document.body.scrollHeight);
				}, 10);
			});
			firestore.collection("metadata").onSnapshot(querySnapshot => {
				this.typing = querySnapshot.docs[0].data().typing;
			});
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
footer {
	background-color: #fff;
	left: 0; right: 0;
	bottom: 4rem;
	position: fixed;
	z-index: 6;
}
.messages {
	padding: 1rem;
	padding-bottom: 2rem;
	article {
		display: flex;
		&.mine {
			justify-content: flex-end;
			.bubble {
				background-color: #1d3176;
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
.prev_same {
	margin-top: -0.5rem;
	&.mine .bubble {
		border-top-right-radius: 0.5rem;
	}
	&.mine.next_not_same .bubble {
		border-bottom-right-radius: 1.5rem;
	}
	&.not_mine .bubble {
		border-top-left-radius: 0.5rem;
	}
	&.not_mine.next_not_same .bubble {
		border-bottom-left-radius: 1.5rem;
	}
}
.prev_same .small-dp {
	opacity: 0;
}
.small-dp {
	width: 2rem;
	height: 2rem;
	border-radius: 100%;
	margin-right: 0.75rem;
	margin-top: 1rem;
}
.mine .small-dp {
	display: none;
}
.bot-btn {
	position: fixed;
	right: 0; top: 0;
	width: 4rem;
	height: 4rem;
	padding: 0;
	z-index: 6;
	border: 0;
}
button.is-fullwidth + button.is-fullwidth {
	margin-top: 0.5rem;
}
</style>
