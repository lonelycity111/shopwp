<template>
  <ul class="apply_list">
    <li v-for="(item,index) in listData" :key="index">
      <p class="store_title"><image src="../../../static/images/order_list_business_name_tb.png"/><span>深圳天洛科技</span></p>
      <div class="goods_details">
        <div class="goods_details_top">
          <image :src="item.goods_img"/>
          <p>{{item.goods_name}}</p>
        </div>
        <p class="goods_details_bottom">
          <span>数量： {{item.goods_num}}</span>
          <font>¥ {{item.goods_allPrice}}</font>
        </p>
      </div>
      <div class="bottom_btn_box">
        <span class="bottom_btn" @click="handleToafterSaleMessage()">申请售后</span>
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
          goods_img: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg',
          goods_name: '小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
          goods_num: 1,
          goods_allPrice: 3699
        },
        {
          goods_img: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg',
          goods_name: '小米9 全面屏游戏智能手机全面屏游戏智能手机全面屏游戏智能手机全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
          goods_num: 2,
          goods_allPrice: 7398
        },
        {
          goods_img: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg',
          goods_name: '小米10 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
          goods_num: 3,
          goods_allPrice: 11097
        },
        {
          goods_img: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg',
          goods_name: '小米10 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
          goods_num: 3,
          goods_allPrice: 11097
        },
        {
          goods_img: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg',
          goods_name: '小米10 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
          goods_num: 3,
          goods_allPrice: 11097
        },
        {
          goods_img: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg',
          goods_name: '小米10 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
          goods_num: 3,
          goods_allPrice: 11097
        }
      ]
    }
  },
  methods: {
    handleToafterSaleMessage () {
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