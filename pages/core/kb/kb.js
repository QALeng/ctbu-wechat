Page({

  /**
   * 页面的初始数据
   */
  data: {
    kb1_2: [],
    kb3_4: [],
    kb5_6: [],
    kb7_8: [],
    kb9_10: [],
  },
  thatData: function (res) {
    this.setData({
      kb1_2: res.data.kb1_2,
      kb3_4: res.data.kb3_4,
      kb5_6: res.data.kb5_6,
      kb7_8: res.data.kb7_8,
      kb9_10: res.data.kb9_10
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
    var thatData = this.thatData;
    wx.request({
      url: 'http://127.0.0.1:5000/kb',
      success: function (res) {
        console.log(res.data);
        console.log(res);
        thatData(res);
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

  }
})