<template>
  <view class="search-box" :style="{'background-color': bgColor}" @click="gotoSearch">
    <view class="search-box-cont">
      <uni-icons type="search" size="16"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      }
    },
    props: {
      bgColor: {
        type: String,
        default: '#c00000'
      }
    },
    methods: {
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  height: 60px;
  background-color: hotpink;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .search-box-cont {
    height: 40px;
    width: 100%;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder{
      margin-left: 10px;
      font-size: 14px;
    }
  }
  
}
</style>