<template>
  <ul class="order_list_container">
	  <li class="order_list" v-for="(item,index) in listData" :key="index">
	    <div class="order_list_top">
	      <div class="order_list_business_name">
	        <image src="../../../static/images/order_list_business_name_tb.png" class="order_list_business_name_tb"/>
	        <p>深圳天络科技有限公司</p>    	
	      </div>
	      <!-- <div class="order_list_order_state">{{item.order_state}}</div> -->
	    </div>
	
	    <div class="order_list_center">
	      <image :src="item.product_pic" class="order_list_goods_img"/>
	      <div class="order_list_goods_name">
	        <span class="order_list_goods_name_text">{{item.product_name}}</span>
	      </div>
	    </div>
	
	    <div class="order_list_bottom">
	      <button class="order_list_button">
	        <span class="order_list_button_text">{{order_status[item.status]}}</span>
	      </button>
	      <div class="order_list_goods_price">¥ {{item.product_price}}</div>
	    </div>
	  </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      listData: [],
      order_status: {
        0: '待付款',
        1: '待发货',
        2: '已发货',
        3: '已完成',
        4: '已关闭',
        5: '无效订单'
      }
    }
  },
  methods: {
    getMessage () {
      let paramsAll = null
      console.log(9999, this.orderId)
      paramsAll = {
        pageNum: 1,
        pageSize: 20,
        member_id: 1
      }
      if (this.orderId !== 0) {
        paramsAll.order_status = this.orderId
      }
      this.$axios.get('/order/item/list', {
        params: paramsAll
      }).then(res => {
        console.log(res)
        this.listData = res.data.data.list
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getMessage()
  },
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  watch: {
    orderId () {
      this.getMessage()
    }
  }
}
</script>
<style>
.order_list_container {
  background-color: #f3f3f3;
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
}
.contentContainer {
  flex: 1;
}
.order_list {
  width: 100%;
  padding: 5px 10px;
  background-color: #ffffff;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.order_list:last-child{
	margin-bottom: 0;
}
.order_list_top {
  width: 100%;
  height: 35px;
  display: flex;
}
.order_list_business_name_tb {
	position: absolute;
	left: 0;
	top: 10.7px;
  width: 14px;
  height: 14px;
  margin-right: 10px;
}
.order_list_business_name {
	flex: 1;
  height: 35px;
  line-height: 35px;
  color: #333;
  font-size: 14px;
  padding-left: 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.order_list_order_state {
  display: inline-block;
  padding: 0 10px;
  box-sizing: border-box;
  height: 35px;
  line-height: 35px;
  color: #c4454e;
  font-size: 14px;
}
.order_list_center {
  width: 100%;
  height: 60px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
}
.order_list_goods_img {
  width: 60px;
  height: 60px;
  border-radius: 3px;
}
.order_list_goods_name {
	display: flex;
  flex:1;
  height: 60px;
  flex-wrap: wrap;
  align-items: center;
}
.order_list_goods_name_text {
	display: inline-block;
  line-height: 25px;
  color: #454545;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-left: 10px;
}
.order_list_bottom {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content:space-between
}
.order_list_goods_price {
  display: inline-block;
  padding: 0 10px;
  box-sizing: border-box;
  height: 35px;
  line-height: 35px;
  color: #06c1ae;
  font-size: 14px;
}
.order_list_button {
  display: flex;
  padding: 0 15px;
  box-sizing: border-box;
  height: 25px;
  border-radius: 12.5px;
  border: 1px solid #c3646b;
  background-color: #ffffff;
  margin: 5px 0;
  align-items: center;
}
.order_list_button_text {
	display: inline-block;
  width: 100%;
  height: 23px;
  line-height: 23px;
  font-size: 12px;
  color: #c3646b;
}
</style>