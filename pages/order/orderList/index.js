 
 const {
   request
 } = require('../../../utils/util.js');

 var app = getApp()
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     orderTypeList: [], //订单类型列表
     platformsList: [], //平台列表
     orderTypeIndex: 0, //订单类型选中状态
     platformIndex: 0, //平台选中索引
     moneyObj: {}, //顶部钱数 对象
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

     await this.getCodeTypeFn()
     await this.getPlatformsFn()
     await this.orderListFn()
     await this.moneyFn()

   },
   async getCodeTypeFn() {
     const res = await request({
       method: "GET",
       url: "/webapi/ap/codeType/getCodeType",
       data: {
         codeName: "checkStatus"
       }
     });
     var obj = {
       codeValue: "全部订单",
     }
     var arr = [];
     var data = res.data;
     for (var j = 0; j < data.length; j++) {
       if (data[j].codeValue == "已成功跟单") {
         arr.push(data[j])
       }
       if (data[j].codeValue == "已生效返利") {
         arr.push(data[j])
       }
       if (data[j].codeValue == "已取消") {
         arr.push(data[j])
       }
       if (data[j].codeValue == "已返利") {
         arr.push(data[j])
       }
     }

     arr.unshift(obj)
     this.setData({
       orderTypeList: arr
     })

   },
   async getPlatformsFn() {
     const res = await request({
       method: "GET",
       url: "/webapi/ap/configPlatform/getPlatforms",
       data: {
        urrent: 1,
        size: 20,
      }
     });

     var obj = {
       platformName: "全部",
     }
     var data = res.data.records;
     data = data.filter(item => (item.platformName != "中免日上"&&item.platformName != "GDF海控"&&item.platformName != "海旅免税会员购"))
     data.unshift(obj)
     this.setData({
       platformsList: data
     })

   },
   async orderListFn() {
     var data;
     var that = this;
     if (this.data.orderTypeList[this.data.orderTypeIndex].codeValue == "全部订单") {
       if (this.data.platformsList[this.data.platformIndex].platformName == "全部") {
         data = {
           current: this.data.current, //当前页数
           size: this.data.size, //每页笔数 
         }
       } else {
         data = {
           current: this.data.current, //当前页数
           size: this.data.size, //每页笔数 
           platform: this.data.platformsList[this.data.platformIndex].platformApCode
         }
       }
     } else {
       if (this.data.platformsList[this.data.platformIndex].platformName == "全部") {
         data = {
           current: this.data.current, //当前页数
           size: this.data.size, //每页笔数 
           checkStatus: this.data.orderTypeList[this.data.orderTypeIndex].codeKey, //对账状态
         }
       } else {
         data = {
           current: this.data.current, //当前页数
           size: this.data.size, //每页笔数 
           platform: this.data.platformsList[this.data.platformIndex].platformApCode,
           checkStatus: this.data.orderTypeList[this.data.orderTypeIndex].codeKey, //对账状态
         }
       }
     }
     const res = await request({
       method: "GET",
       url: "/webapi/ap/user/order/getOrders",
       data: data
     });
     if (res.data != null) {
      var data = res.data.records;
      var orderList = this.data.orderList;
      var num = this.data.current;
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
   async moneyFn() {
     var data;
     if (this.data.platformsList[this.data.platformIndex].platformName == "全部") {
       data = {}
     } else {
       data = {
         platform: this.data.platformsList[this.data.platformIndex].id
       }
     }
     const res = await request({
       method: "GET",
       url: "/webapi/ap/user/order/getUserRebateSum",
       data: data
     });
     var moneyObj = res.data;
     var orderTypeList = this.data.orderTypeList;
     for (var k = 0; k < orderTypeList.length; k++) {
       //         "all": 0,-- 全部订单
       //         "unRebate": 0, -- 已成功跟单
       //         "needRebate": 0,--已生效返利
       //         "cancel": 0, --已取消
       //         "rebated": 0--已返利
       if (orderTypeList[k].codeValue == "全部订单") {
         orderTypeList[k].money = moneyObj.all
       }
       if (orderTypeList[k].codeValue == "已成功跟单") {
         orderTypeList[k].money = moneyObj.unRebate
       }
       if (orderTypeList[k].codeValue == "已生效返利") {
         orderTypeList[k].money = moneyObj.needRebate
       }
       if (orderTypeList[k].codeValue == "已取消") {
         orderTypeList[k].money = moneyObj.cancel
       }
       if (orderTypeList[k].codeValue == "已返利") {
         orderTypeList[k].money = moneyObj.rebated
       }
     }

     this.setData({
       orderTypeList
     })
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