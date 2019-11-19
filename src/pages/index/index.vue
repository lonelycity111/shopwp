<template>
  <div class="container">
    <div class="index_banner_list_box">
      <swiper
        @change="switchItem('switchItem',$event)"
        :current="currentTab"
        circular="true"
        indicator-dots="true"
        :autoplay="autoplay"
        skip-hidden-item-layout="true"
        class="index_banner_swiper"
      >
        <swiper-item v-for="(item,index) in swiperlist" :key="index">
          <image :src="item.src" @click="handImage(item)" class="index_banner_img" />
        </swiper-item>
      </swiper>
    </div>
    <div class="boutique_list">
      <div class="boutique_list_title_box">
        <div class="boutique_list_title_left"></div>
        <span class="boutique_list_title">最新动态</span>
      </div>

      <ul v-for="(item,index) in news_list" :key="index">
        <li class="news_list_option" @click="handleToNewsDetail(item.id)">
          <div class="news_list_option_img_box">
            <image :src="item.img" class="news_list_option_img" />
          </div>
          <div class="news_list_option_details_box">
            <span class="news_list_option_details_title">{{item.title}}</span>
            <span class="news_list_option_details_time">{{item.pubDate}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div style="windth:100%;height:10px;background:#f3f3f3"></div>
    <div class="boutique_list">
      <div class="boutique_list_title_box">
        <div class="boutique_list_title_left"></div>
        <span class="boutique_list_title">精品推荐</span>
      </div>
      <ul>
        <li class="boutique_list_option" v-for="(item,index) in boutique_list" :key="index" @click="handleToDetail(item)">
          <div class="boutique_list_option_img_box">
            <image class="boutique_list_option_img" :src="item.pic" />
          </div>
          <div class="boutique_list_option_details">
              <span class="boutique_list_option_name">{{item.name}}</span>
              <div class="boutique_list_option_price">
                <span class="boutique_list_option_price_text">¥ {{item.price}}</span>
                <span class="boutique_list_option_xl_text">销量: {{item.sale}}</span>
              </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTab: 0,
      swiperlist: [
        {
          src:
            '../../static/images/homebanner1.jpg'
        },
        {
          src: '../../static/images/homebanner2.jpg'
        },
        {
          src:
            '../../static/images/homebanner3.jpg'
        }
      ],
      news_list: [],
      boutique_list: []
    }
  },
  methods: {
    handleToDetail (item) {
      let url = '/pages/goods_detail/main?id=' + item.id
      mpvue.navigateTo({url})
    },
    switchItem (prompt, res) {
      let oIndex = res.mp.detail.current
      this.currentTab = oIndex
    },
    handImage (item) {
      let url = '/pages/index/home_detail/main'
      mpvue.navigateTo({url})
    },
    handleToNewsDetail (id) {
      let url = '/pages/index/news_detail/main?id=' + id
      mpvue.navigateTo({url})
    }
  },
  mounted () {
    this.$axios
      .get('/recommend/list', {
        params: {
          pageNum: 1,
          pageSize: 20
        }
      })
      .then(res => {
        console.log(res)
        this.boutique_list = res.data.data.list
      })
      .catch(err => {
        console.log(err)
      })
    this.$axios
      .get('/dynamic/list', {
        params: {
          pageNum: 1,
          pageSize: 3
        }
      })
      .then(res => {
        console.log(res)
        this.news_list = res.data.data.list
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  background-color: "#ffffff";
}
.index_banner_img {
  width: 100%;
  height: 200px;
  background-size: cover;
}
.index_banner_swiper {
  height: 200px;
  width: 100%;
}
.index_banner_list_box {
  width: 100%;
  height: 200px;
}
.boutique_list {
  width: 100%;
  background-color: "#ffffff";
}
.boutique_list_title_box {
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  flex-direction: row;
  padding-left: 10;
}
.boutique_list_title {
  flex: 1;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #454545;
  padding-left: 10px;
}
.boutique_list_title_left {
  width: 3px;
  height: 20px;
  background-color: #06c1ae;
  margin-top: 15px;
}

.boutique_list_option {
  width: 100%;
  height: 80px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f0f0f0;
}
.boutique_list_option_img_box {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 10px;
}
.boutique_list_option_img {
  width: 60px;
  height: 60px;
}
.boutique_list_option_details {
  flex: 1;
  height: 60px;
}
.boutique_list_option_name {
  width: 100%;
  height: 40px;
  line-height: 20px;
  font-size: 12px;
  color: #565656;
}
.boutique_list_option_price {
  width: 100%;
  height: 15px;
  margin-top: 5px;
  flex-direction: row;
}
.boutique_list_option_price_text {
  width: 50%;
  height: 15px;
  line-height: 15px;
  font-size: 12;
  color: #06c1ae;
}
.boutique_list_option_price_text {
  width: 50%;
  height: 15px;
  line-height: 15px;
  font-size: 14px;
  color: #06c1ae;
}
.boutique_list_option_xl_text {
  width: 50%;
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  color: #787878;
  margin-top: 5px;
  float: right;
}
.news_list_option {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
.news_list_option_img_box {
  width: 60px;
  height: 60px;
  flex-direction: row;
  margin: 0 10px;
  border-radius: 3px;
  overflow: hidden;
}
.news_list_option_img {
  width: 60px;
  height: 60px;
  border-radius: 3px;
}
.news_list_option_details_box {
  flex: 1;
  height: 60px;
  padding-right: 10px;
}
.news_list_option_details_title {
  width: 100%;
  height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.news_list_option_details_time {
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #999;
}
</style>
