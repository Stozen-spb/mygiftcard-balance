import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from './LoginForm.vue'
import AddCardForm from './AddCardForm.vue'
import CardList from './CardList.vue'
import RegisterForm from './RegisterForm.vue'
import MainPage from './MainPage.vue'
Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: LoginForm
	},
	{
		path: '/register',
		component: RegisterForm
	},
	{
		path: '/',
		 component: MainPage,
		// components:{
		// 	default:AddCardForm,
		// 	second:CardList
		// }
	}
]

export const router = new VueRouter({
	routes,
	mode: 'history'
});