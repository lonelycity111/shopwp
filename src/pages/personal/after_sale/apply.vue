<template>
  <ul class="apply_list">
    <li v-for="(item,index) in listData" :key="index">
      <p class="store_title"><image src="../../../static/images/order_list_business_name_tb.png"/><span>深圳天洛科技</span></p>
      <div class="goods_details">
        <div class="goods_details_top">
          <image :src="item.product_pic"/>
          <p>{{item.product_name}}</p>
        </div>
        <p class="goods_details_bottom">
          <span>数量： {{item.product_quantity}}</span>
          <font>¥ {{item.product_price}}</font>
        </p>
      </div>
      <div class="bottom_btn_box">
        <span class="bottom_btn" @click="handleToafterSaleMessage(item)">申请售后</span>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      listData: []
    }
  },
  mounted () {
    let memberId = mpvue.getStorageSync('member_id')
    this.$axios.get('/order/item/list', {
      params: {
        pageNum: 1,
        pageSize: 20,
        member_id: memberId,
        order_status: 2
      }
    }).then(res => {
      this.listData = res.data.data.list
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    handleToafterSaleMessage (item) {
      mpvue.setStorageSync('afterSaleMessage', item)
      let url = '/pages/personal/after_sale/after_sale_message/main'
      mpvue.navigateTo({url})
    }
  }
}
</script>
<style>
.apply_list{
  width: 100%;
  height: auto;
  padding-top: 41px;
  background: #f3f3f3;
  padding-bottom: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
.apply_list>li{
  width: 100%;
  height: auto;
  background: #FFFFFF;
  margin-top: 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
.store_title{
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.store_title>image{
  width: 15px;
  height: 15px;
}
.store_title>span{
  display: inline-block;
  flex: 1;
  height: 45px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 16px;
  color: #454545;
  line-height: 45px;
  margin-left: 5px;
}
.goods_details{
  width: 100%;
  height: 80px;
}
.goods_details_top{
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.goods_details_top>image{
  display: block;
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.goods_details_top>p{
  line-height: 25px;
  font-size: 14px;
  margin-bottom: 3px;
  color: #787878;
  flex: 1;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.goods_details_bottom{
  width: 100%;
  height: 35px;
}
.goods_details_bottom>span{
  height: 35px;
  color: #787878;
  font-size: 14px;
  line-height: 35px;
  float: left;
}
.goods_details_bottom>font{
  height: 35px;
  color: #06c1ae;
  font-size: 14px;
  line-height: 35px;
  float: right;
}
.bottom_btn_box{
  width: 100%;
  height: 45px;
  overflow: hidden;
  border-top: 1px solid #f3f3f3;
}
.bottom_btn{
  width: 80px;
  height: 25px;
  float: right;
  border-radius: 12.5px;
  text-align: center;
  border: 1px solid #c3646b;
  font-size: 12px;
  margin-top: 10px;
  line-height: 25px;
  color: #c3646b;
  background: #ffffff;
}
</style>