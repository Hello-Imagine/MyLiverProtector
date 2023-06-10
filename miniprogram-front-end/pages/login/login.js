// pages/login/login.js
var app = getApp()
var date = new Date()

const db = wx.cloud.database()
const _=db.command
const user = db.collection('user')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认用户已注册该小程序
    isExist: true,
    //开始漫画剧情图片地址
    imgUrls:[
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/swiper1.jpg",
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/swiper2.jpg",
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/swiper3.jpg",
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/swiper4.jpg",
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/swiper5.jpg",
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/swiper6.jpg",
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/swiper7.jpg",
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/swiper8.jpg",
      "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/login/background.jpg"
    ],
    //测试轮播图显示
    test:false,
    totalday:0
  },

  //轮播图结束，进行页面跳转
  finish: function(e){
    var index = e.detail.current
    
    console.log(index)
    if(index ==  this.data.imgUrls.length-1){
      
      wx.redirectTo({
        url: './user/user'
      })
    }
  },

  getToday: function(){
    return date.getFullYear().toString()+date.getMonth()+date.getDate()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否存在   
    var id = app.globalData.openid
    user.where({
      _openid: _.eq(id)
    }).get()
    .then(res=>{
      //如果用户不存在，返回一个长度为0的对象数组
      if(res.data.length==0){
        //该用户第一次使用小程序，创建一个新的用户记录
        this.setData({
          isExist: false
        })
        user.add({
          data:{
            credit:0,
            totalday:1,
            //最近一次用户登录的时间
            recentday: this.getToday()
          }
        })
      }else{
        //初始化全局变量
        app.globalData.totalday=res.data[0].totalday
        app.globalData.credit=res.data[0].credit
        console.log('app.globalData.totalday:'+app.globalData.totalday)
        console.log('app.globalData.credit:'+app.globalData.credit)

        //如果是当天第一次登录,登录天数增加
        if(res.data[0].recentday!= this.getToday()){
          app.globalData.totalday=res.data[0].totalday+1
          user.where({
            _openid: _.eq(id)
          }).update({
            data:{
              totalday: app.globalData.totalday,
              recentday: this.getToday()
            }
          })
        }
        //数据流入前端界面层显示
        this.setData({
          totalday: app.globalData.totalday
        })
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