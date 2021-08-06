import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { db } from '../firebase'
import { auth } from '../firebase'
//import auth from './auth'


Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		cards: [],
		userID: 1,
	},
	getters: {
		cardList(state) {
			return state.cards;
		}
	},
	mutations: {
		cardsFromDatabase(state,data) {

			for (let key in data) {
				data[key]['databaseKey'] = key;
				state.cards.push(data[key])
			}
		},
		updateCardInfo(state,response) {
			const data = response.data.data
			//debugger;
			const formatedDate = data.validUntil.split('-').reverse().join('.')
			const number = data.maskedPan.substring(7)
			const index = state.cards.findIndex(item => item.cardNumber == number)
			let card = state.cards[index]
			card.date = formatedDate
			card.balance = data.balance.availableAmount.toFixed(2)
			state.cards.splice()
		},
		userLogin(state,user) {
			state.user = user
			state.currentUser = auth.currentUser
			debugger;
		}

	},
	actions: {
		getUserDataFromFirebaseDatabase(store,data) {
			const refPath = 'users/'+store.state.userID
			const userRef = db.ref(refPath);
			userRef.on('value', snapshot => {
				console.log(snapshot.val())
				const userData = snapshot.val()
				if (userData.id != store.state.userID ) return false;
				store.state.cards.splice(0,store.state.cards.length);
				store.commit('cardsFromDatabase',userData.cards)
				for (let key in userData.cards) {
					userData.cards[key].phone = userData.phone
					store.dispatch('getCardInfo',userData.cards[key])
				}
			})
		},
		getCardInfo(store,card) {
			//return false
			console.log(card);
			store.dispatch('makeRequest',card).then(response => store.commit('updateCardInfo', response) )
		},
		makeRequest(store,card) {
			let payLoad = {
				url: 'https://mygiftvirt.gift-cards.ru/api/1/virtual-cards/' + card.phone.replace('+','%2B') + '/' + card.cardNumber,
			};
			payLoad = payLoad
			return axios
			    .post('https://mygiftcard-balance.herokuapp.com/getcards',payLoad)
			    .catch(error => console.log(error));
		},
		addCard(store,cardData) { 
			const refPath = `users/${store.state.userID}/cards`
			const autoid = db.ref(refPath).push().key
			db.ref(refPath).child(autoid).set({
				cardNumber:cardData.cardNumber,
				cardName: cardData.cardName
			})
		},
		deleteCard(store,payLoad) {
			const cardNumber = payLoad.cardNumber;
			const index = store.state.cards.findIndex(item => item.cardNumber == cardNumber)
			const cardDBKey = store.state.cards[index].databaseKey
			const refPath = `users/${store.state.userID}/cards`
			db.ref(refPath).child(cardDBKey).remove();
		}
	},
	modules: {
		auth
	}
})
