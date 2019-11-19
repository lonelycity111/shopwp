<template>
    <div v-html="newsDetail">
        
    </div>
</template>
<script>
export default {
  data () {
    return {
      newsDetail: ''
    }
  },
  mounted () {
    const id = this.$root.$mp.query.id
    console.log(id)
  }
}
</script>
<style lang="less">
    
</style>