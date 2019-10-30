<template>
	<div class="nav-user">
		<ul class="nav__list">
			<li class="nav__entry">
				<a class="nav__link" href="#">
					<svg xmlns="http://www.w3.org/2000/svg" width="15" height="18.525" viewBox="0 0 15 18.525">
					  <g id="Icon_24px" data-name="Icon 24px" transform="translate(0 0)">
					    <path id="Shape" d="M7.5,18.525a1.89,1.89,0,0,1-1.875-1.9h3.75A1.89,1.89,0,0,1,7.5,18.525ZM15,15.675H0v-.95l1.875-1.9V8.075a6.805,6.805,0,0,1,1.1-3.857A5.175,5.175,0,0,1,6.094,2.071V1.425a1.406,1.406,0,1,1,2.812,0v.646a5.181,5.181,0,0,1,3.115,2.151,6.8,6.8,0,0,1,1.1,3.853v4.75L15,14.725v.949Z" fill="#96a0b2"/>
					  </g>
					</svg>
				</a>
			</li>

			<li class="nav__entry">
				<a class="nav__link" href="#">
					<svg id="Group_36" data-name="Group 36" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
					  <g id="baseline-help-24px">
					    <path id="Shape" d="M0,0H22V22H0Z" fill="none"/>
					    <path id="Shape-2" data-name="Shape" d="M9.167,18.333a9.167,9.167,0,1,1,9.167-9.167A9.177,9.177,0,0,1,9.167,18.333ZM8.25,13.75v1.833h1.833V13.75Zm.916-9.167A1.835,1.835,0,0,1,11,6.417a1.787,1.787,0,0,1-.541,1.292L9.322,8.864A3.679,3.679,0,0,0,8.25,11.458v.459h1.833a3.1,3.1,0,0,1,1.072-2.595l.825-.843a2.932,2.932,0,0,0,.852-2.062,3.667,3.667,0,0,0-7.333,0H7.333A1.836,1.836,0,0,1,9.167,4.584Z" transform="translate(1.833 1.833)" fill="#96a0b2"/>
					  </g>
					</svg>
				</a>
			</li>

			<li class="nav__entry">
				<a class="nav__link" href="#">
					<div class="avatar">
						A
					</div>
				</a>
			</li>
		</ul>
	</div><!-- /.nav-user -->
</template>

<script>
export default {
	name: 'NavUser'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-user { 
	.nav__list {
		display: flex; 
		align-items: center;
	}

	.nav__link {
		text-decoration: none; 
		transition: .3s ease-out;
		display: block; 

		&:hover {
			opacity: .5; 
		}
	}

	.nav__entry {
		flex: 0 0 auto;
	}

	.nav__entry + .nav__entry {
		margin-left: 20px; 
	}

	.avatar {
		width: 32px; 
		height: 32px; 
		border-radius: 50%;
		background-color: #16b5f2;
		display: flex; 
		justify-content: center;
		align-items: center;

		line-height: 1;
		text-transform: uppercase; 
		font-size: 16px; 
		color: #fff;
	}
}
</style>
