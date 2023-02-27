const {
  request
} = require('../../utils/util.js');
var  app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips1: [],
    tips2: [],
    platformsList: [],
    bannerList: [],
    hotImageUrl: '',
    baseUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var app = getApp()
    const scene = decodeURIComponent(options.scene) // 获取到二维码原始链接内容
    const shareUserId = scene.substr(scene.indexOf("=")+1,scene.length);
    console.log(shareUserId)
    this.setData({
      baseUrl: app.globalData.globalBaseUrl
    })
    const token = wx.getStorageSync('token')
    if (token) {
      // 登记推广人信息
      this.submitShareRef(shareUserId)
    } else {
      app.checkloginReadyCallback = res => {
        // 登记推广人信息
        this.submitShareRef(shareUserId)
      }
    }
    
    // 获取码表
    this.getCodeTypeFn()
    // 获取平台信息
    this.getPlatformsFn()
    // 获取轮播图
    this.getLunbo()
    // 获取热门活动图
    this.getHotImageUrl()

  }, 
  //去热门活动
  gotoHot(){
    wx.navigateTo({
      url: "/pages/hotactive/index",
    })
  },
  // 查询通知轮播
  async getCodeTypeFn() {
    const res = await request({
      method: "GET",
      url: "/webapi/ap/tipMessage/getTips",
      data: {
      }
    });
    if( res.code == 0 ){
      if( res.data.records.length > 0 ){
        let result = [] , num = 2 ; 
        for(let i = 0,len = res.data.records.length;i<len;i+=num){
            result.push(res.data.records.slice(i,i+num));
        }
        console.log(result)
        if( result.length > 0 ){
           if( result[0].length > 0 ){
              this.setData({
                tips1: result[0]
              })
           }
           if( result[1].length > 0 ){
              this.setData({
                tips2: result[1]
              })
           }
        }
      }
    }
  },
  // 查询平台
  async getPlatformsFn() {
    const res = await request({
      method: "GET",
      url: "/webapi/ap/configPlatform/getPlatforms",
      data: {
        codeName: "platformName"
      }
    });

    var data = res.data.records;

    this.setData({
      platformsList: data
    })
   console.log(this.data.platformsList,'platformsList')
  },
  // 首页轮播图
  async getLunbo() {
    const res = await request({
      method: "GET",
      url: "/webapi/ap/codeType/getCodeType?codeName=roundImage",
      data: {
      }
    });
    if( res.code == 0 ){
      let data = []
      if( res.data.length > 0 ){
        res.data.forEach( item => {
          data.push({
            imgurl: this.data.baseUrl + '/webapi/' + item.codeValue
          })
        })
      }
      this.setData({
        bannerList: data
      })
    }
    console.log(this.data.bannerList,'bannerList')
  },

  // 热门活动图片
  async getHotImageUrl() {
    const res = await request({
      method: "GET",
      url: "/webapi/ap/codeType/getCodeType?codeName=hotImage",
      data: {
      }
    });
    if( res.code == 0 ){
      let data = ''
      if( res.data.length > 0 ){
        res.data.forEach( item => {
          data = res.data[0].codeValue
        })
      }
      this.setData({
        hotImageUrl: data
      })
    }
    console.log(this.data.hotImageUrl,'hotImageUrl')
  },
  // 登记推广人关系
  async submitShareRef(shareUserId) {
    const token = wx.getStorageSync('token')
    console.log(token,"token");
    console.log(shareUserId,"shareUserId");
    // 新用户 并且存在分享参数
    if (token.isNew && shareUserId != "undefined") {
      console.log("执行了");
      await request({
        method: "POST",
        url: "/webapi/ap/system/submit/share/ref",
        data: {
          userId: token.token,
          shareUserId: shareUserId
        }
      });
    }
  },

//新手教程
next_calculator(){
  wx.navigateTo({
    url: '/pages/newCusterCourse/index',
  })
},
//点击跳转
  platformsItemClick(e) {
    if( e.currentTarget.dataset.platformurl.urlType == 1 ){
      wx.showModal({
        title: '',
        content: '复制链接去购物',
        success(res) {
          if (res.confirm) {
            wx.setClipboardData({ //复制文本
              data: e.currentTarget.dataset.platformurl.platformUrl,
              success: function (res) {
                wx.getClipboardData({ //获取复制文本
                  success: function (res) {
                    console.log(res)
                    wx.showToast({
                      title: '复制成功',
                      icon: "none", //是否需要icon
                      mask: "ture" //是否设置点击蒙版，防止点击穿透
                    })
                  }
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else if( e.currentTarget.dataset.platformurl.urlType == 2 ){

      let urls = this.data.baseUrl + '/webapi/' + e.currentTarget.dataset.platformurl.platformUrl
      wx.navigateTo({
        url: '/pages/indexImageUrl/index?url='+urls
      })
    }else if( e.currentTarget.dataset.platformurl.urlType == 3 ){
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.platformurl.smallAppId,  //appid
        path: e.currentTarget.dataset.platformurl.platformUrl,//path
        extraData: {  //参数
        },
        envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
        success(res) {
          console.log('成功')
          // 打开成功
        }
      })

    }else if( e.currentTarget.dataset.platformurl.urlType == 4 ){
      wx.navigateTo({
        url: '/pages/orderSearchList/index?name='+ e.currentTarget.dataset.platformurl.platformName
        // '/pages/orderSearchList/index?name='+ e.currentTarget.dataset.item.platformName
      })
    }
  },
  //点击名称跳转GDF
  //点击名称跳转中免日上
   async platformNameClick(e){
      
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