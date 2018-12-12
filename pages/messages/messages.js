Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 储存新闻的标题
    text: [],
    // 每一条新闻对应的ID
    textId0: 0,
    textId1: 1,
    textId2: 2,
    textId3: 3,
    textId4: 4,
    textId5: 5,
    textId6: 6,
    textId7: 7,
    textId8: 8,
    textId9: 9,
    textId10: 10,
    textId11: 11,
    textId12: 12,
    textId13: 13,
    textId14: 14,
    textId15: 15,
    textId16: 16,
    textId17: 17,
    textId18: 18,
    textId19: 19,
    // 此页解释
    explain: "【此页说明】由于各种因素各类新闻只有20条，若有不便敬请谅解！！！如遇系统崩溃，请稍后再试！！！",
    // 每一种类型对应的id
    typeId1: 20,
    typeId2: 21,
    typeId3: 22,
    typeId4: 23,
    typeId5: 24,
    typeId6: 25,
    typeId7: 26,
    typeComment: '',//默认
    comment: ['【聚焦工商大】', '【综合新闻】', '【公告新闻】', '【教学科研】', '【学团动态】', '【招生说明】', '【外媒·CTBU】', '此页说明'],//储存新闻类型的数组
    newsDate: [],//新闻的日期
    judge: 'Null',
    feedBack: "",
    titleClass: 'titleClass',
    borderBottom:"borderBottom"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = getApp().totalUrl.messageUrl + 'title/0';
    var title;
    var date;
    var that=this;
    var judge="Null";
    console.log(url);
    wx.request({
      url: url,
      success: function (res) {
        title = res.data.storageTitle;
        date = res.data.storageDate;
        console.log('ddd');
        try {
          if(title.length!=0){
            that.setData({ newsDate: date });
            that.setData({ text: title });
            that.setData({ judge: 'True' });
          }
          else
            throw 'error'
        }catch(error)
        {
          that.setData({ judge: 'Null' });
          console.log('null');
        }finally{
            judge=that.data.judge;
            if(judge=="True")
            {
              that.setData({ typeComment: '【聚焦工商大】' });
            }else{
              that.setData({ typeComment: ''});
              that.setData({ feedBack: "加载失败"})
            }
        }
      },
      fail:function(res){
        console.log('onLoad');
        that.setData({ typeComment: '' });
        that.setData({ feedBack: "加载失败" });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //用于切换到相应主题的文章
  button: function (e) {
    var judge = this.data.judge;
    console.log(judge);
    if (judge == "True") {
      var n = e.target.id;
      console.log('id=' + n);
      var text = new Array();
      var str = getApp().totalUrl.messageUrl + 'showdetail/' + n;
      // var str = 'https://ctbu.mynatapp.cc/showdetail/' + n;    
      var judge = this.data.judge;
      console.log(str);
      const requestTask = wx.request({
        url: str,
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          text = res.data.bodyText;
          wx.setStorageSync('lastText', text);
          var total = '../messagesDetail/messagesDetail?key=' + n;
          console.log('total');
          wx.navigateTo({
            url: total
          })
          return res.data;
        }
      })
    } else {
      wx.setStorageSync('lastText', '');
      this.setData({ feedBack: "" });
    }
  },
  // 类型转换函数
  typeButton: function (event) {
    var typeId = event.target.id;
    var typeIdNumber = parseInt(typeId) - 20;//类型对应的下标
    var comment = this.data.comment;
    var commentStr = comment[typeIdNumber];
    var clearScreen = this.clearScreen;
    var str = getApp().totalUrl.messageUrl + 'title/' + typeIdNumber;
    // var str = 'https://ctbu.mynatapp.cc/title/' + typeIdNumber;
    var change = this.change;
    var title;
    var date;
    var that=this;//为了避免this被覆盖
    var setJudge = this.setJudge;
    var judge;//用于处理异常情况
    const requestTask = wx.request({
      url: str,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        title = res.data.storageTitle;
        date = res.data.storageDate;
        judge = res.data.judge;
        try {
          if(judge=='True'){
            that.setData({ newsDate: date });
            that.setData({ text: title });
            that.setData({ judge: 'True' });
            change(title, date, commentStr);
          }
          else
            throw 'error'
        } catch (error) {
          that.setData({ judge: 'Null' });
          console.log('null');
        } finally {
          judge = that.data.judge;
          if(judge=='Null'){
            console.log('failure');
            that.setData({ typeComment: '' });
            that.setData({ text: '' });
            console.log(that.data.typeComment);
            that.setData({ feedBack: "加载失败" })
          }
        }
        // setJudge(judge);
        // console.log(222);
        // // wx.removeStorageSync('lastText');
        return;
      },
      fail: function (res) {
        console.log("failure2");
        that.setData({ text: '' });
        that.setData({ judge: 'Null' });
        that.setData({ typeComment: '' });
        that.setData({ feedBack: "加载失败" });   
      }
    })
  },
  // 改变标题，日期和类型函数
  change: function (title, date, comment) {
    var judge = this.data.judge;
    if (judge == 'True') {
      this.setData({ text: title });
      this.setData({ newsDate: date });
      this.setData({ typeComment: comment });
      this.setData({ feedBack: "" });
    } else {
      this.setData({ text: '' });
      this.setData({ newsDate: '' });
      this.setData({ typeComment: '' });
      this.setData({ feedBack: " 加载失败" });
    }
  },
  // 此页解释按钮
  commentButton: function () {
    var explain = this.data.explain;
    var newText = [];
    newText[0] = explain;
    this.setData({ text: newText });
    this.setData({ newsDate: [] });
    this.setData({ typeComment: '' });
    this.setData({ feedBack: "" });
    console.log('Sucess');
  },//设置判断函数
  setJudge: function (judge) {
    this.setData({ judge: judge });
  }
})