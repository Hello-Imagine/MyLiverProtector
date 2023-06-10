// pages/records/record_emotion/record_emotion.js
const db=wx.cloud.database()
const _=db.command
var app = getApp();
var calendarSignData4;
var date;
var calendarSignDay;

Page({
  sleep:function  (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },


  radioChange(e) {
    let select=e.detail.value
    this.setData({
      select:select
    })
    console.log('radio发生change事件，携带value值为：', this.data.select)
    
  },

  Calculate:function(){ //算分
    if(this.data.select=='1') this.data.score=5;
    else if(this.data.select=='2') this.data.score=0;
    else if(this.data.select=='3') this.data.score=-10;
  },
 
  Submit:function(){
    
    if (this.data.select == null || this.data.select == "") {
      wx.showToast({
        title: "选择不能为空",
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.Calculate();
    db.collection("records")
    .where({
      _openid:app.globalData.openid,
          year:this.data.year,
          month:this.data.month,
          day:this.data.date,

    })
    .update({
      data:{
        emotion:this.data.score,
       total:_.inc(this.data.score)
      }
      ,success: function(res) {
        
        wx.showToast({
          title: '心情打卡成功',
          icon: 'success',
          duration: 500
        })
      }
    })
    

    
    calendarSignData4[date]=date;
    console.log(calendarSignData4);
    calendarSignDay=calendarSignDay+1;
    wx.setStorageSync("calendarSignData4",calendarSignData4);
    wx.setStorageSync("calendarSignDay",calendarSignDay);
 
   
    this.setData({
      
        calendarSignData4:calendarSignData4,
        calendarSignDay:calendarSignDay
      })

      this.sleep(1200).then(() => {
        wx.redirectTo({
          url: '../../records/record_diet/record_diet',
        })
      })

      
  },
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: '1', name: '今天心情不错',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/emotion1.png'},
      {value: '2', name: '今天心情一般',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/emotion2.png'},
      {value: '3', name: '今天心情不佳',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/emotion3.png'},
      
    ],
    score:0,
    
    select:'',
    openid:'',

    year:'',
    month:'',
    nbsp:'',
    monthDaySize:'',
    date:'',
    calendarSignData4:'',
    calendarSignDay:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.select1='';
    this.data.select2='';
  
    var mydate=new Date();
    var year=mydate.getFullYear();
    var month=mydate.getMonth()+1;
    date=mydate.getDate();
    console.log("date "+date)
    var day=mydate.getDay();
    console.log(day)
    var nbsp=7-((date-day)%7);
    console.log("nbsp"+nbsp);
    var monthDaySize;
    if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
      monthDaySize=31;
    }else if(month==4||month==6||month==9||month==11){
      monthDaySize=30;
    }else if(month==2){
       // 计算是否是闰年,如果是二月份则是29天
      if((year-2000)%4==0){
        monthDaySize=29;
      }else{
        monthDaySize=28;
      }
    };
    // 判断是否签到过
    if(wx.getStorageSync("calendarSignData4")==null||wx.getStorageSync("calendarSignData4")==''){
      wx.setStorageSync("calendarSignData4",new Array(monthDaySize));
    };
     if(wx.getStorageSync("calendarSignDay")==null||wx.getStorageSync("calendarSignDay")==''){
      wx.setStorageSync("calendarSignDay",0);
    }
     calendarSignData4=wx.getStorageSync("calendarSignData4")
      calendarSignDay=wx.getStorageSync("calendarSignDay")
    console.log(calendarSignData4);
    console.log(calendarSignDay)
    this.setData({
        year:year,
        month:month,
        nbsp:nbsp,
        monthDaySize:monthDaySize,
        date:date,
        calendarSignData4:calendarSignData4,
        calendarSignDay:calendarSignDay
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