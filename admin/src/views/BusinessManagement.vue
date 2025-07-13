<template>
    <div class="a">
        <header>
            <div class="location-text">商家管理</div>
        </header>
        <div class="filter-business">
            <select v-model="selectedType">
                <option value="">全部类型</option>
                <option v-for="(name, id) in orderTypes" :key="id" :value="id">{{ name }}</option>
            </select>
        </div>
        <ul class="business-list">
            <li v-for="business in filteredBusinesses" :key="business.businessId" class="business-item">
                <img :src="business.businessImg" alt="商家图片" class="business-img" />
                <div class="business-info">
                    <h3>{{ business.businessName }}</h3>
                    <p class="id">ID: {{ business.businessId }}</p>
                    <p class="address">地址: {{ business.businessAddress }}</p>
                    <p class="explain">简介: {{ business.businessExplain }}</p>
                    <p class="type">类型: {{ getOrderTypeName(business.orderTypeId) }}</p>
                    <p class="price">起送价: ¥{{ business.starPrice.toFixed(2) }}</p>
                    <p class="delivery">配送费: ¥{{ business.deliveryPrice.toFixed(2) }}</p>
                    <p class="remarks" v-if="business.remarks">备注: {{ business.remarks }}</p>
                    <p class="status" :class="{ deleted: business.delTag === 0 }">
                        状态: {{ business.delTag === 1 ? '正常营业' : '已暂停' }}
                    </p>
                </div>
                <button
                    @click="toggleBusinessStatus(business)"
                    class="action-btn"
                    :class="{ restore: business.delTag === 1 }"
                >
                    {{ business.delTag === 0 ? '暂停营业' : '营业' }}
                </button>
            </li>
        </ul>

        <div class="add-business">
            <button @click="showAddForm = true" class="add-btn">添加商家</button>
        </div>

        <!-- 添加商家表单 -->
        <div v-if="showAddForm" class="add-form">
            <h3>添加新商家</h3>
            <input v-model="newBusiness.businessName" placeholder="商家名称" />
            <input v-model="newBusiness.businessPassword" placeholder="商家密码" type="password" />
            <input v-model="newBusiness.businessAddress" placeholder="商家地址" />
            <textarea v-model="newBusiness.businessExplain" placeholder="商家简介"></textarea>
            <input v-model="newBusiness.businessImg" placeholder="商家图片URL" />
            <select v-model="newBusiness.orderTypeId">
                <option value="1">美食</option>
                <option value="2">快餐</option>
                <option value="3">饮品</option>
                <option value="4">甜点</option>
                <option value="5">其他</option>
            </select>
            <input v-model.number="newBusiness.starPrice" placeholder="起送价格" type="number" step="0.1" />
            <input v-model.number="newBusiness.deliveryPrice" placeholder="配送费用" type="number" step="0.1" />
            <input v-model="newBusiness.remarks" placeholder="备注（可选）" />
            <button @click="addBusiness">确认添加</button>
            <button @click="showAddForm = false">取消</button>
        </div>

        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// 订单类型映射
const orderTypes = {
    0: '美食',
    1: '早餐',
    2: '跑腿代购',
    3: '汉堡披萨',
    4: '甜品饮品',
    5: '速食简餐',
    6: '地方小吃',
    7: '米粉面馆',
    8: '包子粥铺',
    9: '炸鸡炸串',
};

// 商家列表
const businesses = ref([]);

// 控制添加商家表单的显示
const showAddForm = ref(false);

// 新商家数据
const newBusiness = ref({
    businessId: '',
    businessName: '',
    businessPassword: '',
    businessAddress: '',
    businessExplain: '',
    businessImg: '',
    orderTypeId: 1,
    starPrice: 0,
    deliveryPrice: 0,
    remarks: ''
});

// 筛选类型
const selectedType = ref('');

// 获取商家列表
const fetchBusinesses = async () => {
    try {
        const response = await axios.get('/BusinessController/getAllBusinesses');
        businesses.value = response.data;
    } catch (error) {
        console.error('获取商家列表失败:', error);
        alert('获取商家列表失败，请稍后重试');
    }
};

// 添加商家
const addBusiness = async () => {
    if (!newBusiness.value.businessId || !newBusiness.value.businessName || !newBusiness.value.businessPassword || !newBusiness.value.businessAddress
    || !newBusiness.value.orderTypeId || !newBusiness.value.starPrice || !newBusiness.value.deliveryPrice) {
        alert('请填写完整的商家信息！');
        return;
    }

    try {
        const response = await axios.post('/BusinessController/saveBusiness', newBusiness.value);
        businesses.value.push(response.data);
        showAddForm.value = false;
        newBusiness.value = {
            businessId: '',
            businessName: '',
            businessPassword: '',
            businessAddress: '',
            businessExplain: '',
            businessImg: '',
            orderTypeId: 1,
            starPrice: 0,
            deliveryPrice: 0,
            remarks: ''
        };
    } catch (error) {
        console.error('添加商家失败:', error);
        alert('添加商家失败，请重试');
    }
};

// 切换商家状态（营业/暂停）
const toggleBusinessStatus = async (business) => {
    try {
        await axios.post('/BusinessController/saveBusiness', {
            ...business,
            delTag: business.delTag === 0 ? 1 : 0
        });
        business.delTag = business.delTag === 0 ? 1 : 0;
    } catch (error) {
        console.error('切换商家状态失败:', error);
        alert('操作失败，请重试');
    }
};

// 获取订单类型名称
function getOrderTypeName(typeId) {
    return orderTypes[typeId] || '未知类型';
}

// 筛选商家
const filteredBusinesses = computed(() => {
    if (!selectedType.value) return businesses.value;
    return businesses.value.filter(b => b.orderTypeId === parseInt(selectedType.value));
});

// 页面加载时获取商家列表
onMounted(() => {
    fetchBusinesses();
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

.business-list {
    padding: 4vw 3vw;
    list-style: none;
}

.business-item {
    display: flex;
    align-items: flex-start;
    padding: 3vw 0;
    border-bottom: 1px solid #eee;
    position: relative;
}

.business-img {
    width: 20vw;
    height: 20vw;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 3vw;
}

.business-info {
    flex: 1;
}

.business-info h3 {
    font-size: 4vw;
    margin-bottom: 1vw;
}

.business-info .id {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.business-info .address {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.business-info .explain {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.business-info .type {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.business-info .price, .business-info .delivery {
    font-size: 3.5vw;
    color: #ff6600;
    font-weight: bold;
    margin-bottom: 1vw;
}

.business-info .remarks {
    font-size: 3vw;
    color: #999;
    margin-bottom: 1vw;
}

.business-info .status {
    font-size: 3vw;
    font-weight: bold;
}

.business-info .status.deleted {
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

.add-business {
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

.add-form input, .add-form select, .add-form textarea {
    display: block;
    width: 100%;
    margin-bottom: 2vw;
    padding: 1vw;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.add-form textarea {
    height: 10vw;
    resize: vertical;
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

.filter-business {
    margin-top: 5vh;

    padding: 2vw 3vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
}

.filter-business select {
    padding: 1.5vw 3vw;
    font-size: 3.5vw;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    outline: none;
    cursor: pointer;
    transition: border-color 0.3s;
}

.filter-business select:focus {
    border-color: #0097ff;
}
</style>