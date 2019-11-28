<template>
  <div class="container">
    <ul class="edit_address_form">
      <li>
        <span>收件人： </span>
        <input type="text" placeholder="请输入收件人姓名" placeholder-style="color:#ccc;" v-model.lazy="name"/>
      </li>
      <li>
        <span>手机号： </span>
        <input type="text" placeholder="请输入收件人手机号" placeholder-style="color:#ccc;" v-model.lazy="phone_number"/>
      </li>
      <li style="height: auto !important;">
        <span>省/市/区： </span>
        <picker class="auth-pick-tip" mode="region" :value="address" :custom-item="customItem" @change="regionPick">
          <div class="address_title" v-if="!address.length">请选择区域</div>
          <div class="address_details" v-if="address.length">
            {{address[0]}} / {{address[1]}} / {{address[2]}}
          </div>
        </picker>
      </li>
      <li>
        <span>详细地址： </span>
        <input type="text" placeholder="请输入详细地址" placeholder-style="color:#ccc;" v-model.lazy="detail_address"/>
      </li>
      <li>
        <span>默认地址：</span>
        <switch color="#06c1ae" :checked="default_status" @change="handleStateChange"/>
      </li>
    </ul>
    
    <button class="submit_button" @click="handleSubmit">保存</button>
    
    <button class="submit_button2" @click="handleDelete">删 除</button>

  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      phone_number: '',
      detail_address: '',
      address: [],
      customItem: '全部',
      default_status: '',
      address_id: ''
    }
  },
  mounted () {
    let editAddress = wx.getStorageSync('edit_address')
    this.name = editAddress.name
    this.phone_number = editAddress.phone_number
    this.detail_address = editAddress.detail_address
    this.address.push(editAddress.province)
    this.address.push(editAddress.city)
    this.address.push(editAddress.region)
    this.default_status = editAddress.default_status
    this.address_id = editAddress.id
  },
  methods: {
    handleDelete () {
      this.$axios.post('/memberAddress/delete/' + this.address_id).then(res => {
        console.log('删除成功', res)
      }).catch(err => {
        console.log('删除失败', err)
      })
    },
    handleSubmit () {
      this.$axios.post('/memberAddress/update/' + this.address_id, {
        name: this.name,
        member_id: wx.getStorageSync('member_id'),
        phone_number: this.phone_number,
        province: this.address[0],
        city: this.address[1],
        region: this.address[2],
        detail_address: this.detail_address,
        default_status: this.default_status
      }).then(res => {
        console.log('修改成功', res)
      }).catch(err => {
        console.log('保存失败', err)
      })
    },
    handleStateChange (e) {
      if (e.mp.detail.value === true) {
        this.default_status = 1
      } else {
        this.default_status = 0
      }
    },
    regionPick: function (e) {
      this.address = e.mp.detail.value
    }
  }
}
</script>
<style scoped>
.container { 
  width: 100vw;
  height: 100vh;
  background: #f3f3f3;
}
.edit_address_form{
  width: 100%;
}
.edit_address_form>li{
  width: 100%;
  height: 51px;
  background: #FFFFFF;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f3f3f3;
  justify-content: space-between;
  align-items: center;
}
.edit_address_form>li:nth-child(2){
  margin-bottom: 9px;
}
.edit_address_form>li:nth-child(4){
  margin-bottom: 9px;
}
.edit_address_form>li>span{
  width: 90px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #454545;
}
.edit_address_form>li>input{
  flex: 1;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #454545;
}
.edit_address_form>li>picker{
  flex: 1;
  height: 50px;
  display: flex;
  align-items: center;
}
.address_title{
  width: calc(100vw - 110px);
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #ccc;
}
.address_details{
  width: calc(100vw - 110px);
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #454545;
}
.submit_button{
  width: calc(100vw - 20px);
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  color: #FFFFFF;
  border-radius: 5px;
  background: #06C1AE;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  margin-top: 10px;
}
.submit_button::after{
  border-style: none;
}
.submit_button2{
  width: calc(100vw - 20px);
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  color: #454545;
  border-radius: 5px;
  background: #fff;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  margin-top: 10px;
  box-shadow: 0 2px 5px #ccc;
}
.submit_button2::after{
  border-style: none;
}
</style>