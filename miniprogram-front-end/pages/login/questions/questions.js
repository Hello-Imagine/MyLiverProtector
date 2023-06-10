// pages/login/questions/questions.js
var app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qestions:[
      "经常失眠，或者1点后睡觉",
      "每周常常喝酒、吃烧烤",
      "神经衰弱，记忆力下降",
      "有时无端感到疲惫、烦躁、焦虑忧郁",
      "皮肤黄疸色，尿液啤酒色",
      "口臭，身体有异味",
      "消化不良，腰部赘肉增加",
      "大便稀黏腥臭，不易冲掉",
      "脸颊两边有肝斑，指甲有明显条纹",
      "有时手脚发凉，四肢发麻",
      "小肚子常有胀气",
      "眼睛干涩或死鱼眼",
    ]
  },

  radiochange: function(e){
   var n = e.detail.value.length
   console.log("e "+e)
   console.log("n "+n)
   if(95 - n*7<=40){
     app.globalData.credit = 40
   }else{
     app.globalData.credit = 95 - n*7
   }
   console.log("credit "+app.globalData.credit)
   
   db.collection('user').where({
     _openid: app.globalData.openid
   }).update({
     data:{
       credit: app.globalData.credit
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('user').where({
      _openid: app.globalData.openid
    }).update({
      data:{
        credit: app.globalData.credit
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

  }
})