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
    bannerList: [],
    urlArr: []
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
//点击跳转
  platformsItemClick(e) {
    if( e.currentTarget.dataset.platformurl.urlType == 1 ){
      // console.log()
      // if( e.currentTarget.dataset.platformurl.platformUrl ){
      //   let arr = e.currentTarget.dataset.platformurl.platformUrl.split('?')
      //   this.setData({
      //     urlArr: arr
      //   })
      // }
      // console.log(this.data.urlArr,'this.data.urlArr')
      // wx.navigateTo({
      //   url: '/pages/h5index/index',
      //   success:  (res) => {
      //     // 通过eventChannel像跳转的页面传参数
      //     res.eventChannel.emit('jumpRevoke', {
      //         id: this.data.urlArr[1],
      //         url: this.data.urlArr[0]
      //     })
      //    }
      // })
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
      let urls = 'https://huahua.bj.cn/webapi/' + e.currentTarget.dataset.platformurl.platformUrl
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

    }
  },
  //点击名称跳转GDF
  //点击名称跳转中免日上
   async platformNameClick(e){
      wx.navigateTo({
        url: '/pages/orderSearchList/index?name='+ e.currentTarget.dataset.item.platformName
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