<template>
	<div class="main">
		<Welcome/>
	</div><!-- /.main -->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/compon ents/HelloWorld.vue'
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'home',
  components: {
  	Welcome,
  }
}
</script>
