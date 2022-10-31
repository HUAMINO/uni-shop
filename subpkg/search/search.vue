<template>
  <view>
    <uni-search-bar @confirm="search" @input="input1" :radius="100" cancelButton="none"></uni-search-bar>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchList.length!== 0">
      <view class="sugg-item" v-for="(item, i) in searchList" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons @click="cleanHistory" type="trash" size="17"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>

  </view>

</template>

<script>
  export default {
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    data() {
      return {
        timer: null,
        kw: '',
        searchList: [],
        // 搜索关键词的历史记录
        historyList: []
      };
    },
    methods: {
      gotoGoodsList(item){
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + item
        })
      },
      cleanHistory(){
        this.historyList = []
        uni.removeStorageSync('kw')
      },
      gotoDetail(id){
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      },
      input1(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          // console.log(e)
          this.kw = e
          this.getSearchList()
        },500)
      },
      async getSearchList(){
        if(this.kw === ''){
          this.searchList = []
          return
        }
        const {data} = await uni.$http.get('/api/public/v1/goods/qsearch',{
          query: this.kw
        })
        if(data.meta.status !== 200){
          return uni.$showMsg()
        }
        this.searchList = data.message
        this.historyList.unshift(this.kw)
        this.historyList = [...new Set(this.historyList)]
        // 做数据持久化
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      }
    }
  }
</script>

<style lang="scss">
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
