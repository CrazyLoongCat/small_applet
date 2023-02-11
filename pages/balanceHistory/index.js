const {
  request
} = require('../../utils/util.js');
// pages/myPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableHeader: [
      {
        prop: 'payPlatformAccount',
        width: 180,
        label: '账号'
      },
      {
        prop: 'rebateSum',
        width: 150,
        label: '金额'
      },
      {
        prop: 'rebateStatusName',
        width: 120,
        label: '状态'
      },
      {
        prop: 'rebateSuccessTime',
        width: 200,
        label: '提现日期',
      },
    ],
    stripe: false,
    border: true,
    outBorder: true,
    row: [
     
    ],
    msg: '暂无数据'

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
      url: "/webapi/ap/user/rebateRecord/getRebateRecord?current=1&size=20",
      data: {
      }
    });
    console.log(res,'7777')
    if( res.code == 0 ){
      if( res.data.records.length > 0 ){
        res.data.records.forEach( item => {
          if( item.rebateSuccessTime === null){
            item.rebateSuccessTime = ''
          } 
          if( item.rebateSum === null){
            item.rebateSum = ''
          } 
          if( item.payPlatformAccount === null ){
            item.payPlatformAccount = ''
          } 
          if(item.rebateStatusName === null ){
            item.rebateStatusName = ''
          } 
          if( item.refuseReason  === null){
            item.refuseReason = ''
          }
        })
      }
      this.setData({
        'row': res.data.records
      })
    }
    console.log(this.data.row,'row')
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