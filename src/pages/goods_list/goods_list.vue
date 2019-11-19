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
            <div class="goods_list_name_box">
              <span class="goods_list_name">{{item.name}}</span>
            </div>
            <div class="goods_list_price_box">
              <span class="goods_list_price">¥ {{item.price}} <span class="goods_list_old_price">¥{{item.original_price}}</span></span>
              <div class="goods_list_stock">销量: {{item.sale}}</div>
            </div>
            <span class="goods_list_describe">{{item.description}}</span>
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
    width: 75%;
    height: 30px;
    line-height: 20px;
    padding-left: 35px;
    padding-right: 10px;
    font-size: 12px;
    background-color: #f0f2f5;
    border-radius: 5px;
    color: #666666;
    margin-top: 2.5px;
}
.search_box {
    height: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 3%;
    padding-right: 60px;
    position: relative;
    background-color: #ffffff
}
.search_box_tb {
    position: absolute;
    top: 7.5px;
    left: 7.5px;
    width: 20px;
    height: 20px;
    z-index: 1
}
.search_button {
    position: absolute;
    top: 0;
    right: 15px;
    height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    background-color: #fff;
    text-align: center;
    line-height: 30px;
  }
.search_button_text {
    width: 100%;
    height: 35px;
    text-align: center;
    font-size: 14px;
    color: #06c1ae;
    padding-left: 0px;
    padding-right: 0px;
  }
.sort_button_box {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    border-bottom: 10px solid #f3f3f3
  }
.sort_button {
    width: 25%;
    height: 40px;
    justify-content: center
  }
.sort_button_text {
    position: relative;
    left: 50%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #454545;
    margin-left: -20px;
  }
.itemSelectedColor {
    border-bottom: 2px solid #06c1ae;  
    color: #06c1ae
}
.goods_list {
    width: 100%;
    padding: 10px;
    position: relative;
    border-bottom: 1px solid #f1f1f1;
    background-color: #ffffff
  }
.goods_list_img_box {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 110px;
    height: 110px;
    border-radius: 5px;
    overflow: hidden
  }
.goods_list_img {
    width: 110px;
    height: 110px;
  }
.goods_list_details {
    width: 100%;
    height: 110px;
    padding-left: 120px;
}
.goods_list_name_box {
    width: 100%;
    height: 50px;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row
  }
.goods_list_name {
    height: 50px;
    width: 100%;
    line-height: 25px;
    font-size: 14px;
    color: #454545
  }
.goods_list_price_box {
    width: 100%;
    height: 40px;
}
.goods_list_price {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #06c1ae
}
.goods_list_old_price {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: #ababab;
    text-decoration: line-through
  }
.goods_list_stock {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: #888888
  }
.goods_list_describe {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #999999
  }
.goods_list_tb {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px
}
</style>