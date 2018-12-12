// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:[],
    totalGPA:"",
    lookText:"",
    date: ['2016-2017','2017-2018', '2018-2019', '2019-2020'],
    objectDate: [
      {
        id: 0,
        name: '2016-2017'
      },
      {
        id: 1,
        name: '2017-2018'
      },
      {
        id: 2,
        name: '2018-2019'
      },
      {
        id: 3,
        name: '2019-2020'
      }
    ],
    index: 1,
    term:['第一学期','第二学期'],
    objectTerm:[
      {
        id:0,
         name:"第一学期"
      },
      {
        id:1,
        name:"第二学期"
      }
    ],
    index2:0,
    judge:"Null",//用于判断是否访问成功
    feedBackData:'',//用于反馈数据
    total:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    var score = [];
    var visitUrl = getApp().totalUrl.visitUrl;
    var url = visitUrl + "score/2017-2018/1";
    var that=this;//防止this的被覆盖
    var judge="Null";
    var semesterGradePoint = this.semesterGradePoint;
    wx.request({
      url: url,
      success: function (res) {
        score = res.data.score;
        judge=res.data.judge;
        try {
          if (judge == "True") {
            that.setData({ score: score });
            semesterGradePoint(score);
            that.setData({ total:'total'});
          } else {
            throw 'Null';
          }
        } catch (error) {
          judge = error;
        } finally {
          if (judge == "Null") {
            that.setData({judge:'Null'});
            that.setData({ total: '' });
            that.setData({ feedBackData:"登录失败或者该学期无成绩"});
          }
        }
      },
      fail:function(){
        console.log("failure");
        that.setData({ judge: 'Null' });
        that.setData({ total: '' });
        that.setData({ feedBackData: "登录失败或者该学期无成绩" });
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
  // 计划用这种方法简化步骤
  look:function(e){
    var look = e.target.dataset.text;
    this.setData({lookText:look});
    var score=this.data.score;
    var scoreLength=score.length;
    var course=[];
    var courseLength=0;
    var courseDetail=[];
    var record=-1;//用于记录课程位置
    var i=0,j=0;//循环控制变量
    for(i=0;i<scoreLength;i++)
    {
      course=score[i];
      courseLength=course.length;
      for(j=0;j<courseLength;j++)
      {
        if(course[j]==look)
         {
           record=i;
            break;
         }
      }
      if(record!=-1)
        break;
    }
    console.log(record);
    console.log(score[record]);
    wx.setStorageSync('scoreDetails', score[record]);
    wx.navigateTo({
      url: '../displayScore/displayScore',
    })
  },
  //修改日期
  changeDate: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //修改学期
  changeTerm:function(e){
    var term = e.detail.value;
    this.setData({index2:term});
  },
  //学期绩点
  semesterGradePoint:function(array){
    console.log("failure");
    var length=array.length;//数组长度
    console.log("failure");
    var finalGrade=0;//综合成绩
    var credit=0;//学分
    var i=0;//循环控制变量
    var total=0;//学分乘以绩点之和
    var totalCredit=0;//总的学分
    var result=0;//平均绩点
    var course=[];//科目
    if(length==0)
      this.setData({ totalGPA:''});
    else{
      for(i=0;i<length;i++)
      {
        course=array[i];
        finalGrade=parseFloat(course[5]);
        credit=parseFloat(course[2]);
        if(finalGrade<=59)
          finalGrade=0;
        else
          finalGrade=(finalGrade-50)/10;
        total=total+credit;
        result=result+finalGrade*credit;
      }
      result=result/total;
      result=this.toFix(result);
      this.setData({ totalGPA:'学期绩点为：'+result});
    }
  },
  changeScore:function(score){
    this.setData({score:score});
  },
  //使绩点保留两位数字
  toFix: function (value) {
    return value.toFixed(2)
  },
  //刷新
  redrawButton:function(){
    var score = [];
    var that=this;//防止this被覆盖
    var judge='Null';//用于异常处理
    var changeScore=this.changeScore;
    var semesterGradePoint = this.semesterGradePoint;
    var date=this.data.date;
    var index=this.data.index;
    var index2=this.data.index2;
    var term=parseInt(index2)+1;
    var visitUrl = getApp().totalUrl.visitUrl;
    var url = visitUrl+"score/"+date[index]+'/'+term;
    console.log(url);
    wx.request({
      url: url,
      success: function (res) {
        score = res.data.score;
        judge = res.data.judge;
        try {
          if (judge == "True"&&score.length!=0) {
            that.setData({ score: score });
            wx.setStorageSync('score', score);            
            semesterGradePoint(score);
            that.setData({ feedBackData: "" });
            that.setData({ total: 'total' });
            // throw 'True';
          } else {
               throw 'Null';
          }
        } catch (e) {
          judge =e ;
        } finally {
          if (judge == "Null") {
            console.log("Null");
            that.setData({ total: '' });            
            that.setData({ judge: 'Null' });
            that.setData({ score: [] });
            that.setData({ totalGPA: "" });
            that.setData({ feedBackData: "登录失败或者该学期无成绩" });
          }
        }
      },
      fail:function(){
        score=[];
        that.setData({ total: '' });     
        that.setData({ score: score });
        that.setData({ judge: 'Null' });
        that.setData({ totalGPA:""});
        that.setData({ feedBackData: "登录失败或者该学期无成绩" });
      }
    })
  }
})