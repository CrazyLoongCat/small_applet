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
  async onLoad(options) {
    
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
    this.submitNickName()
  },

 butNo(){
  wx.switchTab({
    url: '/pages/index/index'
  });
},
async submitNickName() {
  const res = await request({
    method: "POST",
    url: "/webapi/ap/user/submitPhone",
    data: {
      code: this.data.code
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