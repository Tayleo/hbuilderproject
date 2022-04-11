import App from './App'
import uView from "uview-ui";
Vue.use(uView);

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

// 假设您项目中已使用VueX
import store from '@/store';
Vue.prototype.$store = store

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})

// 引入请求封装，将app参数传递到配置中
require('./common/config/request.js')(app)


app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif