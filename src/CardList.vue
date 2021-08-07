<template>
	<div class='row cardlist align-items-center justify-content-center'>
		<div class="col-8 gift-card" v-for="item in cards" :key='item.databaseKey'>
			<div class="card-header">
				<div class="card-name">{{item.cardName ? item.cardName : 'Без названия'}}</div>
			</div>
			<div class="row" >
				<div class="col">*{{item.cardNumber}}</div>
				<div class="col">{{item.date ? item.date : 'Загрузка' }}</div>
				<div class="col">{{item.balance ? item.balance : 'Загрузка'}}</div>
				<div class="col"> 
					<i @click='deleteCard($event,item)' class="fa fa-trash delete-card" aria-hidden="true"></i>
				</div>
			</div>
		</div>
		<div v-if="!cards.length"  class="col-8 gift-card empty">
			<div class="">Список карт пуст</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				some: 1
			}
		},
		computed: {
			cards() {
				return this.$store.getters.cardList
			}
		},
		methods: {
			deleteCard(e,item) {
				if (!confirm('Удалить?')) return
				const payLoad = item;
				this.$store.dispatch('deleteCard',payLoad)
			}
		},
		mounted() {
			 this.$store.dispatch('getUserDataFromFirebaseDatabase')
		}
	}
</script>

<style scoped>
	.cardlist {
		justify-content: space-between;
  		margin: 0 auto;	
	}
	.gift-card {
		margin: 0.3em 0.2em;
		padding:10px 0;
		border-radius: 5px;
		box-shadow: rgb(0 0 0 / 60%) 3px 5px 5px;
	}
	.gift-card.empty {
		color:#fff;
		background-color: #17a2b8;
	}
	.card-header {
		background-color: #17a2b8;
		margin-bottom: 5px;
		padding: 0.2rem 1.25rem;
	}
	.delete-card {
		font-size: 20px;
		color:#A70000;
	}
	.card-name {
		color:#fff;
		text-align: left;
	}
/*	.row {
		border:solid 2px black;
	}*/
</style>