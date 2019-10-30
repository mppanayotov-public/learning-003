<template>
	<div class="search">
		<form action="?" method="get">
			<label for="q" class="hidden">Search</label>
			
			<input type="search" name="q" id="q" value="" placeholder="Search for Programs, Learning Units, Cohorts, etc." class="search__field">
			
			<button type="submit" class="search__btn">
				<svg xmlns="http://www.w3.org/2000/svg" width="14.671" height="15.268" viewBox="0 0 14.671 15.268">
				  <g id="Group_6" data-name="Group 6" transform="translate(1 1)">
				    <path id="Path" d="M.382.377,3.845,3.8" transform="translate(8.412 9.059)" fill="#d8d8d8" stroke="#96a0b2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
				    <ellipse id="Oval_4" data-name="Oval 4" cx="5.353" cy="5.284" rx="5.353" ry="5.284" transform="translate(0 0)" fill="none" stroke="#96a0b2" stroke-miterlimit="10" stroke-width="2"/>
				  </g>
				</svg>
			</button>
		</form>
	</div><!-- /.search -->
</template>

<script>
export default {
	name: 'SearchForm'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search { 
	position: relative; 
	color: #808898;
	font-size: 12px; 

	.search__btn {
		position: absolute; 
		top: 50%; 
		transform: translateY(-50%); 
		right: 19px; 
		transition: .3s ease-out;
		font-size: 0; 

		&:hover {
			opacity: .5; 
		}
	}

	.search__field {
		border: 1px solid currentColor;
		border-radius: 5px;
		height: 40px; 
		padding: 12px 53px 12px 16px;
		transition: .3s ease-out;

		&:focus {
			box-shadow: 0 0 1px 1px currentColor;
		}
	}
}
</style>
