const app = getApp()

// const db = wx.cloud.database()
// const records = db.collection('records')

// const testDB = wx.cloud.database({
//   env: "test-7gu8p01ice968a6d"
// })


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
    total: '',

    display:false,
    choice:'',
    pic:[{url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail1.png"},
    {url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail2.png"},
    {url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail3.png"},
    {url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail4.png"},
    {url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail5.png"},
    {url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail6.png"},
    {url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail7.png"},
    {url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail8.png"},
    {url:"http://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/wiki/detail9.png"},]
  },

  return: function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // db.collection('records').doc('17453ede6072dc5f0146e35414955d0c')
    // .get().then(res => {
    //   this.setData({
    //     total: res.data.total,
    //     diet: res.data.diet,
    //     emotion: res.data.emotion,
    //     sleep: res.data.sleep,
    //     sport: res.data.sport,
    //     alcohol: res.data.drink
    //   })
    // })
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

  display0:function(){
    this.setData({
      display:true,
      choice:0
    })
  },
  display1:function(){
    this.setData({
      display:true,
      choice:1
    })
  },
  display2:function(){
    this.setData({
      display:true,
      choice:2
    })
  },
  display3:function(){
    this.setData({
      display:true,
      choice:3
    })
  },
  display4:function(){
    this.setData({
      display:true,
      choice:4
    })
  },
  display5:function(){
    this.setData({
      display:true,
      choice:5
    })
  },
  display6:function(){
    this.setData({
      display:true,
      choice:6
    })
  },
  display7:function(){
    this.setData({
      display:true,
      choice:7
    })
  },
  display8:function(){
    this.setData({
      display:true,
      choice:8
    })
  },

  hide:function(){
    this.setData({
      display:false
    })
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