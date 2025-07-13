<template>
	<div class="a">
	  <header>
		<p>确认订单</p>
	  </header>
	  
	  <div class="order-info">
		<h5>订单配送至：</h5>
		<div class="order-info-address" @click="toUserAddress">
		  <p>{{ deliveryaddress != null ? deliveryaddress.address : '请选择送货地址' }}</p>
		  <i class="fa fa-angle-right"></i>
		</div>
		<p>{{ user.userName }} {{ userSexFilter(user.userSex) }} {{ user.userId }}</p>
	  </div>
	  
	  <h3>{{ business.businessName }}</h3>
	  
	  <ul class="order-detailed">
		<li v-for="item in cartArr" :key="item.cartId">
		  <div class="order-detailed-left">
			<img :src="item.food.foodImg">
			<p>{{ item.food.foodName }} x {{ item.quantity }}</p>
		  </div>
		  <p>&#165;{{ item.food.foodPrice * item.quantity }}</p>
		</li>
	  </ul>
	  <div class="order-deliveryfee">
		<p>配送费</p>
		<p>&#165;{{ business.deliveryPrice }}</p>
	  </div>
	  
	  <div class="total">
		<div class="total-left">
		  &#165;{{ totalPrice }}
		</div>
		<div class="total-right" @click="toPayment">
		  去支付
		</div>
	  </div>
	</div>
  </template>
   
<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import qs from 'qs';
import router from '@/router';
import {
    useRouter,
    useRoute
} from 'vue-router';
import {
    getLocalStorage,
    getSessionStorage
} from '../common.js';


export default {
name: 'Order',
setup() {
const route = useRoute();
const businessId = route.query.businessId;
const business = ref({});
const user = getSessionStorage('user');
const cartArr = ref([]);
const deliveryaddress = getLocalStorage(user.userId);

const userSexFilter = (value) => {
return value === 1 ? '先生' : '女士';
};

const totalPrice = computed(() => {
    let total = 0;
    for (let cartItem of cartArr.value) {
      total += cartItem.food.foodPrice * cartItem.quantity;
    }
    total += business.value.deliveryPrice;
    return total;
});

onMounted(() => {
    // 获取商家信息
    axios.get(`/BusinessController/getBusinessExistsById?businessId=${businessId}`)
        .then(response => {
            business.value = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    // 获取购物车信息
    axios.get(`/CartController/listCartByUserAndBusiness?businessId=${businessId}&userId=${user.userId}`)
        .then(response => {
            const carts = response.data;

            // 为每个购物车项获取食物信息
            const foodPromises = carts.map(cart =>
                axios.get(`/FoodController/listFoodByBusiness?businessId=${businessId}`)
                    .then(foodResponse => {
                        const foodList = foodResponse.data;
                        const food = foodList.find(f => f.foodId === cart.foodId);
                        return {
                            ...cart,
                            food
                        };
                    })
            );

            // 等待所有请求完成
            Promise.all(foodPromises).then(results => {
                cartArr.value = results;
            });
        })
        .catch(error => {
            console.error(error);
        });
});

  const toUserAddress = () => {
    router.push({
        path: "/userAddress",
        query: {
            businessId: businessId
        }
    })
}

const toPayment = async () => {
    if (!deliveryaddress) {
        alert('请选择送货地址！');
        return;
    }

    try {
        // 1. 保存订单
        const orderRes = await axios.post('/OrderController/saveOrder', {
            userId: user.userId,
            businessId: businessId,
            deliveryDriverId: "",
            orderDate: new Date().toISOString(),
            orderTotal: totalPrice.value,
            daId: deliveryaddress.daId,
            orderState: 0
        });

        const orderId = orderRes.data.orderId;
        if (!orderId) {
            alert('创建订单失败！');
            return;
        }

        // 2. 保存订单明细
        const detailetPromises = cartArr.value.map(item =>
            axios.post('/OrderDetailetController/saveDetailet', {
                orderId: orderId,
                foodId: item.food.foodId,
                quantity: item.quantity
            })
        );

        await Promise.all(detailetPromises);

        // 3. 跳转到支付页面
        router.push({
            path: "/payment",
            query: { orderId }
        });

    } catch (error) {
        console.error("提交订单失败", error);
        alert("提交订单失败，请稍后重试！");
    }
};

return {
    businessId,
    business,
    user,
    cartArr,
    deliveryaddress,
    userSexFilter,
    totalPrice,
    toUserAddress,
    toPayment
  };
}
};
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

.a .order-info {
    width: 100%;
    margin-top: 12vw;
    background-color: #0097EF;
    box-sizing: border-box;
    padding: 2vw;
    color: #fff;
}

.a .order-info h5 {
    font-size: 3vw;
    font-weight: 300;
}

.a .order-info .order-info-address {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: 700;
    user-select: none;
    cursor: pointer;
    margin: 1vw 0;
}

.a .order-info .order-info-address p {
    width: 90%;
    font-size: 5vw;
}

.a .order-info .order-info-address i {
    font-size: 6vw;
}

.a .order-info p {
    font-size: 3vw;
}

.a h3 {
    box-sizing: border-box;
    padding: 3vw;
    font-size: 4vw;
    color: #666;
    border-bottom: solid 1px #DDD;
}

.a .order-detailed {
    width: 100%;
}

.a .order-detailed li {
    width: 100%;
    height: 16vw;
    box-sizing: border-box;
    padding: 3vw;
    color: #666;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.a .order-detailed li .order-detailed-left {
    display: flex;
    align-items: center;
}

.a .order-detailed li .order-detailed-left img {
    width: 10vw;
    height: 10vw;
}

.a .order-detailed li .order-detailed-left p {
    font-size: 3.5vw;
    margin-left: 3vw;
}

.a .order-detailed li p {
    font-size: 3.5vw;
}

.a .order-deliveryfee {
    width: 100%;
    height: 16vw;
    box-sizing: border-box;
    padding: 3vw;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3.5vw;
}

.a .total {
    width: 100%;
    height: 14vw;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;
}

.a .total .total-left {
    flex: 2;
    background-color: #505051;
    color: #fff;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: center;
}

.a .total .total-right {
    flex: 1;
    background-color: #38CA73;
    color: #fff;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>