<template>
	<div class="body">
		<nuxt class="content" />
		<footer class="navbar">
			<nuxt-link to="/">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="user" />
					</div>
					<div class="nav-caption">Caption</div>
				</div>
			</nuxt-link>
			<nuxt-link to="/about">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="user" />
					</div>
					<div class="nav-caption">Caption</div>
				</div>
			</nuxt-link>
			<nuxt-link to="/about">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="user" />
					</div>
					<div class="nav-caption">Caption</div>
				</div>
			</nuxt-link>
			<nuxt-link to="/about">
				<div class="nav-item">
					<div class="nav-icon">
						<b-icon pack="fas" icon="user" />
					</div>
					<div class="nav-caption">Caption</div>
				</div>
			</nuxt-link>
		</footer>
	</div>
</template>

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
	position: fixed;
	background-color: #fff;
	bottom: 0;
	left: 0; right: 0;
	justify-content: space-between;
	align-items: stretch;
	display: flex;
	a {
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
			color: #000;
			&.nav-icon {
				transform: scale(1.5);
			}
		}
	}
}
</style>
