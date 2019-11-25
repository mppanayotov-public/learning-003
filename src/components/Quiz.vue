<template>
	<div class="quiz">
		<Modal v-if="modalState">
			<template v-slot:content>
				<div class="modal-content">
					<div class="icon">
						<img src="../assets/lock.png" alt="" width="106" height="106">
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
			<div class="cols">
				<div class="box box--big">
					<div class="progress">
						Assessment Progress

						<div class="bar-progress">
							<div class="bar__inner js-progress"></div><!-- /.bar__inner -->
						</div><!-- /.bar-progress -->
					</div><!-- /.progress -->
				</div><!-- /.box -->
			
				<div class="box">
					<div class="timer">
						Time Remaining

						<div class="timer__time js-timer">
							05:00:00
						</div><!-- /.timer__time -->
					</div><!-- /.progress -->
				</div><!-- /.box -->
			</div><!-- /.cols -->
		</div><!-- /.quiz__header -->

		<div class="quiz__main">
			<QuizStart v-if="quizStart"/>

			<div class="quiz__questions" v-if="quizQuestions">
				<!-- Use Prop -->

				<Question v-bind:number="activeQuestionNumber" v-bind:title="activeQuestionTitle" v-bind:answers="activeQuestionAnswers" v-bind:selectedAnswer="activeSelectedAnswer" v-on:callUpdateSelectedAnswer="updateSelectedAnswer" :key="activeQuestion.questionId"></Question>

				<div class="question-controls">
					<button class="btn" v-on:click="quizPrev">Previous question</button>

					<button class="btn" v-on:click="quizNext">Next question</button>
				</div><!-- /.question__actions -->
			</div><!-- /.quiz__questions -->
		</div><!-- /.quiz__main -->
	</div><!-- /.quiz -->
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import Modal from '@/components/Modal.vue';
import QuizStart from '@/components/QuizStart.vue';
import Question from '@/components/Question.vue';

export default {
	name: 'Quiz',
	data: () => ({
		quizStart: true,
		quizQuestions: false,
		questions: [],
		activeQuestion: "",
		activeQuestionNumber: "",
		activeQuestionTitle: "",
		activeQuestionAnswers: "",
		activeSelectedAnswer: "-1",
		progress: "0"
	}),
	components: {
		Modal,
		QuizStart,
		Question,
	},
	methods: {
		...mapMutations ([
			'closeModal',
			'openModal'
		]),
		quizInit: function() {
			this.closeModal();
			this.updateQuestionStatus();
			this.quizStart = false;
			this.quizQuestions = true;
			this.startTimer();
		},
		quizPrev: function() {
			const activeIndex = this.questions.findIndex(question => question.isActive);
			const prevIndex = activeIndex - 1;

			if (prevIndex > -1) {
				this.questions[activeIndex].isActive = false;
				this.questions[prevIndex].isActive = true;
			}

			this.updateQuestionStatus();
			this.updateProgress();
		},
		quizNext: function() {
			const activeIndex = this.questions.findIndex(question => question.isActive);
			const nextIndex = activeIndex + 1;

			if (nextIndex < this.questions.length) {
				this.questions[activeIndex].isActive = false;
				this.questions[nextIndex].isActive = true;
			}

			this.updateQuestionStatus();
			this.updateProgress();
		},
		updateQuestionStatus: function() {
			const index = this.questions.findIndex(question => question.isActive);
			
			this.activeQuestion = this.questions[index];
			this.activeQuestionNumber = index+1;
			this.activeQuestionTitle = this.activeQuestion.title;
			this.activeQuestionAnswers = this.activeQuestion.answers;
			this.activeSelectedAnswer = this.activeQuestion.selectedAnswer;

			console.table(this.questions);
		},
		updateSelectedAnswer: function(newAnswer) {
			this.activeQuestion.selectedAnswer = newAnswer;
		},
		updateQuestionsData: function() {
			const questions = this.questions;

			questions[0].isActive = true;

			for (let i = 0; i < questions.length; i++) {
				questions[i].questionId = i;
			}
		},
		updateProgress: function() {
			const progressBar = document.querySelector('.js-progress');
			const questions = this.questions;
			const questionsAmount = this.questions.length;
			let progress = this.progress;
			let answeredAmount = [];

			function calculateAnsweredAmount() {
				for (let i in questions) {
					if (questions[i].selectedAnswer) {
						answeredAmount.push(questions[i]);
					}
				}
			}

			calculateAnsweredAmount();
			progress = answeredAmount.length / questionsAmount * 100;
			progressBar.style.transform = "translateX(" + progress + "%)";
		},
		startTimer: function() {
			const timer = document.querySelector('.js-timer');
			const duration = 5 * 60 * 60;

			setInterval(function () {
				let minutes = parseInt(duration / 60, 10)
				let seconds = parseInt(duration % 60, 10);

				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				timer.textContent = minutes + ":" + seconds;
			}, 1000);
		}
	},
	computed: {
		...mapGetters ([
			'modalState'
		]),
	},
	mounted() {
		axios
			.get('https://raw.githubusercontent.com/mppanayotov-public/learning-003/master/src/assets/questions.json')
			.then(res => {
				const data = res.data;

				// for (let key in data) {
				// 	this.questions.push(data[key]);
				// 	this.questions[key].isActive = false;
				// }

				this.questions = data;
				this.updateQuestionsData();
		})
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

.question-controls {
	margin-top: 40px; 
	display: flex; 
	justify-content: center;
	.btn + .btn {
		margin-left: 20px; 
	}
}

.progress {
	.bar-progress {
		position: relative;
		margin-top: 16px; 
		height: 4px;
		background-color: #E2E7FE; 
		border-radius: 100px;
		overflow: hidden; 

		.bar__inner {
			position: absolute; 
			right: 100%;
			width: 100%; 
			top: 0;
			bottom: 0;
			transform: translateX(0%); 
			background-color: #2049E6;
			border-radius: 100px;
			transition: transform .3s ease-out;
		}
	}
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
