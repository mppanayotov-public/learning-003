<template>
	<div class="main main--quiz">
		<Quiz/>
	</div><!-- /.main -->
</template>

<script>
import Quiz from '@/components/Quiz.vue'

export default {
  name: 'quiz',
  components: {
  	Quiz,
  }
}
</script>

<style type="text/css" media="screen">
	.main--quiz {
		background-color: #f6f6ff; 
	}
</style>
