<template>
  <div class="container">
    <div class="search_box">
      <image src="../../static/images/search_tb.png" class="search_box_tb" />
      <input type="text" placeholder="请输入搜索内容" class="search_input" />
      <button class="search_button">
        <span class="search_button_text">搜索</span>
      </button>
    </div>
    <div class="sort_button_box">
      <div class="sort_button" @click="chooseTab('综合')">
        <span class="sort_button_text" :class="itemSelected==='综合'?'itemSelectedColor':''">综合</span>
      </div>
      <div class="sort_button" @click="chooseTab('销量')">
        <span class="sort_button_text" :class="itemSelected==='销量'?'itemSelectedColor':''">销量</span>
      </div>
      <div class="sort_button" @click="chooseTab('价格')">
        <span class="sort_button_text" :class="itemSelected==='价格'?'itemSelectedColor':''">价格</span>
      </div>
      <div class="sort_button" @click="chooseTab('时间')">
        <span class="sort_button_text" :class="itemSelected==='时间'?'itemSelectedColor':''">时间</span>
      </div>
    </div>
    <ul>
      <li v-for="(item,index) in goods_list" :key="index" @click="handleToGoodsDetail(item.id)" class="goods_list">
          <div class="goods_list_img_box">
            <image class="goods_list_img" :src='item.pic'/>
          </div>
          <div class="goods_list_details">
            <div class="goods_list_name">{{item.name}}</div>
            <div class="goods_list_price_box">
              <span class="goods_list_price">¥ {{item.price}} <span class="goods_list_old_price">¥{{item.original_price}}</span></span>
              <div class="goods_list_stock">销量: {{item.sale}}</div>
            </div>
            <div class="goods_list_describe">{{item.description}}</div>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemSelected: '综合',
      goods_list: []
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: this.$root.$mp.query.title
    })
    this.requestList()
  },
  methods: {
    requestList (sort) {
      let productCategoryId = this.$root.$mp.query.product_category_id
      let parameter = {
        product_category_id: productCategoryId,
        pageNum: 1,
        pageSize: 20
      }
      if (sort) {
        parameter.sort = sort
        parameter.sort_direction = 'DESC'
      }
      this.$axios.get('/product/list', {
        params: parameter
      }).then(res => {
        console.log(111, res)
        this.goods_list = res.data.data.list
      }).catch((err) => {
        console.log(err)
      })
    },
    chooseTab (value) {
      let sort
      if (value !== this.itemSelected) {
        this.itemSelected = value
      }
      switch (value) {
        case '综合':
          sort = ''
          break
        case '销量':
          sort = 'sale'
          break
        case '价格':
          sort = 'price'
          break
        case '时间':
          sort = 'last_modified_time'
          break
        default:
          break
      }
      this.requestList(sort)
    },
    handleToGoodsDetail (id) {
      let url = '/pages/goods_detail/main?id=' + id
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
.search_input {
    flex: 1;
    height: 30px;
    line-height: 30px;
    padding-left: 30px;
    padding-right: 10px;
    font-size: 12px;
    background-color: #f0f2f5;
    border-radius: 5px;
    color: #666666;
    margin-top: 2.5px;
}
.search_box {
		position: relative;
		display: flex;
		flex-direction: row;
    height: 55px;
		padding: 10px;
		box-sizing: border-box;
    background-color: #ffffff
}
.search_box_tb {
		position: absolute;
		left: 15px;
		top: 16px;
    width: 20px;
    height: 20px;
    z-index: 1;
}
.search_button {
	  display: inline-block;
	  padding: 0 10px;
	  box-sizing: border-box;
    height: 30px;
    background-color: #fff;
    text-align: center;
    margin-left: 10px;
    margin-top: 2.5px;
    border-color: #FFFFFF;
    border-style: none;
    outline: none;
  }
  .search_button::after{
  	border: none;
  }
.search_button_text {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #06c1ae;
    float: left;
  }
.sort_button_box {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    border-bottom: 10px solid #f3f3f3
  }
.sort_button {
    flex: 1;
    height: 30px;
    text-align: center;
  }
.sort_button_text {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #454545;
    padding: 0 5px;
    box-sizing: border-box;
  }
.itemSelectedColor {
    border-bottom: 2px solid #06c1ae;  
    color: #06c1ae
}
.goods_list {
	  display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: row;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
    background-color: #ffffff
  }
.goods_list_img_box {
    width: 110px;
    height: 110px;
		margin-right: 10px;
  }
.goods_list_img {
    width: 110px;
    height: 110px;
  } 
.goods_list_details {
    flex: 1;
    height: 110px;
    align-content: center;
}
.goods_list_name {
    height: 40px;
    width: 100%;
    line-height: 20px;
    font-size: 14px;
    color: #454545;
    overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
  }
.goods_list_price_box {
    width: 100%;
    height: 50px;
}
.goods_list_price {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #06c1ae;
}
.goods_list_old_price {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #ababab;
    text-decoration: line-through
  }
.goods_list_stock {
    width: 100%;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #888888
  }
.goods_list_describe {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #999999;
    overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient:vertical;

  }
.goods_list_tb {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px
}
</style>