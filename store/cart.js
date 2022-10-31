export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  // 模块的 mutations 方法
  mutations: {
    addCart(state,goodsObj){
      const findResult = state.cart.find(item=>item.goods_id === goodsObj.goods_id)
      if(findResult){
        findResult.goods_count++
      }else{
        state.cart.push(goodsObj)
      }
      this.commit('moduleCart/saveCartStorage')
    },
    saveCartStorage(state){
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if(findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('moduleCart/saveCartStorage')
      }
    }
  },

  // 模块的 getters 属性
  getters: {
    total(state){
      let num = 0
      state.cart.forEach((item) => num += item.goods_count)
      return num
    }
  },
}