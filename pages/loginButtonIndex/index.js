const {
  request
} = require('../../utils/util.js');
// pages/myPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    code: '',
    phoneNumber: 0,
    appid: '',
    access_token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',//文档请求地址
      data: {
        grant_type: "client_credential",//这个是固定的
        appid: 'wx0bc3ed21ec0db2be',
        secret: '5db1652877c0624e6a7a412dcd4a3373'
      },
      success: (res) => {
        console.log("get", res);
        this.setData({
          access_token: res.data.access_token
        })
      }
    })
  },

  getPhoneNumber(e) {
    console.log(e,'0000000000000')
    if( e.detail.errMsg == 'getPhoneNumber:fail user deny' ){
      wx.switchTab({
        url: '/pages/index/index'
      });
      return
    }
    this.setData({
      code: e.detail.code
    })
    
    wx.request({//微信小程序官方接口 文档里面有哈
      url: "https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=" +  this.data.access_token, //文档请求地址 需要传送两个参数 这个参数是要拼接地址的 参数一接口调用凭证
      method: "POST",
      header: {
        'content-type': 'application/json' //转换为json  参数2 需要转换json格式
      },
      data: {
        code: this.data.code //参数二
      },
      success: (res) => {
        console.log(res,'------');
        this.setData({
          phoneNumber: res.data.phone_info.phoneNumber,//这个是获取到的手机号 
          appid: res.data.phone_info.watermark.appid //这个是获取到的appid
        })
        this.submitNickName()
        console.log(this.data.phoneNumber);
      },
      error: (  err ) => {
        console.log(err,'---------')
      }
    })
  },

 butNo(){
  wx.switchTab({
    url: '/pages/index/index'
  });
},
async submitNickName() {
  const res = await request({
    method: "POST",
    url: "/webapi/ap/user/submit/nick/name",
    data: {
      nickName: this.data.phoneNumber
    }
  });
  if (res.code == 0) {
    wx.navigateBack({
      delta: 1
    });
  }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})