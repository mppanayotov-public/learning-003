<template>
	<div class="welcome">
		<h2>Select an assessment you’re ready to take.</h2>

		<ul>
			<li>
				<svg xmlns="http://www.w3.org/2000/svg" width="62" height="83" viewBox="0 0 62 83">
				  <path id="Style" d="M47.87,83H14.13c-4.852,0-6.667-.5-8.491-1.478a10.006,10.006,0,0,1-4.166-4.183C.5,75.506,0,73.685,0,68.813V14.187C0,9.315.5,7.493,1.472,5.662A10.007,10.007,0,0,1,5.639,1.478C7.465.5,9.28,0,14.13,0H32.722V16.1c0,4.566.465,6.274,1.381,7.993a9.375,9.375,0,0,0,3.906,3.921c1.711.919,3.412,1.386,7.96,1.386H62V68.813c0,4.869-.5,6.692-1.472,8.526a10.01,10.01,0,0,1-4.166,4.183C54.537,82.5,52.722,83,47.87,83ZM62,24H45.912c-2.714,0-3.731-.278-4.755-.824a5.6,5.6,0,0,1-2.333-2.333C38.277,19.821,38,18.8,38,16.088V0L62,24Z" opacity="0.398"/>
				</svg>
			
				<h3>Algebra Assessment</h3>

				<div class="stats">
					Attemps Remaining: 4 <br>
					Avg Duration: 45mins <br>
					Previous Score: 45%
				</div><!-- /.stats -->

				<a class="btn" href="#">Take Assessment</a>
			</li>
			
			<li>
				<svg xmlns="http://www.w3.org/2000/svg" width="62" height="83" viewBox="0 0 62 83">
				  <path id="Style_Copy" data-name="Style Copy" d="M47.87,83H14.13c-4.852,0-6.667-.5-8.491-1.478a10.006,10.006,0,0,1-4.166-4.183C.5,75.506,0,73.685,0,68.813V14.187C0,9.315.5,7.493,1.472,5.662A10.007,10.007,0,0,1,5.639,1.478C7.465.5,9.28,0,14.13,0H32.722V16.1c0,4.566.465,6.274,1.381,7.993a9.375,9.375,0,0,0,3.906,3.921c1.711.919,3.412,1.386,7.96,1.386H62V68.813c0,4.869-.5,6.692-1.472,8.526a10.01,10.01,0,0,1-4.166,4.183C54.537,82.5,52.722,83,47.87,83ZM62,24H45.912c-2.714,0-3.731-.278-4.755-.824a5.6,5.6,0,0,1-2.333-2.333C38.277,19.821,38,18.8,38,16.088V0L62,24Z" opacity="0.398"/>
				</svg>
			
				<h3>Algebra Assessment</h3>

				<div class="stats">
					Attemps Remaining: 4 <br>
					Avg Duration: 45mins <br>
					Previous Score: 45%
				</div><!-- /.stats -->

				<a class="btn" href="#">Take Assessment</a>
			</li>
		</ul>

		<button v-on:click="showModal = true">Show Modal</button>

		<Modal v-if="showModal" :content="modalContent"/>
	</div><!-- /.welcome -->
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
	name: 'Welcome',
	data: () => ({
		showModal: false,
		modalContent: 'Hello'
	}),
	components: {
		Modal
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.welcome {
	text-align: center; 
	padding: 200px 0;

	h2,
	h3 {
		margin-bottom: 30px; 
		font-weight: 400; 
	}

	h2 {
		font-size: 24px; 
	}

	h3 {
		font-size: 20px; 
	}

	ul {
		display: flex; 
		justify-content: center;
	}

	li {
		position: relative; 
		width: 257px; 
		flex: 0 0 auto;

		&:hover {
			.btn {
				opacity: 1; 
				pointer-events: all;
			}
		} 
	}

	li + li {
		margin-left: 38px; 
	}

	.btn {
		margin-top: 30px; 
		pointer-events: none;
		opacity: 0; 
	}

	.stats {
		color: #2049E6;
	}
}
</style>
