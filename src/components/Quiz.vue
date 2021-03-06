<template>
	<div class="quiz">
		<Modal v-if="modalState">
			<template v-slot:content>
				<div class="modal-content">
					<div class="icon">
						<img src="../assets/images/temp/lock.png" alt="" width="106" height="106">
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

		<div class="quiz__inner">
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
			
					<Question 
						v-bind:number="activeQuestionNumber"
						v-bind:title="activeQuestionTitle"
						v-bind:answers="activeQuestionAnswers"
						v-bind:selectedAnswer="activeSelectedAnswer"
						v-bind:isPinned="activeQuestionPinned"
						v-on:callUpdateSelectedAnswer="updateSelectedAnswer"
						v-on:callUpdatePinned="updatePinned"
						:key="activeQuestion.questionId" 
						class="box"
					>
					</Question>
			
					<div class="question-controls">
						<button class="btn" v-on:click="quizPrev">Previous question</button>
			
						<button class="btn" v-on:click="quizNext">Next question</button>
					</div><!-- /.question__actions -->
				</div><!-- /.quiz__questions -->
			</div><!-- /.quiz__main -->
		</div><!-- /.quiz__inner -->

		<div class="sidebar box js-sidebar">
			<a @click.prevent="toggleSidebar" href="#" class="sidebar__toggle js-sidebar-toggle">
				<div class="icon">
					<img src="../assets/images/temp/collapse.png" alt="" width="22" height="18">
				</div><!-- /.icon -->
			</a>

			<div class="sidebar__inner">
				<ul class="list-questions">
					<li v-for="question, index in questions">
						<span class="list__number">{{index+1}}</span>

						<span v-if="question.selectedAnswer > -1" class="answered">&check;</span>

						<span v-if="question.isPinned" class="pinned"><img src="../assets/images/temp/tack-small.png" alt="" width="19" height="19"></span>
					</li>
				</ul><!-- /.list-questions -->
			</div><!-- /.sidebar__inner -->
		</div><!-- /.sidebar -->
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
		activeQuestionPinned: false,
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
			this.activeQuestionPinned = this.activeQuestion.isPinned;

			console.table(this.questions);
		},
		updateSelectedAnswer: function(newAnswer) {
			this.activeQuestion.selectedAnswer = newAnswer;

			this.updateQuestionStatus();
			this.updateProgress();
		},
		updatePinned: function() {
			if (!this.activeQuestion.isPinned) {
				this.activeQuestion.isPinned = true;
			} else {
				this.activeQuestion.isPinned = false;
			}

			this.updateQuestionStatus();
			this.updateProgress();
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
			const initialDuration = 60 * 60 * 5;
			let timerTime = initialDuration;
			let hours;
			let minutes;
			let seconds;
		
			const timerInterval = setInterval(function () {
				hours = parseInt(timerTime / 3600, 10);
				minutes = parseInt(timerTime / 60 % 60, 10);
				seconds = parseInt(timerTime % 60, 10);

				hours = hours < 10 ? "0" + hours : hours;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				timer.textContent = hours +  ":" + minutes + ":" + seconds;

				if (--timerTime < 0) {
					clearInterval(timerInterval);
				}
			}, 1000);
		},
		toggleSidebar: function() {
			const sidebar = document.querySelector('.js-sidebar');
			const sidebarToggle = document.querySelector('.js-sidebar-toggle');

			if (sidebar.classList.contains('active')) {
				sidebar.classList.remove('active');
			} else {
				sidebar.classList.add('active');
			}
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
	display: flex; 

	.quiz__inner {
		flex: 1 1 auto;
	}

	.quiz__header {
		margin-bottom: 30px; 

		.box--big {
			flex-grow: 1;
		}

		.box + .box {
			margin-left: 20px; 
		}
	}

	.sidebar {
		margin-right: -36px; 
		margin-left: 30px; 
		padding: 22px 20px; 
		width: 100%; 
		max-width: 60px; 
		min-height: 72px; 
		flex: 0 0 auto;
		align-self: flex-start;
		transition: max-width .3s ease-out;

		.sidebar__toggle {
			width: 20px; 
			height: 28px; 
			display: block; 

			.icon {
				transition: transform .3s ease-out;
			}
		}

		.sidebar__inner {
			width: 211px; 
			display: none; 
		}

		&.active {
			max-width: 251px; 

			.sidebar__toggle {
				.icon {
					transform: scaleX(-1);
				}
			}

			.sidebar__inner {
				display: block; 
			}
		}
	}
}

.list-questions {
	margin: -13px;
	display: flex; 
	flex-wrap: wrap;
	justify-content: space-between;

	li {
		position: relative; 
		margin: 13px; 
		margin-bottom: 30px; 
		width: 33px; 
		height: 33px; 
		box-shadow: 0 0 0 1px #979797 inset;
		border-radius: 50%;
		flex: 0 0 auto;
	}

	.list__number {
		position: absolute; 
		top: 100%; 
		left: 0; 
		right: 0; 
		margin-top: 10px; 
		text-align: center; 
	}

	.answered {
		position: absolute; 
		top: 0; 
		left: 0; 
		right: 0; 
		bottom: 0; 
		border-radius: 50%;
		background-color: #fff; 
		background-color: #1fc9ff; 
		text-align: center; 
		line-height: 1; 
		display: flex; 
		justify-content: center;
		align-items: center;
		color: #fff;
	}

	.pinned {
		position: absolute; 
		bottom: 0; 
		right: 0; 
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
