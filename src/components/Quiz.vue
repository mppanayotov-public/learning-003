<template>
	<div class="quiz">
		<Modal v-if="modalState">
			<template v-slot:content>
				<div class="modal-content">
					<div class="icon">
						<svg id="Lock_Icon" data-name="Lock Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="106" height="106" viewBox="0 0 106 106">
						  <defs>
						    <clipPath id="clip-path">
						      <path id="Mask" d="M45.455,32H0V22.857A22.772,22.772,0,0,1,6.659,6.7,22.624,22.624,0,0,1,38.8,6.7a22.772,22.772,0,0,1,6.659,16.16V32ZM22.5,8A14.264,14.264,0,0,0,8,21.981V31H37V21.981A14.264,14.264,0,0,0,22.5,8Z" transform="translate(30.5 4.5)" fill="#d1d1d1"/>
						    </clipPath>
						    <clipPath id="clip-path-2">
						      <path id="Mask-2" data-name="Mask" d="M61.835,61.835h-53A8.844,8.844,0,0,1,0,53V8.832A8.842,8.842,0,0,1,8.832,0h53a8.842,8.842,0,0,1,8.832,8.832V53A8.844,8.844,0,0,1,61.835,61.835ZM53,26.5a4.416,4.416,0,1,0,4.416,4.416A4.421,4.421,0,0,0,53,26.5Zm-17.665,0a4.416,4.416,0,1,0,4.416,4.416A4.421,4.421,0,0,0,35.334,26.5Zm-17.669,0a4.416,4.416,0,1,0,4.42,4.416A4.421,4.421,0,0,0,17.665,26.5Z" transform="translate(0 0)" fill="none"/>
						    </clipPath>
						    <clipPath id="clip-path-3">
						      <rect id="Black" width="181.083" height="181.083" fill="#9b9b9b"/>
						    </clipPath>
						  </defs>
						  <path id="Mask-3" data-name="Mask" d="M45.455,32H0V22.857A22.772,22.772,0,0,1,6.659,6.7,22.624,22.624,0,0,1,38.8,6.7a22.772,22.772,0,0,1,6.659,16.16V32ZM22.5,8A14.264,14.264,0,0,0,8,21.981V31H37V21.981A14.264,14.264,0,0,0,22.5,8Z" transform="translate(30.5 4.5)" fill="#d1d1d1"/>
						  <g id="Group_4" data-name="Group 4" transform="translate(31 60)">
						    <circle id="Oval" cx="6" cy="6" r="6" fill="#d8d8d8"/>
						    <circle id="Oval_Copy" data-name="Oval Copy" cx="6" cy="6" r="6" transform="translate(16)" fill="#d8d8d8"/>
						    <circle id="Oval_Copy_2" data-name="Oval Copy 2" cx="6" cy="6" r="6" transform="translate(34)" fill="#d8d8d8"/>
						  </g>
						  <g id="ic_https">
						    <g transform="translate(17.667 35.333)">
						      <path id="Mask-4" data-name="Mask" d="M61.835,61.835h-53A8.844,8.844,0,0,1,0,53V8.832A8.842,8.842,0,0,1,8.832,0h53a8.842,8.842,0,0,1,8.832,8.832V53A8.844,8.844,0,0,1,61.835,61.835ZM53,26.5a4.416,4.416,0,1,0,4.416,4.416A4.421,4.421,0,0,0,53,26.5Zm-17.665,0a4.416,4.416,0,1,0,4.416,4.416A4.421,4.421,0,0,0,35.334,26.5Zm-17.669,0a4.416,4.416,0,1,0,4.42,4.416A4.421,4.421,0,0,0,17.665,26.5Z" transform="translate(0 0)" fill="none"/>
						      <g clip-path="url(#clip-path-2)">
						        <g id="_Color" data-name="🎨 Color" transform="translate(-61.833 -75.083)">
						          <rect id="Black-2" data-name="Black" width="181.083" height="181.083" fill="#9b9b9b"/>
						        </g>
						      </g>
						    </g>
						  </g>
						</svg>
					</div><!-- /.icon -->
					
					<h2>An access code is required to start.</h2>

					<div class="form" v-on:submit.prevent>
						<form action="?" method="post">
							<input type="text" class="field" placeholder="Access Code">
							
							<div class="form__actions">
								<button v-on:click="closeModal" class="form__btn btn">Cancel</button>

								<button v-on:click="quizInit" class="form__btn btn">Start</button>
							</div><!-- /.form__actions -->
						</form>
					</div><!-- /.form -->
				</div><!-- /.modal-content -->
			</template>
		</Modal>

		<div class="quiz__header">
			<div class=" cols">
				<div class="box box--big">
					<div class="progress">
						Assessment Progress
					</div><!-- /.progress -->
				</div><!-- /.box -->
			
				<div class="box">
					<div class="timer">
						Time Remaining
					</div><!-- /.progress -->
				</div><!-- /.box -->
			</div><!-- /.cols -->
		</div><!-- /.quiz__header -->

		<div class="quiz__main">
			<QuizStart v-if="quizStart"/>

			<div class="quiz__questions" v-if="quizQuestions">
				<!-- Use Prop -->
				<!-- <Question v-on:quizPrev="quizPrev" v-on:quizNext="quizNext" :questionData="activeQuestion" v-bind:questions="questions"> -->
				<Question v-on:quizPrev="quizPrev" v-on:quizNext="quizNext" v-bind:answers="answers">
				</Question>
			</div><!-- /.quiz__questions -->
		</div><!-- /.quiz__main -->

		
	</div><!-- /.quiz -->
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';
import QuizStart from '@/components/QuizStart.vue';
import Question from '@/components/Question.vue';
require('@/assets/questions.json');

export default {
	name: 'Quiz',
	data: () => ({
		quizStart: true,
		quizQuestions: false,
		questions: null,
	}),
	components: {
		Modal,
		QuizStart,
		Question,
	},
	methods: {
		...mapActions ([
			'closeModal',
			'openModal'
		]),
		quizInit: function() {
			this.closeModal();
			this.quizStart = false;
			this.quizQuestions = true;
		},
		quizPrev: function() {
			const activeIndex = this.questions.indexOf(this.activeQuestion);
			const prevIndex = activeIndex - 1;
			if (prevIndex > -1) {
				this.questions[activeIndex].isActive = false;
				this.questions[prevIndex].isActive = true;
			}
		},
		quizNext: function() {
			const activeIndex = this.questions.indexOf(this.activeQuestion);
			const nextIndex = activeIndex + 1;
			if (nextIndex < this.questions.length) {
				this.questions[activeIndex].isActive = false;
				this.questions[nextIndex].isActive = true;
			}
		}
	},
	computed: {
		...mapGetters ([
			'modalState'
		]),
		answers: function() {

			console.log('this.questions', this.questions)
			console.log('this.questions.answers', this.questions.answers)
			return this.questions.answers;
		},
		activeQuestion: function() {
			const index = this.questions.findIndex(question => question.isActive);
			return this.questions[index];
		},
	},
	mounted() {
		axios
			.get('https://raw.githubusercontent.com/mppanayotov-public/learning-003/master/src/assets/questions.json')
			.then(response => {
				this.questions = response.data.questions


				console.log('response.data', response.data)
				console.log('response.data.questions', response.data.questions)
		})


		// this.questions[0].isActive = true;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.quiz {
	.quiz__header {
		margin-bottom: 30px; 
		.box--big {
			flex-grow: 1;
		}

		.box + .box {
			margin-left: 20px; 
		}
	}
}

.question {
}

.modal-content {
	text-align: center; 

	.form {
		.form__actions {
			margin-top: 20px; 
			display: flex; 
			justify-content: center;
		}

		.btn + .btn {
			margin-left: 20px; 
		}
	}
}
</style>
