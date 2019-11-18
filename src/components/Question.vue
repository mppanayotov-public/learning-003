<template>
	<div class="question">
		<h2>
			{{title}}
		</h2>

		<div class="question__content">

			<!-- USE V-FOR -->
			<template v-for="answer, index in answers">
				<label>
					<input class="radio" type="radio" v-bind:value="index" v-model="answerInput" v-on:change="callUpdateAnswer" />
					{{answer}}
				</label>
			</template>
		</div><!-- /.question__content -->
	</div>
</template>

<script>
export default {
	name: 'Question',
	props: [
		"title",
		"answers",
		"selectedAnswer",
	],
	data: () => ({
		answerInput: function() {
			return this.selectedAnswer;
		},
		checkedAnswer: false,
	}),
	methods: {
		callUpdateAnswer: function() {
			this.$emit('callUpdateAnswer', this.answerInput);
		}
	},
	computed: {
	}
}
</script>

<style scoped lang="scss">
	input,
	label {
		cursor: pointer;
	}

	label + label {
		margin-left: 40px; 
	}

	.radio {
		margin-right: 10px; 
	}

	.question {
		.question__content {
			margin-top: 40px; 
		}
	}
</style>
