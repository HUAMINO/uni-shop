<template>
  <view>
    <view class="search-box">
      <my-search bgColor="#c67122"></my-search>
    </view>
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
    <!-- 楼层区 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <!-- 标题区 -->
        <image :src="item.floor_title.image_src" mode="heightFix" class="floor_title"></image>
        <!-- 图片区 -->
        <view class="floor-img-floor">
          <navigator :url="item.product_list[0].newUrl" class="left-img">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧图片盒子 -->
          <view class="right-img">
            <view class="right-img-item"
             v-for="(item2, index2) in item.product_list"
             v-if="index2 !== 0"
             :key="index"
             >
              <image :src="item2.image_src" 
              mode="widthFix"
              :style="{width:item2.image_width +'rpx'}"
              ></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import badgeMixins from '@/mixins/tabBar-badge.js'
  export default {
    mixins: [badgeMixins],
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
        data.message.forEach(item=>{
          item.product_list.forEach(img=>{
            img.newUrl= '/subpkg/goods_list/goods_list?' + img.navigator_url.split('?')[1]
          })
        })
        this.floorList = data.message
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
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
.floor_title{
  height: 50rpx;
}
.floor-img-floor{
  display: flex;
}
.right-img{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
