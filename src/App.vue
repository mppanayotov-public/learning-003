<template>
	<div class="wrapper" id="app">
		<!-- <div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div> -->

		<Header/>

		<router-view/>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
	components: {
		Header,
	}
}
</script>

<style lang="scss">
@import 'assets/css/variables.scss';
@import 'assets/css/reset.scss';
@import 'assets/css/base.scss';
@import 'assets/css/helpers.scss';
@import 'assets/css/shell.scss';
@import 'assets/css/form-elements.scss';
@import 'assets/css/shadow.scss';
@import 'assets/css/btn.scss';
@import 'assets/css/wrapper.scss';
@import 'assets/css/box.scss';
</style>
