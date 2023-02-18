const {
  request
} = require('../../utils/util.js');
// pages/myPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [],
    current: 1, //当前页数
    size: 10, //每页笔数 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.getHot()
  },

  //热门活动 立即查看
  chakan(e){
    console.log(e,'999999999')
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.app.wx_app_id,  //appid
      path: e.currentTarget.dataset.app.wx_app_path,//path
      extraData: {  //参数
      },
      envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
      success(res) {
        console.log('成功')
        // 打开成功
      }
    })
  },
  // 热门活动
async getHot() {
  const res = await request({
    method: "GET",
    url: "/webapi/cloud/league/activity/search",
    data: {
      current: this.data.current, //当前页数
      size: this.data.size, //每页笔数  
    }
  });
  if( res.code == 0 ){
    var arr1 = this.data.activityList; //从data获取当前datalist数组
    var arr2 = res.data.activity_list; //从此次请求返回的数据中获取新数组
    arr1 = arr1.concat(arr2); //合并数组
    this.setData({
      activityList: arr1 //合并后更新datalist
    })
  }
  console.log(this.data.activityList,'bannerList')
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
    var pagenum = that.data.current + 1; //获取当前页数并+1
    that.setData({
      current: pagenum, //更新当前页数
    })
    that.getHot();//重新调用请求获取下一页数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})