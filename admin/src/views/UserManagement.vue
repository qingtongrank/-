<template>
    <div class="a">
        <header>
            <div class="location-text">用户管理</div>
        </header>

        <ul class="user-list">
            <li v-for="user in users" :key="user.userId" class="user-item">
                <img :src="user.userImg" alt="用户头像" class="user-img" />
                <div class="user-info">
                    <h3>{{ user.userName }}</h3>
                    <p class="id">ID: {{ user.userId }}</p>
                    <p class="sex">性别: {{ user.userSex }}</p>
                    <p class="status" :class="{ deleted: user.delTag === 0 }">
                        状态: {{ user.delTag === 1 ? '正常' : '已删除' }}
                    </p>
                </div>
                <button
                    @click="toggleUserStatus(user)"
                    class="action-btn"
                    :class="{ restore: user.delTag === 0 }"
                >
                    {{ user.delTag === 1 ? '删除' : '恢复' }}
                </button>
            </li>
        </ul>

        <div class="add-user">
            <button @click="showAddForm = true" class="add-btn">添加用户</button>
        </div>

        <!-- 添加用户表单 -->
        <div v-if="showAddForm" class="add-form">
            <h3>添加新用户</h3>
            <input v-model="newUser.userId" placeholder="用户ID" />
            <input v-model="newUser.userName" placeholder="昵称" />
            <input v-model="newUser.password" placeholder="密码" type="password" />
            <select v-model="newUser.userSex">
                <option :value="1">男</option>
                <option :value="0">女</option>
            </select>
            <input v-model="newUser.userImg" placeholder="用户头像URL" />
            <button @click="addUser">确认添加</button>
            <button @click="showAddForm = false">取消</button>
        </div>

        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 用户列表
const users = ref([]);

// 控制添加用户表单的显示
const showAddForm = ref(false);

// 新用户数据
const newUser = ref({
    userId: '',
    userName: '',
    password: '',
    userSex: 1,
    userImg: ''
});

// 获取用户列表
const fetchUsers = async () => {
    try {
        const response = await axios.get('/UserController/getAllUsers');
        users.value = response.data;
    } catch (error) {
        console.error('获取用户列表失败:', error);
        alert('获取用户列表失败，请稍后重试');
    }
};

// 添加用户
const addUser = async () => {
    if (!newUser.value.userName || !newUser.value.password) {
        alert('请填写完整的用户信息！');
        return;
    }

    try {
        const response = await axios.post('/UserController/saveUser', newUser.value);
        users.value.push(response.data);
        showAddForm.value = false;
        newUser.value = {
            userId: '',
            userName: '',
            password: '',
            userSex: 1,
            userImg: ''
        };
    } catch (error) {
        console.error('添加用户失败:', error);
        alert('添加用户失败，请重试');
    }
};

// 切换用户状态（删除/恢复）
const toggleUserStatus = async (user) => {
    try {
        await axios.post('/UserController/saveUser', {
            userId: user.userId,
            userName: user.userName,
            password: user.password,
            userSex: user.userSex,
            userImg: user.userImg,
            delTag: user.delTag === 1 ? 0 : 1
        });
        user.delTag = user.delTag === 1 ? 0 : 1
    } catch (error) {
        console.error('切换用户状态失败:', error);
        alert('操作失败，请重试');
    }
};

// 页面加载时获取用户列表
onMounted(() => {
    fetchUsers();
});
</script>

<style scoped>
.a {
    width: 100%;
    height: 100%;
}

.a header {
    width: 100%;
    height: 12vw;
    background-color: #0097ff;
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

.a header .location-text {
    font-size: 4.5vw;
    font-weight: 700;
    color: #fff;
}

.user-list {
    padding: 4vw 3vw;
    list-style: none;

    margin-top: 5vh;
}

.user-item {
    display: flex;
    align-items: center;
    padding: 3vw 0;
    border-bottom: 1px solid #eee;
    position: relative;
}

.user-img {
    width: 20vw;
    height: 20vw;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 3vw;
}

.user-info {
    flex: 1;
}

.user-info h3 {
    font-size: 4vw;
    margin-bottom: 1vw;
}

.user-info .id {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.user-info .sex {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.user-info .status {
    font-size: 3vw;
    font-weight: bold;
}

.user-info .status.deleted {
    color: #ff4d4f;
}

.action-btn {
    margin-left: auto;
    padding: 1vw 2vw;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.action-btn.restore {
    background-color: #52c41a;
}

.add-user {
    padding: 4vw 3vw;
    text-align: center;
}

.add-btn {
    padding: 2vw 4vw;
    background-color: #52c41a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-form {
    padding: 4vw 3vw;
    background-color: #f9f9f9;
    border-top: 1px solid #eee;
}

.add-form h3 {
    margin-bottom: 2vw;
}

.add-form input, .add-form select {
    display: block;
    width: 100%;
    margin-bottom: 2vw;
    padding: 1vw;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.add-form button {
    margin-right: 2vw;
    padding: 1vw 2vw;
    background-color: #0097ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>