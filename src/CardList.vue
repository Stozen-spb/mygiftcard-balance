<template>
	<div class='row cardlist align-items-center justify-content-center'>
		<div class="gift-card col-md-8 col-lg-6 animated flipInX" v-for="item in cards" :key='item.databaseKey'>
			<div class="card-header">
				<div class="card-name">{{item.cardName ? item.cardName : 'Без названия'}}</div>
			</div>
			<div class="row" >
				<div class="col">
						*{{item.cardNumber}}
				</div>
				<div class="col">
					<div v-if='item.date'>
						{{item.date ? item.date : '' }}
					</div>
					<div v-else>
						<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
					</div>
				</div>
				<div class="col">
					<div v-if="item.balance">{{item.balance ? item.balance : ''}} руб.</div>
					<div v-else>
						<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
					</div>
				</div>
				<div class="col"> 
					<i @click='deleteCard($event,item)' class="fa fa-trash delete-card" aria-hidden="true"></i>
				</div>
			</div>
			<div  v-if='item.date' class="row">
				<div class="col">
					<div class="progress">
					  <div 
						  class="progress-bar" 
						  :class="progressBarClass(item)"
						  role="progressbar" 
						  :style='`width:${progressBarWidth(item)}%;`'
						  aria-valuenow="100" 
						  aria-valuemin="0" 
						  aria-valuemax="100"
					  >
					  	<div class="progress-bar-text">{{progressBarText(item)}}</div>
					  </div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!cards.length"  class="col-md-8 col-lg-6 gift-card empty">
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
			},
		},
		methods: {
			deleteCard(e,item) {
				if (!confirm('Удалить?')) return
				const payLoad = item;
				this.$store.dispatch('deleteCard',payLoad)
			},
			progressBarText(item) {
				if (item.history) {
					const cardAmount = item.history[item.history.length-1].amount
					return `${item.balance} / ${cardAmount}`
				}

			},
			progressBarWidth(item) {
				const cardAmount = item.history[item.history.length-1].amount
				return (item.balance/cardAmount)*100
			},
			progressBarClass(item){
				const cardAmount = item.history[item.history.length-1].amount
				const percent = (item.balance/cardAmount)*100
				if (percent <= 10) {
					return 'bg-danger'
				}
				else if (percent <= 30) {
					return 'bg-warning'
				}
				else if (percent <= 80) {
					return 'bg-info'
				}
				else if (percent >= 90) {
					return 'bg-success'
				}

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
	.progress {
		margin-top: 10px;
		position: relative;
	}
	.progress-bar-text {
		position: absolute;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		text-align: center;
		color:#000;
		font-size:14px;
	}
/*	.row {
		border:solid 2px black;
	}*/
</style>