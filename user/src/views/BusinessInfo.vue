<template>
	<div class="a">
		<header>
			<p>商家信息</p>
		</header>

		<div class="business-logo">
			<img :src="business.businessImg">
		</div>

		<div class="business-info">
			<h3>{{business.businessName}}</h3>
			<p>&#165;{{business.starPrice}}起送 | &#165;{{business.deliveryPrice}}配送</p>
			<p v-text="business.businessExplain"></p>
		</div>

		<ul class="food">
			<li v-for="(food,index) in foodArr" :key="food.foodId">
				<div class="food-left">
					<img :src="food.foodImg">
					<div class="food-left-info">
						<h3>{{food.foodName}}</h3>
						<p>{{food.foodExplain}}</p>
						<p>&#165;{{food.foodPrice}}</p>
					</div>
				</div>
				<div class="food-right">
					<div>
						<i class="fa fa-minus-circle" @click="minus(index)" v-show="food.quantity>0"></i>
					</div>
					<p><span v-show="food.quantity>0">{{food.quantity}}</span></p>
					<div>
						<i class="fa fa-plus-circle" @click="add(index)"></i>
					</div>
				</div>
			</li>
		</ul>

		<div class="cart">
			<div class="cart-left">
				<div class="cart-left-icon"
					:style="totalQuantity == 0?'background-color:#505051':'background-color:#3190E8'">
					<i class="fa fa-shopping-cart"></i>
					<div class="cart-left-icon-quantity" v-show="totalQuantity != 0">
						{{totalQuantity}}
					</div>
				</div>
				<div class="cart-left-info">
					<p>&#165;{{totalPrice}}</p>
					<p>另需配送费{{business.deliveryPrice}}元</p>
				</div>
			</div>
			<div class="cart-right">
				<div class="cart-right-item" v-show="totalPrice < business.starPrice">
					&#165;{{business.starPrice}}起送
				</div>
				<div class="cart-right-item" v-show="totalPrice >= business.starPrice" @click="toOrder()">
					去结算
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
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
    getSessionStorage
} from '../common.js';

const axios = inject("axios");
const router = useRouter();
const route = useRoute();

const businessId = route.query.businessId;
const user = getSessionStorage('user');

const business = ref({});
let foodArr = ref([]);

const totalPrice = computed(() => {
    let total = 0;
    for (let item of foodArr.value) {
        total += item.foodPrice * item.quantity;
    }
    return total;
});
const totalQuantity = computed(() => {
    let quantity = 0;
    for (let item of foodArr.value) {
        quantity += item.quantity;
    }
    return quantity;
});
const tdotalSettle = computed(() => {
    return totalPrice.value + business.value.deliveryPrice;
})


const init = () => {
    axios.get(`/BusinessController/getBusinessExistsById?businessId=${businessId}`).then((response) => {
        business.value = response.data;
    }).catch((error) => {
        console.log(error);
    });

    axios.get(`/FoodController/listFoodByBusiness?businessId=${businessId}`).then((response) => {
        let arr = response.data;

        for (let i = 0; i < arr.length; i++) {
            arr[i].quantity = 0;
        }
        foodArr.value = arr;
        if (user != null) {
            listCart();
        }
    }).catch((error) => {
        console.log(error);
    });


}

init();

const add = (index) => {
    if (user == null) {
        router.push({
            path: '/login'
        });
        return;
    }

    if (foodArr.value[index].quantity == 0) {
        saveCart(index);
    } else {
        updateCart(index, 1);
    }
}

const minus = (index) => {
    if (user == null) {
        router.push({
            path: '/login'
        });
        return;
    }

    if (foodArr.value[index].quantity > 1) {
        updateCart(index, -1);
    } else {
        removeCart(index);

    }
}

const saveCart = (index) => {
    axios.post('/CartController/saveCart', ({
        businessId: businessId,
        userId: user.userId,
        foodId: foodArr.value[index].foodId,
    })).then((response) => {
        if (response.data && response.data.cartId) {
            foodArr.value[index].quantity = 1;
        } else {
            alert("OUT!!!!!!!!!");
        }
    }).catch((error) => {
        console.log(error);
    });
}

const updateCart = (index, num) => {
    axios.post('/CartController/updateCart', ({
        businessId: businessId,
        userId: user.userId,
        foodId: foodArr.value[index].foodId, //食品数组对象-下标-食品Id
        quantity: foodArr.value[index].quantity + num
    })).then((response) => {
        if (response.data && response.data.cartId) {
            foodArr.value[index].quantity += num
        } else {
            alert("OUT!!!!!!!!!");
        }
    }).catch((error) => {
        console.log(error);
    });
}

const removeCart = (index) => {
    axios.post(`/CartController/removeCart?userId=${user.userId}&businessId=${businessId}&foodId=${foodArr.value[index].foodId}`)
        .then((response) => {
        if (response.data == 1) {
            foodArr.value[index].quantity = 0;
        } else {
            alert("删除失败!!!!!!!!!");
        }
    }).catch((error) => {
        console.log(error);
    });
}


// 查询购物车信息
const listCart = () => {
    axios.get(`/CartController/listCartByUserAndBusiness?businessId=${businessId}&userId=${user.userId}`).then((response) => {
        let cartArr = response.data;
        for (let foodItem of foodArr.value) {
            foodItem.quantity = 0;
            for (let cartItem of cartArr) {
                if (cartItem.foodId == foodItem.foodId) {
                    foodItem.quantity = cartItem.quantity;
                }
            }
        }
    }).catch((error) => {
        console.log(error);
    });
}

const toOrder = () => {
    router.push({
        path: "/order",
        query: {
            businessId: businessId
        }
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

.a .business-logo {
    width: 100%;
    height: 35vw;
    /*使用上外边距避开header部分*/
    margin-top: 12vw;

    display: flex;
    justify-content: center;
    align-items: center;
}

.a .business-logo img {
    width: 40vw;
    height: 30vw;
    border-radius: 5px;
}

.a .business-info {
    width: 100%;
    height: 20vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.a .business-info h1 {
    font-size: 5vw;
}

.a .business-info p {
    font-size: 3vw;
    color: #666;
    margin-top: 1vw;
}

.a .food {
    width: 100%;
    margin-bottom: 14vw;
}

.a .food li {
    width: 100%;
    box-sizing: border-box;
    padding: 2.5vw;
    user-select: none;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.a .food li .food-left {
    display: flex;
    align-items: center;
}

.a .food li .food-left img {
    width: 20vw;
    height: 20vw;
}

.a .food li .food-left .food-left-info {
    margin-left: 3vw;
}

.a .food li .food-left .food-left-info h3 {
    font-size: 3.8vw;
    color: #555;
}

.a .food li .food-left .food-left-info p {
    font-size: 3vw;
    color: #888;
    margin-top: 2vw;
}

.a .food li .food-right {
    width: 16vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.a .food li .food-right .fa-minus-circle {
    font-size: 5.5vw;
    color: #999;
    cursor: pointer;
}

.a .food li .food-right p {
    font-size: 3.6vw;
    color: #333;
}

.a .food li .food-right .fa-plus-circle {
    font-size: 5.5vw;
    color: #0097EF;
    cursor: pointer;
}

.a .cart {
    width: 100%;
    height: 14vw;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;
}

.a .cart .cart-left {
    flex: 2;
    background-color: #505051;
    display: flex;
}

.a .cart .cart-left .cart-left-icon {
    width: 16vw;
    height: 16vw;
    box-sizing: border-box;
    border: solid 1.6vw #444;
    border-radius: 8vw;
    background-color: #3190E8;
    font-size: 7vw;
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: -4vw;
    margin-left: 3vw;

    position: relative;
}

.a .cart .cart-left .cart-left-icon-quantity {
    width: 5vw;
    height: 5vw;
    border-radius: 2.5vw;
    background-color: red;
    color: #fff;
    font-size: 3.6vw;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: -1.5vw;
    top: -1.5vw;
}

.a .cart .cart-left .cart-left-info p:first-child {
    font-size: 4.5vw;
    color: #fff;
    margin-top: 1vw;
}

.a .cart .cart-left .cart-left-info p:last-child {
    font-size: 2.8vw;
    color: #AAA;
}

.a .cart .cart-right {
    flex: 1;
}

.a .cart .cart-right .cart-right-item {
    width: 100%;
    height: 100%;
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