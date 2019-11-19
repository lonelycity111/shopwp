<template>
  <div class="container">
    <ul class="add_address_form">
      <li>
        <span>收件人： </span>
        <input type="text" />
      </li>
      <li>
        <span>手机号： </span>
        <input type="text" />
      </li>
      <li>
        <span>省/市/区： </span>
        <input type="text" />
      </li>
      <li>
        <span>详细地址： </span>
        <input type="text" />
      </li>
      <li>
        <span>默认地址：</span>
        <switch/>
      </li>
    </ul>
    
    <button>添加</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
.add_address_form{
  width: 100%;
}
.add_address_form>li{
  width: 100%;
  height: 36px;
  background: #FFFFFF;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}
.add_address_form>li:nth-child(2){
  margin-bottom: 9px;
}
.add_address_form>li:nth-child(4){
  margin-bottom: 9px;
}
.add_address_form>li>span{
  
}
</style>