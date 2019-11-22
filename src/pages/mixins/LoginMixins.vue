<script>
export default {
  methods: {
    wxLogin (e) {
      // 用户拒绝了授权
      if (!e.mp.detail.errMsg === 'getUserInfo:ok') return

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
          console.log(123123, result)
          // 给模型中的token赋值
          this.token = result.header.Authorization

          // 保存到本地
          wx.setStorageSync('token', this.token)
        },
        fail: () => {},
        complete: () => {}
      })
    }
  }
}
</script>
