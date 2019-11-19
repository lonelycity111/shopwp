<template>
  <div class="classifyContainer">
    <classList @getChildValue='getChildValue'></classList>
    <div class="rightContantSyle">
      <ul class="columnWrapperStyle">
        <li v-for="(item,index) in listData" :key="index" class="class_list_box" @click="handleToGooodsList(item)">
            <image :src='BaseImg+item.icon' class="class_list_img" />
            <div class="class_list_text">{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import classList from './classList'
export default {
  components: {
    classList
  },

  data () {
    return {
      BaseImg: 'http://www.szeciss.com:3021/',
      listData: [],
      id: 1
    }
  },
  mounted () {
    this.$axios.get(`/productCategory/list/${this.id}?pageNum=1&pageSize=20`)
      .then(res => {
        console.log(res)
        this.listData = res.data.data.list
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    getChildValue (value) {
      if (this.id !== value) {
        this.id = value
        this.$axios.get(`/productCategory/list/${value}?pageNum=1&pageSize=20`)
          .then(res => {
            console.log(res)
            this.listData = res.data.data.list
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    handleToGooodsList (item) {
      let url = `/pages/goods_list/main?product_category_id=${item.id}&title=${item.name}`
      mpvue.navigateTo({url})
    }
  }
}
</script>

<style>
.classifyContainer{
    width: 100%;
    display: flex
}
.rightContantSyle{
   flex:1;
   padding-left: 3%;
	 padding-right: 3%;
	 padding-bottom: 15px
}
.columnWrapperStyle{
  display: flex;
  flex-wrap: wrap;
}  
.class_list_box {
		width: 28%;
		height: auto;
    margin-top: 10px;
    margin-left:4.2%;
		justify-content:center;
		align-items: center
}
.class_list_img{
  width: 100%;
  height: 100px;
}
.class_list_text {
		width: 100%;
		color: #444;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
		margin-top: 5px;
		margin-bottom: 5px;
}
</style>
