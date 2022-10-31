// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 引入cart（购物车）的模块
import moduleCart from './cart'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
    // 挂载购物车的模块
    moduleCart
  },
})

// 4. 向外共享 Store 的实例对象
export default store