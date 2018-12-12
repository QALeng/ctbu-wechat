Page({
  data: {
    array: ['全部', '图书', '期刊'],//搜索类型
    objectArray: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '图书'
      },
      {
        id: 2,
        name: '期刊'
      }
    ],
    selectType: 0,
    array2: ['前方一致', '分词搜索', '包含', '绝对一致'],//搜索模式
    objectArray2: [
      {
        id: 0,
        name: '前方一致'
      },
      {
        id: 1,
        name: '分词搜索'
      },
      {
        id: 3,
        name: '包含'
      },
      {
        id: 4,
        name: '绝对一致'
      }
    ],
    selectModel: 0,
    array3: ['题名', '摘要', '责任者', '出版者','标准编码','索书号','主题词','全部字段'],//搜索范围
    objectArray3: [
      {
        id: 0,
        name: '题名'
      },
      {
        id: 1,
        name: '摘要'
      },
      {
        id: 3,
        name: '责任者'
      },
      {
        id: 4,
        name: '出版者'
      },
      {
        id: 5,
        name: '标准编码'
      },
      {
        id: 6,
        name: '索书号'
      },
      {
        id: 7,
        name: '主题词'
      },
      {
        id: 8,
        name: '全部字段'
      }
    ],
    selectField: 0,
    array4: ['无', '有'],//随书光盘
    objectArray4: [
      {
        id: 0,
        name: '无'
      },
      {
        id: 1,
        name: '有'
      }
    ],
    selectDisk: 0
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (op) {
    var selectType = op.type1;
    var selectField = op.field;
    var selectModel = op.model;
    var selectDisk=op.disk;
    this.setData({selectType:selectType});
    this.setData({selectModel:selectModel});
    this.setData({selectField:selectField});
    this.setData({selectDisk:selectDisk});
  },
  // 选择类型函数
  searchType: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectType: e.detail.value
    })
    // wx.setStorageSync('type', e.detail.value);
  },
  // 选择搜索模式函数
  searchModel: function (e) {
    // console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectModel: e.detail.value
    })
    // wx.setStorageSync( 'model', e.detail.value);
  },
  // 选择搜索范围函数
  searchField: function (e) {
    // console.log('picker3发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectField: e.detail.value
    })
    // wx.setStorageSync('field',e.detail.value );
  },
  // 选择随书光盘函数
  isDisk: function (e) {
    // console.log('picker4发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectDisk: e.detail.value
    })
    // wx.setStorageSync('disk',e.detail.value);
  },
  // 提交按钮
  back:function(){
    // wx.navigateTo({
    //   url: '../bookSearch/bookSearch'
    // })
    var pages=getCurrentPages();
    var prevPage=pages[pages.length-2];//上一个页面
    var type1=this.data.selectType;
    var model=this.data.selectModel;
    var field=this.data.selectField;
    var disk=this.data.selectDisk;
    var b=[type1,model,field,disk];
    prevPage.setData({
      array:b
    })
    wx.navigateBack({
      delta: 1
    })
  }
})