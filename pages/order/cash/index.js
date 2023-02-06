const {
  request
} = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    txList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.getRebateRecord()
   
  },

  async getRebateRecord() {
    const res = await request({
      method: "GET",
      url: "/webapi/ap/user/rebateRecord/getRebateRecord",
      data: {
        current: "1", //当前页数
        size: "20", //每页笔数
        rebateStatus: 0
      }
    });
    
    this.setData({
      tips: res.data.records
    })

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