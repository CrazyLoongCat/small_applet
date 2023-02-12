let isRefreshing = true; // 请求锁
let pendings = []; // 请求列表
const pathArr = ['pages/buy-goods/index']; // 不需要登录的路径 
 var baseUrl = null; // 基础路径

const { miniProgram: { envVersion } } = wx.getAccountInfoSync();
console.log(envVersion,'8888888888888888')
switch (envVersion) {
    case "develop": // 开发版
        //  baseUrl = "https://huahua.bj.cn";
        baseUrl = "http://82.156.242.246:60001";
        break;
 
    default:    // 正式版
          //  baseUrl = "http://82.156.242.246:60001";
        baseUrl = "https://huahua.bj.cn";
        break;
}
function request({
  method,
  url,
  data,
  options = {
    needLogin: true
  }
}) {
  const token = wx.getStorageSync('token')
  const pages = getCurrentPages();
  const router = pages[pages.length - 1]['route']; // 当前路由
  if (pathArr.includes(router)) options.needLogin = false; // 当前路径是否需要登录
  return new Promise((resolve, reject) => {
 
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    // 请求主体
    wx.request({
      url: baseUrl + url,
      header: {
        token: token.token
      },
      method,
      data,
      success(res) {
        let code = res.data.code
        if (code == '0') {
          resolve(res.data)
        } else if (code == '1021') {
          if (isRefreshing) {
           updateToken();
            isRefreshing = false;
            pendings.push(() => {
              resolve(request({
                method,
                url,
                data,
                options
              }))
            })
          }
        }
        else if( code == '1023' ){
          wx.navigateTo({
            url: '/pages/loginButtonIndex/index'
          })
        }
        else {
          resolve(res.data);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    })
  })
}

// 刷新token
function updateToken() {
  // 登录
  wx.login({
    success: res => {
      wx.request({
        url: baseUrl + "/webapi/ap/system/login",
        data: {
          "jsCode": res.code
        },
        method: "POST",
        header: {},
        success: function (res) {
          let code = res.data.code
          if (code == '0') {
            wx.setStorageSync('token', res.data.data)
            console.log(pendings)
            pendings.map((callback) => {
              callback();
            })
            isRefreshing = true;
          }
        },
        fail: function (data) {
          reject(data);
        }
      })
    }
  })
}

module.exports.baseUrl=baseUrl
module.exports = {
  baseUrl,
  request
};