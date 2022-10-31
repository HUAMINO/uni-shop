  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('moduleCart',['total'])
    },
    onShow(){
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
