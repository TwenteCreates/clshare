<template>
	<main>
		<header>Home</header>
	</main>
</template>

<script>
export default {
	created() {
		this.$router.push("/chat/everyone");
	},
}
</script>
