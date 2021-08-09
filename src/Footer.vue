<template>
	<div class="footer row justify-content-center">
		<div class="main col p-0 row">
			<div class="col"> ©2021 </div>
			<div class=" col"><img class="signature" src="AK.png" alt=""> </div> 
			<div class="col">
				<a class="footer-link" href="mailto:2012stalker@gmail.com">2012stalker@gmail.com</a>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				some:1
			}
		}
	}
</script>

<style scoped>
	.footer {
  		flex-shrink: 0;
  		background-color: #81c789;
  		color:#fff;
  		padding:10px 20px;
	}
	.signature {
		height:38px;
		text-transform: uppercase;
		font-size: 2rem;
	}
	.footer .main {
		align-items:center;
		justify-content: space-between;

	}
	.footer-link {
		color:#fff;
	}
</style>