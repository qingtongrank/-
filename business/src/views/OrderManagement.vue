<template>
    <div class="order-management">
        <header>
            <div class="header-title">订单管理</div>
        </header>

        <div class="order-list">
            <div
                v-for="order in orders"
                :key="order.orderId"
                class="order-card"
            >
                <div class="order-header">
                    <span class="order-id">订单编号：{{ order.orderId }}</span>
                    <div class="order-actions">
                        <span class="order-state" :class="'state-' + order.orderState">
                            {{ getOrderStateText(order.orderState) }}
                        </span>
                        <button
                            v-if="order.orderState === 1"
                            class="prepare-btn"
                            @click="prepareOrder(order)"
                        >
                            出餐
                        </button>
                    </div>
                </div>

                <div class="order-info">
                    <div class="info-row">
                        <span class="label">收货人：</span>
                        <span class="value">{{ order.contactName }}</span>
                        <span class="gender">({{ order.contactSex === 1 ? '男' : '女' }})</span>
                    </div>

                    <div class="info-row">
                        <span class="label">联系电话：</span>
                        <span class="value">{{ order.contactTel }}</span>
                    </div>

                    <div class="info-row">
                        <span class="label">收货地址：</span>
                        <span class="value">{{ order.address }}</span>
                    </div>

                    <div class="info-row">
                        <span class="label">下单时间：</span>
                        <span class="value">{{ formatDate(order.orderDate) }}</span>
                    </div>

                    <div class="info-row">
                        <span class="label">订单总价：</span>
                        <span class="price">¥{{ order.orderTotal.toFixed(2) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getSessionStorage } from '@/common';

const business = getSessionStorage('business'); // 当前商家信息
const orders = ref([]);

// 格式化日期
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// 获取订单状态文本
function getOrderStateText(state) {
    const stateMap = {
        0: '待支付',
        1: '已支付',
        2: '已出餐',
        3: '正在配送',
        4: '已完成'
    };
    return stateMap[state] || '未知状态';
}

// 加载订单及地址信息
const loadOrders = async () => {
    try {
        // 1. 获取订单列表
        const orderRes = await axios.get(`/OrderController/listOrderByBusiness?businessId=${business.businessId}`);
        const orderList = orderRes.data;

        // 2. 获取所有地址信息（并行请求）
        const addressPromises = orderList.map(order =>
            axios.get(`/DeliveryAddressController/getAddressBydaId?daId=${order.daId}`)
                .then(res => ({
                    orderId: order.orderId,
                    address: res.data
                }))
                .catch(() => ({
                    orderId: order.orderId,
                    address: null
                }))
        );

        const addressResults = await Promise.all(addressPromises);

        // 3. 组合订单和地址信息
        const addressMap = {};
        addressResults.forEach(item => {
            addressMap[item.orderId] = item.address;
        });

        orders.value = orderList.map(order => {
            const addr = addressMap[order.orderId];
            return {
                ...order,
                contactName: addr?.contactName || '未知',
                contactSex: addr?.contactSex ?? 0,
                contactTel: addr?.contactTel || '无',
                address: addr?.address || '地址缺失'
            };
        });

    } catch (error) {
        console.error('加载订单失败', error);
        alert('加载订单失败，请稍后重试');
    }
};

const prepareOrder = async (order) => {
    try {
        await axios.post('/OrderController/saveOrder', {
            orderId: order.orderId,
            userId: order.userId,
            businessId: order.businessId,
            deliveryDriverId: order.deliveryDriverId,
            orderDate: order.orderDate,
            orderTotal: order.orderTotal,
            daId: order.daId,
            orderState: 2
        });
        alert('订单已标记为出餐');
        // 重新加载订单列表
        await loadOrders();
    } catch (error) {
        console.error('出餐失败', error);
        alert('出餐失败，请稍后重试');
    }
};

onMounted(() => {
    loadOrders();
});
</script>

<style scoped>
.order-management {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

header {
    width: 100%;
    height: 12vw;
    background-color: #0097ff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

.header-title {
    font-size: 4.5vw;
    font-weight: 700;
    color: #fff;
}

.order-list {
    padding: 8vh 3vw;

}

.order-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 3vw;
    margin-bottom: 3vw;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2vw;
    padding-bottom: 2vw;
    border-bottom: 1px solid #eee;
}

.order-id {
    font-size: 3.5vw;
    font-weight: bold;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60vw; /* 可根据实际布局调整 */
}

.order-state {
    font-size: 3vw;
    font-weight: bold;
    padding: 1vw 2vw;
    border-radius: 4px;
    color: #fff;
}

.state-0 {
    background-color: #ff9800;
}

.state-1 {
    background-color: #2196f3;
}

.state-2 {
    background-color: #9c27b0; /* 已出餐 - 紫色 */
}

.state-3 {
    background-color: #4caf50;
}

.state-4 {
    background-color: #9e9e9e;
}

.order-info {
    font-size: 3.2vw;
    color: #666;
}

.info-row {
    display: flex;
    align-items: center;
    margin-bottom: 1.5vw;
}

.label {
    font-weight: bold;
    color: #333;
    width: 22vw;
    flex-shrink: 0;
}

.value {
    flex: 1;
    color: #555;
}

.gender {
    margin-left: 1vw;
    color: #888;
}

.price {
    font-size: 4vw;
    font-weight: bold;
    color: #ff6600;
}
.order-actions {
    display: flex;
    align-items: center;
    gap: 2vw;
}

.prepare-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 1vw 2vw;
    border-radius: 4px;
    font-size: 3vw;
    cursor: pointer;
}
</style>