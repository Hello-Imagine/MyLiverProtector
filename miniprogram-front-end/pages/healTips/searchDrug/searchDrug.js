// pages/searchDrug/searchDrug.js
const db = wx.cloud.database()//数据库
const drug = db.collection('drug')//数据表
const _=db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //药物信息列表
    dataList: [],
    //搜索数据是否存在
    isExist: true,
    //是否显示点击药物信息，初始化为false，测试用true
    showInfo: false,
    //当前点击的药物
    hitDrug: "",
    target:""
  },

  //用户点击确认按钮，不再展示当前药物
  confirm: function(){
    this.setData({
      showInfo: false
    })
  },

  //从数据库中获取数据
  getData: function(alreadyShow){
    wx.cloud.callFunction({
      name:"getInfo",
      data:{
        table:'drug',
        alreadyShow:alreadyShow,
        numOfEachPage: 6 //一个页面加载6个药物项
      }
    }).then(res=>{
      var oldData=this.data.dataList
      var newData=oldData.concat(res.result.data)
      this.setData({
        dataList:newData
     })
     console.log(this.data.dataList)
    })
    console.log(this.data.dataList)
  },
  bindKeyInput: function (e) {
    this.setData({
      target: e.detail.value
    })
  },
  //根据药物名称搜索药物
  searchDrug: function(){
    var target= this.data.target;
    
    //搜索的筛选输入为空，显示所有药物
    if(target==""){
      this.getData(this.data.dataList.length)
      this.setData({
        isExist: true
      })
      return
    }

    wx.cloud.callFunction({
      name:"retrieveInfo",
      data: {
        target: target,
        table: 'drug'
      }
    }).then(res=>{
      if(res.result.data.length==0){
        this.setData({
          isExist: false
        })
      }else{
        this.setData({
          isExist: true
        })
      } 
      //如果不先将dataList渲染为空，前端默认使用之前数组第一个（猜测是系统BUG）
      this.setData({
        dataList: []
      })
      this.setData({
        dataList: res.result.data
      })
    })
  },

  //点击药物图标，展示药物信息
  showInfo: function(res){
    var index=res.currentTarget.dataset.id
    var drug= this.data.dataList[index]
    this.setData({
      hitDrug: drug,
      showInfo: true
    })
  },

  //触底
  onButtom: function(){
    this.getData(this.data.dataList.length)
    console.log(this.data.dataList)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(0)
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

  }
})