<template>
  <div class="container">
    <ul>
      <li class="order_list" v-for="(item,index) in listData" :key="index">
        <div class="order_list_top">
          <div class="order_list_business_name">
            <image src="../../../static/images/order_list_business_name_tb.png" class="order_list_business_name_tb"/>深圳天络科技有限公司
          </div>
          <div class="order_list_order_state">{{item.order_state}}</div>
        </div>

        <div class="order_list_center">
          <image :src="item.album_pics" class="order_list_goods_img"/>
          <div class="order_list_goods_name">
            <span class="order_list_goods_name_text">{{item.name}}</span>
          </div>
        </div>

        <div class="order_list_bottom">
          <button class="order_list_button">
            <span class="order_list_button_text">{{order_status[item.status]}}</span>
          </button>
          <div class="order_list_goods_price">¥ {{item.total_amount}}</div>
        </div>
      </li>
    </ul>
  </div>
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
  mounted () {
    let paramsAll = {
      pageNum: 1,
      pageSize: 20,
      member_id: 1
    }
    if (this.orderId) {
      paramsAll.order_status = this.orderId
    }
    this.$axios.get('http://192.168.168.137:3001/mock/31/order/item/list', {
      params: paramsAll
    }).then(res => {
      console.log(res)
      this.listData = res.data.data.list
    }).catch(err => {
      console.log(err)
    })
  },
  props: {
    orderId: {
      type: Number,
      required: true
    }
  },
  watch: {
    orderId () {
      console.log(this.orderId)
    }
  }
}
</script>
<style>
.container {
  background-color: #f3f3f3;
  padding-top: 10px;
}
.contentContainer {
  flex: 1;
}
.order_list {
  width: 100%;
  height: 170px;
  padding: 5px 10px;
  background-color: #ffffff;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.order_list_top {
  width: 100%;
  height: 45px;
  position: relative;
  display: flex;
}
.order_list_business_name_tb {
  width: 15px;
  height: 15px;
  margin-top: 15px;
  margin-right: 10px;
}
.order_list_business_name {
  height: 45px;
  line-height: 45px;
  color: #333;
  font-size: 16px;
  overflow: hidden;
  flex:1
}
.order_list_order_state {
  width: 70px;
  height: 45px;
  line-height: 45px;
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
  flex:1;
  height: 60px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.order_list_goods_name_text {
  line-height: 25px;
  color: #666;
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
  height: 45px;
  display: flex;
  justify-content:space-between
}
.order_list_goods_price {
  width: 70px;
  height: 45px;
  line-height: 45px;
  color: #06c1ae;
  font-size: 14px;
  /* flex: 1 */
}
.order_list_button {
  width: 80px;
  height: 25px;
  border-radius: 25px;
  line-height: 25px;
  border: 1px solid #c3646b;
  background-color: #ffffff;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 10px 0 0;
  text-align: center;
}
.order_list_button_text {
  width: 100%;
  height: 25px;
  font-size: 12px;
  color: #c3646b;
  padding-left: 0;
  padding-right: 0;
}
</style>