import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// eslint-disable-next-line no-unused-vars
import {http,baseURL} from './api/http.js'
Vue.prototype.$http = http
Vue.prototype.$baseURL = baseURL

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import websocket from 'vue-native-websocket';
//Websocket插件
Vue.use(websocket, '', {
  connectManually: true, // 手动连接
  format: 'json', // json格式
  reconnection: true, // 是否自动重连
  reconnectionAttempts: 5, // 自动重连次数
  reconnectionDelay: 2000, // 重连间隔时间
});
import router from "./router";

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
