<template>
	<div class="row main-container">
			<div class="col p-0">
				<div class="content">
					<Header></Header>
					<AddCardForm></AddCardForm>
					<CardList></CardList>
				</div>
		
		</div>
	</div>

	
</template>

<script>
	export default {
		data(){
			return {

			}
		}
	}
</script>

<style scoped>
	.main-container {
		flex: 1 0 auto;
	}
</style>