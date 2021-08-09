import Vue from 'vue'
import App from './App.vue'
import CardList from './CardList.vue'
import AddCardForm from './AddCardForm.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import MainPage from './MainPage.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import {store} from './store/'
import router from './routes'
import { auth } from './firebase'

//import Head from './CardList.vue'


Vue.component('CardList', CardList)
Vue.component('AddCardForm',AddCardForm)
Vue.component('LoginForm',LoginForm)
Vue.component('RegisterForm',RegisterForm)
Vue.component('MainPage',MainPage)
Vue.component('Header',Header)
Vue.component('Footer',Footer)
let app

auth.onAuthStateChanged(()=>{
	if (!app) {
		app = new Vue({
		  el: '#app',
		  store,
		  router,
		  render: h => h(App)
		})
	}
})

