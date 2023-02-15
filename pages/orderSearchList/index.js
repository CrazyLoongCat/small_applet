const {
  request
} = require('../../utils/util.js');
// pages/myPage/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    orderdata: [],
    inputData: '',
    pagenum: 1,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      name: options.name
    })
    console.log(this.data.name,'optionsoptions')
     this.getOrderList()
  },

  // 查询订单
  async getOrderList() {
    let storeId = ''
    if( this.data.name == '中免日上' ){
      storeId = 'cdf10000011'
    }else if( this.data.name == 'GDF海控' ){
      storeId = 'gdf_6'
    }
    console.log(storeId,'optionsoptions')
    let res = await request({
      method: "post",
      url: "/webapi/cloud/league/sku/list",
      data: {
          page_index: this.data.pagenum,
          page_size: 20,
          keyword: this.data.inputData,
          external_store_id: storeId,
          sort_name: "3",
          sort: 1
      }
    });
    if( res.code == 0 ){
      var arr1 = this.data.orderdata; //从data获取当前datalist数组
      var arr2 = res.data.data; //从此次请求返回的数据中获取新数组
      arr1 = arr1.concat(arr2); //合并数组
      this.setData({
        orderdata: arr1 //合并后更新datalist
      })
    }
    // console.log(res,this.data.name,'this.data.name')
  },
  async shareBtnother(e){
    let productSource = ''
    if( e.currentTarget.dataset.item.product_source == 'YMALL' ){
      productSource = 1
    }else if( e.currentTarget.dataset.item.product_source == 'OWN' ){
      productSource = 2
    }
    let res = await request({
      method: "post",
      url: "/webapi/ap/user/cl/generate/url",
      data: {
          warehouseId: e.currentTarget.dataset.item.warehouse_id,
          skuId: e.currentTarget.dataset.item.external_sku_id,
          productSource: productSource,
      }
    });

    wx.navigateToMiniProgram({
      appId: res.data.appId,  //appid
      path: res.data.path,//path
      extraData: {  //参数
      },
      //envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
      success(res) {
        console.log('成功')
        // 打开成功
      }
    })
  },
  
  async shareBtnotherUrl(e){
    let productSource = ''
    if( e.currentTarget.dataset.item.product_source == 'YMALL' ){
      productSource = 1
    }else if( e.currentTarget.dataset.item.product_source == 'OWN' ){
      productSource = 2
    }
    let resData = await request({
      method: "post",
      url: "/webapi/ap/user/cl/generate/url",
      data: {
          warehouseId: e.currentTarget.dataset.item.warehouse_id,
          skuId: e.currentTarget.dataset.item.external_sku_id,
          productSource: productSource,
      }
    });

    wx.showModal({
      title: '',
      content: '复制链接分享',
      success(res) {
        wx.setClipboardData({ //复制文本
          data: resData.data.shortUrl,
          success: function (res) {
            wx.getClipboardData({ //获取复制文本
              success: function (res) {
                wx.showToast({
                  title: '复制成功',
                  icon: "none", //是否需要icon
                  mask: "ture" //是否设置点击蒙版，防止点击穿透
                })
              }
            })
          }
        })
        
      }
    })
  },
  sousuoData(){
     this.getOrderList()
  },
  focusHandler(e){
    this.setData({
      inputData: e.detail.value
    })
    this.data.orderdata = [];
    // console.log(this.data.inputData,'55555555555')
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
    var that= this;
    var pagenum = that.data.pagenum + 1; //获取当前页数并+1
    that.setData({
      pagenum: pagenum, //更新当前页数
    })
    that.getOrderList();//重新调用请求获取下一页数据
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})