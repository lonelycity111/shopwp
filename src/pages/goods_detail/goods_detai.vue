<template>
  <div class="container">
    <div class="goods_img_list_box">
      <swiper>
        <swiper-item v-for="(item,index) in goods_img_list" :key="index" >
          <div class="goods_img_list">
            <image class="goods_img" :src="item" />
          </div>
        </swiper-item>
      </swiper>
      <!-- <span class="goods_img_list_number">{{goods_img_number}}/{{goods_img_list.length}}</span> -->
    </div>
    <div style="background-color:#fff">
      <div class="goods_name">{{goods_name}}</div>
      <div class="goods_service">{{goods_sub_title}}</div>
      <div class="goods_price_box">
        <span class="goods_price" v-if="promotion_status">
          ¥ {{goods_new_price}}
          <span class="goods_old_price">¥{{goods_price}}</span>
        </span>
        <span class="goods_price" v-else>{{goods_price}}</span>
        <div class="goods_stock">库存: {{goods_stock}}件</div>
      </div>
      <div class="goods_service">{{goods_service}}</div>
    </div>
    <div class="goods_details_bottom">
      <div class="goods_specs">
          <!-- <modal :hidden='modalVisible'>
              <div class="goods_specs_model_box">
                  <div class="goods_specs_model_top_box" @click="setModalVisible(!modalVisible)"></div>
                  <div class="goods_specs_model">
                      <div class="model_close_tb_box" @click="setModalVisible(!modalVisible)">
                          <image class="model_close_tb" src='../../static/images/close_tb.png'/>
                      </div>
                      <div class="goods_specs_top">
                          <div class="goods_specs_top_img_box">
                            <image class="goods_specs_top_img" :src="goods_specs_top_img"/>
                          </div>
                          <div class="goods_specs_top_price">
                              <span class="goods_specs_top_price_text">¥{{model_price}}</span>
                              <span class="goods_specs_top_goods_id">货号: {{goods_id}}</span>
                          </div>
                      </div>
                      <div>
                          <span class="goods_specs_bottom_title">选择产品规格</span>
                          <ul>
                              <li v-for="(item,index) in goods_stock_list" :key="index" style="align-self:flex-start" @click="SpecsOnclick(item)">
                                  <span class="goods_specs_all_list" :class="itemSelected === item?goods_specs_dq_list:''">{{item}}</span>
                              </li>
                          </ul>
                          <div class="apply_table_top_goods_number_box">
                            <span class="apply_table_top_goods_price_text2">购买数量:</span>
                            <div class="apply_table_top_goods_number_input_box">
                              <button class="apply_table_top_goods_number_jian" @click="onButtonPress_jian">
                                  <image class="apply_table_top_goods_number_jian_img" src='../../static/images/jian.png'/>
                              </button>
                              <input type="text" class="apply_table_top_goods_number_input" >
                              <button class="apply_table_top_goods_number_jia" @click="onButtonPress_jia">
                                <image class="apply_table_top_goods_number_jia_img" src='../../static/images/jia.png'/>
                              </button>
                            </div>
                          </div>
                          <button class="goods_specs_qr_button" @click="setSpecifications(false)">
                              <span class="goods_specs_qr_button_text">确认</span>
                          </button>
                      </div>
                  </div>
              </div>
          </modal> -->
          <div class="goods_specs_button" @click="()=>{if(this.goods_stock_list.length > 0){this.setModalVisible(true)}}">
            <span class="goods_specs_button_text1">规格</span>
            <span class="goods_specs_button_text2">{{Specif}}</span>
            <image class="goods_specs_button_img" src="../../static/images/more.png"/>
          </div>
      </div>
      <!-- 选择地址 -->
      <div class='goods_specs' style="border-top:1px solid #eeeeee;">
        <!-- <Modal>
          <div style={styles.goods_specs_model_box} >
            <div style={styles.goods_specs_model_top_box} @click="setModalVisible_address(!this.state.modalVisible_address)"></div>
                <div style={styles.goods_specs_model}>
                    <div class="model_close_tb_box" @click="setModalVisible_address(!this.state.modalVisible_address)" >
                        <image class="model_close_tb" src='../../static/images/close_tb.png'/>
                    </div>
                    <div>
                      <span  class='goods_specs_bottom_title'>选择收货地址</span>
                      <ul style="margin-top: 10px">
                          <li style='align-self:flex-start' v-for="(item,index) in address_list_all" :key="index" @click="AddressOnclick(item)">
                              <span class="goods_specs_all_list" :class="address_dq==item?goods_specs_dq_list:''">{{item}}</span>
                          </li>
                      </ul>
                      <button class='goods_specs_qr_button' @click="setAdderss(false)">  
                        <span style={styles.goods_specs_qr_button_text}>确认</span>
                      </button>
                </div>
            </div>
          </div>
        </Modal> -->

        <div class='goods_specs_button' @click="setModalVisible_address(true)">
            <span class="goods_specs_button_text1">地址</span>
            <span class="goods_specs_button_text3">{{address}}</span>
            <Image class='goods_specs_button_img' src='../../static/images/more.png' />
        </div>
       </div>
    </div>
    <div class="goods_details_box">
      <div style="min-height:200px; text-align: center;">{{goods_detail}}</div>
    </div>
    <div class="purchase_button_box">
      <div class="goods_bottom_price">
        <span class="goods_bottom_price1">结算</span>
        <span class="goods_bottom_price2">¥ {{goods_new_price}}</span>
      </div>
      <button class="purchase_button" @click="handleToSettlement">
          <span class="purchase_button_text">立即购买</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modalVisible: false,
      modalVisible_address: false,
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
      Specif: '',
      address: '',
      goods_specs_top_img: '',
      goods_specs: [],
      goods_stock_list: [],
      goods_detail: '',
      goods_sub_title: '',
      shop_num: 1
    }
  },
  mounted () {
    const id = this.$root.$mp.query.id
    this.$axios
      .get(`/product/` + id)
      .then(res => {
        console.log(res)
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
        this.address = this.address_list_all[0]
      }).catch((err) => {
        console.log(err)
      })
  },
  methods: {
    setModalVisible (visible) {
      this.modalVisible = visible
      this.itemSelected = this.goods_stock_list[0]
      this.model_price = this.goods_specs[0].price
      this.goods_specs_top_img = this.goods_img_list[0]
      this.goods_id = this.goods_specs[0].sku_code
    },
    SpecsOnclick (value) {
      const index = this.goods_stock_list.findIndex(item => item === value)
      this.itemSelected = value
      this.model_price = this.state.goods_specs[index].price
      this.goods_id = this.state.goods_specs[index].sku_code
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
        this.shop_num = this.state.goods_stock
      }
    },
    setSpecifications (visible) {
      this.Specif = this.state.itemSelected
      this.modalVisible = visible
      this.goods_new_price = this.state.model_price
    },
    handleToSettlement () {
      let url = '/pages/goods_list/main'
      mpvue.navigateTo({url})
    }
  }
}
</script>
<style>
.container {
    width: 100%;
    background-color: #f3f3f3
}
.goods_img_list_box {
    height: 40%;
    width:100%;
    background-color: #ffffff;
    position: relative;
}
.goods_img_list {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center
}
.goods_img {
    height: 100%;
    width:40%;
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
    min-height: 25px;
    font-size: 16px;
    color: #454545;
    padding:0 10px;
    margin-top: 15px;
    font-weight: bold;
    background-color: #fff
}
.goods_price_box {
    width: 100%;
    padding:0 10px;
    margin-top: 10px;
    background-color: #fff
}
.goods_price {
    width: 100%;
    line-height: 45px;
    font-size: 24px;
    color: #06c1ae;
}
.goods_old_price {
    font-size: 14px;
    color: #ababab;
    text-decoration: line-through
}
.goods_stock {
    width: 100%;
    line-height: 45px;
    font-size: 14px;
    color: #787878;
    background-color: #fff
}
.goods_service {
    width: 100%;
    line-height: 25px;
    font-size: 14px;
    color: #ababab;
    padding:0 10px;
    margin:0 5px;
    margin-bottom: 15px;
    background-color: #fff
  }
.goods_specs_button {
    width: 100%;
    height: 55px;
    position: relative;
}
.goods_specs_button_text1 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 40px;
    height: 55px;
    line-height: 55px;
    color: #666666;
    font-weight: bold;
    font-size: 16px;
}
.goods_specs_button_text2 {
    display: block;
    width: 80%;
    height: 55px;
    line-height: 55px;
    color: #787878;
    font-size: 14px;
    padding-left: 50px;
    padding-right: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.goods_specs_button_text3 {
    display: block;
    width: 80%;
    height: 55px;
    line-height: 55px;
    color: #787878;
    font-size: 14px;
    padding-left: 50px;
    padding-right: 30px;
    /* border-top: 1px solid #eeeeee; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.goods_details_bottom {
    /* width: 100%; */
    background-color: #fff;
    margin:15px 0;
    border-radius: 20px;
    padding:0 15px;
}
.goods_specs_button_img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 20px;
}
.goods_specs_model_box {
    position: relative;
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5)
}
.goods_specs_model {
    position: absolute;
    left: 0;
    bottom: -22px;
    width: 100%;
    max-height: 80px;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    z-index: 1000
}
.goods_specs_model_top_box {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
  }
.goods_specs_top {
    width: 100%;
    height: 100px;
    padding:0 10px
}
.goods_specs_top_img_box {
    position: absolute;
    left: 0px;
    top: 10px;
    width: 80px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden
}
.goods_specs_top_img {
    width: 80px;
    height: 80px;
}
.goods_specs_top_price {
    width: 100%;
    height: 80px;
    padding-left: 95px;
}
.goods_specs_top_price_text {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 22px;
    color: #f40800
}
.goods_specs_top_goods_id {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #787878;
  }
.goods_specs_bottom_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    color: #565656
  }
.goods_specs_all_list {
    background-color: #f2f2f2;
    border-radius: 5px;
    line-height: 20px;
    max-width: 100%;
    padding:0 10px;
    color: #454545;
    font-size: 14px;
    margin-bottom: 8px;
    padding:0 5px;
    border:1px solid #f2f2f2
}
.goods_specs_qr_button {
    width: 100%;
    height: 40px;
    background-color: #06c1ae;
    border-radius: 5px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.goods_specs_qr_button_text {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #fff
  }
.model_close_tb {
    width: 25px;
    height: 25px;
    border-radius: 15px;
}
.model_close_tb_box {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
    background-color: #f2f2f2;
    overflow: hidden;
    z-index: 100
}
.goods_specs_dq_list {
    background-color: #fcedeb;
    border-color: #f23030;
    border: 1px solid #f23030
}
.goods_details_box {
    flex: 1;
    background-color: #ffffff;
    padding: 10px;
    min-height: 200px;
}
.purchase_button_box {
    width: 100%;
    height: 50px;
    background-color: #ffffff;
    display: flex;
    justify-content:space-around;
    /* flex-direction: row; */
    padding:5px 10px;
    border-top: 1px solid #f3f3f3;
    position:fixed;
    bottom: 0;
}
.shop_box{
    width: 30px;
    height: 40px;
    margin-right: 10px;
}
.shop_box_tb {
    width: 20px;
    height: 20px;
    margin-top: 5px;
    margin-left: 5px;
}
.shop_box_text {
    width: 30px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    color: #454545;
    text-align: center
}
.goods_bottom_price {
    height: 40px;
    flex-direction: row;
    flex: 1;
}
.goods_bottom_price1 {
    color: #787878;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    align-self: flex-start;
    margin-right: 5px;
  }
.goods_bottom_price2 {
    height: 40px;
    line-height: 40px;
    color: #f23030;
    align-self: flex-start;
    font-size: 18px;
  }
.purchase_button {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background-color: #06c1ae;
    margin-top: 5px;
    margin-right: 15px;
    text-align: center;
    line-height: 30px;
  }
.purchase_button_text {
    width: 100px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    font-size: 14px;
    text-align: center
  }
.apply_table_top_goods_number_box {
    width: 100%;
    height: 45px;
    margin-top: 10px;
}
.apply_table_top_goods_price_text2 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 80px;
    height: 45px;
    line-height: 45px;
    color: #454545;
    font-size: 16;
}
.apply_table_top_goods_number_input_box {
    width: 100%;
    height: 45px;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 90px;
    padding-top: 5px;
    justify-content: flex-end
  }
.apply_table_top_goods_number_jian {
    width: 35px;
    height: 35px;
    background-color: #ffffff;
    padding-top: 0px;
    padding-bottom: 0px;
    justify-content: center;
    align-items: center
  }
.apply_table_top_goods_number_jian_img {
    width: 25px;
    height: 25px
  }
.apply_table_top_goods_number_jia {
    width: 35px;
    height: 35px;
    background-color: #ffffff;
    padding-top: 0px;
    padding-bottom: 0px;
    justify-content: center;
    align-items: center
  }
.apply_table_top_goods_number_jia_img {
    width: 25px;
    height: 25px;
}
.apply_table_top_goods_number_input {
    width: 100px;
    height: 30px;
    background-color: #f6f6f6;
    text-align: center;
    margin-top: 2.5px;
    color: #454545
}
</style>