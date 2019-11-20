<template>
  <div class="container">
    
    <div class="shopping_cart_list">
      <div class="goods_option" v-for="(goods,index) in ShoppingCatList" :key="index">
        
        <div class="goods_option_check_box">
          <input class="goods_option_check" type="checkbox" checked="checked" />
        </div>
        
        <div class="goods_option_details">
          <image class="goods_option_details_img" :src="goods.goods_img_one"/>
          
          <div class="goods_option_details_box">
            <p class="goods_option_details_name">{{goods.goods_name}}</p>
            
            <div class="goods_option_details_price">
              <p class="goods_option_price"><span>单价：</span><font>¥ {{goods.goods_price}}</font></p>
              
              <div class="goods_option_num">
                <button class="goods_option_num_btn"><image class="goods_option_num_btn_img" src="../../static/images/jia.png" /></button>
                <input class="goods_option_num_input" type="number" v-model="goods.shop_num" disabled="disabled"/>
                <button class="goods_option_num_btn"><image class="goods_option_num_btn_img" src="../../static/images/jian.png" /></button>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
      
      <div class="shopping_cart_empty" v-show="ShoppingCatList.length ==0">
        <image class="shopping_cart_empty_img" src="../../static/images/shopping_cart.png" />
        <p class="shopping_cart_empty_text"> 购物车是空的，快点去选购吧！</p>
      </div>
    </div>  
    
    <div class="bottom_box" v-show="ShoppingCatList.length > 0 ">
      <div class="all_button_box">
        <input class="all_button" type="checkbox" checked="checked"/>
        <p class="all_button_text">全选</p>
      </div>
      
      <div class="settlement_box">
        <button class="settlement_box_settlement_btn">去结算</button>
        <button class="settlement_box_del_btn">删 除</button>
        <p class="settlement_box_price"><span>合计: </span><font>¥ {{All_price}}</font></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      All_price: 0,
      ShoppingCatList: []
    }
  },
  onShow () {
    if (mpvue.getStorageSync('ShoppingCatList')) {
      this.ShoppingCatList = mpvue.getStorageSync('ShoppingCatList')
    }
  },
  mounted () {
    console.log('频繁触发')
  }
}
</script>
<style>

.container{
  width: 100vw;
  height: calc(100vh - 47px);
  background: #ffffff;
  box-sizing: border-box;
}
.shopping_cart_list{
  width: 100%;
  height: calc(100vh - 47px);
  overflow-y: auto;
}
.shopping_cart_empty{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100vh - 47px);
}
.shopping_cart_empty_img{
  width: 40vw;
  height: 40vw;
}
.shopping_cart_empty_text{
  width: 100vw;
  height: 35px;
  margin-top: 15px;
  line-height: 35px;
  font-size: 14px;
  text-align: center;
  color: #454545;
  margin-bottom: 50px;
}
.goods_option{
  width: 100%;
  height: 90px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #f3f3f3;
}
.goods_option_check_box{
  width: 20px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}


/*checkbox 整体大小  */
.goods_option_check .wx-checkbox-input {
  width: 14px;
  height: 14px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border-color: #999;
}
/*checkbox选中后样式  */
.goods_option_check .wx-checkbox-input.wx-checkbox-input-checked {
  background: #06C1AE;
  border: 1px solid #06C1AE;
}
/*checkbox选中后图标样式  */
.goods_option_check .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background: transparent;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
  padding: 0;
  margin: 0;
}




.goods_option_details{
  flex: 1;
  height: 70px;
  display: flex;
  flex-direction: row;
}
.goods_option_details_img{
  width: 70px;
  height: 70px;
  margin-right: 10px;
  margin-left: 10px;
}
.goods_option_details_box{
  flex: 1;
  height: 70px;
}
.goods_option_details_name{
  height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #454545;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.goods_option_details_price{
  display: flex;
  flex-direction: row;
  height: 30px;
}
.goods_option_price{
  flex: 1;
  height: 30px;
  overflow: hidden;
}
.goods_option_price span{
  height: 30px;
  font-size: 12px;
  line-height: 32px;
  color: #787878;
  float: left;
}
.goods_option_price font{
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  color: #ff3030;
  float: left;
}
.goods_option_num{
  flex: 1;
  height: 20px;
  margin-top: 5px;
}
.goods_option_num_btn{
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
}
.goods_option_num_btn::after{
  border-style: none;
  padding: 0;
  margin: 0;
}
.goods_option_num_btn_img{
  width: 18px;
  height: 18px;
}
.goods_option_num_input{
  width: 60px;
  height: 20px;
  box-sizing: border-box;
  background: #f3f3f3;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #676767;
  margin: 0 5px;
  float: right;
  outline: none;
  border: none;
  list-style: none;
  min-height: 20px;
  overflow: hidden;
}
.bottom_box{
  width: 100%;
  height: 47px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  box-sizing: border-box;
  background: #FFFFFF;
  border-top: 1px solid #f3f3f3;
}
.all_button_box{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 45px;
  flex-wrap: wrap;
}

/*checkbox 整体大小  */
.all_button{
  margin-top: 3px;
}
.all_button .wx-checkbox-input {
  width: 12px;
  height: 12px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border-color: #999;
}
/*checkbox选中后样式  */
.all_button .wx-checkbox-input.wx-checkbox-input-checked {
  background: #06C1AE;
  border: 1px solid #06C1AE;
}
/*checkbox选中后图标样式  */
.all_button .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: 12px;
  height: 12px;
  line-height: 12px;
  text-align: center;
  font-size: 10px;
  color: #fff;
  background: transparent;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
  padding: 0;
  margin: 0;
}
.all_button_text{
  display: inline-block;
  width: 100%;
  height: 20px;
  text-align: center;
  font-size: 12px;
  color: #787878;
  line-height: 20px;
}
.settlement_box{
  flex: 1;
  height: 45px;
}
.settlement_box_settlement_btn{
  width: 58px;
  height: 25px;
  background: #ff3030;
  color: #ffffff;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  margin-top: 10px;
  float: right;
  border-radius: 12.5px;
  padding: 0;
}
.settlement_box_del_btn{
  width: 54px;
  height: 25px;
  background: #ffffff;
  color: #787878;
  font-size: 12px;
  line-height: 23px;
  text-align: center;
  margin-top: 10px;
  float: right;
  margin-right: 8px;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  border-radius: 12.5px;
  padding: 0;
}
.settlement_box_del_btn::after{
  border-style: none;
  padding: 0;
  margin: 0;
}
.settlement_box_settlement_btn::after{
  border-style: none;
  padding: 0;
  margin: 0;
}
.settlement_box_price{
  margin-right: 12px;
  height: 25px;
  line-height: 25px;
  width: auto;
  float: right;
  margin-top: 10px;
}
.settlement_box_price span{
  height: 25px;
  color: #787878;
  line-height: 28px;
  font-size: 12px;
  float: left;
}
.settlement_box_price font{
  height: 25px;
  color: #ff3030;
  line-height: 25px;
  font-size: 16px;
  float: left;
  margin-left: 5px;
}

</style>