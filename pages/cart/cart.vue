<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <block v-for="(goods, i) in cart" :key="i">
      <my-goods :goods="goods" :showRadio="true" @radio-handler="radioHandle" @num-handler="numHander"></my-goods>
    </block>
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
// 按需导入 mapGetters 这个辅助方法
import { mapState,mapGetters, mapMutations } from 'vuex';
  import badgeMixins from '@/mixins/tabBar-badge.js'
export default {
  mixins: [badgeMixins],
  data() {
    return {
    };
  },
  computed: {
    // 将 m_cart 模块中的 total 映射为当前页面的计算属性
    ...mapState('moduleCart', ['cart'])
  },
  methods:{
    ...mapMutations('moduleCart', ['updateGoodsState']),
    radioHandle(e){
      console.log(e);
      this.updateGoodsState(e)
    },
    numHander(e){
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.cart-container {
  padding-bottom: 50px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
