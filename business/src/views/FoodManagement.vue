<template>
    <div class="a">
        <header>
            <div class="location-text">商品管理</div>
        </header>

        <ul class="food-list">
            <li v-for="food in foods" :key="food.foodId" class="food-item">
                <img :src="food.foodImg" alt="食品图片" class="food-img" />
                <div class="food-info">
                    <h3>{{ food.foodName }}</h3>
                    <p class="explain">{{ food.foodExplain }}</p>
                    <p class="price">¥{{ food.foodPrice.toFixed(2) }}</p>
                    <p class="remarks" v-if="food.remarks">备注：{{ food.remarks }}</p>
                </div>
                <button @click="deleteFood(food.foodId)" class="delete-btn">删除</button>
            </li>
        </ul>

        <div class="add-food">
            <button @click="showAddForm = true" class="add-btn">添加商品</button>
        </div>

        <!-- 添加商品表单 -->
        <div v-if="showAddForm" class="add-form">
            <h3>添加新商品</h3>
            <input v-model="newFood.foodName" placeholder="商品名称" />
            <input v-model="newFood.foodExplain" placeholder="商品描述" />
            <input v-model="newFood.foodImg" placeholder="商品图片URL" />
            <input v-model.number="newFood.foodPrice" placeholder="商品价格" type="number" />
            <input v-model="newFood.remarks" placeholder="备注（可选）" />
            <button @click="addFood">确认添加</button>
            <button @click="showAddForm = false">取消</button>
        </div>

        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {getSessionStorage} from "@/common";

const business = getSessionStorage('business'); // 替换为实际的商家ID
const foods = ref([]);

const showAddForm = ref(false);
const newFood = ref({
    foodName: '',
    foodExplain: '',
    foodImg: '',
    foodPrice: 0,
    remarks: ''
});

function deleteFood(foodId) {
    if (!confirm('确定要删除这个商品吗？')) return;

    axios.delete(`/FoodController/removeFood?foodId=${foodId}`)
        .then(response => {
            if (response.status === 204) {
                // 删除成功
                foods.value = foods.value.filter(food => food.foodId !== foodId);
                alert('删除成功');
            } else {
                alert('删除失败，请重试');
            }
        })
        .catch(error => {
            console.error('删除失败', error);
            alert('删除失败，请稍后重试');
        });
}

function addFood() {
    if (!newFood.value.foodName || newFood.value.foodPrice <= 0) {
        alert('请填写完整的商品信息！');
        return;
    }

    axios.post('/FoodController/saveFood', {
        foodName: newFood.value.foodName,
        foodExplain: newFood.value.foodExplain,
        foodImg: newFood.value.foodImg,
        foodPrice: newFood.value.foodPrice,
        businessId: business.businessId,
        remarks: newFood.remarks
    }).then((response) => {
        foods.value.push({
            foodId: response.data.foodId,
            ...newFood.value
        });
    })

    showAddForm.value = false;
}

onMounted(() => {
    axios.get(`/FoodController/listFoodByBusiness?businessId=${business.businessId}`)
        .then(response => {
            foods.value = response.data;
        })
        .catch(error => {
            console.error('获取食品列表失败', error);
            alert('加载食品信息失败，请稍后重试');
        });
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

.food-list {
    padding: 4vw 3vw;
    list-style: none;

    margin-top: 5vh;
    min-height: 10vh
}

.food-item {
    display: flex;
    align-items: center;
    padding: 3vw 0;
    border-bottom: 1px solid #eee;
    position: relative;
}

.food-img {
    width: 20vw;
    height: 20vw;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 3vw;
}

.food-info {
    flex: 1;
}

.food-info h3 {
    font-size: 4vw;
    margin-bottom: 1vw;
}

.food-info .explain {
    font-size: 3.2vw;
    color: #666;
    margin-bottom: 1vw;
}

.food-info .price {
    font-size: 3.5vw;
    color: #ff6600;
    font-weight: bold;
}

.food-info .remarks {
    font-size: 3vw;
    color: #999;
}

.delete-btn {
    margin-left: auto;
    padding: 1vw 2vw;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-food {
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

.add-form input {
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