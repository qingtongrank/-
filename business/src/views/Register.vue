<template>
    <div class="a">
        <header>
            <p>商家注册</p>
        </header>

        <ul class="form-box">
            <li>
                <div class="title">账号：</div>
                <div class="content">
                    <input v-model="business.businessId" type="text" placeholder="请输入账号（如手机号）" />
                </div>
            </li>
            <li>
                <div class="title">密码：</div>
                <div class="content">
                    <input v-model="business.businessPassword" type="password" placeholder="请输入密码" />
                </div>
            </li>
            <li>
                <div class="title">确认密码：</div>
                <div class="content">
                    <input v-model="passwordConfirm" type="password" placeholder="请再次输入密码" />
                </div>
            </li>
            <li>
                <div class="title">商家名称：</div>
                <div class="content">
                    <input v-model="business.businessName" type="text" placeholder="请输入商家名称" />
                </div>
            </li>
            <li>
                <div class="title">商家地址：</div>
                <div class="content">
                    <input v-model="business.businessAddress" type="text" placeholder="请输入商家地址" />
                </div>
            </li>
            <li>
                <div class="title">商家简介：</div>
                <div class="content">
                    <input v-model="business.businessExplain" type="text" placeholder="请输入商家简介（选填）" />
                </div>
            </li>
            <li>
                <div class="title">订单类型：</div>
                <div class="content">
                    <select v-model="business.orderTypeId">
                        <option value="0">美食</option>
                        <option value="1">早餐</option>
                        <option value="2">跑腿代购</option>
                        <option value="3">汉堡披萨</option>
                        <option value="4">甜品饮品</option>
                        <option value="5">速食简餐</option>
                        <option value="6">地方小吃</option>
                        <option value="7">米粉面馆</option>
                        <option value="8">包子粥铺</option>
                        <option value="9">炸鸡炸串</option>
                    </select>
                </div>
            </li>
            <li>
                <div class="title">起送价（元）：</div>
                <div class="content">
                    <input v-model.number="business.starPrice" type="number" placeholder="请输入起送价" />
                </div>
            </li>
            <li>
                <div class="title">配送费（元）：</div>
                <div class="content">
                    <input v-model.number="business.deliveryPrice" type="number" placeholder="请输入配送费" />
                </div>
            </li>
            <li>
                <div class="title">备注：</div>
                <div class="content">
                    <input v-model="business.remarks" type="text" placeholder="备注（选填）" />
                </div>
            </li>
        </ul>

        <div class="button-login">
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

const business = ref({
    businessId: '',
    businessPassword: '',
    businessName: '',
    businessAddress: '',
    businessExplain: '',
    orderTypeId: 1,
    starPrice: 0,
    deliveryPrice: 0,
    remarks: '',
    delTag: 1
});

const passwordConfirm = ref('');

const register = () => {
    if (!business.value.businessId || !business.value.businessPassword || !business.value.businessName || !business.value.businessAddress) {
        alert('请填写完整信息');
        return;
    }

    if (business.value.businessPassword !== passwordConfirm.value) {
        alert('两次输入的密码不一致');
        return;
    }

    axios.post('/BusinessController/saveBusiness', business.value)
        .then(response => {
            if (response.data && response.data.businessId) {
                alert('商家注册成功！');
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
/* 样式复用你原来的即可 */
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
    flex: 0 0 22vw;
    font-size: 3vw;
    font-weight: 700;
    color: #666;
}

.a .form-box li .content {
    flex: 1;
}

.a .form-box li .content input,
.a .form-box li .content select {
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
</style>