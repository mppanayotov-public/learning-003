<template>
	<div>
		<p>Here are some instructions before you begin. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
				
		<p style="color:red">Warning about cheating irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		
		<p style="text-align: right;">
			<button class="btn" v-on:click="openModal">Begin Assessment</button>
		</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
	name: 'QuizStart',
	data: () => ({
	}),
	components: {
	},
	methods: {
		...mapMutations ([
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	button {
		margin-top: 40px; 
	}
</style>
