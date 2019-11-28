<template>
  <div class="container">
    <!-- 头部信息 -->
    <div class="personal_header" v-if="userInfo">
      <div class="personal_image_box">
        <open-data type="userAvatarUrl" ></open-data>
      </div>
        <open-data class="personal_name" type="userNickName" ></open-data>
      <!-- <p class="personal_tel">{{tel}}</p> -->
    </div>
    <div class="personal_header" v-else>
      <div class="personal_image_box">
        <image src='../../static/images/login_tx.png'/>
      </div>
      <button class="personal_login_btn"  open-type="getUserInfo" @getuserinfo="getuserinfo" >点击登录</button>
    </div>
    <!-- 订单菜单 -->
    <div class="menu_list_box">
      <div class="menu_list" @click="handleToOrder(1, 2)">
        <image class="menu_list_img" src="../../static/images/daifukuan.png" />
        <span class="menu_list_text">待付款</span>
      </div>
      <div class="menu_list" @click="handleToOrder(2, 3)">
        <image class="menu_list_img" src="../../static/images/daishouhuo.png" />
        <span class="menu_list_text">待收货</span>
      </div>
      <div class="menu_list" @click="handleToafterSale">
        <image class="menu_list_img" src="../../static/images/shouhoutuikuan.png" />
        <span class="menu_list_text">售后/退款</span>
      </div>
      <div class="menu_list" @click="handleToOrder(0, 0)">
        <image class="menu_list_img" src="../../static/images/quanbudingdan.png" />
        <span class="menu_list_text">全部订单</span>
      </div>
    </div>
    <!-- 收货菜单 -->
    <div class="menu_next_list_box">
      <div class="menu_next_list" @click="handleToAddress()">
        <div class="menu_next_list_img_box">
          <image class="menu_next_list_img" src="../../static/images/shouhuodizhi.png" />
        </div>
        <span class="menu_next_list_text">收货地址</span>
      </div>
    </div>
    <!-- 推荐列表 -->
    <div class="tuijian_box">
      <div class="tuijian_title">-精品推荐-</div>
      <ul class="tuijian_list_box">
        <li class="tuijian_list" v-for="(item,index) in listData" :key="index" @click="handleToGoodsDetail (item.id)">
          <div class="tuijian_list_img_box">
            <image class="tuijian_list_img" :src="item.pic" />
          </div>
          <div class="tuijian_list_price">
            <span class="tuijian_list_price_1">¥{{item.price}}</span>
            <span class="tuijian_list_price_2">¥{{item.original_price}}</span>
          </div>
          <div class="tuijian_list_name">{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import LoginMixins from '../mixins/LoginMixins'
export default {
  mixins: [LoginMixins],
  data () {
    return {
      userInfo: false,
      token: null,
      listData: []
    }
  },
  onShow () {
    if (wx.getStorageSync('userInfo') !== '') {
      this.userInfo = true
    }
    if (wx.getStorageSync('token')) {
      this.token = wx.getStorageSync('token')
    }
  },
  mounted () {
    this.$axios.get('/recommend/list', {
      params: {
        pageNum: 1,
        pageSize: 6
      }
    })
      .then(res => {
        this.listData = res.data.data.list
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    async getuserinfo (e) {
      await this.wxLogin(e)
      if (wx.getStorageSync('userInfo') !== '') {
        this.userInfo = true
      }
    },
    handleToGoodsDetail (id) {
      let url = '/pages/goods_detail/main?id=' + id
      mpvue.navigateTo({url})
    },
    handleToOrder (index, orderid) {
      let url
      if (index !== undefined) {
        if (orderid === undefined) {
          console.log('来拉', index)
          url = '/pages/personal/order/main?index=' + index
        } else {
          url = '/pages/personal/order/main?index=' + index + '&orderid=' + orderid
        }
      } else {
        url = '/pages/personal/order/main'
      }
      mpvue.navigateTo({url})
    },
    handleToAddress () {
      let url = '/pages/personal/address/address/main'
      mpvue.navigateTo({url})
    },
    handleToafterSale () {
      let url = '/pages/personal/after_sale/main'
      mpvue.navigateTo({url})
    }
  }
}
</script>
<style>
.container {
  width: 100%;
  background-color: "#ffffff";
}
.personal_header {
  width: 100%;
  height: auto;
  padding: 30px 0;
  box-sizing: border-box;
  background: #06C1AE;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
.personal_image_box{
  width: 25vw;
  height: 25vw;
  border-radius: 12.5vw;
  overflow: hidden;
  background: #FFFFFF;
}
.personal_image_box image {
  width: 25vw;
  height: 25vw;
}
.personal_name{
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin-top: 10px;
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
}
.personal_tel{
  width: 100%;
  height: 25px;
  line-height: 25px;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
}
.personal_login_btn{
  width: 50%;
  height: 45px;
  line-height: 45px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
  background: none;
  border: none;
}
.personal_login_btn::after{
  border: none;
}
.personal_Top {
  width: 100%;
  height: auto;
  padding: 30px 0;
  box-sizing: border-box;
  background: #06C1AE;
}
.personal_portrait_img_box {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
}
.personal_portrait_img {
  width: 64px;
  height: 64px;
  border-radius: 32px;
}
.personal_portrait_name_box {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 10px;
  height: 64px;
  flex-wrap: wrap;
}
.personal_portrait_name {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #545454;
  margin-bottom: 3px;
}
.personal_Login {
  color: #545454;
  margin-top: 16px;
  margin-right: 10px;
  margin-left: 30px;
}
.personal_portrait_tel_box {
  display: inline-block;
  width: auto;
  height: 20px;
  background: #f3f3f3 url('../../../static/images/phone.png') no-repeat;
  background-position: 10px 6px;
  background-size: 10px 10px;
  padding-left: 25px;
  padding-right: 10px;
  border-radius: 10px;
  box-sizing: border-box;
}
.personal_portrait_tel {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 11px;
  color: #666666;
  float: left;
}
.switch_button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 30px;
  background-color: #06c1ae;
  text-align: center;
  line-height: 30px;
  padding: 0 10px;
  box-sizing: border-box;
}
.switch_button_text {
  display: inline-block;
  line-height: 30px;
  text-align: center;
  margin-left: 8px;
  box-sizing: border-box;
  font-size: 12px;
  color: #fff;
}
.switch_button_img {
  width: 14px;
  height: 14px;
}

.menu_list_box {
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 10px solid #f6f6f6;
  border-top: 10px solid #f6f6f6;
}
.menu_list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 25%;
  height: 60px;
  text-align: center
}
.menu_list_img {
  width: 30px;
  height: 30px;
  display: inline-block;
}
.menu_list_text {
  display: block;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: #666666;
}
.menu_next_list_box {
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  padding-top: 10px;
  box-sizing: border-box;
  flex-direction: row;
  border-bottom: 1px solid #f6f6f6;
}
.menu_next_list {
  display: flex;
  width: 25%;
  height: 60px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  flex-wrap: wrap;
}
.menu_next_list_img_box {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  background: #a6a6eb;
}
.menu_next_list_img {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.menu_next_list_text {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: #666666;
}
.tuijian_box {
  width: 100%;
  background-color: #f3f3f3;
  padding-top: 15px;
  box-sizing: border-box;
}
.tuijian_title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  color: #666666;
  font-weight: bold;
  margin-bottom: 15px;
}
.tuijian_list_box {
  display: flex;
  flex-wrap: wrap;
}
.tuijian_list {
  width: 47vw;
  height: auto;
  background-color: #ffffff;
  margin-bottom: 2vw;
  margin-left: 2vw;
}
.tuijian_list_img_box {
  width: 100%;
  height: 47vw;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}
.tuijian_list_img {
  width: 100%;
  height: calc(47vw - 20px);
}
.tuijian_list_price {
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
}
.tuijian_list_price_1 {
	display: inline-block;
  width: auto;
  height: 30px;
  line-height: 30px;
  color: #06c1ae;
  font-weight: 400;
  margin-right: 5px;
  font-size: 18px;
}
.tuijian_list_price_2 {
	display: inline-block;
  width: auto;
  height: 30px;
  line-height: 36px;
  color: #ababab;
  font-size: 10px;
  text-decoration: line-through;
}
.tuijian_list_name {
	display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  height: 35px;
  line-height: 17.5px;
  margin-top: 5px;
  color: #777;
  font-size: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.columnWrapperStyle {
  justify-content: space-between;
}
.personal_Login2 {
  color: #545454;
  width: 60px;
  height: 38px;
  line-height: 38px;
  text-align: center;
}
</style>