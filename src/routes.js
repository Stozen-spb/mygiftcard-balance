import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from './LoginForm.vue'
import AddCardForm from './AddCardForm.vue'
import CardList from './CardList.vue'
import RegisterForm from './RegisterForm.vue'
import MainPage from './MainPage.vue'
import store from './store'
Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: LoginForm,
		meta: {auth:false}
	},
	{
		path: '/registration',
		component: RegisterForm,
		meta: {auth:false}
	},
	{
		path: '/',
		 component: MainPage,
		// components:{
		// 	default:AddCardForm,
		// 	second:CardList
		// },
		meta: {auth:true}
	},
	{
		path:'*',
		redirect:'/'
	}
]


const router = new VueRouter({
	routes,
	mode: 'history'
});

router.beforeEach((to,from,next)=>{
	//debugger;
	const uid = localStorage.getItem('uid')
	const requiredAuth = to.matched.some(record => record.meta.auth)
	if (!uid && requiredAuth) {
		next('/login')
	} else {
		next()
	}
})

export default router