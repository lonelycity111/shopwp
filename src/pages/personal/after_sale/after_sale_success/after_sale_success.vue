<template>
  <div class="container">
    <div class="success_box">
      <image src="../../../../static/images/apply_tu.png"/>
      <p>售后服务单提交成功</p>
      <button @click="ScheduleQuery()">进度查询</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    ScheduleQuery () {
      let url = '/pages/personal/after_sale/after_sale_progress/main'
      mpvue.navigateTo({url})
    }
  }
}
</script>
<style>
.container{
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
}
.success_box{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
}
.success_box image{
  display: block;
  width: 40vw;
  height: 40vw;
}
.success_box p{
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 18px;
  color: #454545;
  font-weight: bold;
}
.success_box button{
  width: 35%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #676767;
  background: #FFFFFF;
  border: 1px solid #cdcdcd;
  border-radius: 20px;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20vh;
}
.success_box button::after{
  border-style: none;
}

</style>