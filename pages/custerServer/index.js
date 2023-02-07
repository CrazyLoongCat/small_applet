const {
  request
} = require('../../utils/util.js');
// pages/myPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     this.getBalanceHistory()
  },

  // 查询可返利金额
  async getBalanceHistory() {
    const res = await request({
      method: "GET",
      url: "/webapi/ap/codeType/getCodeType?codeName=serviceStaff",
      data: {
      }
    });
    if( res.code == 0 ){
      let url = 'https://huahua.bj.cn/webapi' + res.data[0].codeValue
      this.setData({
        'imageUrl': url
      })
    }
   console.log(this.data.imageUrl,'imageUrl')
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