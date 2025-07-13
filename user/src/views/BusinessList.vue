<template>
	<div class="a">
		<header>
			<p>商家列表</p>
		</header>

		<ul class="business">
			<li v-for="business in businessArr" :key="business.businessId" @click="toBusinessInfo(business.businessId)">
				<div class="business-img">
					<img :src="business.businessImg">
					<div class="business-img-quantity" v-show="business.quantity > 0">{{business.quantity}}</div> <!-- 点餐数量跟购物车关联 -->
				</div>
				<div class="business-info">
					<h3>{{business.businessName}}</h3>
					<p>&#165;{{business.starPrice}}起送 | &#165;{{business.deliveryPrice}}配送</p>
					<p v-text="business.businessExplain"></p>
				</div>
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
    inject
} from 'vue';
import {
    getSessionStorage
} from '../common.js';

const axios = inject("axios");
const router = useRouter();
const route = useRoute();
const orderTypeId = route.query.orderTypeId;
const businessArr = ref([]);
const user = getSessionStorage('user');

const init = () => {
    axios.post('/BusinessController/listBusinessByOrderTypeId', qs.stringify({
        orderTypeId: orderTypeId
    })).then((response) => {
        businessArr.value = response.data;

        if (user != null) {
            listCart();
        }

    }).catch((error) => {
        console.log(error);
    });
}
init();

const toBusinessInfo = (businessId) => {
    router.push({
        path: "/businessInfo",
        query: {
            businessId: businessId
        }
    });
}

// 查询购物车信息
const listCart = () => {
    axios.get(`/CartController/listCartByUser?userId=${user.userId}`).then((response) => {
        let cartArr = response.data;
        for (let businessItem of businessArr.value) {
            businessItem.quantity = 0;
            for (let cartItem of cartArr) {
                if (cartItem.businessId == businessItem.businessId) {
                    businessItem.quantity += cartItem.quantity;
                }
            }

        }
    }).catch((error) => {
        console.log(error);
    });
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

.a .business {
    width: 100%;
    margin-top: 12vw;
    margin-bottom: 14vw;
}

.a .business li {
    width: 100%;
    box-sizing: border-box;
    padding: 2.5vw;
    border-bottom: solid 1px #DDD;
    user-select: none;
    cursor: pointer;

    display: flex;
    align-items: center;
}

.a .business li .business-img {
    position: relative;
}

.a .business li .business-img img {
    width: 20vw;
    height: 20vw;
}

.a .business li .business-img .business-img-quantity {
    width: 5vw;
    height: 5vw;
    background-color: red;
    color: #fff;
    font-size: 3.6vw;
    border-radius: 2.5vw;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: -1.5vw;
    top: -1.5vw;
}

.a .business li .business-info {
    margin-left: 3vw;
}

.a .business li .business-info h3 {
    font-size: 3.8vw;
    color: #555;
}

.a .business li .business-info p {
    font-size: 3vw;
    color: #888;
    margin-top: 2vw;
}
</style>