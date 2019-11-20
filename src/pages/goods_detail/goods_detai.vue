<template>
  <div class="container">
    <div class="goods_img_list_box">
      <swiper class="swiper_list"
        indicator-dots="true"
        indicator-color="rgba(0,0,0,.2)"
        indicator-active-color="#06c1ae"
      >
        <swiper-item v-for="(item,index) in goods_img_list" :key="index" >
          <div class="goods_img_list">
            <image class="goods_img" :src="item" />
          </div>
        </swiper-item>
      </swiper>
      <!-- <span class="goods_img_list_number">{{goods_img_number}}/{{goods_img_list.length}}</span> -->
    </div>
    
    <div class="bottom_box">
      <div class="goods_name">{{goods_name}}</div>
      <div class="goods_service">{{goods_sub_title}}</div>
      <div class="goods_price_box">
        <div class="goods_price" v-if="promotion_status">
          <span class="goods_new_price">¥ {{goods_new_price}}</span>
          <span class="goods_old_price">¥ {{goods_price}}</span>
        </div>
        <span class="goods_price" v-else>{{goods_price}}</span>
        <div class="goods_stock">库存: {{goods_stock}}件</div>
      </div>
      <div class="goods_service">{{goods_service}}</div>
    </div>
    
	  <div class="goods_specs_button" @click="()=>{if(this.goods_stock_list.length > 0){this.setModalVisible(true)}}">
	    <div class="goods_specs_button_text1">规格</div>
	    <div class="goods_specs_button_text2">{{Specif}}</div>
	    <image class="goods_specs_button_img" src="../../static/images/more.png"/>
	  </div>
    
    
    <div class="goods_details_box">
      <div style="min-height:200px; text-align: center;line-height: 200px;" v-html="goods_detail"></div>
    </div>
    
    
    <div class="purchase_button_box">
      <div class="shopping_cart_button">
        <image class="shopping_cart_button_img" src="../../static/images/shopping_cart_tb.png" />
        <span class="shopping_cart_button_text">购物车</span>
      </div>
      <div class="bottom_button_box">
      	<button class="purchase_button" @click="handleSetGoods">加入购物车</button>
      	<button class="purchase_button2" @click="handleToSettlement">立 即 购 买</button>
      </div>
    </div>
    
    <div v-show="modalVisible" class="modal">
    	<p class="modal_top" @click="()=>{this.setModalVisible(false)}"></p>
    	
    	<div class="specs_box">
    		<div class="close_modal_img_box" @click="()=>{this.setModalVisible(false)}">
    			<image class="close_modal_img" src="../../static/images/close_tb.png"/>
    		</div>
    		
    		<div class="specs_box_top">
    			<div class="specs_goods_img_box">
    				<image class="specs_goods_img" :src="goods_specs_top_img"/>
    			</div>
    			<div class="specs_goods_detiils_box">
    				<p class="specs_goods_detiils_price">¥ {{model_price}}</p>
    				<p class="specs_goods_detiils_id">货号：{{goods_id}}</p>
    			</div>
    		</div>
    		
    		<p class="specs_goods_title">选择产品规格</p>
				
				<ul class="specs_list_box">
					<li v-for="(item,index) in goods_stock_list" :key="index" @click="SpecsOnclick(item,index)" :class="[{'specs_list_dq': item == itemSelected} , 'specs_list']">{{item}}</li>
				</ul>
    		
    		<div class="goods_num_box">
    			<p class="goods_num_title">购买数量：</p>
    			<div class="goods_btn_box">
    				<button class="goods_num_btn" @click="onButtonPress_jia"><image class="goods_num_btn_img" src="../../static/images/jia.png" /></button>
    				<input type="number" v-model="shop_num" class="goods_num_input"/>
    				<button class="goods_num_btn"  @click="onButtonPress_jian"><image class="goods_num_btn_img" src="../../static/images/jian.png"/></button>
    			</div>
    		</div>
    		
    		<button class="tj_button" @click="setSpecifications(false)">确认</button>
    	</div>
    </div>
  </div>
  
</template>
<script>
export default {
  data () {
    return {
      modalVisible: false,
      goods_img_number: 1,
      goods_img_list: [],
      goods_name: '',
      promotion_status: true,
      goods_price: 298,
      goods_new_price: 4653,
      goods_stock: 651334,
      goods_id: 'jd5654575',
      goods_service: '7天无理由退货，货到付款，免邮费，一年保修，下单立减50元',
      address_list_all: [
        '广东省深圳市福田区车公庙地铁站世纪豪庭大厦21楼21C',
        '广东省深圳市福田区车公庙地铁站世纪豪庭大厦21楼22C',
        '广东省深圳市福田区车公庙地铁站世纪豪庭大厦21楼23C',
        '广东省深圳市福田区车公庙地铁站世纪豪庭大厦21楼24C'
      ],
      address_dq: '选择收货地址',
      itemSelected: '',
      model_price: 0,
      Specif: '请选择产品规格',
      address: '',
      goods_specs_top_img: '',
      goods_specs: [],
      goods_stock_list: [],
      goods_detail: '',
      goods_sub_title: '',
      product_sn: 'jd5654575',
      shop_num: 1
    }
  },
  mounted () {
    const id = this.$root.$mp.query.id
    this.$axios
      .get(`/product/` + id)
      .then(res => {
        let tempArr = []
        tempArr.push(res.data.data.pic)
        if (res.data.data.album_pics !== '') {
          let newArr = res.data.data.album_pics.split(',')
          newArr.map(item => {
            if (item.indexOf('/upload') !== -1) {
              item = 'http://www.szeciss.com:3021' + item
            }
            tempArr.push(item)
          })
          tempArr = tempArr.filter((item) => {
            return item !== ''
          })
        }
        let stockList = JSON.parse(JSON.stringify(res.data.data.sku_stock_list))
        let tempStock = []
        stockList.map((item) => {
          delete item.price
          delete item.sale
          delete item.stock
          delete item.sku_code
          let tempStr = ''
          for (let key in item) {
            tempStr += item[key]
          }
          tempStock.push(tempStr)
        })
        this.goods_img_list = tempArr
        this.goods_name = res.data.data.name
        this.goods_new_price = res.data.data.price
        this.goods_price = res.data.data.original_price
        this.goods_detail = res.data.data.detail_mobile_html
        this.goods_stock = res.data.data.stock
        this.goods_sub_title = res.data.data.sub_title
        this.goods_specs = res.data.data.sku_stock_list
        this.goods_stock_list = tempStock
        this.Specif = tempStock[0]
        this.goods_id = id
        this.goods_img_one = tempArr[0]
      }).catch((err) => {
        console.log(err)
      })
  },
  methods: {
    setModalVisible (visible) {
      this.modalVisible = visible
      this.model_price = this.goods_specs[0].price
      this.goods_specs_top_img = this.goods_img_list[0]
      this.product_sn = this.goods_specs[0].sku_code
      this.itemSelected = this.goods_stock_list[0]
    },
    SpecsOnclick (item, index) {
      this.itemSelected = item
      this.model_price = this.goods_specs[index].price
      this.product_sn = this.goods_specs[index].sku_code
    },
    setSpecifications (visible) {
      this.Specif = this.itemSelected
      this.modalVisible = visible
      this.goods_new_price = this.model_price
    },
    handleSetGoods () {
      let shoppingCart = {}
      shoppingCart.goods_img_one = this.goods_img_list[0]
      shoppingCart.goods_name = this.goods_name
      shoppingCart.goods_price = this.goods_price
      shoppingCart.shop_num = 1
      shoppingCart.goods_id = this.goods_id
      shoppingCart.isChecked = true
      if (mpvue.getStorageSync('ShoppingCatList')) {
		let tempArr = mpvue.getStorageSync('ShoppingCatList')
        let isGoods = mpvue.getStorageSync('ShoppingCatList').some(item => {
          if (shoppingCart.goods_id === item.goods_id) {
            item.shop_num = item.shop_num + 1
            console.log(mpvue.getStorageSync('ShoppingCatList'))
            mpvue.setStorageSync('ShoppingCatList', mpvue.getStorageSync('ShoppingCatList'))
          }
          return shoppingCart.goods_id === item.goods_id
        })
        console.log(isGoods)
        if (isGoods === false) {
          mpvue.setStorageSync('ShoppingCatList', mpvue.getStorageSync('ShoppingCatList').concat([shoppingCart]))
        }
      } else {
        mpvue.setStorageSync('ShoppingCatList', [shoppingCart])
      }
    },
    onButtonPress_jian () {
      if (this.shop_num > 1) {
        this.shop_num = this.shop_num - 1
      } else {
        this.shop_num = 1
      }
    },
    onButtonPress_jia () {
      if (this.shop_num < this.goods_stock) {
        this.shop_num = this.shop_num + 1
      } else {
        this.shop_num = this.goods_stock
      }
    }
  }
}
</script>
<style>
.container {
    width: 100%;
    background-color: #f3f3f3;
    padding-bottom: 45px;
    box-sizing: border-box;
}
.swiper_list{
		height: 70vw;
    width:100vw;
}
.goods_img_list_box {
    height: calc(70vw + 20px);
    width:100vw;
    background-color: #ffffff;
    position: relative;
    padding: 10px 0;
    box-sizing: border-box;
    border-top: 1px solid #f3f3f3;
}
.goods_img_list {
    height: 70vw;
    width: 100vw;
    display: flex;
    justify-content: center;
}
.goods_img {
    height: calc(70vw - 15px);
    width: calc(70vw - 15px);
    margin-bottom: 15px;
}
.goods_img_list_number {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 50px;
    height: 25px;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    color: #333;
    line-height: 25px;
    overflow: hidden
}
.goods_name {
    width: 100%;
    line-height: 25px;
    font-size: 16px;
    color: #454545;
    font-weight: bold;
}
.goods_price_box {
    width: 100%;
    margin: 5px 0;
}
.goods_price {
		display: flex;
		flex-direction: row;
		height: 30px;
}
.goods_new_price {
		display: inline-block;
		height: 30px;
		line-height: 30px;
    font-size: 20px;
    color: #06c1ae;
}
.goods_old_price {
		display: inline-block;
		height: 30px;
    line-height: 35.5px;
    font-size: 12px;
    color: #ababab;
    text-decoration: line-through;
    margin-left: 3px;
}
.goods_stock {
    width: 100%;
    line-height: 30px;
    font-size: 12px;
    color: #787878;
    background-color: #fff;
}
.goods_service {
    width: 100%;
    line-height: 20px;
    font-size: 12px;
    color: #ababab;
    margin-top: 5px;
  }
.goods_specs_button{
	display: flex;
	flex-direction: row;
	width: 100%;
	padding: 0 10px;
	margin: 10px 0;
	box-sizing: border-box;
	background: #FFFFFF;
	align-items: center;
}
.goods_specs_button_text1{
	display: inline-block;
	width: 40px;
	line-height: 45px;
	font-size: 14px;
	color: #333333;
	font-weight: bold;
}
.goods_specs_button_text2{
	display: inline-block;
	flex: 1;
	line-height: 25px;
	margin: 10px 0;
	font-size: 12px;
	color: #787878;
	word-break:break-all;
}
.goods_specs_button_img{
	display: inline-block;
	width: 20px;
	height: 20px;
	margin-left: 10px;
}
.goods_details_box{
	width: 100%;
	margin-bottom: 10px;
	background: #FFFFFF;
}


.bottom_box{
	margin-top: 10px;
	overflow: auto;
	background: #FFFFFF;
	padding: 15px 10px;
	box-sizing: border-box;
}



.purchase_button_box{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 45px;
	display: flex;
	flex-direction: row;
	padding: 0 10px;
	box-sizing: border-box;
	align-items: center;
	background: #FFFFFF;
	border-top: 1px solid #F3F3F3;
	align-items: center;
}
.shopping_cart_button{
	width: 35px;
	height: 35px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.shopping_cart_button_img{
	display: inline-block;
	width: 18px;
	height: 18px;
	margin-top: 3.5px;
}
.shopping_cart_button_text{
	display: inline-block;
	padding: 0 5px;
	height: 15px;
	line-height: 15px;
	font-size: 9px;
	color: #454545;
	text-align: center;
}
.bottom_button_box{
	flex: 1;
	height: 45px;
	text-align: right;
	padding-top: 7.5px;
	box-sizing: border-box;
}
.purchase_button{
	display: inline-block;
	padding: 0 10px;
	box-sizing: border-box;
	font-size: 12px;
	height: 30px;
	border-radius: 3px;
	background: #559ffe;
	line-height: 30px;
	color: #FFFFFF;
}
.purchase_button::after{
	border: none;
}
.purchase_button2{
	display: inline-block;
	padding: 0 10px;
	box-sizing: border-box;
	font-size: 12px;
	line-height: 30px;
	height: 30px;
	border-radius: 3px;
	background: #06c1ae;
	color: #FFFFFF;
	margin-left: 10px;
}
.purchase_button2::after{
	border: none;
}

.modal{
	display: flex;
	flex-direction: column;
	background: rgba(0,0,0,.3);
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	transition: all 0.5s;
}
.modal_top{
	flex: 1;
	width: 100%;
}
.specs_box{
	position: relative;
	background: #FFFFFF;
	width: 100%;
	height: auto;
	max-height: 80vh;
	padding: 10px;
	box-sizing: border-box;
	border-top-left-radius: 10px ;
	border-top-right-radius: 10px ;
	overflow-y: auto;
}
.specs_box_top{
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100px;
	padding: 10px 0;
	box-sizing: border-box;
}
.specs_goods_img_box{
	width: 80px;
	height: 80px;
	margin-right: 10px;
}
.specs_goods_img{
	width: 80px;
	height: 80px;
}
.specs_goods_detiils_box{
	flex: 1;
	height: 80px;
}
.specs_goods_detiils_price{
	line-height: 50px;
	height: 40px;
	font-size: 22px;
	color: #f40800;
}
.specs_goods_detiils_id{
	line-height: 30px;
	height: 30px;
	font-size: 14px;
	color: #787878;
}
.close_modal_img_box{
	position: absolute;
	right: 10px;
	top: 10px;
	height: 20px;
	width: 20px;
	border-radius: 10px;
	background: #f3f3f3;
	overflow: hidden;
}
.close_modal_img{
	height: 20px;
	width: 20px;
	border-radius: 10px;
}
.specs_goods_title{
	width: 100%;
	line-height: 40px;
	height: 40px;
	color: #565656;
	font-weight: bold;
	font-size: 14px;
}
.specs_list_box{
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.specs_list{
	display: inline-block;
	padding: 0 10px;
	background: #f2f2f2;
	line-height: 25px;
	margin: 5px 0;
	color: #454545;
	border-radius: 5px;
	font-size: 12px;
	margin-right: 10px;
	border: 1px solid #f2f2f2;
}
.specs_list_dq{
	background: #fcedeb !important;
	color: #f23030 !important;
	border: 1px solid #f23030 !important;
}
.goods_num_box{
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 35px;
	margin: 20px 0;
	margin-top: 35px;
}
.goods_num_title{
	display: inline-block;
	height: 35px;
	line-height: 35px;
	font-size: 14px;
	color: #454545;
}
.goods_btn_box{
	flex: 1;
	height: 35px;
	padding: 5px 0;
	box-sizing: border-box;
}
.goods_num_btn{
	width: 25px;
	height: 25px;
	background: #FFFFFF;
	border-style: none;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	float: right;
}
.goods_num_btn::after{
	border-style: none;
}
.goods_num_btn_img{
	display: block;
	width: 20px;
	height: 20px;
}
.goods_num_input{
	display: inline-block;
	padding: 0 10px;
	box-sizing: border-box;
	height: 25px;
	line-height: 25px;
	background: #f3f3f3;
	width: 100px;
	text-align: center;
	font-size: 14px;
	color: #787878;
	float: right;
	margin: 0 10px;
}
.tj_button{
	width: 100%;
	height: 45px;
	border-radius: 5px;
	background: #06C1AE;
	text-align: center;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 45px;
	margin: 20px 0;
	padding: 0;
}
.tj_button::after{
	border-style: none;
}

.wx-swiper-dots.wx-swiper-dots-horizontal{
  margin-bottom: -10px;
}

</style>