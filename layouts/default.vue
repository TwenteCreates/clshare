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
			<button type="button" class="nav-element" @click.prevent="a11y">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="universal-access" />
					</div>
					<div class="nav-caption">Access</div>
				</div>
			</button>
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
                // TODO: Add redirect;
                // var redirect = router.currentRoute.query.redirect;
                // if (redirect) {
                //   router.replace(redirect);
                // }
                // else {
                //   router.replace({ name: 'randomPage' });
                // }
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
.body {
	background-color: #dfe6e9;
	min-height: 100vh;
	display: flex;
}
.content {
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
footer.navbar {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.025);
	position: fixed;
	background-color: #fff;
	z-index: 5;
	bottom: 0;
	left: 0; right: 0;
	justify-content: space-between;
	align-items: stretch;
	display: flex;
	.nav-element {
		color: inherit;
		appearance: none;
		background: transparent;
		border: none;
		font: inherit;
		display: flex;
		border-radius: 0;
		padding: 0.5rem 0;
		margin: 0;
		width: 100%;
		justify-content: center;
		text-align: center;
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
