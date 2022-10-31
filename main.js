
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入store包
import store from './store/store'
// 导入请求包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  // do somethimg...
   wx.showLoading({
      title: '数据加载中...',
    })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  // do something...
    wx.hideLoading()
}
uni.$showMsg= function(title='数据请求失败'){
  uni.showToast({
    title,
    icon: 'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif