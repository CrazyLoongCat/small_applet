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
     this.getOrderList()
  },

  // 查询订单
  async getOrderList() {
    let res = await request({
      method: "post",
      url: "/webapi/cloud/league/sku/list",
      data: {
          page_index: this.data.pagenum,
          page_size: 20,
          keyword: this.data.inputData,
          external_store_id: 'cdf10000011',
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