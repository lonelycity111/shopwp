<template>
  <div class="container">
    <!-- 头部信息 -->
    <div class="personal_header" v-if="isLogin">
      <div class="personal_portrait_img_box">
        <image class="personal_portrait_img" :src="portrait" />
      </div>
      <div style="width:100%;padding-left:74px;padding-right:80px">
        <span class="personal_portrait_name">{{name}}</span>
        <div class="personal_portrait_tel_box">
          <span>{{tel}}</span>
        </div>
      </div>
      <button class="switch_button">
        <image class="switch_button_img" src="../../static/images/switch_button_img.png" />
        <span class="switch_button_text">切换账号</span>
      </button>
    </div>
    <div class="personal_Top" v-else>
      <span class="personal_Login2">注册</span>
      <span class="personal_Login2">丨</span>
      <span class="personal_Login2">登录</span>
    </div>
    <!-- 订单菜单 -->
    <div class="menu_list_box">
      <div class="menu_list" @click="handleToOrder(1, 0)">
        <image class="menu_list_img" src="../../static/images/daifukuan.png" />
        <span class="menu_list_text">待付款</span>
      </div>
      <div class="menu_list" @click="handleToOrder(2, 2)">
        <image class="menu_list_img" src="../../static/images/daishouhuo.png" />
        <span class="menu_list_text">待收货</span>
      </div>
      <div class="menu_list" @click="handleToafterSale">
        <image class="menu_list_img" src="../../static/images/shouhoutuikuan.png" />
        <span class="menu_list_text">售后/退款</span>
      </div>
      <div class="menu_list" @click="handleToOrder(0)">
        <image class="menu_list_img" src="../../static/images/quanbudingdan.png" />
        <span class="menu_list_text">全部订单</span>
      </div>
    </div>
    <!-- 收货菜单 -->
    <div class="menu_next_list_box">
      <div class="menu_next_list">
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
export default {
  data () {
    return {
      name: '张三',
      portrait: 'https://facebook.github.io/react/logo-og.png',
      tel: '18888888888',
      isLogin: true,
      listData: []
    }
  },
  mounted () {
    this.$axios.get('/recommend/list?pageNum=1&pageSize=20')
      .then(res => {
        console.log(res)
        this.listData = res.data.data.list
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
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
          console.log('来拉a', orderid)
          url = '/pages/personal/order/main?index=' + index + '&orderid=' + orderid
        }
      } else {
        url = '/pages/personal/order/main'
      }
      mpvue.navigateTo({url})
    },
    handleToafterSale () {
      console.log('去售后')
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
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 25px;
  padding-bottom: 25px;
  flex-direction: row;
  border-bottom: 10px solid #f6f6f6;
}
.personal_Top {
  width: 100%;
  height: auto;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 25px;
  padding-bottom: 25px;
  flex-direction: row;
  border-bottom: 10px solid #f6f6f6;
  justify-content: center;
}
.personal_portrait_img_box {
  position: absolute;
  left: 10px;
  top: 25px;
  z-index: 1;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.personal_portrait_img {
  width: 64px;
  height: 64px;
  border-radius: 32px;
}
.personal_portrait_name {
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 18px;
  color: #545454;
  margin-bottom: 8px;
}
.personal_Login {
  color: #545454;
  margin-top: 16px;
  margin-right: 10px;
  margin-left: 30px;
}
.personal_portrait_tel_box {
  width: 95px;
  height: 20px;
  background: #f3f3f3 url('../../../static/images/phone.png') no-repeat 4px;
  background-size: contain;
  padding-left: 22px;
  padding-right: 10px;
  border-radius: 20px;
}
.personal_portrait_tel {
  width: auto;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  color: #666666;
}
.switch_button {
  position: absolute;
  right: 10px;
  top: 45px;
  width: 100px;
  height: 30px;
  background-color: #06c1ae;
  text-align: center;
  line-height: 30px
}
.switch_button_text {
  font-size: 14px;
  color: #fff;
}
.switch_button_img {
  width: 12px;
  height: 12px;
  /* padding-left: 0; */
  margin-left: -10px;
  margin-right: 5px;
}
.menu_list_box {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 10px solid #f6f6f6;
}
.menu_list {
  width: 25%;
  height: 80px;
  text-align: center
}
.menu_list_img {
  width: 35px;
  height: 35px;
  display: inline-block;
}
.menu_list_text {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: #666666;
}
.menu_next_list_box {
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 5px;
  flex-direction: row;
  border-bottom: 1px solid #f6f6f6;
}
.menu_next_list {
  width: 25%;
  height: 80px;
  text-align: center
}
.menu_next_list_img_box {
  position: relative;
  width: 45px;
  height: 45px;
  left: 50%;
  border-radius: 45px;
  background-color: #a6a6eb;
  margin-left: -22.5px;
  justify-content: center;
  align-items: center;
}
.menu_next_list_img {
  width: 26px;
  height: 26px;
}
.menu_next_list_text {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: #666666;
}
.tuijian_box {
  width: 100%;
  background-color: #f3f3f3;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 15px;
  padding-bottom: 15px;
  box-sizing: border-box;
}
.tuijian_title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  color: #666666;
  font-weight: bold;
  margin-bottom: 15px;
}
.tuijian_list_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
}
.tuijian_list {
  width: 49%;
  height: 250px;
  background-color: #ffffff;
  margin-bottom: 2%;
}
.tuijian_list_img_box {
  width: 100%;
  height: 170px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.tuijian_list_img {
  width: 100%;
  height: 170px;
}
.tuijian_list_price {
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 5px;
  flex-direction: row;
}
.tuijian_list_price_1 {
  width: auto;
  height: 30px;
  line-height: 30px;
  color: #06c1ae;
  font-weight: bold;
  margin-right: 5px;
  font-size: 18px;
}
.tuijian_list_price_2 {
  width: auto;
  height: 30px;
  line-height: 36px;
  color: #ababab;
  font-size: 10px;
  text-decoration: "line-through";
}
.tuijian_list_name {
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  line-height: 15px;
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