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
    inputData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.name,'optionsoptions')
    this.setData({
      name: options.name
    })
     this.getOrderList()
  },

  // 查询订单
  async getOrderList() {
    let res
    if( this.data.name == 'GDF海控' ){
      res = await request({
        method: "post",
        url: "/webapi/cloud/league/sku/list",
        data: {
            page_index: 1,
            page_size: 20,
            keyword: this.data.inputData,
            external_store_id: "gdf_6",
            sort_name: "4",
            sort: 1
        }
      });
    }else if( this.data.name == '中免日上' ){
        res = await request({
        method: "post",
        url: "/webapi/cloud/league/sku/list",
        data: {
            page_index: 1,
            page_size: 20,
            external_store_id: "gdf_6",
            sort_name: "4",
            sort: 1
        }
      });
    }
    this.setData({
      orderdata: res.data.data
    })
    console.log(res,this.data.name,'this.data.name')
  },
  shareBtnother(e){
    // console.log(e,'00000000000')
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.item.sales_info[0].miniprogram_appid,  //appid
      path: e.currentTarget.dataset.item.sales_info[0].url_miniprogram,//path
      extraData: {  //参数
       
      },
      envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
      success(res) {
        console.log('成功')
        // 打开成功
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})