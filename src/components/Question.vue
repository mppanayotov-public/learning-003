<template>
	<div>
		<slot name="title"></slot>

		<slot name="answer1"></slot>

		<slot name="answer2"></slot>

		<slot name="answer3"></slot>
	</div>
</template>

<script>
export default {
	name: 'Question',
	data: () => ({
	}),
	components: {
	},
	methods: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
