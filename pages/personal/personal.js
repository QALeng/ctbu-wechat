//js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name: "同学",
    known:"我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。 —— 蒙田",
    color: [],
    title: ["未连接","未连接","未连接"],
  },
  thatData: function(res) {
    var color = [];
    var title = [];
    if (res[0] == "图书馆") {
      color[2] = "正常";
      title[2] = "green";
    } else
      {color[2] = "崩溃";
      title[2]="red"}

    if (res[1] == "欢迎使用正方教务管理系统！请登录")
    { color[0] = "正常"; title[0] = "green";}
    else
    { color[0] = "崩溃"; title[0] = "red"}
    if (res[2] == "重庆工商大学 – 统一身份认证平台")
    { color[1] = "正常"; title[1] = "green";}
    else
    { color[1] = "崩溃"; title[1] = "red"}
    this.setData({
      color: title,
      title:color,
    })
  },
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
  },
  onReady: function() {
    var that = this.thatData;
    wx.request({
      url: 'http://127.0.0.1:5000/title',
      success: function(res) {
        console.log(res);
        that(res.data.title);
      }
    })
  },
  zfGet:function(){
    wx.navigateTo({
      url: 'zfLogin/zfLogin'
    })
  },
  jpGet: function () {
    wx.navigateTo({
      url: 'jpLogin/jpLogin'
    })
  }
})