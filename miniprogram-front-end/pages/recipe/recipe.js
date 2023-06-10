// pages/recipe/recipe.js
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

  heightInput(e) {
    this.setData({
      height:e.detail.value,
    })
    console.log(this.data.height)
    
  },
  weightInput(e){
    this.setData({
      weight:e.detail.value,
    })
    console.log(this.data.weight)
  },

  //计算
  calcBMI:function(){
    var weight=this.data.weight;
    var height=this.data.height;
    var BMI=weight/height/height;
    var random_num=Math.floor(Math.random()*10);
    
    if(this.data.sport!=null){
      if(BMI>18&&this.data.sport>0){
        BMI=BMI-1;
      }
      else if(BMI<24&&this.data.sport<=0){
        BMI=BMI+1;
      }
    }

    if(this.data.diet!=null){
      if(BMI>18&&this.data.diet>10){
        BMI=BMI-1;
      }
      else if(BMI<24&&this.data.diet<=5){
        BMI=BMI+1;
      }
    }

    if(this.data.sleep!=null){
      if(BMI>18&&this.data.sleep>0){
        BMI=BMI-1;
      }
      else if(BMI<24&&this.data.sleep<=0){
        BMI=BMI+1;
      }
    }
    

    this.setData({
      bmi:BMI,
      random_num:random_num
    })

    if(BMI<=18){
      this.setData({
        build:"slim"
      })
    }
    else if(BMI>18&&BMI<24){
      this.setData({
        build:"medium"
      })
    }
    else if(BMI>=24){
      this.setData({
        build:"heavy"
      })
    }
    

  },
  calcState:function(){
    if(this.data.build=='heavy'){
      this.data.state='unhealthy1';
    }else if(this.data.build=='slim'){
      this.data.state='unhealthy2';
    }else if(this.data.build=='medium'&&app.globalData.credit>80){
      this.data.state='healthy';
    }else{
      this.data.state='unhealthy3';
    }
  },
  //弹窗
  showPopup1(){
    this.selectComponent('#a').showPopup();
    this.sleep(2500);
  },
  _success1(){
    this.selectComponent('#a').hidePopup();
  },
  //生成菜谱
  Submit:function(){
    
    if(this.data.height>2.5){
      wx.showToast({
        title: "身高单位为米",
        icon: 'none',
        duration: 500
      })
      return;
    }
    this.showPopup1();
    var i=this.data.random_num;//随机数
    

    db.collection("records")
    .where({
      _openid:app.globalData.openid,
      year:this.data.year,
      month:this.data.month,
      day:this.data.date,
    })
    .get()
    .then(res=>{
      if(this.data[0]!=null)
      {
        this.setData({
        sport:res.data[0].sport,
        diet:res.data[0].diet,
        sleep:res.data[0].sleep
        })
      }
      this.calcBMI();
    })

    this.calcBMI();
    
    this.calcState();
    db.collection("user")
    .where(
      {
        _openid:app.globalData.openid,
      }
    )
    .update({
      data:{
       height:this.data.height,
       weight:this.data.weight
      },
    })

    db.collection('recipes')
    .where({
      build:this.data.build
    })
    .get()
    .then(res=>{
        this.setData({
          recipeList2:res.data[i].recipeList
        })
    })
    
  },
  /**
   * 页面的初始数据
   */
  data: {
    recipeList2:[

    ],
    recipeList:[
      {dishes1: "红薯100g", dishes2: "小米粥50g", dishes3: "鸡蛋1个", dishes4: "", meal: "早餐",},
      {dishes1: "鸡胸肉100g", dishes2: "鱼肉100g", dishes3: "西兰花100g", dishes4: "米饭50g", meal: "午餐"},
      {dishes1: "牛肉100g", dishes2: "虾肉50g", dishes3: "鸡蛋1个", dishes4: "紫薯100g",meal:"晚餐"},
    ],
    height:0,
    weight:0,
    bmi:0,
    build:"",
    isExist:false,
    random_num:0,
    state:'',
    
    sport:'',
    sleep:'',
    diet:'',


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
  onLoad: function () {
    db.collection("user")
    .where(
      {
        _openid:this.data.openid,
      }
    )
    .get()
    .then(res=>{
      
      this.setData({
        height:res.data[0].height,
        weight:res.data[0].weight
      })
      if((res.data[0].height!=0)&&(res.data[0].weight!=0)){
        this.setData({
          isExist:true,
        })
      }
    })

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