<template>
	<div class="a">
		<header>
			<p>在线支付</p>
		</header>
		<h3>订单信息：</h3>
		<div class="order-info">
			<p @click="isShow()">
				{{orders.business.businessName}}
				<i class="fa fa-caret-down" id="showBtn"></i>
			</p>
			<p>&#165;{{orders.orderTotal}}</p>
		</div>

		<ul class="order-detailet" id="detailetBox" v-show="isShowDetailet">
			<li v-for="item in orders.list" :key="item.food.foodId">
				<p>{{item.food.foodName}} x {{item.quantity}}</p>
				<p>&#165;{{item.food.foodPrice*item.quantity}}</p>
			</li>
			<li>
				<p>配送费</p>
				<p>&#165;{{orders.business.deliveryPrice}}</p>
			</li>
		</ul>

		<ul class="payment-type">
			<li @click="loaclnum()">
				<img src="../assets/alipay.png">
				<i class="fa fa-check-circle" v-show="loacl"></i>
			</li>
			<li @click="loaclnum()">
				<img src="../assets/wechat.png">
				<i class="fa fa-check-circle" v-show="!loacl"></i>
			</li>
		</ul>
		<div class="payment-button">
			<button @click="confirmPayment">确认支付</button>
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
const orderId = route.query.orderId;
const orders = ref({
    business: {}
})
const isShowDetailet = ref(false);
const isShow = ()=>{
    isShowDetailet.value = !isShowDetailet.value
}
const loacl = ref(true);
const loaclnum = () => {
    if (loacl.value == true) {
        loacl.value = false;
    } else {
        loacl.value = true;
    }
}
const init = async () => {
    try {
        // 1. 获取订单信息
        const orderRes = await axios.get(`/OrderController/listOrderByOrderId?orderId=${orderId}`);
        const order = orderRes.data[0];

        // 2. 获取商家信息
        const businessRes = await axios.get(`/BusinessController/getBusinessExistsById?businessId=${order.businessId}`);
        const business = businessRes.data;

        // 3. 获取订单明细
        const detailetRes = await axios.get(`/OrderDetailetController/listDetailetByOrder?orderId=${orderId}`);
        const detailets = detailetRes.data;

        // 4. 获取每个菜品的详细信息
        const detailetList = await Promise.all(
            detailets.map(async (item) => {
                const foodRes = await axios.get(`/FoodController/getFoodById?foodId=${item.foodId}`);
                const food = foodRes.data;
                return {
                    ...item,
                    food
                };
            })
        );

        // 5. 组合数据
        orders.value = {
            ...order,
            business,
            list: detailetList
        };

    } catch (error) {
        console.error("初始化订单失败", error);
        alert("加载订单信息失败，请稍后重试");
    }
};

const confirmPayment = () => {
    axios.post('/OrderController/saveOrder', {
        orderId: orderId,
        userId: orders.value.userId,
        businessId: orders.value.business.businessId,
        deliveryDriverId: orders.value.deliveryDriverId,
        orderDate: new Date().toISOString(),
        orderTotal: orders.value.orderTotal,
        daId: orders.value.daId,
        orderState: 1
    })
    .then((response) => {
        axios.post('/CartController/removeCart',
            qs.stringify({
                userId: orders.value.userId,
                businessId: orders.value.business.businessId
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        );
      router.push({
        path: "/",

      });
    })
    .catch((error) => {
      console.error("支付失败", error);
      alert("支付失败，请稍后重试！");
    });

};


init();


const user = getSessionStorage('user');
const deliveryAddress = getLocalStorage(user.userId);
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
    padding: 4vw 4vw 0;

    font-size: 4vw;
    font-weight: 300;
    color: #999;
}

.a .order-info {
    box-sizing: border-box;
    padding: 4vw;
    font-size: 4vw;
    color: #666;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.a .order-info p:last-child {
    color: orangered;
}

.a .order-detailet {
    width: 100%;
}

.a .order-detailet li {
    width: 100%;
    box-sizing: border-box;
    padding: 1vw 4vw;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.a .order-detailet li p {
    font-size: 3vw;
    color: #666;
}

.a .payment-type {
    width: 100%;
}

.a .payment-type li {
    width: 100%;
    box-sizing: border-box;
    padding: 4vw;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.a .payment-type li img {
    width: 33vw;
    height: 8.9vw;
}

.a .payment-type li .fa-check-circle {
    font-size: 5vw;
    color: #38CA73;
}

.a .payment-button {
    width: 100%;
    box-sizing: border-box;
    padding: 4vw;
}

.a .payment-button button {
    width: 100%;
    height: 10vw;
    border: none;
    /*去掉外轮廓线*/
    outline: none;
    border-radius: 4px;
    background-color: #38CA73;
    color: #fff;
}
</style>