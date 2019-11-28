<template>
	<div class="question">
		<h2> <span class="number">{{number}}.&nbsp;</span> {{title}} </h2>

		<div class="question__content">
			<!-- USE V-FOR -->
			<label v-for="answer, index in answers">
				<input class="radio" type="radio" v-bind:value="index" v-model="answerInput" v-on:change="callUpdateAnswer" />
				{{answer}}
			</label>
		</div><!-- /.question__content -->

		<a @click.prevent="callUpdatePinned" href="#" class="question__pin">
			<img class="pin__off" src="../assets/images/temp/tack-gray.png" alt="" width="27" height="27">

			<img v-if="this.isPinned" class="pin__on" src="../assets/images/temp/tack-blue.png" alt="" width="27" height="27">
		</a>
	</div>
</template>

<script>
export default {
	name: 'Question',
	props: [
		"number",
		"title",
		"answers",
		"selectedAnswer",
		"isPinned",
	],
	data: function() {
		return {
			answerInput: this.selectedAnswer,
			pinned: this.isPinned,
		}	
	},
	methods: {
		callUpdateAnswer: function() {
			this.$emit('callUpdateSelectedAnswer', this.answerInput);
		},
		callUpdatePinned: function() {
			this.$emit('callUpdatePinned');
		},
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
		margin-top: 20px; 
	}

	label {
		display: block; 
	}

	.radio {
		margin-right: 10px; 
	}

	.question {
		position: relative; 

		.question__content {
			margin-top: 40px; 
		}

		.question__pin {
			position: absolute; 
			top: 16px; 
			right: 20px; 
			
			.pin__on {
				position: absolute; 
				top: 0; 
				left: 0; 
			}
		}
	}

	.number {
		color: #2049E6; 
		font-weight: 500; 
	}
</style>
