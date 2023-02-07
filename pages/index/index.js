const {
  request
} = require('../../utils/util.js');
var  app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: [],
    platformsList: [],
    bannerList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (app.globalData.testData && app.globalData.testData != '') {
      /**
       * 调用首页接口
       */
      this.getCodeTypeFn()
      this.getPlatformsFn()
      this.getLunbo()
    } else {
      app.testDataCallback = testData => {
        if (testData != '') {
          this.getCodeTypeFn()
          this.getPlatformsFn()
        }
      }
    }

  },
  // 查询通知轮播
  async getCodeTypeFn() {
    const res = await request({
      method: "GET",
      url: "/webapi/ap/tipMessage/getTips",
      data: {
        codeName: "checkStatus"
      }
    });

    this.setData({
      tips: res.data.records
    })

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
              imgurl: 'https://huahua.bj.cn/webapi' + item.codeValue
            })
          })
        }
        this.setData({
          bannerList: data
        })
      }
      console.log(this.data.bannerList,'bannerList')
    },
//新手教程
next_calculator(){
  wx.navigateTo({
    url: '/pages/newCusterCourse/index',
  })
},
  platformsItemClick(e) {
    
    if( e.currentTarget.dataset.platformurl.urlType == 1 ){

    }else if( e.currentTarget.dataset.platformurl.urlType == 2 ){
      let urls = 'https://huahua.bj.cn/webapi/' + e.currentTarget.dataset.platformurl.platformImage
      wx.navigateTo({
        url: '/pages/indexImageUrl/index?url='+urls
      })
    }else if( e.currentTarget.dataset.platformurl.urlType == 3 ){

    }else if( e.currentTarget.dataset.platformurl.urlType == 4 ){

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