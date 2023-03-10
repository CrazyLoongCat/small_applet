const {
  request
} = require('../../utils/util.js');
// pages/myPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    balance: '0.00',
    apUserId: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    griddata: [
      {id: 0,name: '提现记录', url: '/pages/balanceHistory/index',img: '../../img/31.png' },
      {id: 2,name: '我的团队', url: '/pages/myTeam/index',img: '../../img/28.png' },
      {id: 3,name: '推广二维码', url: '/pages/erweima/index',img: '../../img/27.png' },
      {id: 4,name: '推广规则', url: '/pages/shareRule/index',img: '../../img/29.png' },
      {id: 5,name: '推广订单', url: '/pages/order/shareOrderList/index',img: '../../img/30.png' },
      {id: 6,name: '分销商申请', url: '/pages/applyToReseller/index',img: '../../img/34.png' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const token = wx.getStorageSync('token')
    this.setData({
      apUserId: token.apUserId
    })
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.getBalance()
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //点击提现跳转
  next_calculator:function () {
    wx.navigateTo({
      url: '/pages/balance/index',
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
        balance: res.data  ? res.data : '0'
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