// pages/records/record_alcohol/record_alcohol.js
const db=wx.cloud.database()
const _=db.command
var app = getApp();
var calendarSignData2;
var date;
var calendarSignDay;

Page({
  Calculate:function(){ //算分
    if(this.data.value==0) this.data.score=0;
    else if(this.data.value>0&&this.data.value<=20) this.data.score=-20;
    else if(this.data.value>20&&this.data.value<=40) this.data.score=-40;
    else if(this.data.value>40&&this.data.value<=60) this.data.score=-60;
    else if(this.data.value>60&&this.data.value<=80) this.data.score=-80;
    else this.data.score=-100;

  },
  /**
   * 页面的初始数据
   */
  data: {
    
    value: 0,
    val: 0,
    value2: 0,
    styles: [{
      line: '#dbdbdb',
      bginner: '#fbfbfb',
      bgoutside: '#dbdbdb',
      lineSelect: '#52b8f5',
      font: '#404040'
    }, {
      line: '#dbdbdb',
      bginner: '#fbfbfb',
      bgoutside: '#dbdbdb',
      lineSelect: '#52b8f5',
      font: '#404040'
    }],
    score:'',
    select:'',
    openid:'',

    year:'',
    month:'',
    nbsp:'',
    monthDaySize:'',
    date:'',
    calendarSignData2:'',
    calendarSignDay:''
  },

  showPopup1(){
    this.selectComponent('#a').showPopup()
  },
  _success1(){
    this.selectComponent('#a').hidePopup();
  },
  sleep:function  (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },
  //setdata
  bindvalue: function(e) {
    
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  
  //跳转50
  assignment() {
    this.setData({
      val: 50
    })
  },

  Submit:function(){
    
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
        drink:this.data.score,
        total:_.inc(this.data.score)
      },
      success: function(res) {
  
        //  wx.showToast({
        //    title: '饮酒打卡成功',
        //    icon: 'success',
        //    duration: 500
        //  })
       }
    })
   
    calendarSignData2[date]=date;
    console.log(calendarSignData2);
    calendarSignDay=calendarSignDay+1;
   wx.setStorageSync("calendarSignData2",calendarSignData2);
   wx.setStorageSync("calendarSignDay",calendarSignDay);
 
  
      this.setData({
      
        calendarSignData2:calendarSignData2,
        calendarSignDay:calendarSignDay
      })
      if(this.data.value>40){
        this.showPopup1();
      }
      this.sleep(2000).then(() => {
        wx.redirectTo({
          url: '../../records/records',
        })
      })
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.value='';
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
    if(wx.getStorageSync("calendarSignData2")==null||wx.getStorageSync("calendarSignData2")==''){
      wx.setStorageSync("calendarSignData2",new Array(monthDaySize));
    };
     if(wx.getStorageSync("calendarSignDay")==null||wx.getStorageSync("calendarSignDay")==''){
      wx.setStorageSync("calendarSignDay",0);
    }
     calendarSignData2=wx.getStorageSync("calendarSignData2")
      calendarSignDay=wx.getStorageSync("calendarSignDay")
    console.log(calendarSignData2);
    console.log(calendarSignDay)
    this.setData({
        year:year,
        month:month,
        nbsp:nbsp,
        monthDaySize:monthDaySize,
        date:date,
        calendarSignData2:calendarSignData2,
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