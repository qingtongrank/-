<template>
	<div class="a">
		<header>
			<header>
				<div class="icon-location-box">
					<div class="icon-location"></div>
				</div>
				<div class="location-text">
					沈阳市规划大厦<i class="fa fa-caret-down"></i>
				</div>
			</header>
		</header>

		<div class="search">
			<div class="search-fixed-top" ref="fixedBox">
				<div class="search-box">
					<i class="fa fa-search"></i>搜索饿了么商家、商品名称
				</div>
			</div>
		</div>

		<ul class="foodtype">
			<li @click="toBusinessList(0)">
				<img src="../assets/dcfl01.png" />
				<p>美食</p>
			</li>
			<li @click="toBusinessList(1)">
				<img src="../assets/dcfl02.png" />
				<p>早餐</p>
			</li>
			<li @click="toBusinessList(2)">
				<img src="../assets/dcfl03.png" />
				<p>跑腿代购</p>
			</li>
			<li @click="toBusinessList(3)">
				<img src="../assets/dcfl04.png" />
				<p>汉堡披萨</p>
			</li>
			<li @click="toBusinessList(4)">
				<img src="../assets/dcfl05.png" />
				<p>甜品饮品</p>
			</li>
			<li @click="toBusinessList(5)">
				<img src="../assets/dcfl06.png" />
				<p>速食简餐</p>
			</li>
			<li @click="toBusinessList(6)">
				<img src="../assets/dcfl07.png" />
				<p>地方小吃</p>
			</li>
			<li @click="toBusinessList(7)">
				<img src="../assets/dcfl08.png" />
				<p>米粉面馆</p>
			</li>
			<li @click="toBusinessList(8)">
				<img src="../assets/dcfl09.png" />
				<p>包子粥铺</p>
			</li>
			<li @click="toBusinessList(9)">
				<img src="../assets/dcfl10.png" />
				<p>炸鸡炸串</p>
			</li>
		</ul>

		<div class="banner">
			<h3>品质套餐</h3>
			<p>搭配齐全吃得好</p>
			<a>立即抢购 &gt;</a>
		</div>

		<div class="supermember">
			<div class="left">
				<img src="../assets/super_member.png" />
				<h3>超级会员</h3>
				<p>&#8226; 每月享超值权益</p>
			</div>
			<div class="right">立即开通 &gt;</div>
		</div>

		<div class="recommend">
			<div class="recommend-line"></div>
			<p>推荐商家</p>
			<div class="recommend-line"></div>
		</div>

		<ul class="recommendtype">
			<li>综合排序<i class="fa fa-caret-down"></i></li>
			<li>距离最近</li>
			<li>销量最高</li>
			<li>筛选<i class="fa fa-filter"></i></li>
		</ul>

		<ul class="business">
			<li>
				<img src="../assets/sj01.png" />
				<div class="business-info">
					<div class="business-info-h">
						<h3>万家饺子（软件园E18店）</h3>
						<div class="business-info-like">&#8226;</div>
					</div>
					<div class="business-info-star">
						<div class="business-info-star-left">
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<p>4.9 月售345单</p>
						</div>
						<div class="business-info-star-right">蜂鸟专送</div>
					</div>
					<div class="business-info-delivery">
						<p>&#165;15起送 | &#165;3配送</p>
						<p>3.22km | 30分钟</p>
					</div>
					<div class="business-info-explain">
						<div>各种饺子</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">新</div>
							<p>饿了么新用户首单立减9元</p>
						</div>
						<div class="business-info-promotion-right">
							<p>2个活动</p>
							<i class="fa fa-caret-down"></i>
						</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon" style="background-color: #f1884f">
								特
							</div>
							<p>特价商品5元起</p>
						</div>
					</div>
				</div>
			</li>
			<li>
				<img src="../assets/sj02.png" />
				<div class="business-info">
					<div class="business-info-h">
						<h3>小锅饭豆腐馆（全运店）</h3>
						<div class="business-info-like">&#8226;</div>
					</div>
					<div class="business-info-star">
						<div class="business-info-star-left">
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<p>4.9 月售345单</p>
						</div>
						<div class="business-info-star-right">蜂鸟专送</div>
					</div>
					<div class="business-info-delivery">
						<p>&#165;15起送 | &#165;3配送</p>
						<p>3.22km | 30分钟</p>
					</div>
					<div class="business-info-explain">
						<div>各种饺子</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">新</div>
							<p>饿了么新用户首单立减9元</p>
						</div>
						<div class="business-info-promotion-right">
							<p>2个活动</p>
							<i class="fa fa-caret-down"></i>
						</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">特</div>
							<p>特价商品5元起</p>
						</div>
					</div>
				</div>
			</li>
			<li>
				<img src="../assets/sj03.png" />
				<div class="business-info">
					<div class="business-info-h">
						<h3>麦当劳麦乐送（全运路店）</h3>
						<div class="business-info-like">&#8226;</div>
					</div>
					<div class="business-info-star">
						<div class="business-info-star-left">
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<p>4.9 月售345单</p>
						</div>
						<div class="business-info-star-right">蜂鸟专送</div>
					</div>
					<div class="business-info-delivery">
						<p>&#165;15起送 | &#165;3配送</p>
						<p>3.22km | 30分钟</p>
					</div>
					<div class="business-info-explain">
						<div>各种饺子</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">新</div>
							<p>饿了么新用户首单立减9元</p>
						</div>
						<div class="business-info-promotion-right">
							<p>2个活动</p>
							<i class="fa fa-caret-down"></i>
						</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">特</div>
							<p>特价商品5元起</p>
						</div>
					</div>
				</div>
			</li>
			<li>
				<img src="../assets/sj04.png" />
				<div class="business-info">
					<div class="business-info-h">
						<h3>米村拌饭（浑南店）</h3>
						<div class="business-info-like">&#8226;</div>
					</div>
					<div class="business-info-star">
						<div class="business-info-star-left">
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<p>4.9 月售345单</p>
						</div>
						<div class="business-info-star-right">蜂鸟专送</div>
					</div>
					<div class="business-info-delivery">
						<p>&#165;15起送 | &#165;3配送</p>
						<p>3.22km | 30分钟</p>
					</div>
					<div class="business-info-explain">
						<div>各种饺子</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">新</div>
							<p>饿了么新用户首单立减9元</p>
						</div>
						<div class="business-info-promotion-right">
							<p>2个活动</p>
							<i class="fa fa-caret-down"></i>
						</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">特</div>
							<p>特价商品5元起</p>
						</div>
					</div>
				</div>
			</li>
			<li>
				<img src="../assets/sj05.png" />
				<div class="business-info">
					<div class="business-info-h">
						<h3>申记串道（中海康城店）</h3>
						<div class="business-info-like">&#8226;</div>
					</div>
					<div class="business-info-star">
						<div class="business-info-star-left">
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<i class="fa fa-star"></i>
							<p>4.9 月售345单</p>
						</div>
						<div class="business-info-star-right">蜂鸟专送</div>
					</div>
					<div class="business-info-delivery">
						<p>&#165;15起送 | &#165;3配送</p>
						<p>3.22km | 30分钟</p>
					</div>
					<div class="business-info-explain">
						<div>各种饺子</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">新</div>
							<p>饿了么新用户首单立减9元</p>
						</div>
						<div class="business-info-promotion-right">
							<p>2个活动</p>
							<i class="fa fa-caret-down"></i>
						</div>
					</div>
					<div class="business-info-promotion">
						<div class="business-info-promotion-left">
							<div class="business-info-promotion-left-incon">特</div>
							<p>特价商品5元起</p>
						</div>
					</div>
				</div>
			</li>
		</ul>

		<Footer></Footer>
	</div>
</template>

<script setup>
import Footer from '../components/Footer.vue';

import {
    onMounted,
    ref,
    onUnmounted
} from 'vue';
import {
    useRouter
} from 'vue-router';

const router = useRouter();
const fixedBox = ref(null);

onMounted(() => {
    document.onscroll = () => {
        let s1 = document.documentElement.scrollTop;
        let s2 = document.body.scrollTop;
        let scroll = s1 == 0 ? s2 : s1;

        let width = document.documentElement.clientWidth;

        let search = fixedBox.value;

        if (scroll > width * 0.12) {
            search.style.position = 'fixed';
            search.style.left = '0';
            search.style.top = '0';
        } else {
            search.style.position = 'static';
        }
    }
})

onUnmounted(() => {
    document.onscroll = null;
})

const toBusinessList = (orderTypeId) => {
    router.push({
        path: "/businessList",
        query:{
            orderTypeId:orderTypeId
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
    background-color: #0097ff;

    display: flex;
    align-items: center;
}

.a header .icon-location-box {
    width: 3.5vw;
    height: 3.5vw;
    margin: 0 1vw 0 3vw;
}

.a header .location-text {
    font-size: 4.5vw;
    font-weight: 700;
    color: #fff;
}

.a header .location-text .fa-caret-down {
    margin-left: 1vw;
}

.a .search {
    width: 100%;
    height: 13vw;
}

.a .search .search-fixed-top {
    width: 100%;
    height: 13vw;
    background-color: #0097ff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.a .search .search-fixed-top .search-box {
    width: 90%;
    height: 9vw;
    background-color: #fff;
    border-radius: 2px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 3.5vw;
    color: #aeaeae;
    font-family: "宋体";
    user-select: none;
}

.a .search .search-fixed-top .search-box .fa-search {
    margin-right: 1vw;
}

.a .foodtype {
    width: 100%;
    height: 48vw;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
}

.a .foodtype li {
    width: 18vw;
    height: 20vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    user-select: none;
    cursor: pointer;
}

.a .foodtype li img {
    width: 12vw;
    height: 10.3vw;
}

.a .foodtype li p {
    font-size: 3.2vw;
    color: #666;
}

.a .banner {
    width: 95%;
    margin: 0 auto;
    height: 29vw;

    background-image: url(../assets/index_banner.png);
    background-repeat: no-repeat;
    background-size: cover;

    box-sizing: border-box;
    padding: 2vw 6vw;
}

.a .banner h3 {
    font-size: 4.2vw;
    margin-bottom: 1.2vw;
}

.a .banner p {
    font-size: 3.4vw;
    color: #666;
    margin-bottom: 2.4vw;
}

.a .banner a {
    font-size: 3vw;
    color: #c79060;
    font-weight: 700;
}

.a .supermember {
    width: 95%;
    margin: 0 auto;
    height: 11.5vw;
    background-color: #feedc1;
    margin-top: 1.3vw;
    border-radius: 2px;
    color: #644f1b;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.a .supermember .left {
    display: flex;
    align-items: center;
    margin-left: 4vw;
    user-select: none;
}

.a .supermember .left img {
    width: 6vw;
    height: 6vw;
    margin-right: 2vw;
}

.a .supermember .left h3 {
    font-size: 4vw;
    margin-right: 2vw;
}

.a .supermember .left p {
    font-size: 3vw;
}

.a .supermember .right {
    font-size: 3vw;
    margin-right: 4vw;
    cursor: pointer;
}

.a .recommend {
    width: 100%;
    height: 14vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.a .recommend .recommend-line {
    width: 6vw;
    height: 0.2vw;
    background-color: #888;
}

.a .recommend p {
    font-size: 4vw;
    margin: 0 4vw;
}

.a .recommendtype {
    width: 100%;
    height: 5vw;
    margin-bottom: 5vw;

    display: flex;
    justify-content: space-around;
    align-items: center;
}

.a .recommendtype li {
    font-size: 3.5vw;
    color: #555;
}

.a .business {
    width: 100%;
    margin-bottom: 14vw;
}

.a .business li {
    width: 100%;
    box-sizing: border-box;
    padding: 2.5vw;
    user-select: none;
    border-bottom: solid 1px #ddd;

    display: flex;
}

.a .business li img {
    width: 18vw;
    height: 18vw;
}

.a .business li .business-info {
    width: 100%;
    box-sizing: border-box;
    padding-left: 3vw;
}

.a .business li .business-info .business-info-h {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2vw;
}

.a .business li .business-info .business-info-h h3 {
    font-size: 4vw;
    color: #333;
}

.a .business li .business-info .business-info-h .business-info-like {
    width: 1.6vw;
    height: 3.4vw;
    background-color: #666;
    color: #fff;
    font-size: 4vw;
    margin-right: 4vw;

    display: flex;
    justify-content: center;
    align-items: center;
}

.a .business li .business-info .business-info-star {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2vw;
    font-size: 3.1vw;
}

.a .business li .business-info .business-info-star .business-info-star-left {
    display: flex;
    align-items: center;
}

.a .business li .business-info .business-info-star .business-info-star-left .fa-star {
    color: #fec80e;
    margin-right: 0.5vw;
}

.a .business li .business-info .business-info-star .business-info-star-left p {
    color: #666;
    margin-left: 1vw;
}

.a .business li .business-info .business-info-star .business-info-star-right {
    background-color: #0097ff;
    color: #fff;
    font-size: 2.4vw;
    border-radius: 2px;
    padding: 0 0.6vw;
}

.a .business li .business-info .business-info-delivery {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2vw;

    color: #666;
    font-size: 3.1vw;
}

.a .business li .business-info .business-info-explain {
    display: flex;
    align-items: center;
    margin-bottom: 3vw;
}

.a .business li .business-info .business-info-explain div {
    border: solid 1px #ddd;
    font-size: 2.8vw;
    color: #666;
    border-radius: 3px;
    padding: 0 0.1vw;
}

.a .business li .business-info .business-info-promotion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.8vw;
}

.a .business li .business-info .business-info-promotion .business-info-promotion-left {
    display: flex;
    align-items: center;
}

.a .business li .business-info .business-info-promotion .business-info-promotion-left .business-info-promotion-left-incon {
    width: 4vw;
    height: 4vw;
    background-color: #70bc46;
    border-radius: 3px;
    font-size: 3vw;
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
}

.a .business li .business-info .business-info-promotion .business-info-promotion-left p {
    color: #666;
    font-size: 3vw;
    margin-left: 2vw;
}

.a .business li .business-info .business-info-promotion .business-info-promotion-right {
    display: flex;
    align-items: center;
    font-size: 2.5vw;
    color: #999;
}

.a .business li .business-info .business-info-promotion .business-info-promotion-right p {
    margin-right: 2vw;
}

.icon-location {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50% 50% 50% 0;
    background: #fff;
    transform: rotate(-45deg);
}
.icon-location:after {
    content: '';
    width: 40%;
    height: 40%;
    margin: 30% 0 0 29%;
    background-color: #0097FF;
    position: absolute;
    border-radius: 50%;
}
</style>

