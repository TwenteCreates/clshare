<template>
	<main>
		<header>
			Explore
		</header>
		<div>
			<h2>Events</h2>
			<ul class="groups">
				<li>
					<router-link to="/chat/party?name=Party+Planning+Committee">
						<img alt="Image" src="https://tse2.mm.bing.net/th?q=startup+team&w=200&h=100&p=0&dpr=2&adlt=moderate&c=1">
						<div>
							#CLSInnovation<br>
							Nov 16, 3:30 pm
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/chat/tech?name=Tech+staff">
						<img alt="Image" src="https://tse2.mm.bing.net/th?q=christmas+party&w=200&h=100&p=0&dpr=2&adlt=moderate&c=1">
						<div>
							Christmas Party<br>
							Dec 24, 6 pm
						</div>
					</router-link>
				</li>
			</ul>
			<h2>Coworkers</h2>
			<ul class="groups people">
				<li>
					<img alt="" src="https://randomuser.me/api/portraits/men/32.jpg">
					Steven
				</li>
				<li>
					<img alt="" src="https://randomuser.me/api/portraits/women/32.jpg">
					Liz
				</li>
				<li>
					<img alt="" src="https://randomuser.me/api/portraits/women/2.jpg">
					Laura
				</li>
				<li>
					<img alt="" src="https://randomuser.me/api/portraits/men/3.jpg">
					Brad
				</li>
			</ul>
			<h2>Interests</h2>
			<ul class="groups people">
				<li>
					<img alt="" src="https://tse2.mm.bing.net/th?q=yoga+woman&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1">
					Yoga
				</li>
				<li>
					<img alt="" src="https://tse2.mm.bing.net/th?q=jogging&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1">
					Running
				</li>
				<li>
					<img alt="" src="https://tse2.mm.bing.net/th?q=pokemon+show&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1">
					Pokémon
				</li>
				<li>
					<img alt="" src="https://tse2.mm.bing.net/th?q=reading&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1">
					Reading
				</li>
			</ul>
			<h2>Feed</h2>
			<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/CLSGroup?ref_src=twsrc%5Etfw">Tweets by CLSGroup</a>
		</div>
	</main>
</template>

<script>
import loadJs from "loadjs";
export default {
	mounted() {
		loadJs("https://platform.twitter.com/widgets.js");
	}
}
</script>

<style lang="scss">
section {
	padding: 1rem;
}
h2 {
	margin-top: 0 !important;
	padding: 1rem;
	padding-bottom: 0;
}
.groups.people {
	text-align: center;
	padding: 0 0.5rem !important;
}
.groups.people li {
	flex: 0 0 25%;
    max-width: 25%;
	padding: 0 0.75rem !important;
	img {
		border-radius: 100%;
	}
}
</style>
