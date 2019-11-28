<template>
  <div class='container'>
    <div class="goods_details_box">
      <image :src="goods_details.goods_img"/>
      <div class="goods_details">
        <p>{{goods_details.goods_name}}</p>
        <p>
          <span>单价： ¥ {{goods_details.goods_price}}</span>
          <font>数量： {{goods_details.goods_num}} 件</font>
        </p>
      </div>
    </div>
    
    <div class="logistics_box">
      <div class="logistics_box_top">
        <p>快递公司： {{courier_firm}}</p>
        <p>快递单号： {{express_id}}</p>
      </div>
      
      <ul class="logistics_box_bottom">
        <li v-for='(item,index) in Traces' :key='index' class="logistics_option">
          <p>{{item.AcceptStation}}</p>
          <p>{{item.AcceptTime}}</p>
          <span class="logistics_option_before"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goods_details: {
        goods_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573725646362&di=ebb96e3936813fec9edeed24746c2ff9&imgtype=0&src=http%3A%2F%2Fimg006.hc360.cn%2Fhb%2Fg5a4be363e77ad492C628F51beeF047b29.jpg',
        goods_name: '产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名',
        goods_price: 2899,
        goods_num: 1
      },
      courier_firm: '顺丰快递',
      express_id: '355646413164313',
      Traces: [
        {
          AcceptTime: '2014/06/25 08:05:37',
          AcceptStation: '正在派件..(派件人:邓裕富,电话:18718866310)[深圳 市]',
          Remark: null
        },
        {
          AcceptTime: '2014/06/25 04:01:28',
          AcceptStation: '快件在 深圳集散中心 ,准备送往下一站 深圳 [深圳市]',
          Remark: null
        },
        {
          AcceptTime: '2014/06/25 01:41:06',
          AcceptStation: '快件在 深圳集散中心 [深圳市]',
          Remark: null
        },
        {
          AcceptTime: '2014/06/24 20:18:58',
          AcceptStation: '已收件[深圳市]',
          Remark: null
        },
        {
          AcceptTime: '2014/06/24 20:55:28',
          AcceptStation: '快件在 深圳 ,准备送往下一站 深圳集散中心 [深圳市]',
          Remark: null
        },
        {
          AcceptTime: '2014/06/25 10:23:03',
          AcceptStation: '派件已签收[深圳市]',
          Remark: null
        },
        {
          AcceptTime: '2014/06/25 10:23:03',
          AcceptStation: '签收人是：已签收[深圳市]',
          Remark: null
        }
      ]
    }
  }
}
</script>
<style>
.container {
  width: 100%;
  background-color: #ffffff;
}
.goods_details_box{
  width: 100%;
  height: 110px;
  box-sizing: border-box;
  padding: 15px 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 10px solid #f3f3f3;
}
.goods_details_box>image{
  width: 60px;
  height: 60px;
  margin-top: 5px;
  border-radius: 3px;
  margin-right: 10px;
}
.goods_details{
  flex: 1;
  height: 70px;
}
.goods_details>p:nth-child(1){
  width: 100%;
  height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #454545;
  margin-top: 5px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.goods_details>p:nth-child(2){
  width: 100%;
  height: 25px;
}
.goods_details>p:nth-child(2)>span{
  width: 50%;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  color: #787878;
  float: left;
}
.goods_details>p:nth-child(2)>font{
  width: 50%;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  color: #787878;
  float: left;
}
.logistics_box{
  width: 100%;
  height: auto;
  padding: 10px 0;
  box-sizing: border-box;
}
.logistics_box_top{
  width: 100%;
  padding: 0 15px;
  padding-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;
}
.logistics_box_top p{
  width: 100%;
  line-height: 30px;
  color: #676767;
  font-size: 16px;
}
.logistics_box_bottom{
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
}
.logistics_box_bottom .logistics_option:last-child p:nth-child(1){
  color: #06C1AE;
  font-size: 16px;
}
.logistics_box_bottom .logistics_option:last-child p:nth-child(2){
  color: #06C1AE;
  font-size: 14px;
}
.logistics_box_bottom .logistics_option:last-child .logistics_option_before{
  background: #06C1AE;
}
.logistics_option{
  position: relative;
  width: 100%;
  height: auto;
  border-left: 2px solid #f3f3f3;
  box-sizing: border-box;
  padding: 5px 0;
}
.logistics_option_before{
  display: block;
  position: absolute;
  left: -5px;
  top: 19px;
  width: 8px;
  height: 8px;
  background: #e3e3e3;
  border-radius: 4px;
}
.logistics_option>p:nth-child(1){
  width: 100%;
  line-height: 20px;
  font-size: 14px;
  margin: 7.5px 0;
  padding: 0 15px;
  color: #b9b9b9;
  box-sizing: border-box;
}
.logistics_option>p:nth-child(2){
  width: 100%;
  line-height: 20px;
  font-size: 12px;
  margin: 7.5px 0;
  padding: 0 15px;
  color: #b9b9b9;
  box-sizing: border-box;
}




</style>