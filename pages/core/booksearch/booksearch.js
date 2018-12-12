Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent:"",//搜索内容
    total:[],//返回的总的数据
    feedBackData:"",//如果返回的数据为空或者访问失败给出的提示
    corename:['all',"Book","Journal"],//搜索类型
    // 全部，图书，期刊，万方
    // type1:0,
    searchModel:['front','seg','contain','exact'],//搜索模式
    // 前方搜索，分词检索，包含，绝对一致
    // model:0,
    field: ['title', 'abstract', 'creatorSearch', 'publisher', 'isbnSearch', 'callNumberSearch', 'subject','all'],//搜索范围
    // 题名，摘要，责任者，出版者，标准编码，索书号，主题词，全部字段
    // field1:0,
    disk:['no','yes'],//随书光盘
    // disk1:0,
    array:[0,0,0,0],
    //对应corename,searchModel,field,disk
    pages:0,//总共的页数
    nowPage:"",
    nowClass:"",
    nextText:"",//下一页
    lastText:"",//上一页
    lastClass:"",//上一页的样式
    nextClass:"",
    pageNumber:"",//当前的页数
    inputPage: "",//页面跳转输入框的内容
    totalPages:"",//页面跳转输入框的样式
    confirm: "",//页面跳转确认
    confirmContent:"",
    toPage:""//输入跳转的页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  //输入
  searchInput: function (e) {
    this.setData({ searchContent: e.detail.value });
  },
  toPagesInput: function (e) {
    this.setData({ toPage: e.detail.value });
    console.log(e.detail.value);
  },
  // 用于美化初始页面
  bottomChange:function(lastText,lastClass,nextText,nextClass,nowText,nowClass){
    this.setData({lastText:lastText});
    this.setData({nextText:nextText});
    this.setData({lastClass:lastClass});
    this.setData({nextClass:nextClass});
    this.setData({nowPage:nowText});
    this.setData({nowClass:nowClass});
  },//接到bottomChange
  secondChange:function(judge){
    if(judge){
      this.setData({ pageNumber: 1 });
      this.setData({ inputPage: 'inputPage' });
      this.setData({ confirm: "confirm" });
      this.setData({ confirmContent: "确认" });
      var pages = this.data.pages;
      this.setData({ totalPages: "请输入页数  " + "总页数为：" + pages });
    }else{
      this.setData({ pageNumber: ''});
      this.setData({ inputPage: '' });
      this.setData({ confirm: "" });
      this.setData({ confirmContent: "" });
      var pages = this.data.pages;
      this.setData({ totalPages: "" });
    }
  },
  totalSetData: function (total) {
    this.setData({ total: total });
    console.log('sucess');
  },
  // 获取返回值
    manySetData:function(total,judge,pages){
    if(total.length==0){
      if (judge == 1) 
        this.setData({ feedBackData: "无该字眼的书或者访问失败" });
      this.bottomChange("","","","","","");
      this.secondChange(0);
    }
    else
      this.setData({feedBackData:""})
      this.setData({total:total});
      this.setData({pages:pages});
    console.log('sucess');
  },
  //搜索按钮
  searchButton:function(){
    var judge='Null';//用于处理异常情况
    var a=this.data.array;
    var type1 = a[0];//搜索类型
    var searchType = this.data.corename;
    var model = a[1];//搜索模式
    var searchModel = this.data.searchModel;
    var field = a[2];//搜索范围
    var searchField = this.data.field;
    var disk1 = a[3];//随书光盘
    var searchDisk = this.data.disk;
    var total;
    var that=this.manySetData;
    var changeClass=this.bottomChange;
    var secondChange=this.secondChange;
    var keyWord=this.data.searchContent;//搜索的关键字
    var filed;//搜索范围
    var searchModel;//搜索的模式
    var theSame;//地址相同的部分
    var pages;//页数
    var thisPoint=this;
    if (keyWord.length!=0){
      this.setData({ feedBackData: "" });
      var requestUrl = getApp().totalUrl.bookSearchUrl + 'search/' + keyWord + '/' + searchModel[model] + '/' + searchType[type1] + '/' + searchField[field] + '/' + searchDisk[disk1];
      console.log(requestUrl);
      wx.request({
        url: requestUrl,
        success: function (res) {
          total = res.data.searchResult;
          console.log(res.data.data1);
          judge=res.data.judge;
          try{
            if (judge == "True") {
              pages = res.data.pages;
              console.log(pages);
              that(total, 1, pages);
              changeClass("上一页", "lastButton", "下一页", "nextButton", "当前页数：", 'nowPage');
              secondChange(1);
              console.log('next');
            } else {
              throw 'Null';
            }}catch(error){
              judge=error;
          }finally{
            if(judge=="Null"){
              console.log('lllll');
              changeClass("", "", "", "", "", '');
              total = [];
              that(total, 1,1);
              thisPoint.setData({ judge: 'Null' });
            }
          }
          // if(judge!='Null'&&judge!=='True'){
          // }else if(judge=='True'){
          //   
          // }
          // return;
        }
      })
    }else{
      this.setData({ feedBackData:"请输入关键字"});
    }
  },
  //设置搜索按钮
  setSearch:function(){
    var a=this.data.array;
    var setUrl = '../setSearch/setSearch?type1='+a[0]+'&model='+a[1]+'&field='+a[2]+'&disk='+a[3];
    console.log(setUrl);    
    wx.navigateTo({
      url: setUrl
    })
  },
  // 切换到下一页
  nextPage:function(){
    var pagesNumber=this.data.pages;
    var nowNumber=this.data.pageNumber;
    var nN=parseInt(nowNumber);
    var nextUrl;
    var that=this.totalSetData;
    var total=[];
    if(nN<pagesNumber)
    {
      nN = nN + 1;
      var passPage = nN - 1;
      var str=''+passPage;
      // nextUrl = "http://127.0.0.1:5000/changePage/"+str;
      nextUrl = getApp().totalUrl.bookSearchUrl+"changePage/" + str;      
      wx.request({
        url: nextUrl,
        success:function(res){
          total = res.data.searchResult;
          that(total);
          return ;
        }
      })
    }
    else
      nN=pagesNumber;
    console.log(nN);
    this.setData({pageNumber:nN});
  },
  // 切换到上一页
   lastPage: function () {
    var pagesNumber = this.data.pages + 1;
    console.log(pagesNumber);
    var nowNumber = this.data.pageNumber;
    var lastUrl;
    var that = this.totalSetData;
    var total = [];
    var nN = parseInt(nowNumber);
    if (nN>1)
    {
      nN = nN-1;
      var passPage=nN-1;
      var str = '' + passPage;
      lastUrl = getApp().totalUrl.bookSearchUrl+"changePage/" + str;
      wx.request({
        url: lastUrl,
        success: function (res) {
          total = res.data.searchResult;
          that(total);
          return;
        }
      })
    }
    else
      nN = 1;
    console.log(nN);
    this.setData({ pageNumber: nN });
  },
  // 跳转确认按钮
  confirmButton:function(){
    var toPage=this.data.toPage;
    console.log(toPage);
    var tP=parseInt(toPage);
    var str = getApp().totalUrl.bookSearchUrl+"changePage/";
    var maxPage=this.data.pages+1;
    var that = this.totalSetData;
    var total = [];
    console.log('comfirm');
    console.log(tP);
    if (tP>0&&tP<=maxPage)
    {
      this.setData({ pageNumber:tP});
      var passPage = tP-1;
      str = str + passPage;
      wx.request({
        url: str,
        success: function (res) {
          total = res.data.searchResult;
          that(total);
          return;
        }
      })
    }
  },
  copyButton: function (res) {
    var numberText = res.target.dataset.text;
    // console.log(numberText);
    wx.setClipboardData({
      data: numberText,
    })
    }
})