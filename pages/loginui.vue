<template>
	<main>
		<div class="in">
			<div><img alt="Logo" src="/dark_splash.png"></div>
			<div><button @click="login">Login with @cls-group.com</button></div>
		</div>
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
	mounted() {
		if (window.innerWidth > 1000) this.$router.push("/login");
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
main {
	position: fixed;
	background-color: #1d3176;
	text-align: center;
	left: 0; right: 0;
	top: 0; bottom: 0;
	z-index: 10;
	padding: 0;
	margin: 0 !important;
	&::before {
		content: "";
		position: absolute;
		z-index: 11;
		opacity: 0.5;
		left: 0; right: 0;
		bottom: 0; top: 0;
		background-image: url("/vid.gif");
		filter: hue-rotate(120deg);
		background-position: bottom right;
		background-size: cover;
	}
	.in {
		position: absolute;
		top: 20vh;
		left: 15%; right: 15%;
		z-index: 12;
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
