<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in swiperList" :key="item.goods_id">
        <navigator  class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClick(item)">
        <image :src="item.image_src" class="nav-img" mode=""></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList:[]
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getnavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList(){
       const {data} = await uni.$http.get('/api/public/v1/home/swiperdata')
       console.log(data);
       if(data.meta.status!==200){
         return uni.showToast()
       }
       this.swiperList=data.message
      },
      async getnavList(){
       const {data} = await uni.$http.get('/api/public/v1/home/catitems')
       console.log(data);
       if(data.meta.status!==200){
         return uni.showToast()
       }
       this.navList=data.message
      },
      navClick(item){
        if(item.name === '分类'){
          uni.switchTab({
            url:"/pages/cate/cate"
          })
        }
      },
      async getFloorList(){
        const {data}  = await uni.$http.get('/api/public/v1/home/floordata')
        console.log(data);
        if(data.meta.status!==200){
          return uni.showToast()
        }
        this.floorList=data.message
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
}
.swiper-item, image{
  width: 100%;
  height: 100%;
}

.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  .nav-img{
    width: 128rpx;
    height: 140rpx;
  }
}
</style>
