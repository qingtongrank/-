<template>
	<div class="a">
		<header>
			<p>用户注册</p>
		</header>

		<ul class="form-box">
			<li>
				<div class="title">
					手机号码：
				</div>
				<div class="content">
					<input v-model="user.userId" type="text" placeholder="手机号码">
				</div>
			</li>
			<li>
				<div class="title">
					密码：
				</div>
				<div class="content">
					<input v-model="user.password" type="password" placeholder="密码">
				</div>
			</li>
			<li>
				<div class="title">
					确认密码：
				</div>
				<div class="content">
					<input v-model="passwordTo" type="password" placeholder="确认密码">
				</div>
			</li>
			<li>
				<div class="title">
					用户名称：
				</div>
				<div class="content">
					<input v-model="user.userName" type="text" placeholder="用户名称">
				</div>
			</li>
			<li>
				<div class="title">
					性别：
				</div>
				<div class="content" style="font-size: 3vw;">
					<input v-model="user.userSex" value="1" type="radio" name="sex" checked style="width:6vw;height: 3.2vw;">男
					<input v-model="user.userSex" value="0" type="radio" name="sex" style="width:6vw;height: 3.2vw;">女
				</div>
			</li>
		</ul>

		<div class="button-login">
			<button @click="toLogin()">注册</button>
		</div>

		<Footer></Footer>
	</div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import qs from 'qs';
import {
    useRouter,
    useRoute
} from 'vue-router'
import {
    ref,
    inject,
    computed
} from 'vue';
import {
    getSessionStorage,
    getLocalStorage,
    setLocalStorage
} from '../common.js';

const axios = inject("axios");
const router = useRouter();

const user = ref({
    userId:"",
    password:"",
    userName:"",
    userSex:1,
    userImg:"",
    delTag:1
})
const passwordTo = ref("");

const toLogin = () => {
    if (user.value.password == passwordTo.value) {

    }else{
        alert("输入密码不匹配");
        return;
    }

    axios.post('/UserController/saveUser', (
        user.value
    )).then(response => {
        if (response.data && response.data.userId) {
            alert('新增用户成功！');
            router.push({
                path: "/login"
            });
        } else {
            alert('新增用户失败！');
        }
    }).catch(error => {
        console.error(error);
    });
}
</script>

<style scoped>
.a {
    width: 100%;
    height: 100%;
}

.a header {
    width: 100%;
    height: 12vw;
    background-color: #0097FF;
    color: #fff;
    font-size: 4.8vw;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;
}

.a .form-box {
    width: 100%;
    margin-top: 12vw;
}

.a .form-box li {
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
    display: flex;
    align-items: center;
}

.a .form-box li .title {
    flex: 0 0 18vw;
    font-size: 3vw;
    font-weight: 700;
    color: #666;
}

.a .form-box li .content {
    flex: 1;
}

.a .form-box li .content input {
    border: none;
    outline: none;
    width: 100%;
    height: 4vw;
    font-size: 3vw;
}

.a .button-login {
    width: 100%;
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
}

.a .button-login button {
    width: 100%;
    height: 10vw;
    font-size: 3.8vw;
    font-weight: 700;
    color: #fff;
    background-color: #38CA73;
    border-radius: 4px;

    border: none;
    outline: none;
}

.a .button-register {
    width: 100%;
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
}

.a .button-register button {
    width: 100%;
    height: 10vw;
    font-size: 3.8vw;
    font-weight: 700;
    color: #666;
    background-color: #EEE;
    border-radius: 4px;

    border: none;
    outline: none;
    border: solid 1px #DDD;
}
</style>