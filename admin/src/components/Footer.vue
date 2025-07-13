<template>
    <div class="a">
        <div id="footer">
            <ul class="footer">
                <li @click="toUserManagement()">
                    <i class="fa fa-home"></i>
                    <p>用户管理</p>
                </li>
                <li @click="toBusinessManagement()">
                    <i class="fa fa-compass"></i>
                    <p>商家管理</p>
                </li>
                <li @click="toDeliveryDriverManagement()">
                    <i class="fa fa-compass"></i>
                    <p>外卖员管理</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router';
import {getSessionStorage} from "@/common";
const router = useRouter();
const toUserManagement = () => {
    router.push({
        path: '/userManagement'
    });
};

const toBusinessManagement = () => {
    router.push({
        path: '/businessManagement'
    })
}
const toDeliveryDriverManagement = () => {
    router.push({
        path: '/deliveryDriverManagement'
    })
}

</script>

<style scoped>
.a .footer {
    width: 100%;
    height: 14vw;
    border-top: solid 1px #DDD;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
}

.a .footer li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: #999;
    user-select: none;
    cursor: pointer;
}

.a .footer li p {
    font-size: 2.8vw;
}

.a .footer li i {
    font-size: 5vw;
}
</style>