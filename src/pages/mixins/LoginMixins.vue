<script>
export default {
  methods: {
    wxLogin (e, callBack) {
      // 用户拒绝了授权
      console.log(e)
      if (e.mp.detail.errMsg !== 'getUserInfo:ok') {
        return false
      }
      console.log('后面的还能执行吗')
      // 保存个人信息到本地，方便在我的页面中进行获取
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)
      // 2.调用wx.login获取临时的code
      wx.login({
        success: async res => {
          const result = await this.$axios.post('/user/login', {
            username: 'test',
            password: '123456',
            loginType: 'member'
          })
          // 给模型中的token赋值
          this.token = result.header.Authorization
          // 保存到本地
          console.log(result)
          wx.setStorageSync('token', this.token)
          wx.setStorageSync('member_id', result.data.data.id)
          const addressList = await this.$axios.get('/memberAddress/list', {
            params: {
              pageNum: 1,
              pageSize: 20,
              member_id: result.data.data.id
            }
          })
          mpvue.setStorageSync('addressList', addressList.data.data.list)
          if (callBack) {
            callBack()
          }
        },
        fail: () => {},
        complete: () => {}
      })
    }
  }
}
</script>
