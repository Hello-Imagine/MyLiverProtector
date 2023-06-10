const app = getApp()

const db = wx.cloud.database()
const _ = db.command
const records = db.collection('records')



var judge = 0                                              //判断
var myDate = new Date()
var yearNow = myDate.getFullYear()
var monthNow = myDate.getMonth() + 1
var dayNow = myDate.getDate()
var statistics = new Array(15)

Page({
  data:{
    average: 0,
    num1: 0,
    num2: 0,
    contin: 0,
    width1: 0,
    width2: 0,
    width3: 0
  },

  detail: function(){
    wx.redirectTo({
      url: '../radar/radar',
    })
  },

  return: function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },

  draw: function(statistics){
    const query = wx.createSelectorQuery()
    query.select('#firstCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
          
        const dpr = wx.getSystemInfoSync().pixelRatio               //获取用户尺寸
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
   
        ctx.moveTo(0, canvas.height / dpr)
        for( let i = 1; i <= 15 ; i++ ){
              if(statistics[i - 1] == null){
                ctx.lineTo(canvas.width / 15 / dpr * i, canvas.height / dpr)
              }
              else{
                var temp = statistics[i - 1] / 100 * canvas.height / dpr * 0.94
                ctx.lineTo(canvas.width / 15 / dpr * i - 2, canvas.height / dpr - temp)
              }
        }
        ctx.stroke()
        for( let i = 1; i <= 15; i++ ){
              var temp = statistics[i - 1] / 100 * canvas.height / dpr * 0.94
              ctx.beginPath()
              ctx.arc(canvas.width / 15 / dpr * i - 2, canvas.height / dpr - temp, dpr, 0, 2 * Math.PI)
              ctx.fillStyle = 'black'
              ctx.fill()
        }
      })
  },


  onShow:function(options){
    db.collection('records')
    .where({
      _openid : app.globalData.openid,
      month: _.in[monthNow, monthNow - 1]
    }).get()
    .then(res => {                                        //从数据库读取参数
      var daytotal;
      if(monthNow - 1 == 2){
        daytotal = 28;
      }else if(monthNow - 1 == 4 || monthNow - 1 == 6 || monthNow - 1 == 9 || monthNow -1 == 11){
        daytotal = 30;
      }else{
        daytotal = 31;
      }
      for (let i = 0; i < 15; i++) {
        judge = 0
        if(dayNow - i > 0){
          for (let j = 0; j < res.data.length; j++) {
            if(res.data[j].day == dayNow - i && res.data[j].month == monthNow){
              statistics[14 - i] = res.data[j].total;
              judge = 1;
              break;
            }
          }
          if(judge == 0){
            statistics[14 - i] = 0;
          }
        }else{
          for (let j = 0; j < res.data.length; j++){
            if(res.data[j].day == dayNow - i + daytotal && res.data[j].month == monthNow - 1){
              statistics[14 - i] = res.data[j].total;
              judge = 1;
              break;
            }
            if(judge == 0){
              statistics[14 - i] = 0;
            }
          }
        }

      }
      
      var that = this

      setTimeout(function(){
        var temp = 0
        var contin = 0
        var iden = 1

        for(let i = 0; i < 15; i++){
          temp += statistics[i]
        }
                   
        that.setData({
          average: Math.ceil(temp / 15)
        })
 
        for(let i = 0; i < 15; i++){

          if(statistics[14 - i] == 0){
            iden = 0
            that.setData({
              num1: that.data.num1 + 1
            })
          }
          else if(statistics[14 - i] < that.data.average){
            that.setData({
              num2: that.data.num2 + 1
            })
          }

          if(iden == 1){
            contin++
          }

        }
        
        that.setData({
          contin: contin,
          width1: contin / 15 * 200 + "rpx",
          width2: temp / 15 / 100 * 200 + "rpx",
          width3: that.data.num1 / 15 * 200 + "rpx"
        })
             
        that.draw(statistics)
      }, 0)


    }) 
  }




})



