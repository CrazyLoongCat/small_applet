 const {
   request
 } = require('../../../utils/util.js');

 Page({

   /**
    * 页面的初始数据
    */
   data: {
     date: '请选择下单日期',
     orderTypeList: [], //购物平台
     orderTypeIndex: "", //购物平台选中索引
     money: "", //钱数
     orderId: "", //订单编号
     AntiMoney: "", //反米金额
     token: ""
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad(options) {
     var token = wx.getStorageSync('token');
     this.setData({
       token
     })
     this.orderTypeListFn()
   },
   //请求平台
   async orderTypeListFn() {
     const res = await request({
       method: "GET",
       url: "/webapi/ap/configPlatform/getPlatforms",
       data: {
         urrent: 1,
         size: 20,
       }
     });
     var arr = res.data.records
     arr = arr.filter(item => (item.platformName != "中免日上"&&item.platformName != "GDF海控"&&item.platformName != "海旅免税会员购"))
     this.setData({
       orderTypeList: arr,
     })
   },
   //购物平台发生变化
   bindPickerChange: function (e) {
     this.setData({
       orderTypeIndex: e.detail.value,
       AntiMoney: this.data.money == "" ? "" : this.data.orderTypeList[e.detail.value].rebateRate * this.data.money / 100
     })
     console.log(this.data.orderTypeIndex,'orderTypeIndexorderTypeIndex')
   },
   // 金额
   moneyInput: function (e) {
     this.setData({
       money: e.detail.value,
       AntiMoney: this.data.orderTypeIndex == "" ? "" : this.data.orderTypeList[this.data.orderTypeIndex].rebateRate * e.detail.value / 100
     })
   },
   // 订单号
   orderNum: function (e) {
     this.setData({
       orderId: e.detail.value
     })
   },
   //时间
   bindDateChange: function (e) {
     this.setData({
       date: e.detail.value
     })
   },
   //提交订单
   submitOrder: function () {
     if( this.data.orderTypeIndex == 3 ){
       let strs = this.data.orderId.substr(0,3) 
       console.log(strs,'strsstrs')
        if( strs != 'BAP' ){
            wx.showToast({
              title: '订单需BAP开头',
              icon: 'error',
              duration: 2000
            })
            return
        }
     }
     console.log('44444')
     var that = this;
     if (this.data.orderId.trim() == "") {
       wx.showToast({
         title: '请输入订单号',
         icon: 'none',
         duration: 1000
       })
       return;
     }
     if (this.data.orderTypeIndex.trim() == "") {
       wx.showToast({
         title: '请选择购物平台',
         icon: 'none',
         duration: 1000
       })
       return;
     }
     if (this.data.money.trim() == "") {
       wx.showToast({
         title: '请选择订单金额',
         icon: 'none',
         duration: 1000
       })
       return;
     }
     if (this.data.date == "请选择下单日期") {
       wx.showToast({
         title: '请选择下单日期',
         icon: 'none',
         duration: 1000
       })
       return;
     }
     this.submitRderFn()
   },



   async submitRderFn() {
     var data = {
       "orderId": this.data.orderId, //订单编号
       "platform": this.data.orderTypeList[this.data.orderTypeIndex].id, //平台名称
       "orderAmt": this.data.money, //订单金额
       "placedTime": this.data.date, //下单日期
       "returnRate": this.data.orderTypeList[this.data.orderTypeIndex].rebateRate, //返利比例(%)
       "returnAmt": this.data.AntiMoney //返利金额
     }
     const res = await request({
       method: "POST",
       url: "/webapi/ap/user/order/submitUserOder",
       data: JSON.stringify(data)
     });
     if (res.data == true) {
       wx.showToast({
         title: '订单提交成功',

       })
       setTimeout(() => {
         wx.navigateBack({
           delta: 1
         });
       }, 1000);
     } else {
       wx.showToast({
         title: res.msg,
         icon: "none"
       })
     }
   },
   getPhoneNumber(e) {
     this.getNumner(e.detail.code)
   },

   async getNumner(code) {
     const res = await request({
       method: "POST",
       url: "/webapi/ap/user/submitPhone",
       data: {
         code: code
       }
     });
     if (res.data) {
       var token = this.data.token;
       token.phoneFlag = false;
       this.setData({
         token
       })
       wx.setStorageSync('token', token)
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

   },

 })