<template>
	<main>
		<header>CLS Bot</header>
		<div class="messages"><div v-for="(item, index) in chat" :key="'c_' + index" :class="`message_${item.from}`">
			<img class="icon" v-if="item.from !== 'user'" alt="DP" src="/bot.png">
			<div class="text">
				{{item.text}}
			</div>
		</div>
		<div class="message_bot" v-if="typing">
			<div class="text">&bullet; &bullet; &bullet;</div>
		</div></div>
		<div class="messages responses">
			<p v-if="chat.length === 1" class="subtitle is-5 pulse">Click on a response to reply to CLS Bot:</p>
			<div class="message_user" :key="'r_' + index" v-for="(item, index) in responses">
				<form @submit.prevent="respond(newMessage, item.modal)" v-if="item && item.type">
					<div v-if="item.placeholder" style="margin-bottom: 1rem; font-weight: bold">
						{{item.placeholder}}:
					</div>
					<b-field grouped>
						<b-select v-if="item.type === `select`" v-model="newMessage">
							<option v-for="(option, index) in item.options" :key="'o_' + index" :value="typeof index === 'string' ? (item.uc ? index.toUpperCase() : index) : (item.value ? option[item.value] : option)">
								{{item.value ? option[item.value] : option}}
							</option>
						</b-select>
						<b-input v-else v-model="newMessage"></b-input>
						<p class="control">
							<button class="button is-primary" type="submit">Reply</button>
						</p>
					</b-field>
				</form>
				<a :href="item.redirect_link" target="_blank" v-else-if="item.redirect_link" class="responds text">
					{{item.text || item}}
				</a>
				<button v-else @click.prevent="respond(item, item.modal)" class="responds text">
					{{item.text || item}}
				</button>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	data() {
		return {
			newMessage: "",
			typing: false,
			isDone: false,
			responses: [],
			time: 100,
			chat: [],
			current: 0,
			firstDone: false
		}
	},
	mounted() {
		let greeting = "morning";
		if (!this.$store.state.user.profile.displayName) return this.$router.push("/");
		if (new Date().getHours() >= 12) greeting = "afternoon";
		if (new Date().getHours() >= 17) greeting = "evening";
		this.say("Good " + greeting + ", " + this.$store.state.user.profile.displayName.split(" ")[0] + "!", ["Hi, CLS Bot 👋"]);
	},
	methods: {
		say(text, responses = []) {
			this.newMessage = "";
			this.typing = true;
			if (typeof text === "string") {
				setTimeout(() => {
					this.chat.push({
						text,
						from: "bot"
					});
					this.typing = false;
					this.responses = responses;
					setTimeout(() => {
						window.scrollTo(0, document.body.scrollHeight);
					}, 5);
				}, this.time);
			} else {
				let i = 0;
				const chatInterval = setInterval(() => {
					if (i < text.length) {
						this.typing = true;
						this.chat.push({
							text: text[i],
							from: "bot"
						});
						setTimeout(() => {
							window.scrollTo(0, document.body.scrollHeight);
						}, 5);
						if (i === text.length - 1) this.typing = false;
						i++;
					} else {
						clearInterval(chatInterval);
						this.responses = responses;
						setTimeout(() => {
							window.scrollTo(0, document.body.scrollHeight);
						}, 5);
					}
				}, this.time);
			}
		},
		respond(input, modal) {
			let text = typeof input === "string" ? input : input.text;
			if (this.isDone) {
				this.chat.push({
					text,
					from: "user"
				})
				this.firstDone = true;
				this.typing = true;
				// Do dialogflow stuff
				setTimeout(() => {
					this.typing = false;
					this.chat.push({
						text: "This is a response to your question",
						from: "bot"
					});
					setTimeout(() => {
						window.scrollTo(0, document.body.scrollHeight);
					}, 5);
				}, 2000);
			} else {
				if (text !== input && input.case) {
					this.current = input.case;
				} else {
					this.current++;
				}
				if (input.redirect) {
					return this.$router.push(input.redirect);
				}
				this.chat.push({
					text,
					from: "user"
				})
				this.typing = true;
				this.responses = [];
				if (modal === "finished") {
					this.isDone = true;
				}
				this.think();
			}
			this.newMessage = "";
			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight);
			}, 5);
		},
		think() {
			switch (this.current) {
				case 1:
					this.say("How are you feeling today?", ["Great, thanks!", "Okay, I guess", "Not so good today"]);
					break;
				case 2:
					this.say(["Alright, could we do anything to make your day better?", "Don't worry, it's completely anonymous. 🙂"], [{
						type: "input",
						placeholder: "Enter any feedback",
						modal: "feedback"
					}]);
					break;
				case 3:
					this.say(["Thanks for the input", "Have a nice day!", "Anything else I can help you with?"], [{
						text: "I have a question",
						modal: "finished"
					}]);
					break;
				case 4:
					this.say([this.firstDone ? "Have another question?" : "What's the question?"], [{
						type: "input",
						placeholder: "",
						modal: "question"
					}]);
					break;
				case 5:
					this.say(["Do you have another question?"], [{
						type: "input",
						placeholder: "",
						modal: "question"
					}]);
					break;
			}
		}
	}
}
</script>

<style lang="scss">
.messages {
	padding: 1rem;
}
.text {
	background-color: #1d3176;
	color: #fff;
	padding: 0.5rem 1rem;
	border-radius: 1.5rem;
	display: inline-block;
	font: inherit;
	border: none;
	text-align: left;
	margin: 0.5rem 0;
}
img.icon {
	height: 1.5rem;
	width: 1.5rem;
	vertical-align: bottom;
	float: left;
	margin-top: 1.25rem;
	margin-right: 0.75rem;
	border-radius: 100%;
}
.message_bot .text {
	max-width: 80%;
	background-color: #fff;
	color: inherit;
	border-bottom-left-radius: 0.5rem;
}
main {
	padding-bottom: 9rem;
}
.message_user {
	display: flex;
	justify-content: flex-end;
}
.message_user .text {
	border-bottom-right-radius: 0.5rem;
}
footer .message_user {
	display: inline-block;
}
.responds {
	margin-left: 1rem;
}
.responses {
	background-color: #fff;
	text-align: right;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	position: fixed;
	bottom: 4rem;
	left: 0; right: 0;
}
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) {
	.responses {
		bottom: 6.5rem;
	}
main {
	padding-bottom: 10.5rem;
}
}
@keyframes pulse {
	0% { transform: scale(1.05) }
	50% { transform: scale(1) }
	100% { transform: scale(1.05) }
}
.pulse {
	animation: pulse 3s ease-out;
	animation-iteration-count: infinite; 
	opacity: 1;
}
.responses .text {
	box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
	transition: 0.2s;
}
.responses .text:hover {
	box-shadow: 0 3px 14px rgba(0, 0, 0, 0.15);
	transform: scale(1.05);
}
.responses .message_user {
	display: inline-block;
}
</style>
