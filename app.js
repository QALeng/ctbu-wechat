//app.js
App({
  onLaunch: function() {
    var name;
    wx.getStorage({ //获取本地缓存
      key: "name",
      success: function(res) {
        console.log(res.data)
        name = res.data;
      },
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  totalUrl: {
    // bookSearchUrl: "http://127.0.0.1:5000/",
    // visitUrl: "http://127.0.0.1:5000/",
    // messageUrl: 'http://127.0.0.1:5000/',
    // loginUrl:'http://127.0.0.1:5000/'
    bookSearchUrl: "https://zwz.iocollege.com/",
    visitUrl: "https://zwz.iocollege.com/",
    messageUrl: 'https://zwz.iocollege.com/',
    loginUrl: 'https://zwz.iocollege.com/'
    // bookSearchUrl: "https://qxmu.mynatapp.cc/",
    // visitUrl: "https://qxmu.mynatapp.cc/",
    // messageUrl: "https://qxmu.mynatapp.cc/",
    // loginUrl: "https://qxmu.mynatapp.cc/",
  },
  globalData: {
    userInfo: null
  }
})