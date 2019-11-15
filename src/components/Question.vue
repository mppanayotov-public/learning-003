<template>
	<div class="question">
		<h2>
			<slot name="title"></slot>
		</h2>

		<div class="question__content">
			<!-- USE V-FOR -->
			<template v-for="answer in answers">
				<label>
					<input class="radio" type="radio" v-bind:value="answer" v-model="chosenAnswer" />
					{{answer}}
				</label>
			</template>
		</div><!-- /.question__content -->

		<div class="question__actions">
			<button class="btn" v-on:click="quizPrev">Previous question</button>

			<button class="btn" v-on:click="quizNext">Next question</button>
		</div><!-- /.question__actions -->
	</div>
</template>

<script>
export default {
	name: 'Question',
	props: ["answers"],
	data: () => ({
		chosenAnswer: "",
	}),
	computed: {
	},
	components: {
	},
	methods: {
		quizPrev: function() {
			this.$emit('quizPrev');
		},
		quizNext: function() {
			this.$emit('quizNext');
		}
	}
}
</script>

<style scoped lang="scss">
	input,
	label {
		cursor: pointer;
	}

	.question {
		.question__content {
			margin-top: 40px; 
		}

		.question__actions {
			margin-top: 40px; 
			display: flex; 
			justify-content: center;
		}

		.btn + .btn {
			margin-left: 20px; 
		}
	}
</style>
