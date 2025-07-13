import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import OrderManagement from "@/views/OrderManagement.vue";
import FoodManagement from "@/views/FoodManagement.vue";

const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/orderManagement',
		name: 'OrderManagement',
		component: OrderManagement
	},
	{
		path: '/foodManagement',
		name: 'FoodManagement',
		component: FoodManagement
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	}
]



const router = createRouter({
	history: createWebHashHistory(),
	routes
})



export default router