const app = getApp()

const db = wx.cloud.database()
const records = db.collection('records')

var myDate = new Date()
var yearNow = myDate.getFullYear()
var monthNow = myDate.getMonth() + 1
var dayNow = myDate.getDate()
var statistics = new Array(15)


Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalday: '',
    credit: '',
    diet: '',
    emotion: '',
    sleep: '',
    sport: '',
    alcohol: '',
    total: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('records')
    .where({
      _openid : app.globalData.openid,
      day: dayNow,
      month: monthNow,
      year: yearNow
    })
    .get().then(res =>{
      if(res.data[0] == null){
        this.setData({
          total: 0,
          diet: 0,
          emotion: 0,
          sleep: 0,
          sport: 0,
          alcohol: 0,
        })
      }
      else{
        this.setData({
          total: res.data[0].total,
          diet: res.data[0].diet,
          emotion: res.data[0].emotion,
          sleep: res.data[0].sleep,
          sport: res.data[0].sport,
          alcohol: res.data[0].drink,
      })
      }
    })

    db.collection('user')
    .where({
      _openid : app.globalData.openid
    })
    .get().then(res =>{
      if(res.data[0] == null){
        this.setData({
          credit: 0,
          totalday: 0
        })
      }
      else{
        this.setData({
          credit: res.data[0].credit,
          totalday: res.data[0].totalday
      })
      }
    })
  },

  return: function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  //弹窗组件所需函数

  showPopup1(){
    this.selectComponent('#a').showPopup()
  },
  _success1(){
    this.selectComponent('#a').hidePopup();
  },
  showPopup2(){
    this.selectComponent('#b').showPopup()
  },
  _success2(){
    this.selectComponent('#b').hidePopup();
  },
  showPopup3(){
    this.selectComponent('#c').showPopup()
  },
  _success3(){
    this.selectComponent('#c').hidePopup();
  },
  showPopup4(){
    this.selectComponent('#d').showPopup()
  },
  _success4(){
    this.selectComponent('#d').hidePopup();
  },
  showPopup5(){
    this.selectComponent('#e').showPopup()
  },
  _success5(){
    this.selectComponent('#e').hidePopup();
  },
  showPopup6(){
    this.selectComponent('#f').showPopup()
  },
  _success6(){
    this.selectComponent('#f').hidePopup();
  },
  showPopup7(){
    this.selectComponent('#g').showPopup()
  },
  _success7(){
    this.selectComponent('#g').hidePopup();
  },
  showPopup8(){
    this.selectComponent('#h').showPopup()
  },
  _success8(){
    this.selectComponent('#h').hidePopup();
  },
  showPopup9(){
    this.selectComponent('#i').showPopup()
  },
  _success9(){
    this.selectComponent('#i').hidePopup();
  },
  showPopup10(){
    this.selectComponent('#j').showPopup()
  },
  _success10(){
    this.selectComponent('#j').hidePopup();
  },
  showPopup11(){
    this.selectComponent('#k').showPopup()
  },
  _success11(){
    this.selectComponent('#k').hidePopup();
  },
  showPopup12(){
    this.selectComponent('#l').showPopup()
  },
  _success12(){
    this.selectComponent('#l').hidePopup();
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