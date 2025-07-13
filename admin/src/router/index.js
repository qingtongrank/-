import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import BusinessManagement from "@/views/BusinessManagement.vue";
import UserManagement from "@/views/UserManagement.vue";
import DeliveryDriverManagement from "@/views/DeliveryDriverManagement.vue";

const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/businessManagement',
		name: 'BusinessManagement',
		component: BusinessManagement
	},
	{
		path: '/userManagement',
		name: 'UserManagement',
		component: UserManagement
	},
	{
		path: '/deliveryDriverManagement',
		name: 'DeliveryDriverManagement',
		component: DeliveryDriverManagement
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