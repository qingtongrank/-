import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'font-awesome/css/font-awesome.min.css'


createApp(App).use(store).use(router).mount('#app')

router.beforeEach(function(to, from, next) {
	let user = sessionStorage.getItem('user');

	if (!(to.path == '/' || to.path == '/index' || to.path == '/businessList' || to.path == 'businessInfo' ||
			to.path == '/login' || to.path == '/register')) {
		if (user = null) {
			router.push('/login');
		}
	}
	next();
})