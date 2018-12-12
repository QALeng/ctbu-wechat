// pages/zfLogin/zfLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: " ",
    yzm: '',
    userid: '',
    passwd: '',
    yzm_focus: false,
    userid_focus: false,
    passwd_focus: false,
    loginUrl:"",
    name:"",
    success:"",
  },
  thatData2: function (the) {
    this.setData({
      name: the.name,
      success:the.success,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.setData({
      loginUrl: getApp().totalUrl.loginUrl,
    })
    var url = this.data.loginUrl;
    var thatData = this.thatData;
    wx.request({
      url: url + 'code', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var random = Math.round(Math.random() * 10000);
        var imgUrl = url + "static/image/code2.jpg?" + random;
        thatData(imgUrl);
      }

    });
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
    var url = this.data.loginUrl;
    var thatData = this.thatData;
    wx.request({
      url: url+'code', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var random = Math.round(Math.random() * 10000);
        var imgUrl = url+"static/image/code2.jpg?" + random;
        thatData(imgUrl);
      }

    });
  },
  mybind: function() {
    var url = this.data.loginUrl;
    var that=this.thatData2;
    wx.request({
      url: url+'login/' + this.data.yzm + this.data.userid + '/' + this.data.passwd,
      fail:function(res){
        console.log(res);
      },
      success:function(res){
          console.log(res.data);
          that(res.data);
        wx.setStorage({
          key:"name",
          data:res.data.name,
          key:"success",
          data:res.data.success,
        })
      }  
    })
    wx.navigateTo({
      url: "/pages/personal/test/test"
    })
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 50) {
      wx.hideKeyboard();
    }
  },
  useryzmInput: function(e) {
    this.setData({
      yzm: e.detail.value
    });
    if (e.detail.value.length >= 4) {
      wx.hideKeyboard();
    }
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