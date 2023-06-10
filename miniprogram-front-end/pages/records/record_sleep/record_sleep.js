// pages/records/record_sleep/record_sleep.js
const db=wx.cloud.database()
const _=db.command
var app = getApp();
var calendarSignData3;
var date;
var calendarSignDay;

Page({
  sleep:function  (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },


  radioChange1(e) {
    let select1=e.detail.value
    this.setData({
      select1:select1
    })
    console.log('radio1发生change事件，携带value值为：', this.data.select1)
  },
  radioChange2(e) {
    let select2=e.detail.value
    this.setData({
      select2:select2
    })
    console.log('radio2发生change事件，携带value值为：', this.data.select2)
  },

  Calculate:function(){ //算分
    if(this.data.select1=='0') this.data.score=15;
    else if(this.data.select1=='1'&&this.data.select2=='2') this.data.score=5;
    else if(this.data.select1=='1'&&this.data.select2=='3') this.data.score=-10;
    else if(this.data.select1=='1'&&this.data.select2=='4') this.data.score=-30;
    

  },
  Submit:function(){
    if (this.data.select1 == null || this.data.select1 == ""||this.data.select2==null||this.data.select2=="") {
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
        sleep:this.data.score,
       total:_.inc(this.data.score)
      },
      success: function(res) {
        wx.showToast({
          title: '睡眠打卡成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
    

    
    calendarSignData3[date]=date;
    console.log(calendarSignData3);
    calendarSignDay=calendarSignDay+1;
   wx.setStorageSync("calendarSignData3",calendarSignData3);
   wx.setStorageSync("calendarSignDay",calendarSignDay);
 
  
  this.setData({
      
        calendarSignData3:calendarSignData3,
        calendarSignDay:calendarSignDay
      })
      
      this.sleep(1200).then(() => {
        wx.redirectTo({
          url: '../../records/record_emotion/record_emotion',
        })
      })
      
  },
  /**
   * 页面的初始数据
   */
  data: {
    items2:[
      {value: '0', name: '我在11点前入睡',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sleep2.png'},
      {value: '1', name: '我在11点后入睡',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sleep1.png'},
    ],
    items: [
      {value: '2', name: '小于6小时',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sleep3.png'},
      {value: '3', name: '6 - 8小时',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sleep4.png'},
      {value: '4', name: '大于8小时',url:'https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/sleep5.png'},
      
    ],
    score:0,
    select1:'',
    select2:'',
    openid:'',

    year:'',
    month:'',
    nbsp:'',
    monthDaySize:'',
    date:'',
    calendarSignData3:'',
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
    if(wx.getStorageSync("calendarSignData3")==null||wx.getStorageSync("calendarSignData3")==''){
      wx.setStorageSync("calendarSignData3",new Array(monthDaySize));
    };
     if(wx.getStorageSync("calendarSignDay")==null||wx.getStorageSync("calendarSignDay")==''){
      wx.setStorageSync("calendarSignDay",0);
    }
     calendarSignData3=wx.getStorageSync("calendarSignData3")
      calendarSignDay=wx.getStorageSync("calendarSignDay")
    console.log(calendarSignData3);
    console.log(calendarSignDay)
    this.setData({
        year:year,
        month:month,
        nbsp:nbsp,
        monthDaySize:monthDaySize,
        date:date,
        calendarSignData3:calendarSignData3,
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