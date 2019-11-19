<template>
    <div>
      <h2>{{title}}</h2>
      <p>{{time}}</p>
      <div v-html="newsDetail"></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      newsDetail: '',
      title: '',
      time: ''
    }
  },
  mounted () {
    const id = this.$root.$mp.query.id
    console.log(id)
    this.$axios
      .get('/dynamic/detail', {
        params: {
          id: id
        }
      })
      .then(res => {
        console.log(res)
        this.title = res.data.data.title
        this.time = res.data.data.pubDate
        this.newsDetail = res.data.data.detailHtml
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less">
    
</style>