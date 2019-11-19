<template>
  <div class="contantStyle">
    <ul>
      <li v-for="(item,index) in classList" :key="index" class="itemTextView" @click="handselect(item)" >
          <span class="itemDefaultColor" :class="itemSelected===item.name?'itemSelectedColor':''">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      classList: [],
      itemSelected: '服装'
    }
  },
  methods: {
    handselect (item) {
      this.itemSelected = item.name
      this.$emit('getChildValue', item.id)
    }
  },
  mounted () {
    this.$axios.get('/productCategory/list/0', {
      params: {
        pageNum: 1,
        pageSize: 20
      }
    })
      .then(res => {
        console.log(res)
        this.classList = res.data.data.list
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style>
.contantStyle {
  width: 90px;
  height:100vh;
  background-color: #f6f6f6;
}
.itemTextView{
  height:61px;
  width: 90px;
  justify-content: center;
  align-items: center
}
.itemDefaultColor{
  width: 90px;
  height: 61px;
  display:block;
  line-height: 61px;
  color: #585c64;
  text-align: center;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ededed
}
.itemSelectedColor {
  width: 90px;
  height: 61px;
  line-height: 61px;
  background-color: #ffffff;
  color: #585c64;
  border-left: 5px solid #06c1ae;
  box-sizing: border-box;
}

</style>