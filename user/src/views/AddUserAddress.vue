<template>
	<div class="a">

		<header>
			<p>新增送货地址</p>
		</header>

		<ul class="form-box">
			<li>
				<div class="title">
					联系人：
				</div>
				<div class="content">
					<input type="text" v-model="deliveryAddress.contactName" placeholder="联系人姓名">
				</div>
			</li>
			<li>
				<div class="title">
					性别：
				</div>
				<div class="content" style="font-size: 3vw;">
					<input type="radio" v-model="deliveryAddress.contactSex" value="1" style="width:6vw;height:3.2vw;">男
					<input type="radio" v-model="deliveryAddress.contactSex" value="0" style="width:6vw;height:3.2vw;">女
				</div>
			</li>
			<li>
				<div class="title">
					电话：
				</div>
				<div class="content">
					<input type="tel" v-model="deliveryAddress.contactTel" placeholder="电话">
				</div>
			</li>
			<li>
				<div class="title">
					收货地址：
				</div>
				<div class="content">
					<input type="text" v-model="deliveryAddress.address" placeholder="收货地址">
				</div>
			</li>
		</ul>

		<div class="button-add">
			<button @click="addUserAddress()">保存</button>
		</div>

		<Footer></Footer>

	</div>
</template>

<script setup>
import Footer from '../components/Footer.vue'
import {
    getSessionStorage,
    getLocalStorage,
    setLocalStorage
} from '../common.js';
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
const axios = inject("axios");
const user = getSessionStorage('user');
const route = useRoute();
const router = useRouter();
const businessId = route.query.businessId;
const deliveryAddress = ref({
    contactName: '',
    contactSex: 1,
    contactTel: '',
    address: '',
    userId: user.userId,
});

const addUserAddress = () => {

    if (deliveryAddress.value.contactName === '') {
      alert('联系人姓名不能为空！');
      return;
    }

    if (deliveryAddress.value.contactTel === '') {
      alert('联系人电话不能为空！');
      return;
    }

    if (deliveryAddress.value.address === '') {
      alert('联系人地址不能为空！');
      return;
    }

    axios.post('/DeliveryAddressController/saveAddress',
        deliveryAddress.value,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    )
        .then(response => {
          if (response.data && response.data.daId) {
            router.push({
              path: "/userAddress",
              query: {
                businessId: businessId
              }
            });
          } else {
            alert('新增地址失败！');
          }
        })
        .catch(error => {
          console.error(error);
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    font-size: 4.8vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
}

.a .form-box {
    width: 100%;
    margin-top: 12vw;
}

.a .form-box li {
    box-sizing: border-box;
    padding: 4vw 3vw 0vw 3vw;
    display: flex;
}

.a .form-box li .title {
    flex: 0 0 18vw;
    font-size: 3vw;
    font-weight: 700;
    color: #666;
}

.a .form-box li .content {
    flex: 1;

    display: flex;
    align-items: center;
}

.a .form-box li .content input {
    border: none;
    outline: none;
    width: 100%;
    height: 4vw;
    font-size: 3vw;
}

.a .button-add {
    box-sizing: border-box;
    padding: 4vw 3vw 0vw 3vw;
}

.a .button-add button {
    width: 100%;
    height: 10vw;
    font-size: 3.8vw;
    font-weight: 700;

    border: none;
    outline: none;
    border-radius: 4px;
    color: #fff;
    background-color: #38CA73;
}
</style>