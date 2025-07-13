<template>
    <div class="a">
        <header>
            <div class="location-text">外卖员管理</div>
        </header>

        <ul class="deliveryDriver-list">
            <li v-for="deliveryDriver in deliveryDrivers" :key="deliveryDriver.deliveryDriverId" class="deliveryDriver-item">
                <img :src="deliveryDriver.deliveryDriverImg" alt="外卖员头像" class="deliveryDriver-img" />
                <div class="deliveryDriver-info">
                    <h3>{{ deliveryDriver.deliveryDriverName }}</h3>
                    <p class="id">ID: {{ deliveryDriver.deliveryDriverId }}</p>
                    <p class="status" :class="{ deleted: deliveryDriver.delTag === 0 }">
                        状态: {{ deliveryDriver.delTag === 1 ? '正常' : '已删除' }}
                    </p>
                </div>
                <button
                    @click="toggledeliveryDriverStatus(deliveryDriver)"
                    class="action-btn"
                    :class="{ restore: deliveryDriver.delTag === 0 }"
                >
                    {{ deliveryDriver.delTag === 1 ? '删除' : '恢复' }}
                </button>
            </li>
        </ul>

        <div class="add-deliveryDriver">
            <button @click="showAddForm = true" class="add-btn">添加外卖员</button>
        </div>

        <!-- 添加外卖员表单 -->
        <div v-if="showAddForm" class="add-form">
            <h3>添加新外卖员</h3>
            <input v-model="newdeliveryDriver.deliveryDriverId" placeholder="外卖员ID" />
            <input v-model="newdeliveryDriver.deliveryDriverName" placeholder="昵称" />
            <input v-model="newdeliveryDriver.password" placeholder="密码" type="password" />
            <input v-model="newdeliveryDriver.deliveryDriverImg" placeholder="外卖员头像URL" />
            <button @click="adddeliveryDriver">确认添加</button>
            <button @click="showAddForm = false">取消</button>
        </div>

        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 外卖员列表
const deliveryDrivers = ref([]);

// 控制添加外卖员表单的显示
const showAddForm = ref(false);

// 新外卖员数据
const newdeliveryDriver = ref({
    deliveryDriverId: '',
    deliveryDriverName: '',
    deliveryDriverPassword: '',
    deliveryDriverImg: ''
});

// 获取外卖员列表
const fetchdeliveryDrivers = async () => {
    try {
        const response = await axios.get('/DeliveryDriverController/getAllDeliveryDriver');
        deliveryDrivers.value = response.data;
    } catch (error) {
        console.error('获取外卖员列表失败:', error);
        alert('获取外卖员列表失败，请稍后重试');
    }
};

// 添加外卖员
const adddeliveryDriver = async () => {
    if (!newdeliveryDriver.value.deliveryDriverName || !newdeliveryDriver.value.password) {
        alert('请填写完整的外卖员信息！');
        return;
    }

    try {
        const response = await axios.post('/DeliveryDriverController/saveDriver', newdeliveryDriver.value);
        deliveryDrivers.value.push(response.data);
        showAddForm.value = false;
        newdeliveryDriver.value = {
            deliveryDriverId: '',
            deliveryDriverName: '',
            deliveryDriverPassword: '',
            deliveryDriverImg: ''
        };
    } catch (error) {
        console.error('添加外卖员失败:', error);
        alert('添加外卖员失败，请重试');
    }
};

// 切换外卖员状态（删除/恢复）
const toggledeliveryDriverStatus = async (deliveryDriver) => {
    try {
        await axios.post('/DeliveryDriverController/saveDriver', {
            deliveryDriverId: deliveryDriver.deliveryDriverId,
            deliveryDriverName: deliveryDriver.deliveryDriverName,
            deliveryDriverPassword: deliveryDriver.deliveryDriverPassword,
            deliveryDriverImg: deliveryDriver.deliveryDriverImg,
            delTag: deliveryDriver.delTag === 1 ? 0 : 1
        });
        deliveryDriver.delTag = deliveryDriver.delTag === 1 ? 0 : 1
    } catch (error) {
        console.error('切换外卖员状态失败:', error);
        alert('操作失败，请重试');
    }
};

// 页面加载时获取外卖员列表
onMounted(() => {
    fetchdeliveryDrivers();
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

.deliveryDriver-list {
    padding: 4vw 3vw;
    list-style: none;

    margin-top: 5vh;
}

.deliveryDriver-item {
    display: flex;
    align-items: center;
    padding: 3vw 0;
    border-bottom: 1px solid #eee;
    position: relative;
}

.deliveryDriver-img {
    width: 20vw;
    height: 20vw;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 3vw;
}

.deliveryDriver-info {
    flex: 1;
}

.deliveryDriver-info h3 {
    font-size: 4vw;
    margin-bottom: 1vw;
}

.deliveryDriver-info .id {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.deliveryDriver-info .sex {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.deliveryDriver-info .status {
    font-size: 3vw;
    font-weight: bold;
}

.deliveryDriver-info .status.deleted {
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

.add-deliveryDriver {
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