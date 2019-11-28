<template>
  <ul class="record_list">
    <li v-for="(item,index) in listData" :key="index">
      <p class="record_list_title">
        <span>服务单号： {{item.service_number}}</span>
        <font>退货申请</font>
      </p>
      <div class="record_goods_top">
        <image :src="item.product_pic"/>
        <p>{{item.product_name}}</p>
      </div>
      <div class="record_goods_center">
        <span>数量： {{item.product_quantity}}</span>
        <font>¥ {{item.product_price}}</font>
      </div>
      <div class="record_goods_bottom" @click="ScheduleQuery()">
        <span>{{item.record_state}}</span>
        <p>{{item.record_tips}}</p>
        <image src="../../../static/images/order_list_bottom_tb.png"/>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      listData: [
        {
          service_number: 'HNTBJ2E042A',
          product_pic: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5ad83a4fN6ff67ecd.jpg!cc_350x449.jpg',
          product_name: '"HLA海澜之家简约动物印花短袖T恤"',
          product_quantity: 1,
          product_price: 98.00,
          order_title: '退货申请',
          record_state: '已完成',
          record_tips: '申请退货已经完成'
        },
        {
          service_number: '6799345',
          product_pic: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5b19403eN9f0b3cb8.jpg',
          product_name: '耐克NIKE 男子 气垫 休闲鞋 AIR MAX 90 ESSENTIAL 运动鞋 AJ1285-101白色41码',
          product_quantity: 1,
          product_price: 499.00,
          order_title: '退货申请',
          record_state: '已被拒绝',
          record_tips: '申请退货被拒绝'
        },
        {
          service_number: '7437789',
          product_pic: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg',
          product_name: '小米 红米5A 全网通版 3GB+32GB 香槟金 移动联通电信4G手机 双卡双待',
          product_quantity: 1,
          product_price: 649.00,
          order_title: '退货申请',
          record_state: '已取消',
          record_tips: '已取消申请退货'
        }
      ]
    }
  },
  methods: {
    ScheduleQuery () {
      let url = '/pages/personal/after_sale/after_sale_progress/main'
      mpvue.navigateTo({url})
    }
  }
}
</script>
<style>
.record_list{
  width: 100%;
  height: auto;
  padding-top: 41px;
  background: #f3f3f3;
  padding-bottom: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
.record_list>li{
  width: 100%;
  height: auto;
  background: #FFFFFF;
  margin-top: 10px;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.record_list_title{
  width: 100%;
  height: 45px;
}
.record_list_title span{
  display: inline-block;
  height: 45px;
  line-height: 45px;
  color: #06C1AE;
  font-size: 14px;
  float: left;
}
.record_list_title font{
  display: inline-block;
  height: 45px;
  line-height: 45px;
  color: #c4454e;
  font-size: 14px;
  float: right;
}
.record_goods_top{
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.record_goods_top>image{
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.record_goods_top>p{
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
.record_goods_center{
  width: 100%;
  height: 45px;
  overflow: hidden;
}
.record_goods_center>span{
  display: inline-block;
  height: 45px;
  color: #787878;
  font-size: 14px;
  line-height: 45px;
  float: left;
}
.record_goods_center>font{
  display: inline-block;
  height: 45px;
  color: #06c1ae;
  font-size: 14px;
  line-height: 45px;
  float: right;
}
.record_goods_bottom{
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 25px 0;
  box-sizing: border-box;
  align-items: center;
  background: #f3f3f3;
  border-radius: 5px;
  margin-bottom: 10px;
}
.record_goods_bottom>span{
  display: inline-block;
  height: 18px;
  font-size: 14px;
  color: #C4454E;
  line-height: 16px;
  padding: 0 10px;
  box-sizing: border-box;
}
.record_goods_bottom>p{
  display: inline-block;
  flex: 1;
  height: 18px;
  font-size: 14px;
  color: #bbb;
  line-height: 18px;
  padding-right: 7px;
  box-sizing: border-box;
}
.record_goods_bottom>image{
  width: 18px;
  height: 18px;
  margin:0 3px;
}

</style>