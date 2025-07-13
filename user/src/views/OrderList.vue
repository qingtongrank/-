<template>
    <div class="a">
        <header>
            <p>我的订单</p>
        </header>

        <h3>未支付订单信息：</h3>
        <ul class="order">
            <li v-for="item in orderUnpaidArr" :key="item.orderId">
                <div class="order-info">
                    <p @click="detailetShow(item)">
                        {{ item.business.businessName }}
                        <i class="fa fa-caret-down"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;{{ item.orderTotal }}</p>
                        <div class="order-info-right-icon" @click="toPayment(item.orderId)">去支付</div>
                    </div>
                </div>
                <ul class="order-detailet" v-show="item.isShowDetailet">
                    <li v-for="odItem in item.list" :key="odItem.foodId">
                        <p>{{ odItem.food.foodName }} x {{ odItem.quantity }}</p>
                        <p>&#165;{{ odItem.food.foodPrice * odItem.quantity }}</p>
                    </li>
                    <li>
                        <p>配送费</p>
                        <p>&#165;{{ item.business.deliveryPrice }}</p>
                    </li>
                </ul>
            </li>
        </ul>

        <h3>已支付订单信息：</h3>
        <ul class="order">
            <li v-for="item in orderPaidArr" :key="item.orderId">
                <div class="order-info">
                    <p>
                        {{ item.business.businessName }}
                        <i class="fa fa-caret-down" @click="detailetShow(item)"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;{{ item.orderTotal }}</p>
                        <span class="order-state">{{ getOrderStateText(item.orderState) }}</span>
                    </div>
                </div>
                <ul class="order-detailet" v-show="item.isShowDetailet">
                    <li v-for="odItem in item.list" :key="odItem.foodId">
                        <p>{{ odItem.food.foodName }} x {{ odItem.quantity }}</p>
                        <p>&#165;{{ odItem.food.foodPrice * odItem.quantity }}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import qs from 'qs';
import {
    useRouter,
    useRoute
} from 'vue-router';
import {
    ref,
    inject,
    computed
} from 'vue';
import {
    getLocalStorage,
    getSessionStorage
} from '../common.js';

const axios = inject("axios");
const router = useRouter();
const route = useRoute();
const user = getSessionStorage('user');
const orderPaidArr = ref([]);
const orderUnpaidArr = ref([]);

// 获取订单状态文本
function getOrderStateText(state) {
    const stateMap = {
        0: '未支付',
        1: '已支付',
        2: '已出餐',
        3: '正在配送',
        4: '已完成'
    };
    return stateMap[state] || '未知状态';
}

const init = async () => {
    try {
        const orderRes = await axios.get(`/OrderController/listOrderByUser?userId=${user.userId}`);
        const orders = orderRes.data;

        for (let order of orders) {
            order.isShowDetailet = false;

            // 1. 查询商家信息
            const businessRes = await axios.get(`/BusinessController/getBusinessExistsById?businessId=${order.businessId}`);
            const business = businessRes.data;

            // 2. 查询订单明细
            const detailetRes = await axios.get(`/OrderDetailetController/listDetailetByOrder?orderId=${order.orderId}`);
            const detailets = detailetRes.data;

            // 3. 查询每个明细的食品信息
            const detailetList = await Promise.all(
                detailets.map(async (d) => {
                    const foodRes = await axios.get(`/FoodController/getFoodById?foodId=${d.foodId}`);
                    return {
                        ...d,
                        food: foodRes.data
                    };
                })
            );

            // 4. 组合数据
            const fullOrder = {
                ...order,
                business,
                list: detailetList
            };

            // 5. 分类
            if (order.orderState === 0) {
                orderUnpaidArr.value.push(fullOrder);
            } else {
                orderPaidArr.value.push(fullOrder);
            }
        }
    } catch (error) {
        console.error("加载订单失败", error);
        alert("加载订单失败，请稍后重试");
    }
};
init();

const toPayment = (orderId) => {
    router.push({
        path: "/payment",
        query: {
            orderId: orderId
        }
    });
}

const detailetShow = (orders) => {
    orders.isShowDetailet = !orders.isShowDetailet;
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

.a h3 {
    margin-top: 12vw;
    box-sizing: border-box;
    padding: 4vw;
    font-size: 4vw;
    font-weight: 300;
    color: #999;
}

.a .order {
    width: 100%;
}

.a .order li {
    width: 100%;
}

.a .order li .order-info {
    box-sizing: border-box;
    padding: 2vw 4vw;
    font-size: 4vw;
    color: #666;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.a .order li .order-info .order-info-right {
    display: flex;
}

.a .order li .order-info .order-info-right .order-info-right-icon {
    background-color: #f90;
    color: #fff;
    border-radius: 3px;
    margin-left: 2vw;
    user-select: none;
    cursor: pointer;
}

.a .order li .order-detailet {
    width: 100%;
}

.a .order li .order-detailet li {
    width: 100%;
    box-sizing: border-box;
    padding: 1vw 4vw;
    color: #666;
    font-size: 3vw;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-state {
    font-size: 3.5vw;
    font-weight: bold;
    color: #2196f3;
    margin-left: 2vw;
}
</style>