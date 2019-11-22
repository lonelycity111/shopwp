<template>
  <div class="container">
    <div class="messages_top_box">
      <div class="goods_messages_top">
        <image :src="goods_img"/>
        <div>
          <p>{{goods_name}}</p>
          <p>
            <span><i>单价： </i>{{goods_price}}</span>
            <font><i>数量： </i>{{goods_num}}</font>
          </p>
        </div>
      </div>
      <div class="goods_messages_bottom">
        <span>申请数量：</span>
        <div class="goods_btn_box">
          <button class="goods_num_btn"><image class="goods_num_btn_img" src="../../../static/images/jia.png" /></button>
          <input type="number" :value="goods_num" class="goods_num_input" disabled="disabled"/>
          <button class="goods_num_btn"><image class="goods_num_btn_img" src="../../../static/images/jian.png" /></button>
        </div>
      </div>
    </div>
  
    <div class="messages_center_box">
      <div class="messages_center_title">
        <span @click="bindinput">退货原因</span>
        <picker @change="bindPickerChange" :value="reason_index" :range="reason_array" mode='selector'>
          <div class="reason_picker">{{reason_array[reason_index]}}</div>
        </picker>
      </div>
      
      <div class="messages_textarea_box">
        <textarea 
          class="reason_textarea" 
          placeholder="请输入退货原因..." 
          placeholder-style="color:#bbb"
          maxlength="200" 
          @input="descInput" 
          v-model="desc" 
        />
        <span>{{textarea_lenth}} / 200</span>
      </div>
    </div>
    
    <div class="messages_bottom_box">
      <p class="messages_bottom_title" @click="address_btn(true)">取件地址</p>
      <div class="address_detils_box" v-if="address_details">
        <p>
          <span>{{address_arr[address_index].name}}</span> 丨 <font>{{address_arr[address_index].tel}} </font>
        </p>
        <p>{{address_arr[address_index].address}}</p>
      </div>
    </div>
    
    <button class="submit_button" @click="SuccessfulApplication">提交申请</button>
    
    <div class="address_model" v-if="address_model">
      <div class="address_model_top" @click="address_btn(false)"></div>
      <div class="address_model_bottom">
        <div v-for="(item,index) in address_arr" :key="index" @click="select_address(index)">
          <span>{{item.name}}</span>
          <font>丨</font>
          <p>{{item.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reason_array: ['质量问题', '商品误送', '我不喜欢', '其他问题'],
      reason_index: 0,
      goods_img: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg',
      goods_name: '小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
      goods_num: 1,
      textarea_lenth: 200, // 输入框最大长度
      goods_price: 3699,
      address_arr: [
        {
          name: '江户川柯南',
          tel: '13825526845',
          address: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址'
        },
        {
          name: '蒙娜丽莎',
          tel: '13825526845',
          address: '地址地址地址地址地址'
        }
      ],
      address_model: false, // 地址弹窗
      address_index: 0, // 选择地址下标
      address_details: false // 地址显示
    }
  },
  methods: {
    bindPickerChange: function (e) {
      this.reason_index = e.mp.detail.value
    },
    address_btn (state) {
      this.address_model = state
    },
    select_address (index) {
      this.address_model = false
      this.address_index = index
      this.address_details = true
    },
    descInput () {
      var txtVal = this.desc.length
      this.textarea_lenth = 200 - txtVal
    },
    SuccessfulApplication () {
      let url = '/pages/personal/after_sale/after_sale_success/main'
      mpvue.navigateTo({url})
    }
  }
}
</script>
<style>
page{
  background: #f3f3f3;
}
.container{
  width: 100%;
  height: auto;
  overflow-y: auto;
  background: #f3f3f3;
}
.messages_top_box{
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
  background: #FFFFFF;
}
.goods_messages{
  width: 100%;
  height: auto;
}
.goods_messages_top{
  display: flex;
  width: 100%;
  height: 80px;
  flex-direction: row;
}
.goods_messages_top>image{
  width: 80px;
  height: 80px;
}
.goods_messages_top>div{
  flex: 1;
  height: 80px;
  margin-left: 10px;
}
.goods_messages_top>div>p:nth-child(1){
  width: 100%;
  line-height: 25px;
  height: 50px;
  color: #787878;
  font-size: 14px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.goods_messages_top>div>p:nth-child(2){
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.goods_messages_top>div>p:nth-child(2) span{
  line-height: 30px;
  color: #06C1AE;
  font-size: 14px;
  float: left;
  margin-right: 10%;
}
.goods_messages_top>div>p:nth-child(2) span>i{
  font-style: normal;
  color: #787878 !important;
  display: inline-block;
}
.goods_messages_top>div>p:nth-child(2) font{
  line-height: 30px;
  color: #06C1AE;
  font-size: 14px;
  float: left;
}
.goods_messages_top>div>p:nth-child(2) font>i{
  font-style: normal;
  color: #787878 !important;
  display: inline-block;
}
.goods_messages_bottom{
  width: 100%;
  height: 35px;
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
}
.goods_messages_bottom span{
  display: inline-block;
  line-height: 35px;
  height: 35px;
  font-size: 14px;
  color: #454545;
}
.goods_btn_box{
  flex: 1;
  height: 35px;
  padding: 5px 0;
  box-sizing: border-box;
}
.goods_num_btn{
  width: 25px;
  height: 25px;
  background: #FFFFFF;
  border-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
}
.goods_num_btn::after{
  border-style: none;
}
.goods_num_btn_img{
  display: block;
  width: 20px;
  height: 20px;
}
.goods_num_input{
  padding: 0 10px;
  box-sizing: border-box;
  height: 25px;
  line-height: 25px;
  background: #f3f3f3;
  width: 100px;
  text-align: center;
  font-size: 14px;
  color: #787878;
  float: right;
  margin: 0 10px;
}
.messages_center_box{
  width: calc(100% - 20px);
  height: auto;
  background: #FFFFFF;
  border-radius: 10px;
  margin: 10px;
  overflow: hidden;
}
.messages_center_title{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 5px;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;
}
.messages_center_title span{
  display: inline-block;
  height: 50px;
  font-size: 16px;
  color: #06c1ae;
  line-height: 50px;
}
.messages_center_title picker{
  flex: 1;
  height: 50px;
}
.reason_picker{
  width: 100%;
  height: 50px;
  font-size: 14px;
  color: #787878;
  line-height: 50px;
  background: url('../../../../../static/images/down_tb.png') no-repeat right center;
  background-size: 30px 30px;
  padding-right: 30px;
  box-sizing: border-box;
  text-align: right;
}
.messages_textarea_box{
  position: relative;
  width: calc(100% - 30px);
  height: 110px;
  margin: 10px 15px;
}
.reason_textarea{
  width: 100%;
  height: 110px;
  background: #f3f3f3;
  border-radius: 15px;
  color: #454545;
  font-size: 14px;
  padding: 15px;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.messages_textarea_box span{
  position: absolute;
  bottom: 7.5px;
  right: 10px;
  display: inline-block;
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  color: #454545;
}
.messages_bottom_box{
  width: 100%;
  height: auto;
  box-sizing: border-box;
  background: #FFFFFF;
}
.messages_bottom_title{
  width: calc(100% - 20px);
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  color: #06C1AE;
  border-bottom: 1px solid #f3f3f3;
  box-sizing: border-box;
  background: url('../../../../../static/images/more.png') no-repeat center right;
  background-size: 20px 20px;
  margin: 0 10px;
}
.address_detils_box{
  width: 100%;
  height: auto;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.address_detils_box>p:nth-child(1){
  width: 100%;
  height: 25px;
  line-height: 25px;
  color: #999;
  font-size: 14px;
}
.address_detils_box>p:nth-child(1) span{
  height: 25px;
  line-height: 35px;
  font-size: 14px;
  color: #06c1ae;
}
.address_detils_box>p:nth-child(1) font{
  height: 25px;
  line-height: 35px;
  font-size: 14px;
  color: #787878;
}
.address_detils_box>p:nth-child(2){
  line-height: 21px;
  margin: 10px 0;
  font-size: 14px;
  color: #787878;
}
.address_model{
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.3);
}
.address_model_top{
  flex: 1;
  width: 100%;
}
.address_model_bottom{
  width: 100%;
  height: auto;
  background: #FFFFFF;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px 0;
  box-sizing: border-box;
}
.address_model_bottom>div{
  width: 100%;
  height: auto;
  border-bottom: 1px solid #f3f3f3;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.address_model_bottom>div:last-child{
  border: none;
}
.address_model_bottom>div>span{
  width: 80px;
  line-height: 35px;
  font-size: 14px;
  color: #06c1ae;
  text-align: center;
}
.address_model_bottom>div>font{
  line-height: 35px;
  font-size: 14px;
  color: #676767;
  padding: 0 10px;
  box-sizing: border-box;
}
.address_model_bottom>div>p{
  flex: 1;
  line-height: 20px;
  font-size: 14px;
  color: #454545;
  margin: 7.5px 0;
}
.submit_button{
  width: calc(100% - 20px);
  height: 45px;
  border-radius: 5px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  color: #FFFFFF;
  background: #06C1AE;
  margin: 15px 10px;
}
.submit_button::after{
  border-style: none;
}
</style>