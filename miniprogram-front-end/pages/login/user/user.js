const db = wx.cloud.database()
const user_db = db.collection('user')
var app = getApp()

var user = {
  "name": "护肝使者",
  "sex": 1
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getName(e){
    user["name"] = e.detail.value
  },

  getSex(e){
    console.log(e)
    user["sex"] = parseInt(e.detail.value)
    console.log(user)
  },

  finish(){
    var id = app.globalData.openid
    user_db.where({
      _openid: id
    }).update({
      data:user
    }).then(res=>{
      console.log("护肝使者基本信息录入完成")
    })
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

  }
})