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
          const result = await this.$axios.post('users/wxlogin', {
            code: res.code,
            encryptedData: e.mp.detail.encryptedData,
            iv: e.mp.detail.iv,
            rawData: e.mp.detail.rawData,
            signature: e.mp.detail.signature
          })

          // 给模型中的token赋值
          this.token = result.data.message.token

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
