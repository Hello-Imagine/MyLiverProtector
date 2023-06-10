// pages/records/record_alcohol/record_alcohol.js
const db=wx.cloud.database()
const _=db.command
var app = getApp();
var calendarSignData5;
var date;
var calendarSignDay;

Page({
  Calculate:function(){ //算分
    console.log(this.data.value1+" "+this.data.value2+" "+this.data.value3+" "+this.data.totalcheck+" "+this.data.score)
    this.data.score=this.data.score+ Math.ceil(this.data.value1/40)+Math.ceil(this.data.value2/100) + Math.ceil(this.data.value3/20)-this.data.totalcheck*3;
    console.log(this.data.score)
  },
  /**
   * 页面的初始数据
   */
  data: {
    
    value1: 0,
    val: 0,
    value2: 0,
    value3:0,
    styles: [{
      line: '#625D5A',
      bginner: '#EFE5DE',
      bgoutside: '#625D5A',
      lineSelect: '#CB9096',
      font: '#404040'
    }, {
      line: '#dbdbdb',
      bginner: '#fbfbfb',
      bgoutside: '#dbdbdb',
      lineSelect: '#52b8f5',
      font: '#404040'
    }],
    itemList:[
      {id:'1',title:'垃圾1',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet1.png"},
      {id:'2',title:'垃圾2',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet2.png"},
      {id:'3',title:'垃圾3',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet3.png"},
      {id:'4',title:'垃圾4',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet4.png"},
      {id:'5',title:'垃圾5',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet5.png"},
      {id:'6',title:'垃圾6',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet6.png"},
      {id:'7',title:'垃圾7',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet7.png"},
      {id:'8',title:'垃圾8',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet8.png"},
      {id:'9',title:'垃圾9',checked:'',url:"https://miniprogram-1305537466.cos.ap-chengdu.myqcloud.com/miniprogram-MZY/diet9.png"}
    ],
    totalcheck:0,
    score:0,
    select:'',
    openid:'',

    year:'',
    month:'',
    nbsp:'',
    monthDaySize:'',
    date:'',
    calendarSignData5:'',
    calendarSignDay:''
  },

  //多选框事件
  checkboxChange:function(e){
    console.log(e.detail.value);
    this.setData({
      totalcheck:e.detail.value.length,
    })
    console.log(this.data.totalcheck)
  },
  //setdata
  bindvalue1: function(e) {
    console.log("value1 "+e.detail.value)
    this.setData({
      value1: e.detail.value
    })
  },
  bindvalue2: function(e) {
    console.log("value2 "+e.detail.value)
    this.setData({
      value2: e.detail.value
    })
  },
  bindvalue3: function(e) {
    console.log("value3 "+e.detail.value)
    this.setData({
      value3: e.detail.value
    })
  },
 
  //跳转50
  assignment() {
    this.setData({
      val: 50
    })
  },
  
  sleep:function  (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
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
        diet:this.data.score,
        total:_.inc(this.data.score)
      },
      success: function(res) {
        
         wx.showToast({
           title: '饮食打卡成功',
           icon: 'success',
           duration: 500
         })
       }
    })
   
    calendarSignData5[date]=date;
    console.log(calendarSignData5);
    calendarSignDay=calendarSignDay+1;
    wx.setStorageSync("calendarSignData5",calendarSignData5);
    wx.setStorageSync("calendarSignDay",calendarSignDay);
 
  
      this.setData({
      
        calendarSignData5:calendarSignData5,
        calendarSignDay:calendarSignDay
      })

      this.sleep(1200).then(() => {
        wx.redirectTo({
          url: '../../records/record_alcohol/record_alcohol',
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
    if(wx.getStorageSync("calendarSignData5")==null||wx.getStorageSync("calendarSignData5")==''){
      wx.setStorageSync("calendarSignData5",new Array(monthDaySize));
    };
     if(wx.getStorageSync("calendarSignDay")==null||wx.getStorageSync("calendarSignDay")==''){
      wx.setStorageSync("calendarSignDay",0);
    }
     calendarSignData5=wx.getStorageSync("calendarSignData5")
      calendarSignDay=wx.getStorageSync("calendarSignDay")
    console.log(calendarSignData5);
    console.log(calendarSignDay)
    this.setData({
        year:year,
        month:month,
        nbsp:nbsp,
        monthDaySize:monthDaySize,
        date:date,
        calendarSignData5:calendarSignData5,
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