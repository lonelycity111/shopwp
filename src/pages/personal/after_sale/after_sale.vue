<template>
  <div class="container">
    <div class="sort_button_box">
      <div class="sort_button" @click="chooseTab(0)">
        <span class="sort_button_text" :class="itemSelected==0?'itemSelectedColor':''">售后申请</span>
      </div>
      <div class="sort_button" @click="chooseTab(1)">
        <span class="sort_button_text" :class="itemSelected==1?'itemSelectedColor':''">处理中</span>
      </div>
      <div class="sort_button" @click="chooseTab(2)">
        <span class="sort_button_text" :class="itemSelected==2?'itemSelectedColor':''">申请记录</span>
      </div>
    </div>
    <Apply v-if="itemSelected == 0"></Apply>
    <Progress v-if="itemSelected == 1"></Progress>
    <Record v-if="itemSelected == 2"></Record>
  </div>
</template>
<script>
import Apply from './apply'
import Progress from './progress'
import Record from './record'
export default {
  data () {
    return {
      itemSelected: 0,
      goods_list: []
    }
  },
  components: {
    Apply,
    Progress,
    Record
  },
  methods: {
    chooseTab (value) {
      if (value !== this.itemSelected) {
        this.itemSelected = value
      }
    }
  }
}
</script>
<style scoped>
page {
    background-color: #f3f3f3;
}
.container {
  width: 100%;
  background-color: "#f3f3f3";
}
.sort_button_box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    border-top: 1px solid #f3f3f3 ;
    z-index: 100;
  }
.sort_button {
    flex: 1;
    height: 40px;
  }
.sort_button_text {
    display: block;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #454545;
  }
.itemSelectedColor {
    border-bottom: 2px solid #06c1ae;  
    color: #06c1ae;
    box-sizing: border-box;
}
</style>