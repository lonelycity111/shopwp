<template>
  <div class="container">
    <div class="address_list">
      <div class="address_option" v-for="(address,index) in addressList" :key="index">
        <div class="address_details">
          <p class="address_name">{{address.name}}</p>
          <p class="address_tel"><span>电话： </span><font> {{address.phone_number}}</font></p>
          <p class="address_address"><span>地址： </span><font> {{address.province + address.city + address.region + address.detail_address}}</font></p>
        </div>
        <div class="address_edit_btn" @click="Edit_Address(address)">编 辑</div>
        <span class="default_address" v-show="address.default_status">默认</span>
      </div>
    </div>
    
    <div class="add_address_btn_box">
      <div class="add_address_btn"  @click="Add_Address">
        <image class="add_address_btn_img" src="../../../../static/images/add_img.png"/>
        <p class="add_address_btn_text">添加新地址</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addressList: []
    }
  },
  mounted () {
    console.log(wx.getStorageSync('member_id'))
    let memberId = wx.getStorageSync('member_id')
    this.$axios.get('/memberAddress/list', {
      params: {
        pageNum: 1,
        pageSize: 20,
        member_id: memberId
      }
    }).then(res => {
      console.log(res)
      this.addressList = res.data.data.list
    })
  },
  methods: {
    Add_Address () {
      let url = '/pages/personal/address/add_address/main'
      mpvue.navigateTo({url})
    },
    Edit_Address (address) {
      wx.setStorageSync('edit_address', address)
      let url = '/pages/personal/address/edit_address/main'
      mpvue.navigateTo({url})
    }
  }
}
</script>
<style scoped>
page {
    background-color: #f3f3f3;
}
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #f3f3f3;
}
.address_list{
  padding-top: 10px;
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  overflow-y: auto;
}
.address_option{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 5px 10px;
  background: #FFFFFF;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.address_details{
  flex: 1;
  height: auto;
}
.address_edit_btn{
  width: 50px;
  margin-left: 10px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-size: 12px;
  color: #FFFFFF;
  background: #06C1AE;
  border-radius: 3px;
}
.address_name{
  line-height: 30px;
  color: #333;
  height: 30px;
  font-size: 16px;
}
.address_tel{
  display: flex;
  flex-direction: row;
  color: #787878;
  font-size: 14px;
  margin: 5px 0;
}
.address_tel span{
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #787878;
}
.address_tel font{
  display: inline-block;
  flex: 1;
  line-height: 20px;
  font-size: 14px;
  color: #787878;
}
.address_address{
  display: flex;
  flex-direction: row;
  color: #787878;
  font-size: 14px;
  margin: 5px 0;
}
.address_address span{
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #787878;
}
.address_address font{
  display: inline-block;
  flex: 1;
  line-height: 20px;
  font-size: 14px;
  color: #787878;
}
.default_address{
  position: absolute;
  right: 10px;
  top: 10px;
  width: 40px;
  height: 18px;
  font-size: 10px;
  background: #8396be;
  text-align: center;
  line-height: 20px;
  color: #FFFFFF;
}
.add_address_btn_box{
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  border-top: 1px solid #f3f3f3;
}
.add_address_btn{
  width: 50%;
  height: 40px;
  border-radius: 3px;
  margin-left: 25%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #f3f3f3;
  box-shadow: 0 3px 5px #cdcdcd;
}
.add_address_btn_img{
  width: 12px;
  height: 12px;
  margin-right: 10px;
}
.add_address_btn_text{
  line-height: 30px;
  display: inline-block;
  font-size: 16px;
  color: #787878;
}


</style>