const {
  baseUrl,
} = require('./utils/util.js'); 
App({
  onLaunch() {
    // // 展示本地存储能力
    const token = wx.getStorageSync('token')
    var that = this;
    if (token.token) {
      /**
       * 设置全局变量
       */
      that.globalData.testData = token
      /**
       *由于这里是网络请求，可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
       */
      if (that.testDataCallback) {
        that.testDataCallback(token);
      }
    } else {
      // 登录
      wx.login({
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
              /**
               * 设置全局变量
               */
              getApp().globalData.testData = res.data.data;
              /**
               * 由于这里是网络请求，可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
               */
              if (getApp().testDataCallback) {
                getApp().testDataCallback(res.data.data);
              }
              wx.hideLoading({
                success: (res) => {},
              })
            },
          })
        }
      })
    }
  },
  globalData: {
    testData: null,
    globalBaseUrl: baseUrl
  }
})