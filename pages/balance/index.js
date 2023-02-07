const {
  request
} = require('../../utils/util.js');
// pages/myPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowZ: false,
    isShowW: true,
    changeValue: 'weixin',
    balance: '0',
    weixinInfo: {
      userName: '',
      account: '',
      userNo: ''
    },
    zhifubaoInfo: {
      userName: '',
      account: '',
      userNo: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     this.getBalance()
     this.getNewBalanceInfo()
  },

  // bianJiZfb() {
    
  //     var that = this;
  //     that.setData({
  //       isShowZ: true
  //     })
    
  // },
  // bianJiWx(){
    
  //     var that = this;
  //     that.setData({
  //       isShowY: true
  //     })
    
  // },
  //选择提现方式
  bindchange(e){
    var that = this;
    if( e.detail.value == 'zhifubao' ){
      var that = this;
      that.setData({
        isShowZ: true
      })
    }else if( e.detail.value == 'weixin'  ){
      var that = this;
      that.setData({
        isShowY: true
      })
    }
    that.setData({
      changeValue: e.detail.value
    })
  },
  //确认支付宝
  querenZfb(){
    var that = this;
    that.setData({
      isShowZ: false
    })
  },
  //确认微信
  querenWx(){
    var that = this;
    that.setData({
      isShowY: false
    })
  },
  // 查询可返利金额
  async getBalance() {
    const res = await request({
      method: "GET",
      url: "/webapi/ap/user/rebateRecord/getRebateSum",
      data: {
      }
    });
    this.setData({
      balance: res.data
    })
  },
    // 查询用户最新一次支付信息
    async getNewBalanceInfo() {
      const res = await request({
        method: "GET",
        url: "/webapi/ap/user/getUserPayInfo",
        data: {
        }
      });
      if( res.payType == '1' ){
        this.setData({
          'weixinInfo.userName': res.receiveName,
          'weixinInfo.account': res.payPlatformAccount
        })
      }else if( res.payType == '2' ){
        this.setData({
          'zhifubaoInfo.userName': res.receiveName,
          'zhifubaoInfo.account': res.payPlatformAccount
        })
      }
      
    },
    //支付宝姓名输入
    zhifubaoUser(e){
      this.setData({
        'zhifubaoInfo.userName': e.detail.value
      })
    } ,   
    //支付宝账号输入
    zhifubaoAccount(e){
      this.setData({
        'zhifubaoInfo.account': e.detail.value
      })
    } , 
    //微信姓名输入
    weixinUser(e){
      this.setData({
        'weixinInfo.userName': e.detail.value
      })
    },
    //微信账号输入
    weixinAccount(e){
      this.setData({
        'weixinInfo.account': e.detail.value
      })
    },
    //申请提现按钮
   async applyBalance(){
      console.log(this.data.changeValue,'this.data.balance')
      // if( this.data.balance < 20 ){
      //   wx.showToast({
      //     title: '可提现金额小于20元，不可提现',
      //     icon: 'none',
      //     duration: 2000//持续的时间
      //   })
      //   return
      // }
      console.log(this.data.zhifubaoInfo,'this.data.zhifubaoInfo')
      if( this.data.changeValue == 'weixin' ){
         if( !this.data.weixinInfo.userName ||  !this.data.weixinInfo.account ){
          wx.showToast({
            title: '请输入微信提现信息',
            icon: 'none',
            duration: 2000//持续的时间
          })
          return
         }
      }else if( this.data.changeValue == 'zhifubao' ){
        if( !this.data.zhifubaoInfo.userName ||  !this.data.zhifubaoInfo.account ){
          wx.showToast({
            title: '请输入支付宝提现信息',
            icon: 'none',
            duration: 2000//持续的时间
          })
          return
         }
      }
      const res = await request({
        method: "GET",
        url: "/webapi/ap/user/rebateRecord/applyRebate",
        data: {
          payType: this.data.changeValue == 'weixin'? "1":"2", 
          payPlatformAccount: this.data.changeValue == 'weixin'? this.data.weixinInfo.account : this.data.zhifubaoInfo.account, 
          receiveName: this.data.changeValue == 'weixin'? this.data.weixinInfo.userName : this.data.zhifubaoInfo.userName
        }
      });
      if( res.code == 0 ){
        wx.showToast({
          title: '提现成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
      }else{
        wx.showToast({
          title: '提现失败',
          icon: 'error',
          duration: 2000//持续的时间
        })
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