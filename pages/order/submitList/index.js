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
     orderMoneyIndex: 0, //分佣类型选中状态
     platformIndex: 0, //平台选中索引
     moneyObj: {}, //顶部钱数 对象
     orderList: [], //订单列表
     current: 1, //当前页数
     size: 20, //每页笔数 
     orderTypeList: [
       { typeName: '全部'},
       { typeName: '中免日上'},
       { typeName: 'GDF会员购'}
     ],
     orderMoneyList: [
      { typeName: '全部'},
      { typeName: '待分佣'},
      { typeName: '已分佣'}
     ],
     allMoney: '5000.00',
     dateTypeList: [
       { dateName: '今天' },
       { dateName: '昨天' },
       { dateName: '近七天' },
       { dateName: '本月' },
       { dateName: '上月' },
     ],
     dateTypeIndex: 0,
     allAmt: '', //成交金额
     allSum: '' //成交订单数
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad(options) {

     this.init()
   },


   init: async function () {
     await this.initAllMoney()
     await this.initDateType()
     await this.orderListFn()
   },
   //初始化 总金额
   async initAllMoney(e){
     const res = await request({
      method: "GET",
      url: "/webapi/ap/user/base/order/cl/get/statistics",
    });
    if( res.code == 0 ){
      this.setData({
        allMoney: res.data.allAmt
      })
    }
   },
    //初始化 日期
    async initDateType(e){
      let data = {
       timeType: '1'
      }
      const res = await request({
       method: "GET",
       url: "/webapi/ap/user/base/order/cl/get/statistics",
       data: data
     });
     if( res.code == 0 ){
       this.setData({
         allAmt: res.data.allAmt,
         allSum: res.data.allSum
       })
     }
    },
   //输入框输入事件
   focusHandler(e){
      // console.log(e,'444444444')
   },
   //输入框确定搜索
  async bindconfirm(e){
    console.log(e,'111111')
    this.setData({
      current: 1,
      size: 20
    })
    data = {
      current: this.data.current, //当前页数
      size: this.data.size, //每页笔数 
      externalOrderId: e.detail.value
    }
    const res = await request({
      method: "GET",
      url: "/webapi/ap/user/base/order/cl/orders",
      data: data
    });
  
      if (res.code == 0) {
        var data = res.data.records;
        var orderList = this.data.orderList;
        var num = this.data.current;
        let that = this
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
  //点击日期
  async dateTypeClick(e){
    console.log(e,'33333333333')
    this.setData({
      dateTypeIndex: e.currentTarget.dataset.index
    })
    let data = {
      timeType: this.data.dateTypeIndex, //日期
      checkStatus: this.data.orderMoneyIndex, //分佣
      platform: this.data.orderTypeIndex,//平台
    }
    let obj = {
      '0' : 1,
      '1' : 2,
      '2' : 3,
      '3' : 4,
      '4' : 5,
    }
    data.timeType = obj[e.currentTarget.dataset.index]
    const res = await request({
      method: "GET",
      url: "/webapi/ap/user/base/order/cl/get/statistics",
      data: data
    });
    if( res.code == 0 ){
      this.setData({
        allAmt: res.data.allAmt,
        allSum: res.data.allSum
      })
      console.log('这里')
      this.orderListFn()
    }
  },
  //点击分佣tab
  orderMoneyClick(e) {
    this.setData({
      orderMoneyIndex: e.currentTarget.dataset.index
    })
    this.setData({
      current: 1, //当前页数
      size: 20, //每页笔数
    })
    this.orderListFn()
  },
  //点击平台类型
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
  //查询
   async orderListFn() {
     var data;
     var that = this;
     data = {
       current: this.data.current, //当前页数
       size: this.data.size, //每页笔数  
       timeType: '', //日期
       checkStatus: '', //分佣
       platform: '',//平台
     }
     //时间
     let obj = {
      '0' : 1,
      '1' : 2,
      '2' : 3,
      '3' : 4,
      '4' : 5,
    }
    //分佣
    let obj1 = {
      '0' : 1,
      '1' : 3,
      '2' : 5,
    }
    //平台类型
    let obj2 = {
      '0' : '',
      '1' : 3,
      '2' : 4,
    }
    data.timeType = obj[this.data.dateTypeIndex]
    data.checkStatus = obj1[this.data.orderMoneyIndex]
    data.platform = obj2[this.data.orderTypeIndex]
     const res = await request({
       method: "GET",
       url: "/webapi/ap/user/base/order/cl/orders",
       data: data
     });
     if (res.code == 0) {
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
   filterData(index,data){
     let moneyStatus
     if( index == 0 ){
      moneyStatus = 1
     }else if( index == 1 ){
      moneyStatus = 3
     }else if(  index == 2 ){
      moneyStatus = 5
     }
    let orderMoneyIndexArr = []
    if( this.data.orderTypeIndex == 0 ){
      data.forEach( item => {
        if( item.checkStatus == moneyStatus ){
          console.log(item,'00')
          orderMoneyIndexArr.push(item)
        }
      })
    }else if( this.data.orderTypeIndex == 1 ){
      data.forEach( item => {
        if( item.checkStatus == moneyStatus && item.kaName == '中免日上' ){
          console.log(item,'111')
          orderMoneyIndexArr.push(item)
        }
      })
    }else if( this.data.orderTypeIndex == 2 ){
      data.forEach( item => {
        if( item.checkStatus == moneyStatus && item.kaName == 'GDF会员购' ){
          console.log(item,'222')
          orderMoneyIndexArr.push(item)
        }
      })
    }
    console.log(orderMoneyIndexArr,'orderMoneyIndexArrorderMoneyIndexArr')
    return orderMoneyIndexArr
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
    var num = this.data.current;
    ++num;
    this.setData({
      current: num
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