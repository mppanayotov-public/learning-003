<template>
	<div>
		<h2>
			<slot name="title"></slot>
		</h2>

		<label>
			<input class="radio" type="radio" v-bind:value="1" v-model="answer" />
			<slot name="answer1"></slot>
		</label>

		<label>
			<input class="radio" type="radio" v-bind:value="2" v-model="answer" />
			<slot name="answer2"></slot>
		</label>

		<label>
			<input class="radio" type="radio" v-bind:value="3" v-model="answer" />
			<slot name="answer3"></slot>
		</label>
	</div>
</template>

<script>
export default {
	name: 'Question',
	data: () => ({
		answer: "",
	}),
	components: {
	},
	methods: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	input,
	label {
		cursor: pointer;
	}
</style>
