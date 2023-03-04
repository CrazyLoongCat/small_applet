 
 const {
   request
 } = require('../../../utils/util.js');

 var app = getApp()
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     orderList: [], //订单列表
     current: 1, //当前页数
     size: 20, //每页笔数 
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad(options) {
     this.init()

   },


   init: async function () {
     await this.orderListFn()
   },

   async orderListFn() {
     var data = {
       current: this.data.current, //当前页数
       size: this.data.size, //每页笔数
     };
     var that = this;

     const res = await request({
       method: "GET",
       url: "/webapi/ap/user/order/getOrderShare",
       data: data
     });
     if (res.data != null) {
      var data = res.data.list;
      var orderList = this.data.orderList;
      var num = this.data.current;
       console.log(data)
      if (num == 1) {
        that.setData({
          orderList: data
        })
      } else {
        if (data.length <  this.data.size) {
          --num;
          that.setData({
            current: num,
            orderList: orderList
          })
        } else {
          that.setData({
            orderList: orderList.concat(data)
          })
        }
      }
    } else {
      that.setData({
        orderList: []
      })
    }

   },
   orderTypeClick(e) {
     this.setData({
       orderTypeIndex: e.currentTarget.dataset.index
     })
     this.setData({
       current: 1, //当前页数
       size: 20, //每页笔数
     })
     this.orderListFn()
   },
   platformsClick(e) {
     this.setData({
       platformIndex: e.currentTarget.dataset.index
     })
     this.setData({
       current: 1, //当前页数
       size: 20, //每页笔数
     })
     this.orderListFn()
     this.moneyFn()
   },

   txClick: function () {
     wx.navigateTo({
       url: '../cash/index',
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
     this.setData({
       current: 1, //当前页数
       size: 20, //每页笔数
     })

     this.orderListFn();
     wx.stopPullDownRefresh()
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom() {
     var num = this.data.current;
     ++num;
     this.setData({
       current: num
     })

     this.orderListFn();
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage() {

   }
 })