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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
 
  },

 butYes(){
  wx.getUserProfile({
    desc: '获取你的昵称、头像、地区及性别',
    success: res => {
       this.submitNickName(res)
    },
    fail: res => {
      console.log(res)
      //拒绝授权
      wx.switchTab({
        url: '/pages/index/index'
      });
      return;
    }
  });
 },
 butNo(){
  wx.switchTab({
    url: '/pages/index/index'
  });
},
async submitNickName(data) {
  const res = await request({
    method: "POST",
    url: "/webapi/ap/user/submit/nick/name",
    data: {
      nickName: data.userInfo.nickName
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