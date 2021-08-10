import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { db } from '../firebase'
import { auth } from '../firebase'
import router  from '../routes'
//import auth from './auth'


Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		cards: [],
		userID: localStorage.getItem('uid') || null,
		//userID:"BJxafKUDPEXks3HDo2MQAOsPPlE2",
		allowRegistration: null,
	},
	getters: {
		cardList(state) {
			return state.cards;
		},
		allowRegistration(state) {
			return state.allowRegistration
		},
		userID(state) {
			return state.userID
		}
	},
	mutations: {
		cardsFromDatabase(state,data) {
			for (let key in data) {
				data[key]['databaseKey'] = key;
				state.cards.push(data[key])
			}
		},
		updateCardInfo(state,payLoad) {
			const data = payLoad.response.data.data
			//debugger;
			//const number = data.maskedPan.substring(7)
			const number = payLoad.cardNumber
			const index = state.cards.findIndex(item => item.cardNumber == number)
			let card = state.cards[index]
			if (payLoad.response.data.status == 'OK') {
				const formatedDate = data.validUntil.split('-').reverse().join('.')
				card.date = formatedDate
				card.balance = data.balance.availableAmount.toFixed(2)
				card.history = data.history
			} else {
				card.error = payLoad.response.data.status
			}
			
			state.cards.splice()
		},
		afterCheckingUserRegistration(state,status) {
			state.allowRegistration = status
		},
		logOut(state,payLoad) {
			state.userID = null;
			localStorage.removeItem('uid')
			router.push('/login')
		}

	},
	actions: {
		getUserDataFromFirebaseDatabase(store,data) {
			const refPath = 'users/'+store.state.userID
			const userRef = db.ref(refPath);
			userRef.on('value', snapshot => {
				console.log(snapshot.val())
				const userData = snapshot.val()
				if (userData.uid != store.state.userID ) return false;
				store.state.cards.splice(0,store.state.cards.length);
				if (data == '{}') {
					return false;
				}
				store.commit('cardsFromDatabase',userData.cards)
				for (let key in userData.cards) {
					userData.cards[key].phone = userData.phone
					store.dispatch('getCardInfo',userData.cards[key])
				}
			})
		},
		getCardInfo(store,card) {
			//return false
			//console.log(card);
			store.dispatch('makeRequest',card).then(response => store.commit('updateCardInfo', {
				response: response,
				cardNumber: card.cardNumber
			}
				) )
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
		},
		checkUserForRegistration(store,payLoad) {
			const refPath = 'users/'
			const enteredPhone = payLoad
			db.ref(refPath).child('registeredPhones/').child(enteredPhone).on('value', snapshot =>{
				const user  = snapshot.val()
				if (user === null ) {
					store.commit('afterCheckingUserRegistration','allow')
				}
				if (user && user.registered == 1) {
					store.commit('afterCheckingUserRegistration','disallow')
				}
			})

		},
		userRegister(store,user) {
			const uid = user.uid
			const userPhone = user.phoneNumber
			const userName = user.userName
			const refPath = `users/`;
			store.state.userID = uid
			
			db.ref(refPath).child(uid).set({
				cards: '{}',
				uid:uid,
				phone:userPhone,
				userName: userName
			})
			db.ref(refPath).child('registeredPhones').child(userPhone).set({
				registered: 1,
				uid:uid
			})
			localStorage.setItem('uid',uid)
			router.push('/')
		},
		userLogin(store,user) {
			const uid = user.uid
			store.state.userID = uid
			store.dispatch('getUserDataFromFirebaseDatabase')
			localStorage.setItem('uid',uid)
			router.push('/')
			
		},
	},
	modules: {
		auth
	}
})
