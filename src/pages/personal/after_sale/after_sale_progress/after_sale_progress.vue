<template>
  <div class="container">
    <p class="apply_state">{{apply_state}}</p>
    
    <div class="goods_details_box">
      <p>商品信息</p>
      <div class="goods_details">
        <image :src='goods_details.goods_img'/>
        <div>
          <p>{{goods_details.goods_name}}</p>
          <p>
            <span>单价： {{goods_details.goods_price}}</span>
            <font>数量： {{goods_details.goods_num}}</font>
          </p>
        </div>
      </div>
    </div>
    
    <p class="refund_amount">
      <span>退款总额：</span>
      <font>¥ {{refund_amount}}</font>
    </p>
    
    <div class="apply_details_box">
      <p>服务单信息</p>
      <div class="apply_details">
        <p><span>服务单号：</span><font>{{apply_details.apply_id}}</font></p>
        <p><span>申请时间：</span><font>{{apply_details.apply_data}}</font></p>
        <p><span>退货原因：</span><font>{{apply_details.apply_reason}}</font></p>
        <p><span>联 系 人 ：</span><font>{{apply_details.apply_name}}</font></p>
        <p><span>联系电话：</span><font>{{apply_details.apply_tel}}</font></p>
        <p><span>取件地址：</span><font>{{apply_details.apply_address}}</font></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goods_details: {
        goods_name: '小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
        goods_img: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg',
        goods_price: 2999,
        goods_num: 1
      },
      apply_details: {
        apply_id: 'da456135421',
        apply_data: '2019-10-01 18:00',
        apply_reason: '商品误送',
        apply_name: '高尔基',
        apply_tel: 13845671234,
        apply_address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址'
      },
      apply_state: '审核中',
      refund_amount: 2999
    }
  },
  mounted () {
  }
}
</script>
<style>
.container{
  width: 100%;
  background: #f3f3f3;
  height: auto;
  padding: 10px 0;
  box-sizing: border-box;
}
.apply_state{
  width: 100%;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: bold;
  color: #06C1AE;
  background: #FFFFFF;
  margin-bottom: 10px;
}
.goods_details_box{
  width: 100%;
  height: auto;
  background: #FFFFFF;
  overflow: hidden;
}
.goods_details_box>p{
  width: 100%;
  height: 45px;
  line-height: 44px;
  font-size: 16px;
  color: #454545;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;
}
.goods_details{
  width: 100%;
  height: 85px;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 10px 0;  
}
.goods_details>image{
  width: 75px;
  height: 75px;
}
.goods_details>div{
  flex: 1;
  height: 75px;
  margin-left: 10px;
}
.goods_details>div>p:nth-child(1){
  height: 50px;
  line-height: 25px;
  font-size: 14px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  color: #454545;
}
.goods_details>div>p:nth-child(2){
  height: 25px;
  line-height: 25px;
}
.goods_details>div>p:nth-child(2)>span{
  float: left;
  width: 50%;
  height: 25px;
  line-height: 25px;
  color: #787878;
  font-size: 12px;
}
.goods_details>div>p:nth-child(2)>font{
  float: left;
  width: 50%;
  height: 25px;
  line-height: 25px;
  color: #787878;
  font-size: 12px;
}
.refund_amount{
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background: #FFFFFF;
  box-sizing: border-box;
  margin: 10px 0;
}
.refund_amount span{
  float: left;
  height: 50px;
  line-height: 50px;
  color: #454545;
  font-weight: bold;
  font-size: 16px;
}
.refund_amount font{
  float: right;
  height: 50px;
  line-height: 50px;
  color: #ff3030;
  font-weight: bold;
  font-size: 20px;
}
.apply_details_box{
  width: 100%;
  height: auto;
  background: #ffffff;
  padding: 10px;
  box-sizing: border-box;
}
.apply_details_box>p{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #454545;
  margin-top: 5px;
}
.apply_details p{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
}
.apply_details p span{
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #787878;
  font-size: 14px;
}
.apply_details p font{
  flex: 1;
  line-height: 30px;
  color: #454545;
  font-size: 14px;
}


</style>