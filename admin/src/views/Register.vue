<template>
    <div class="admin-register">
        <header>
            <p>管理员注册</p>
        </header>

        <ul class="form-box">
            <li>
                <div class="title">账号：</div>
                <div class="content">
                    <input v-model="admin.adminId" type="text" placeholder="请输入账号（如手机号）" />
                </div>
            </li>
            <li>
                <div class="title">密码：</div>
                <div class="content">
                    <input v-model="admin.adminPassword" type="password" placeholder="请输入密码" />
                </div>
            </li>
            <li>
                <div class="title">确认密码：</div>
                <div class="content">
                    <input v-model="passwordConfirm" type="password" placeholder="请再次输入密码" />
                </div>
            </li>
            <li>
                <div class="title">管理员姓名：</div>
                <div class="content">
                    <input v-model="admin.adminName" type="text" placeholder="请输入管理员姓名" />
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

const admin = ref({
    adminId: '',
    adminPassword: '',
    adminName: '',
    delTag: 1
});

const passwordConfirm = ref('');

const register = () => {
    if (!admin.value.adminId || !admin.value.adminPassword || !admin.value.adminName) {
        alert('请填写完整信息');
        return;
    }

    if (admin.value.adminPassword !== passwordConfirm.value) {
        alert('两次输入的密码不一致');
        return;
    }

    axios.post('/AdminController/saveAdmin', admin.value)
        .then(response => {
            if (response.data && response.data.adminId) {
                alert('管理员注册成功！');
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
.admin-register {
    width: 100%;
    height: 100%;
}

.admin-register header {
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

.admin-register .form-box {
    width: 100%;
    margin-top: 12vw;
}

.admin-register .form-box li {
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
    display: flex;
    align-items: center;
}

.admin-register .form-box li .title {
    flex: 0 0 22vw;
    font-size: 3vw;
    font-weight: 700;
    color: #666;
}

.admin-register .form-box li .content {
    flex: 1;
}

.admin-register .form-box li .content input {
    border: none;
    outline: none;
    width: 100%;
    height: 4vw;
    font-size: 3vw;
}

.admin-register .button-register {
    width: 100%;
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
}

.admin-register .button-register button {
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