<template>
  <div class="container">
    <div class="sort_button_box">
      <div class="sort_button" @click="chooseTab(0,0)">
        <span class="sort_button_text" :class="itemSelected==0?'itemSelectedColor':''">全部</span>
      </div>
      <div class="sort_button" @click="chooseTab(1,2)">
        <span class="sort_button_text" :class="itemSelected==1?'itemSelectedColor':''">待付款</span>
      </div>
      <div class="sort_button" @click="chooseTab(2,3)">
        <span class="sort_button_text" :class="itemSelected==2?'itemSelectedColor':''">待收货</span>
      </div>
      <div class="sort_button" @click="chooseTab(3,4)">
        <span class="sort_button_text" :class="itemSelected==3?'itemSelectedColor':''">已完成</span>
      </div>
      <div class="sort_button" @click="chooseTab(4,5)">
        <span class="sort_button_text" :class="itemSelected==4?'itemSelectedColor':''">已取消</span>
      </div>
    </div>
    <orderAll :orderId='orderId'></orderAll>
  </div>
</template>
<script>
import orderAll from './order_all'
export default {
  data () {
    return {
      itemSelected: 0,
      goods_list: [],
      orderId: ''
    }
  },
  components: {
    orderAll
  },
  mounted () {
    if (this.$root.$mp.query.index) {
      this.itemSelected = this.$root.$mp.query.index
      if (this.$root.$mp.query.orderid) {
        console.log('orderid', this.$root.$mp.query.orderid)
        this.orderId = this.$root.$mp.query.orderid
      }
    }
  },
  methods: {
    chooseTab (value, id) {
      if (value !== this.itemSelected) {
        this.itemSelected = value
      }
      if (id) {
        this.orderId = id
      }
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  background-color: "#ffffff";
}
.sort_button_box {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    border-top: 1px solid #f3f3f3 ;
  }
.sort_button {
    width: 25%;
    height: 40px;
  }
.sort_button_text {
	  display: block;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #454545;
  }
.itemSelectedColor {
    border-bottom: 2px solid #06c1ae;  
    color: #06c1ae;
    box-sizing: border-box;
}
</style>