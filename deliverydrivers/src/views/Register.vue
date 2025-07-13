<template>
    <div class="deliveryDriver-register">
        <header>
            <p>外卖员注册</p>
        </header>

        <ul class="form-box">
            <li>
                <div class="title">账号：</div>
                <div class="content">
                    <input v-model="deliveryDriver.deliveryDriverId" type="text" placeholder="请输入账号（如手机号）" />
                </div>
            </li>
            <li>
                <div class="title">密码：</div>
                <div class="content">
                    <input v-model="deliveryDriver.deliveryDriverPassword" type="password" placeholder="请输入密码" />
                </div>
            </li>
            <li>
                <div class="title">确认密码：</div>
                <div class="content">
                    <input v-model="passwordConfirm" type="password" placeholder="请再次输入密码" />
                </div>
            </li>
            <li>
                <div class="title">外卖员姓名：</div>
                <div class="content">
                    <input v-model="deliveryDriver.deliveryDriverName" type="text" placeholder="请输入外卖员姓名" />
                </div>
            </li>
        </ul>

        <div class="button-register">
            <button @click="register">注册</button>
        </div>

        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios');
const router = useRouter();

const deliveryDriver = ref({
    deliveryDriverId: '',
    deliveryDriverPassword: '',
    deliveryDriverName: '',
    delTag: 1
});

const passwordConfirm = ref('');

const register = () => {
    if (!deliveryDriver.value.deliveryDriverId || !deliveryDriver.value.deliveryDriverPassword || !deliveryDriver.value.deliveryDriverName) {
        alert('请填写完整信息');
        return;
    }

    if (deliveryDriver.value.deliveryDriverPassword !== passwordConfirm.value) {
        alert('两次输入的密码不一致');
        return;
    }

    axios.post('/DeliveryDriverController/saveDriver', deliveryDriver.value)
        .then(response => {
            if (response.data && response.data.deliveryDriverId) {
                alert('外卖员注册成功！');
                router.push('/login');
            } else {
                alert('注册失败，请重试');
            }
        })
        .catch(error => {
            console.error(error);
            alert('注册请求失败');
        });
};
</script>

<style scoped>
.deliveryDriver-register {
    width: 100%;
    height: 100%;
}

.deliveryDriver-register header {
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

.deliveryDriver-register .form-box {
    width: 100%;
    margin-top: 12vw;
}

.deliveryDriver-register .form-box li {
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
    display: flex;
    align-items: center;
}

.deliveryDriver-register .form-box li .title {
    flex: 0 0 22vw;
    font-size: 3vw;
    font-weight: 700;
    color: #666;
}

.deliveryDriver-register .form-box li .content {
    flex: 1;
}

.deliveryDriver-register .form-box li .content input {
    border: none;
    outline: none;
    width: 100%;
    height: 4vw;
    font-size: 3vw;
}

.deliveryDriver-register .button-register {
    width: 100%;
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
}

.deliveryDriver-register .button-register button {
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
</style>