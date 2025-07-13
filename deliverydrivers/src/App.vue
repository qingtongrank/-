<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script setup>
import { provide } from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';

// 新增拦截器配置
axios.interceptors.request.use(config => {
  const excludePaths = ['/DeliveryDriverController/getDriverByIdByPass', "/DeliveryDriverController/saveDriver"];
  if (!excludePaths.some(path => config.url.includes(path))) {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

provide('axios', axios);
</script>


<style>
	html,
	body,
	div,
	span,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	ul,
	ol,
	li,
	p {
		margin: 0;
		padding: 0;
	}

	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		font-family: "微软雅黑";
	}

	ul,
	ol {
		list-style: none;
	}

	a {
		text-decoration: none;
	}
</style>