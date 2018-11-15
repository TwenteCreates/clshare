<template>
	<main>
		<header>Moments</header>
		<ul>
			<li>Messages go here...</li>
		</ul>
		<footer>
			<form @submit.prevent="send">
				<b-field>
					<b-input expanded v-model="text" size="is-medium" placeholder="Type your message..." icon="message" />
					<p class="control">
						<button type="submit" class="button is-medium">Send</button>
					</p>
				</b-field>
			</form>
		</footer>
	</main>
</template>

<script>
import Push from "push.js";
export default {
	data() {
		return {
			text: ""
		}
	},
	methods: {
		send() {
			this.text = "";
			Push.create("Sent!");
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
</style>
