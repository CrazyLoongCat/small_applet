const {
  baseUrl,
} = require('./utils/util.js'); 
App({
  onLaunch() {
    this.checklogin()
  },
  globalData: {
    testData: null,
    globalBaseUrl: baseUrl,
    platformName: '' //跳转到返利列表页使用
  },
  async checklogin(){
    // 展示本地存储能力
    const token = wx.getStorageSync('token')
    var that = this;
    if (!token.token) {
      // 登录
      await wx.login({
        success: res => {
          console.log(res.code,'res.coderes.code')
          wx.request({
            url: baseUrl + "/webapi/ap/system/login",
            data: {
              "jsCode": res.code
            },
            method: "POST",
            header: {},
            success: function (res) {
              wx.setStorageSync('token', res.data.data)
              // checkLoginReadyCallback方法是在page页面动态添加的
              if (that.checkloginReadyCallback){
                that.checkloginReadyCallback(res.data.data);
              }
              wx.hideLoading({
                success: (res) => {},
              })
            },
          })
        }
      })
    } else {
      // 如果已经登录过  则需要设置isNew为false
      token.isNew = false;
      wx.setStorageSync('token', token)
    }
  }

})