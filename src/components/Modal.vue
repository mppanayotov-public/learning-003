<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<a href="#" v-on:click="closeModal" class="modal-close">
							<svg xmlns="http://www.w3.org/2000/svg" width="12.93" height="12.93" viewBox="0 0 12.93 12.93">
							  <g id="Group_5_Copy" data-name="Group 5 Copy" transform="translate(6.465 -4.849) rotate(45)">
							    <rect id="Rectangle_7" data-name="Rectangle 7" width="2.286" height="16" transform="translate(6.857)" fill="#a3aaad"/>
							    <rect id="Rectangle_3" data-name="Rectangle 3" width="16" height="2.286" transform="translate(0 6.857)" fill="#a3aaad"/>
							  </g>
							</svg>
						</a>
					</div>

					<div class="modal-body">
						<slot name="content"></slot>	
					</div>

					<div class="modal-footer">
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
	name: 'Modal',
	components: {
	},
	template: '#modal-template',
	props: ['content'],
	data: function() {
		return {
			modalContent: this.content,
		};
	},
	methods: {
		...mapActions ([
			'closeModal',
			'openModal'
		])
	},
	computed: {
		...mapGetters ([
			'modalState'
		])
	} 
}
</script>

<style type="text/css" media="screen">
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	display: table;
	transition: opacity .3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	/*width: 300px;*/
	width: 100%; 
	max-width: 618px; 
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	transition: all .3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
	display: flex; 
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
}

.modal-close {
	margin-left: auto; 
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>