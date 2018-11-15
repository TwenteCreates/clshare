<template>
	<main>
		<div class="in">
			<div><img alt="Logo" src="/dark_splash.png"></div>
			<div><button @click="login">Login with @cls-group.com</button></div>
		</div>
		<video src="https://storage.googleapis.com/coverr-main/mp4/Notes.mp4" autoplay muted loop />
	</main>
</template>

<script>
import { LOGIN } from "@/store/user";
import { CREDENTIALS_LOGIN_PROVIDER, GOOGLE_LOGIN_PROVIDER, LINKEDIN_LOGIN_PROVIDER, FACEBOOK_LOGIN_PROVIDER } from "@/store/user/loginProviders";

export default {
	data() {
		return {
			email: "",
			password: "",
		}
	},
	methods: {
		login() {
			if (this.$store.state.user.loggedIn) this.$router.push("/");
			this.$store.dispatch(LOGIN, { provider: GOOGLE_LOGIN_PROVIDER });
		}
	}
};
</script>


<style lang="scss" scoped>
video {
	position: fixed;
	filter: hue-rotate(150deg);
	opacity: 0.5;
	z-index: 9;
	right: 0;
	top: 0; bottom: 0;
	height: 100vh;
	max-width: none;
}
main {
	position: fixed;
	background-color: #1d3176;
	text-align: center;
	left: 0; right: 0;
	top: 0; bottom: 0;
	z-index: 10;
	padding: 0;
	margin: 0 !important;
	// background-image: url("/loginbg.png");
	// background-position: bottom center;
	// background-size: cover;
	.in {
		position: absolute;
		top: 20vh;
		left: 15%; right: 15%;
		z-index: 11;
	}
	img {
		width: 100%;
	}
	button {
		color: #1d3176;
		background-color: #fff;
		width: 100%;
		margin-top: 10vh;
		padding: 0.75rem 0;
		border-radius: 5rem;
		font: inherit;
		font-size: 115%;
		border: 0;
	}
}
</style>
