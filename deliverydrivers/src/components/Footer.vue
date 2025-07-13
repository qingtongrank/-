<template>
    <div class="a">
        <div id="footer">
            <ul class="footer">
                <li @click="toOrderManagement()">
                    <i class="fa fa-home"></i>
                    <p>接单管理</p>
                </li>
                <li @click="toMyDeliveryOrdersManagement()">
                    <i class="fa fa-compass"></i>
                    <p>我的接单</p>
                </li>
                <li>
                    <i class="fa fa-user-o"></i>
                    <p>我的</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router';
import {getSessionStorage} from "@/common";
const router = useRouter();
const toOrderManagement = () => {
    router.push({
        path: '/orderManagement'
    });
};

const toMyDeliveryOrdersManagement = () => {
    router.push({
        path: '/myDeliveryOrdersManagement'
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