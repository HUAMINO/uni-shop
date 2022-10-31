<template>
  <view>
    <my-search></my-search>
    <view class="cate-box">
      <scroll-view class="left-box" scroll-y :style="{height: wh + 'px'}">
        <view :class="['left-item', index === activeIndex ? 'active': '']"v-for="(item,index) in cateList" :key="item.cat_id" @click="changeTab(index)">{{item.cat_name}}</view>
      </scroll-view>
      <scroll-view class="right-box" :scroll-top="scrollTop" scroll-y :style="{height: wh + 'px'}">
        <view class="cate-lv2" v-for="(item2, index2) in cateList2" :key="item2.cat_id">
          <view class="cate-lv2-title">/{{item2.cat_name}}/</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3, index3) in item2.children" :key="item3.cat_id" @click="gotoGoodsList(item3.cat_id)">
              <image :src="item3.cat_icon" mode=""></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMixins from '@/mixins/tabBar-badge.js'
  export default {
    mixins: [badgeMixins],
    data() {
      return {
        wh: 0,
        cateList: [],
        activeIndex: 0,
        cateList2: [],
        scrollTop: 0
      }
    },
    onLoad() {
      this.wh = uni.getSystemInfoSync().windowHeight - 60;
      this.getCateList()
    },
    methods:{
      async getCateList() {
        const { data } = await uni.$http.get('/api/public/v1/categories')
        console.log(data)
        if(data.meta.status!== 200){
          return uni.$showMsg()
        }
        this.cateList = data.message
        this.cateList2 = data.message[0].children
      },
      changeTab(index){
        this.activeIndex = index
        this.cateList2 = this.cateList[index].children
        this.scrollTop = this.scrollTop === 1? 0: 1
      },
      gotoGoodsList(id){
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + id
        })
      }
    }
  }
</script>

<style lang="scss">
.cate-box{
  display: flex;
  .left-box {
    width: 250rpx;
    // background-color: pink;
    .left-item{
      line-height: 60px;
      background-color: #efefef;
      font-size: 14px;
      text-align: center;
      &.active{
        background-color: #fff;
        position: relative;
        &::before{
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          content: '';
          display: block;
          width: 4px;
          height: 30px;
          background-color: #c00000;
        }
      }
    }
  }
  .right-box{
    .cate-lv2-title {
      text-align: center;
      font-weight: bold;
      font-size: 12px;
    }
    .cate-lv3-list{
      display: flex;
      flex-wrap: wrap;
      .cate-lv3-item{
        width: 33.3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        image{
          width: 60px;
          height: 60px;
        }
        text{
          font-size: 12px;
        }
      }
    }
  }

}
</style>

