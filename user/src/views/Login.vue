<template>
	<div class="a">

		<header>
			<p>用户登陆</p>
		</header>

		<ul class="form-box">
			<li>
				<div class="title">
					手机号码：
				</div>
				<div class="content">
					<input v-model="userId" type="text" placeholder="手机号码">
				</div>
			</li>
			<li>
				<div class="title">
					密码：
				</div>
				<div class="content">
					<input v-model="password" type="password" placeholder="密码">
				</div>
			</li>
		</ul>

		<div class="button-login">
			<button @click="login">登陆</button>
		</div>
		<div class="button-register">
			<button @click="toRegister()">去注册</button>
		</div>

		<Footer></Footer>
	</div>
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import {
    useRouter,
    useRoute
} from 'vue-router';
import {
    ref,
    inject
} from 'vue';
import {
    setSessionStorage
} from '@/common';
const axios = inject("axios");
const router = useRouter();
const userId = ref("");
const password = ref("");

const login = ()=>{
    if(userId == ""){
        alert("手机号不能为空!!!!")
        return;
    }
    if(password == ""){
        alert("密码不能为空!!!!")
        return;
    }

    axios.get(`/UserController/getUserByIdByPass?userId=${userId.value}&password=${password.value}`)
      .then((response) => {
        let user = response.data;
        if(user){
          setSessionStorage('token', user.token);
          setSessionStorage('user', user.user);
          router.push('/');
        }
      });
}

const toRegister = () => {
    router.push({
        path: "/register"
    })
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
    border: solid 1px #DDD;
    border-radius: 4px;

    border: none;
    outline: none;
}
</style>