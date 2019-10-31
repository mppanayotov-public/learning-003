<template>
	<div class="question">
		<h2>
			<slot name="title"></slot>
		</h2>

		<div class="question__content">
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
	data: () => ({
		answer: "",
	}),
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
