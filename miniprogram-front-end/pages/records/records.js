// pages/records/records.js
const db=wx.cloud.database()
const _=db.command
var app = getApp();
var calendarSignData;
var date;
var calendarSignDay;


Page({
  calculate:function(){
    var last=this.data.last_credit
    if(last<=70){
      this.data.today_credit=(this.data.today_score-50)*0.05+last;
    }
    else if(last>70&&last<90){
      this.data.today_credit=(this.data.today_score-50)*0.01+last;
    }
    else{
      this.data.today_credit=(this.data.today_score-50)*0.005+last;
    }console.log(this.data.today_score-50)
    this.data.today_credit=Math.ceil(this.data.today_credit*100)/100
    console.log("last "+this.data.last_credit+"today_credit "+this.data.today_credit)
  },

  update:function(){
    // db.collection("records")
    // .where({
    //   _openid:app.globalData.openid,
    //   year:this.data.year,
    //   month:this.data.month,
    //   day:this.data.date,
    // })
    // .get()
    // .then(res=>{
    //   console.log(res)
    //   this.data.sport=res.data[0].sport
    //   this.data.sleep=res.data[0].sleep
    //   this.data.emotion=res.data[0].emotion
    //   this.data.diet=res.data[0].diet
    //   this.data.drink=res.data[0].drink
    // })
    // this.sleep(1200)
    // if(this.data.diet==0&&this.data.drink==0&&this.data.emotion&&this.data.sleep==0&&this.data.sport==0){
    //   wx.showToast({
    //     title: '今天还没有打卡哦',
    //   })
    //   this.sleep(1200)
    //   wx.hideToast({
    //     success: (res) => {},
    //   })
    //   return;
    // }
   

    db.collection("user")
    .where({
      _openid:app.globalData.openid,
    })
    .get()
    .then(res=>{
      this.data.last_credit=res.data[0].credit;

      //嵌套1
      console.log(this.data.last_credit)
      db.collection("records")
      .where({
        _openid:app.globalData.openid,
        year:this.data.year,
        month:this.data.month,
        day:this.data.date,
      })
      .get()
     .then(res=>{
        this.data.today_score=res.data[0].total
     
        //嵌套2
        this.calculate();

        db.collection("user")
        .where({
          _openid:app.globalData.openid,
        })
       .update({
        data:{
          credit:this.data.today_credit,
          totalday:_.inc(1)
         },
        success: function(res) {
        this.data.today_totolday=res.detail.value.totalday
      }
    })
    })
    
    })
    wx.showToast({
      title: '更新成功',
      icon:"success"
    })

    calendarSignData[date]=date;
    console.log(calendarSignData);
    calendarSignDay=calendarSignDay+1;
   wx.setStorageSync("calendarSignData",calendarSignData);
   wx.setStorageSync("calendarSignDay",calendarSignDay);
 
  
      this.setData({
      
        calendarSignData:calendarSignData,
        calendarSignDay:calendarSignDay
      })

      app.globalData = {
        'credit':this.data.today_credit,
        
      }
      

  },
  /**
   * 页面的初始数据
   */
  data: {
    today_totolday:0,
    last_credit:80,
    today_credit:0,
    today_score:0,
    openid:'',

    year:'',
    month:'',
    nbsp:'',
    monthDaySize:'',
    date:'',
    calendarSignData:'',
    calendarSignDay:'',

    sport:'',
    sleep:'',
    emotion:'',
    diet:'',
    drink:'',

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
    if(wx.getStorageSync("calendarSignData")==null||wx.getStorageSync("calendarSignData")==''){
      wx.setStorageSync("calendarSignData",new Array(monthDaySize));
    };
     if(wx.getStorageSync("calendarSignDay")==null||wx.getStorageSync("calendarSignDay")==''){
      wx.setStorageSync("calendarSignDay",0);
    }
     calendarSignData=wx.getStorageSync("calendarSignData")
      calendarSignDay=wx.getStorageSync("calendarSignDay")
    this.setData({
      year:year,
      month:month,
      nbsp:nbsp,
      monthDaySize:monthDaySize,
      date:date,
      calendarSignData:calendarSignData,
      calendarSignDay:calendarSignDay
    })
    

    //如果没有记录则添加一条记录
    db.collection("records")
    .where({
      _openid:app.globalData.openid,
      year:this.data.year,
      month:this.data.month,
      day:this.data.date,
    })
    .get()
    .then(res=>{
      if(res.data.length==0)
      {
        db.collection("records")
        .add({
          data:{
          year:this.data.year,
          month:this.data.month,
          day:this.data.date,
          total:50,
          sport:0,
          drink:0,
          sleep:0,
          emotion:0,
          diet:0,
          }
        })
      }
    })

   
  },



  // 以下為跳转业务
  goSportRecord: function() { //跳转入运动记录
    wx.redirectTo({
      url: '/pages/records/record_sport/record_sport',
    })
  },

  goSleepRecord: function() { //跳转入睡眠记录
    wx.redirectTo({
      url: '/pages/records/record_sleep/record_sleep',
    })
  },

  goEmotionRecords: function() { //跳转入情绪记录
    wx.redirectTo({
      url: '/pages/records/record_emotion/record_emotion',
    })
  },

  goDietRecords: function() { //跳转入饮食记录
    wx.redirectTo({
      url: '/pages/records/record_diet/record_diet',
    })
  },

  goAlcoholRecorded: function() { //跳转入饮酒记录
    wx.redirectTo({
      url: '/pages/records/record_alcohol/record_alcohol',
    })
  },

  goBack: function() { //返回
    wx.redirectTo({
      url: '../index/index',
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