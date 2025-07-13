<template>
	<div class="a">

		<header>
			<p>地址管理</p>
		</header>
 
		<ul class="addresslist">
			<li v-for="item in deliveryAddressArr" :key="item.daId">
				<div class="addresslist-left" @click="setDeliveryAddress(item)">
					<h3>{{item.contactName}}
						{{item.contactSex==1?"先生":"女士"}}
						{{item.contactTel}}
					</h3>
					<p>{{item.address}}</p>
				</div>
				<div class="addresslist-right">
					<i class="fa fa-edit" @click="editUserAddress(item.daId)"></i>
					<i class="fa fa-remove" @click="removeUserAddress(item.daId)"></i>
				</div>
			</li>
		</ul>

		<div class="addbtn" @click="toAddUserAddress()">
			<i class="fa fa-plus-circle"></i>
			<p>新增收货地址</p>
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
} from 'vue-router'
import {
    ref,
    inject,
    computed
} from 'vue';
import {
    getSessionStorage,
    getLocalStorage,
    setLocalStorage
} from '../common.js';

const axios = inject("axios");
const router = useRouter();
const route = useRoute();
const businessId = route.query.businessId;
const user = getSessionStorage('user');
const deliveryAddressArr = ref([]);

const listDeliveryAddressByUserId = () => {
    axios.get(`/DeliveryAddressController/listAddressByUser?userId=${user.userId}`).then((response) => {
        deliveryAddressArr.value = response.data;
    }).catch((error) => {
        console.log(error);
    });
};
listDeliveryAddressByUserId();


const setDeliveryAddress = (deliveryAddress) => {
    setLocalStorage(user.userId, deliveryAddress);
    router.push({
        path: "/order",
        query: {
            businessId: businessId
        }
    });
}

const toAddUserAddress = (daId) => {
    router.push({
        path: "/addUserAddress",
        query: {
            businessId: businessId
        }
    });
}

const editUserAddress = (daId) => {
    router.push({
        path: "/editUserAddress",
        query: {
            daId: daId
        }
    });
}
const removeUserAddress = (daId) => {
    axios.post('/DeliveryAddressController/removeDeliveryAddress',
        ({
            daId: daId
        })).then((response) => {
        response.data;
        listDeliveryAddressByUserId();
    }).catch((error) => {
        console.log(error);
    });
}
</script>

<style scoped>
.a {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
}

.a header {
    width: 100%;
    height: 12vw;
    background-color: #0097FF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    font-size: 4.8vw;
    position: fixed;
    left: 0;
    top: 0;
    /*保证在最上层*/
    z-index: 1000;
}

.a .addresslist {
    width: 100%;
    margin-top: 12vw;
    background-color: #fff;
}

.a .addresslist li {
    width: 100%;
    box-sizing: border-box;
    border-bottom: solid 1px #DDD;
    padding: 3vw;

    display: flex;
}

.a .addresslist li .addresslist-left {
    flex: 5;
    user-select: none;
    cursor: pointer;
}

.a .addresslist li .addresslist-left h3 {
    font-size: 4.6vw;
    font-weight: 300;
    color: #666;
}

.a .addresslist li .addresslist-left p {
    font-size: 4vw;
    color: #666;
}

.a .addresslist li .addresslist-right {
    flex: 1;
    font-size: 5.6vw;
    color: #999;
    cursor: pointer;

    display: flex;
    justify-content: space-around;
    align-items: center;
}

.a .addbtn {
    width: 100%;
    height: 14vw;
    border-top: solid 1px #DDD;
    border-bottom: solid 1px #DDD;
    background-color: #fff;
    margin-top: 4vw;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 4.5vw;
    color: #0097FF;
    user-select: none;
    cursor: pointer;
}

.a .addbtn p {
    margin-left: 2vw;
}
</style>