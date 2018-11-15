<template>
	<div class="body">
		<transition name="fade">
			<nuxt class="content" />
		</transition>
		<footer class="navbar">
			<nuxt-link to="/" class="nav-element">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="comments" />
					</div>
					<div class="nav-caption">Moments</div>
				</div>
			</nuxt-link>
			<nuxt-link to="/explore" class="nav-element">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="compass" />
					</div>
					<div class="nav-caption">Explore</div>
				</div>
			</nuxt-link>
			<a class="nav-element" @click.prevent="a11y">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="universal-access" />
					</div>
					<div class="nav-caption">Access</div>
				</div>
			</a>
			<nuxt-link to="/profile" class="nav-element">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="user" />
					</div>
					<div class="nav-caption">Profile</div>
				</div>
			</nuxt-link>
		</footer>
	</div>
</template>

<script>
import firebase from "@/services/firebase";
import loadJs from "loadjs";

import { LOGIN_SUCCESS } from '@/store/user';

export default {
	mounted() {
		window.a11ySettings = window.a11ySettings || {};
		window.a11ySettings.display = "none";
		loadJs("https://agastya-loader.oswaldlabs.com/hackathon.js", () => {
			setTimeout(() => {
				window.agastya.api();
			}, 1000);
        });

        firebase.auth().onAuthStateChanged(userProfile => {
            if (userProfile) {
				this.$store.commit(LOGIN_SUCCESS, userProfile);
				if (this.$route.path === "/login") this.$router.push("/");
            }
        });

	},
	methods: {
		a11y() {
			window.agastya.frame.open();
		}
	}
}
</script>


<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.5.0/css/all.css");
html, body {
	background-color: #dfe6e9;
}
header, footer.navbar {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.025);
	background-color: #fff;
	z-index: 5;
	position: fixed;
	left: 0; right: 0;
}
header {
	font-size: 125%;
	top: 0;
	height: 4rem;
	line-height: 4rem;
	text-align: center;
}
main {
	padding-top: 5rem;
}
footer.navbar {
	bottom: 0;
	justify-content: space-between;
	align-items: stretch;
	display: flex;
	.nav-element {
		color: inherit;
		appearance: none;
		height: 4rem;
		background: transparent;
		border: none;
		font: inherit;
		display: flex;
		flex-direction: column;
		border-radius: 0;
		padding: 0;
		margin: 0;
		width: 100%;
		justify-content: center;
		text-align: center;
		.nav-item {
			align-self: center;
			display: flex;
			justify-content: center;
			flex-direction: column;
		}
		.nav-caption {
			font-size: 80%;
		}
		.nav-icon {
			margin: 0.15rem auto;
		}
		&.nuxt-link-exact-active {
			color: #2980b9;
			.nav-icon {
				transform: scale(1.2);
			}
		}
	}
}
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>
