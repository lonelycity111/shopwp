<template>
  <ul class="handle_list">
    <li v-for="(item,index) in listData" :key="index">
      <p class="handle_list_title">
        <span>服务单号： {{item.order_sn}}</span>
        <font>退货申请</font>
      </p>
      <div class="handle_goods_top">
        <image :src="item.product_pic"/>
        <p>{{item.product_name}}</p>
      </div>
      <div class="handle_goods_center">
        <span>数量： {{item.product_quantity}}</span>
        <font>¥ {{item.product_price}}</font>
      </div>
      <div class="handle_goods_bottom" @click="ScheduleQuery()">
        <span>退货中</span>
        <p>不合适</p>
        <image src="../../../static/images/order_list_bottom_tb.png"/>
      </div>
      <div class="handle_cancel_btn_box">
        <span class="handle_cancel_btn">取消申请</span>
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
        order_status: 3
      }
    }).then(res => {
      this.listData = res.data.data.list
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style>
.handle_list{
  width: 100%;
  height: auto;
  padding-top: 41px;
  background: #f3f3f3;
  padding-bottom: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
.handle_list>li{
  width: 100%;
  height: auto;
  background: #FFFFFF;
  margin-top: 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
.handle_list_title{
  width: 100%;
  height: 45px;
}
.handle_list_title span{
  height: 45px;
  line-height: 45px;
  color: #06C1AE;
  font-size: 14px;
  float: left;
}
.handle_list_title font{
  height: 45px;
  line-height: 45px;
  color: #c4454e;
  font-size: 14px;
  float: right;
}
.handle_goods_top{
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.handle_goods_top>image{
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.handle_goods_top>p{
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
.handle_goods_center{
  width: 100%;
  height: 45px;
  overflow: hidden;
}
.handle_goods_center>span{
  height: 45px;
  color: #787878;
  font-size: 14px;
  line-height: 45px;
  float: left;
}
.handle_goods_center>font{
  height: 45px;
  color: #06c1ae;
  font-size: 14px;
  line-height: 45px;
  float: right;
}
.handle_goods_bottom{
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  box-sizing: border-box;
  align-items: center;
  background: #f3f3f3;
  border-radius: 5px;
}
.handle_goods_bottom>span{
  display: inline-block;
  height: 18px;
  font-size: 14px;
  color: #C4454E;
  line-height: 16px;
  padding: 0 10px;
  box-sizing: border-box;
}
.handle_goods_bottom>p{
  display: inline-block;
  flex: 1;
  height: 18px;
  font-size: 14px;
  color: #bbb;
  line-height: 18px;
  padding-right: 7px;
  box-sizing: border-box;
}
.handle_goods_bottom>image{
  width: 18px;
  height: 18px;
  margin:0 3px;
}
.handle_cancel_btn_box{
  width: 100%;
  height: 45px;
  overflow: hidden;
  border-top: 1px solid #f3f3f3;
}
.handle_cancel_btn{
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