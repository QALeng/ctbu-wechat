// pages/jpLogin/jpLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzm_focus: false,
    userid_focus: false,
    passwd_focus: false,
    yzm: '',
    userid: '',
    passwd: '',
    angle: 0,
    imgurl: " "
  },
  thatData: function (the) {
    this.setData({
      imgurl: the
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  thatData: function(the) {
    this.setData({
      imgurl: the
    });
  },
  buttonimage: function() {
    var thatData = this.thatData;
    wx.request({
      url: 'http://127.0.0.1:5000/libraryCode', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var random = Math.round(Math.random() * 10000);
        console.log(res.data)
        var len = res.data.length
        
        var imgUrl = res.data + random;
        thatData(imgUrl);
      }

    });

  },
  mybind: function() {
    wx.request({
      url: 'http://127.0.0.1:5000/libraryLogin/' + this.data.userid + '/' + this.data.passwd + '/' + this.data.yzm,
    })
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 10) {
      wx.hideKeyboard();
    }
  },
  useryzmInput: function(e) {
    this.setData({
      yzm: e.detail.value
    });

  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function(e) {

    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id == 'yzm') {
      this.setData({
        'yzm_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    } else if (e.target.id == 'yzm') {
      this.setData({
        'yzm_focus': false
      });
    }
  },
})