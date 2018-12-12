Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['当前借阅', '历史借阅'],
    currentTab: 0,
    renewNumber: [],
    barCode: [],
    loanTime: [],
    title: [],
    returnTime: [],
    lenHistory: [],
    titleHistory: [],
    barCodeHistory: [],
    timeHistory: [],
    operation: [],
    fine: [],
    loginUrl: "",
    text: ""
  },
  thatData: function(res) {
    var i;
    var x = [];
    for (i = 1; i < res.lenHistory; i++) {
      x[i - 1] = i;
    }
    this.setData({
      title: res.title,
      trenewNumber: res.renewNumber,
      barCode: res.barCode,
      loanTime: res.loanTime,
      returnTime: res.returnTime,
      lenHistory: x,
      titleHistory: res.titleHistory,
      barCodeHistory: res.barCodeHistory,
      timeHistory: res.timeHistory,
      operation: res.operation,
      fine: res.fine
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      loginUrl: getApp().totalUrl.loginUrl,
    })
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(e.currentTarget.dataset.idx);
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this.thatData;
    var url = this.data.loginUrl;
    wx.request({
      url: url + 'library',
      success: function(res) {
        console.log(res.data.barCode.length);
        console.log(res);
        that(res.data);
      }
    })


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
    console.log(this.data.trenewNumber);
  },
  libraryGet: function(e) {
    var that = this;
    console.log(e);
    var url = this.data.loginUrl;
    wx.request({
      url: url + 'renew/' + that.data.barCode[e.target.id],
      success: function(res) {
        console.log(res.data.success);
        that.setData({
          text: res.data.success
        })
        wx.showToast({
          title: that.data.text,
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
      
    })
   
  }
})