const {
  request
} = require('../../utils/util.js');
// pages/myPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    current: 1,
    size: 20,
    teamList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     this.getTeamInfo()
  },

  // 查询可返利金额
  async getTeamInfo() {
    let datas = {
      current: this.data.current,
      size: this.data.size,
    }
    const res = await request({
      method: "GET",
      url: "/webapi/ap/user/share/user",
      data: datas
    });
    console.log(res,'7777')
    if (res.code == 0) {
      var data = res.data.records;
      var teamList = this.data.teamList;
      var num = this.data.current;
      let that = this;
      if (num == 1) {
        that.setData({
          teamList: data
        })
      } else {
        if (data.length <  this.data.size) {
          --num;
          that.setData({
            current: num,
            teamList: teamList
          })
        } else {
          that.setData({
            teamList: teamList.concat(data)
          })
        }
      }
    } else {
      that.setData({
        teamList: []
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