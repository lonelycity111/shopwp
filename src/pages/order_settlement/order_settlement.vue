<template>
  <div class="container">
    <div class="address_box" @click='AddressModel()'>
      <image src='../../static/images/address_tb1.png'/>
      <div class="address_details_box">
        <p>
          <span>{{address_list[address_index].name}}</span>
          <font>{{address_list[address_index].tel}}</font>
        </p>
        <p>{{address_list[address_index].address}}</p>
      </div>
      <image src='../../static/images/address_tb2.png'/>
    </div>
    
    <div class="goods_list_box">
      <div class="goods_option" v-for='(item,index) in goods_list' :key='index'>
        <image :src="item.goods_img"/>
        <div class="goods_option_details">
          <p>{{item.goods_name}}</p>
          <p>
            <span>¥ {{item.goods_price}}</span>
            <font>数量： {{item.goods_num}}</font>
          </p>
        </div>
      </div>
    </div>
    
    <div class="settlement_details">
      <p><span>商品总价：</span><font>¥ {{goods_AllPrice}}</font></p>
      <p><span>快递费：</span><font>¥ {{express_fee}}</font></p>
      <p><span>优惠：</span><font>¥ - {{discount_price}}</font></p>
      <p><span>应支付：</span><font>¥ {{goods_AllPrice + express_fee - discount_price}}</font></p>
    </div>
  
    <button class="payment_button">支付 {{goods_AllPrice + express_fee - discount_price}} 元</button>
    
    
    <div class="address_model" v-if='address_model'>
      <p class="address_model_top" @click='AddressModel()'></p>
      <ul class="address_model_bottom">
        <li v-for='(item,index) in address_list' :key='index' @click='ChoiceAddress(index)'>
          <p>
            <span>{{item.name}}</span>
            <font>{{item.tel}}</font>
          </p>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      address_model: false,
      address_index: 0,
      address_list: [
        {
          name: '蒙娜丽莎',
          tel: 15851431313,
          address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地'
        },
        {
          name: '江户川柯南',
          tel: 15851431313,
          address: '地址地址地址地址地址'
        },
        {
          name: '蒙奇D路飞',
          tel: 15851431313,
          address: '地址地址地址地址地址地址地址地址地址地址地址'
        }
      ],
      goods_list: [
        {
          goods_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573725646362&di=ebb96e3936813fec9edeed24746c2ff9&imgtype=0&src=http%3A%2F%2Fimg006.hc360.cn%2Fhb%2Fg5a4be363e77ad492C628F51beeF047b29.jpg',
          goods_name: '产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名',
          goods_price: 2899,
          goods_num: 1
        },
        {
          goods_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573725646362&di=ebb96e3936813fec9edeed24746c2ff9&imgtype=0&src=http%3A%2F%2Fimg006.hc360.cn%2Fhb%2Fg5a4be363e77ad492C628F51beeF047b29.jpg',
          goods_name: '产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名',
          goods_price: 2899,
          goods_num: 1
        },
        {
          goods_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573725646362&di=ebb96e3936813fec9edeed24746c2ff9&imgtype=0&src=http%3A%2F%2Fimg006.hc360.cn%2Fhb%2Fg5a4be363e77ad492C628F51beeF047b29.jpg',
          goods_name: '产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名',
          goods_price: 2899,
          goods_num: 1
        }
      ],
      goods_AllPrice: 2999, // 商品总价
      express_fee: 20, // 快递费
      discount_price: 0 // 优惠价格
    }
  },
  methods: {
    AddressModel () {
      this.address_model = !this.address_model
    },
    ChoiceAddress (index) {
      this.address_model = false
      this.address_index = index
    }
  }
}
</script>
<style>

.container{
  width: 100%;
  height: auto;
  background: #ffffff;
  box-sizing: border-box;
}
.address_box{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.address_box>image{
  width: 18px;
  height: 18px;
}
.address_details_box{
  flex: 1;
  height: auto;
  margin: 0 10px;
}
.address_details_box>p:nth-child(1){
  width: 100%;
  height: 35px;
}
.address_details_box>p:nth-child(1) span{
  line-height: 35px;
  float: left;
  color: #454545;
  font-size: 16px;
}
.address_details_box>p:nth-child(1) font{
  line-height: 35px;
  float: right;
  color: #454545;
  font-size: 14px;
}
.address_details_box>p:nth-child(2){
  width: 100%;
  line-height: 20px;
  color: #787878;
  font-size: 14px;
}
.goods_list_box{
  width: 100%;
  height: auto;
  padding: 5px 0;
  border-bottom: 10px solid #f3f3f3;
  border-top: 10px solid #f3f3f3;
}
.goods_option{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding: 5px 10px;
  border-bottom: 1px solid #f3f3f3;
  box-sizing: border-box; 
}
.goods_option:last-child{
  border: none;
}
.goods_option image{
  display: block;
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.goods_option_details{
  flex: 1;
  height: 60px;
}
.goods_option_details p:nth-child(1){
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  color: #454545;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient:vertical;
}
.goods_option_details p:nth-child(2){
  width: 100%;
  height: 25px;
  line-height: 25px;
}
.goods_option_details p:nth-child(2) span{
  float: left;
  height: 25px;
  line-height: 25px;
  color: #dc433c;
  font-size: 14px;
}
.goods_option_details p:nth-child(2) font{
  float: right;
  height: 25px;
  line-height: 25px;
  color: #787878;
  font-size: 14px;
}
.settlement_details{
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
}
.settlement_details p{
  width: 100%;
  height: 45px;
}
.settlement_details p span{
  float: left;
  height: 45px;
  line-height: 45px;
  color: #454545;
  font-size: 16px;
}
.settlement_details p font{
  float: right;
  height: 45px;
  line-height: 45px;
  color: #ff3030;
  font-size: 16px;
}
.settlement_details p:last-child span{
  font-size: 22px;
}
.settlement_details p:last-child font{
  font-size: 26px;
}

.payment_button{
  width: calc(100% - 20px);
  height: 40px;
  font-size: 16px;
  text-align: center;
  border-radius: 5px;
  color: #FFFFFF;
  margin: 40px 10px;
  background: #dc433c;
}

.address_model{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.3);
}
.address_model_top{
  width: 100%;
  flex: 1;
}
.address_model_bottom{
  width: 100%;
  height: auto;
  max-height: 80vh;
  overflow-y: auto;
  background: #FFFFFF;
  padding: 15px;
  box-sizing: border-box;  
}
.address_model_bottom li{
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid #f3f3f3;
}
.address_model_bottom li:last-child{
  border-bottom: none;
}
.address_model_bottom li p:first-child{
  height: 20px;
  width: 100%;
}
.address_model_bottom li p:first-child span{
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #06C1AE;
  float: left;
  margin-right: 10px;
}
.address_model_bottom li p:first-child font{
  height: 20px;
  line-height: 23px;
  font-size: 12px;
  color: #787878;
  float: left;
}
.address_model_bottom li p:last-child{
  line-height: 20px;
  color: #454545;
  font-size: 12px;
}
</style>