// pages/records/record_sport/record_sport.js
const db=wx.cloud.database()
const _=db.command
var app = getApp();
var calendarSignData1;
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
    if(this.data.select=='1') this.data.score=-15;
    else if(this.data.select=='2') this.data.score=0;
    else if(this.data.select=='3') this.data.score=10;
    else this.data.score=15;

  },

  Submit:function(){  //提交
    
    if(this.data.select==''||this.data.select==null){
      wx.showToast({
        title: '未选择',
        icon:'none',
        duration: 2000
      })
      return;
    }
    this.Calculate();
    
    // db.collection("records")
    // .add({
    //   data:{
    //   year:this.data.year,
    //   month:this.data.month,
    //   day:this.data.date,
    //   total:50+this.data.score,
    //   sport:this.data.score,
    //   drink:0,
    //   sleep:0,
    //   emotion:0,
    //   diet:0,
    //   }
    //   ,success: function(res) {
    //     wx.showToast({
    //       title: '运动打卡成功',
    //       icon: 'success',
    //       duration: 1000
    //     })
    //   }
      
    // })

    db.collection("records")
    .where({
      _openid:app.globalData.openid,
      year:this.data.year,
      month:this.data.month,
      day:this.data.date,
    })
    .update({
      data:{
        sport:this.data.score,
        total:_.inc(this.data.score)
      }
      ,success: function(res) {
        wx.showToast({
          title: '运动打卡成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
   

    console.log("提交"+this.data.select)
    calendarSignData1[date]=date;
    console.log(calendarSignData1);
    calendarSignDay=calendarSignDay+1;
   wx.setStorageSync("calendarSignData1",calendarSignData1);
   wx.setStorageSync("calendarSignDay",calendarSignDay);
 
   
    this.setData({
      
        calendarSignData1:calendarSignData1,
        calendarSignDay:calendarSignDay
      })

      this.sleep(1200).then(() => {
        wx.redirectTo({
          url: '../../records/record_sleep/record_sleep',
        })
      })
   
        
      
  },

  data: {
    items: [
      {value: '1', name: '我今天没有运动',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sport1.png'},
      {value: '2', name: '我今天运动了1-15分钟',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sport2.png'},
      {value: '3', name: '我今天运动了16-30分钟',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sport3.png'},
      {value: '4', name: '我今天运动了30分钟以上',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sport4.png'},
    ],
    
    score:'',
    select:'',
    openid:'',

    year:'',
    month:'',
    nbsp:'',
    monthDaySize:'',
    date:'',
    calendarSignData1:'',
    calendarSignDay:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.select='';
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
    if(wx.getStorageSync("calendarSignData1")==null||wx.getStorageSync("calendarSignData1")==''){
      wx.setStorageSync("calendarSignData1",new Array(monthDaySize));
    };
     if(wx.getStorageSync("calendarSignDay")==null||wx.getStorageSync("calendarSignDay")==''){
      wx.setStorageSync("calendarSignDay",0);
    }
     calendarSignData1=wx.getStorageSync("calendarSignData1")
      calendarSignDay=wx.getStorageSync("calendarSignDay")
    console.log(calendarSignData1);
    console.log(calendarSignDay)
    this.setData({
        year:year,
        month:month,
        nbsp:nbsp,
        monthDaySize:monthDaySize,
        date:date,
        calendarSignData1:calendarSignData1,
        calendarSignDay:calendarSignDay
      })
      console.log("openid"+this.data.openid)
      
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