var app = getApp()
const unit = 2.25 //肝宝宝健康值1单位长度
var curr_tip = 0 //新手指引的当前指引项
const MASK = 0.2 //透明度
const ScreenTotalH = 750*wx.getSystemInfoSync().screenHeight
Page({
  data: {
    
    showMSG: false,
    today_msg:"",
    today_title:"",

    showGuide: false,
    guideInfo:"欢迎来到肝宝宝的世界，点击肝宝宝开始新手指引和查看下一步，快来一起保护宝宝吧!",
    //其他元素透明度，默认不透明1.0
    opacity: 1,
    //新手指引 Tips
    guideTips:[
      //顶部五个功能
      {
        opacity:1,
        guideInfo:"健康值反映主人肝健康的状况，肝宝宝的形态随健康值改善噢~想看到更健康的宝宝，可以通过每天坚持护肝打卡增加健康值！"
      },
      {
        opacity:1,
        guideInfo:"在这本健康指南中写了很多护肝小贴士，还可以查询肝药物和肝指标。"
      },
      {
        opacity:1,
        guideInfo:"这是助眠减压模块，其中藏了好多减压小技巧，还可以听轻音乐帮助睡眠呢！"
      },
      {
        opacity:1,
        guideInfo:"这里可以根据主人今天的信息，为主人生成全面的肝健康食谱！"
      },
      {
        opacity:1,
        guideInfo:"这里存放主人的成就记录，想要解锁更多成就吗？快保护肝脏，拒绝爆肝，行动起来吧！"
      },
      //中间三个功能板块
      {
        opacity:1,
        guideInfo:"在健康报告里，主人可以查看半月内、以及当天的健康记录以及分析。"
      },
      {
        opacity:1,
        guideInfo:"护肝打卡，督促主人养成良好的生活习惯，记录主人的饮食、心情、运动、饮酒情况，影响宝宝健康值噢！"
      },
      {
        opacity:1,
        guideInfo:"健康图鉴收集了关于肝健康的医学图谱集，会逐渐更新噢，主人快来翻阅一下吸收知识吧！"
      },
      {
        opacity:1,
        guideInfo:"在这里，可以记录主人和肝宝宝的美好瞬间！主人可以分享炫耀(＾Ｕ＾)ノ~ＹＯ"
      }
    ],

    //我的健康值
    healthVal: 0,
    //左上角健康值宽度
    valueWidth: 0,

    //我的肝宝宝
    liverbaby:{
      myState:"",//healthy, normal, ill
      myMessage:"",//肝宝宝说话内容
      myLiver:"",//肝宝宝形态图片地址

      //设置宝宝属性
      setState: function(s){
        this.myState=s
      },
      setMessage: function(msg){
        this.myMessage=msg
      },
      setLiver: function(liver){
        this.myLiver=liver
      },

      //获取该健康状态的宝宝所有消息、形态
      getMessages: function(){
        switch(this.myState){
          case 'healthy':
            return this.message.healthy;
          case 'normal':
            return this.message.normal;
          case 'ill':
            return this.message.ill;
        }
      },      
      getLivers: function(){
        switch(this.myState){
          case 'healthy':
            return this.liver.healthy;
          case 'normal':
            return this.liver.normal;
          case 'ill':
            return this.liver.ill;
        }
      },

      //更换宝宝消息提示语言、表情形态
      nextMessage: function(){
        var msg = this.getMessages()
        var next = (msg.indexOf(this.myMessage)+1) % msg.length

        this.setMessage(msg[next])
      },
      nextLiver: function(){
        var livers = this.getLivers()
        var next = ((livers.indexOf(this.myLiver))+1) % livers.length

        this.setLiver(livers[next])
      },
      next: function(){
        this.nextLiver()
        this.nextMessage()
      },

      //数据集内容

      //肝宝宝形态
      liver:{
        healthy:[
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/health-liver/1.PNG",
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/health-liver/2.png",
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/health-liver/3.png",
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/health-liver/4.png"
        ],
    
        normal:[
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/normal-liver/1.png",
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/normal-liver/2.png",
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/normal-liver/3.png",
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/normal-liver/4.png"
        ],
    
        ill:[
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/ill-liver/1.png",
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/ill-liver/2.png",
          "https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/index/ill-liver/3.png"
        ],
      },

      //肝宝宝说话内容
      message:{
        //肝健康值：90-100
        healthy:[
          "主人今天做得不错呀，要坚持打卡哦！坚持保护肝宝宝的天数越多，宝宝就越健康爱你吖~还能获得酷酷的小勋章和称号呢！",
          "主人今天运动了吗？嘿嘿，宝宝最喜欢看主人运动的样子啦！帅气耶！",
          "主人想要肝宝宝陪你聊天吗？每天都来看我吧，完成你的肝健康打卡噢。",
          "主人太棒了，又来看宝宝啦！宝宝好喜欢主人呀~宝宝和主人都会越来越健康的！"
        ],
        //肝健康值：80-90
        normal:[
          "主人今天打卡了吗？记得打卡保护宝宝噢~坚持保护肝宝宝的天数越多，宝宝就越健康爱你吖~还能获得酷酷的小勋章和称号呢！",
          "主人，肝宝宝是人体非常重要的消化器官，您一定要每天坚持打卡好好保护我呀~",
          "保护肝宝宝，主要要规律作息,不可以喝酒哦！",
          "主人，听说现在的年轻人特别爱爆肝……你可不要和他们一样呀！我相信主人是爱我的。"
        ],
        //肝健康值：<=80
        ill:[
          "主人今天打卡了吗？记得打卡保护宝宝呜呜！",
          "肝宝宝不想成为脂肪肝呢！主人要多运动，不可以吃油炸、甜品哦。才能好好保护宝宝呢，主人呜呜。",
          "主人主人，肝宝宝这么可爱，主人不会任性喝酒熬夜来伤害我的，对吧对吧主人？嘤嘤嘤……",
          "主人想要看到更加健康的肝宝宝有多可爱吗？那主人快坚持肝健康打卡吧，宝宝的样子会越来越可爱的呢！主人主人。",
          "主人，宝宝痛痛呜呜呜……主人要注意身体，早睡早起，饮食健康，多多运动。主人每天开心，宝宝才会每天开心！",
          "主人知道肝硬化吗？太可怕了！宝宝不想硬化，也不想看到癌细胞，主人要坚持保护肝健康呀。"
        ]
      }
    }
    
  },

  changeLiverType: function(){
    var liver = this.data.liverbaby
    if(this.data.showGuide==true){
      this.nextTip()
      liver.nextLiver()
      liver.setMessage(this.data.guideInfo)
      this.setData({
        liverbaby:liver
      })
    }else{
      liver.next()
      this.setData({
        liverbaby: liver
      })
    }
  },

  confirm: function(){
    this.setData({
      showMSG: false
    })
  },

  nextTip: function(){
    var new_guideTips = this.data.guideTips

    //将上一步指引的元素设上遮罩
    if(curr_tip-1>=0){
      new_guideTips[curr_tip-1].opacity=MASK
      this.setData({
        guideTips: new_guideTips
      })
    }

    //判断新手指引是否结束
    if(curr_tip==this.data.guideTips.length){
      for(var i=0; i<new_guideTips.length; i++){
        new_guideTips[i].opacity = 1
      }
      this.setData({
        opacity:1,
        showGuide: false,
        guideTips: new_guideTips
      })
    }
    //没有结束 显示当前指引
    else{
      var info = this.data.guideTips[curr_tip].guideInfo
      new_guideTips[curr_tip].opacity = 1
      this.setData({
        guideTips: new_guideTips,
        guideInfo: info
      })
      curr_tip += 1 
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*初始化肝宝宝*/

    //初始化宝宝健康值
    this.setData({
      healthVal: app.globalData.credit
    })

    //暂存变量，最后调用setData()重新渲染页面
    var liver = this.data.liverbaby
    var healthVal = this.data.healthVal

    //根据肝宝宝健康值初始化宝宝状态
    if(90<=healthVal && healthVal<=100){
      liver.setState('healthy')
    }else if(80<=healthVal){
      liver.setState('normal')
    }else{
      liver.setState('ill')
    }

    liver.setMessage((this.data.liverbaby.getMessages())[0])
    liver.setLiver((this.data.liverbaby.getLivers())[0])

    this.setData({
      liverbaby: liver,
      valueWidth: unit*healthVal+"rpx"
    })

    /* 新手指引 */

    //判断是否显示新手指引  if(options.newUser=='true') 
    if(options.newUser=='true'){
      //新手指引开始，所有组件开启遮罩
      var new_guideTips = this.data.guideTips
      for(var i=0; i<new_guideTips.length; i++){
        new_guideTips[i].opacity = MASK
      }
      liver.setMessage(this.data.guideInfo)
      this.setData({
        guideTips: new_guideTips,
        opacity: MASK,
        showGuide: true,
        liverbaby: this.data.liverbaby
      })
    }

    /* 今日提示 */
    //这里有BUG没有跑通
    var mydate=new Date()
    var year=mydate.getFullYear()
    var month=mydate.getMonth()+1
    var day=mydate.getDate()
    const db = wx.cloud.database()
    console.log(year)
    console.log(month)
    console.log(day)
    db.collection('records').where({
      _openid: app.globalData.openid,
      year: year,
      month: month,
      day: day
    }).get().then(res=>{
      //用户今天没有打卡，提醒打卡
      if(res.data.length==0){
        var msg = "主人今天还没有打卡哟，快快让肝宝宝知道你的情况吧，好让宝宝为主人提出建议和分析。\n 对啦，主人记得在打卡界面点击肝宝宝保存每项打卡情况呀~\n"

        if(80<=app.globalData.credit && app.globalData.credit<90){
          var needCredit=(9000 -Math.ceil(app.globalData.credit*100))/100;
          msg += "主人加油呀，继续提升" + needCredit + "点健康值就可以见到一个更健康形态的可爱肝宝宝啦！\n"
        }else if(app.globalData.credit<80){
          var needCredit=(8000 -Math.ceil(app.globalData.credit*100))/100;
          msg += "主人加油呀，继续提升" + needCredit + "点健康值就可以见到一个健康形态的可爱肝宝宝啦！\n"
        }

        this.setData({
          today_msg: msg,
          today_title: "打卡提醒"
        })

        //新手指引和该提示不同时展示
        if(this.data.showGuide==false){
          this.setData({
            showMSG: true
          })
        }
      }
      //用户已经打卡，根据健康情况生成反馈信息
      else{
        var msg = this.data.today_msg
        var hasInfo = 0
        if(res.data[0].emotion<0 && res.data[0].emotion!=0){
          msg += "*心情：主人今天心情好像不太好，快去助眠减压模块，看看肝宝宝为你搜集的减压方法推荐吧~\n"
          hasInfo++
        }
        if(res.data[0].sleep<5 && res.data[0].sleep!=0){
          msg += "*睡眠：为了帮助主人睡眠，宝宝在减压助眠里列出了有助睡眠的歌单呢，希望主人可以睡个好觉呀。\n"
          hasInfo++
        }
        if(res.data[0].diet<5 && res.data[0].diet!=0){
          msg += "*饮食：根据主人今天的饮食健康分，宝宝推荐在健康食谱中给主人推荐了更健康全面的搭配，快去看看吧！\n"
          hasInfo++
        }
        if(res.data[0].sport<0 && res.data[0].sport<0!=0){
          msg += "*运动：主人应该多多运动！不要葛优瘫啦，快动起来呢！\n"
        }
        this.setData({
          today_title: "肝健康小贴士",
          today_msg: msg
        })

        //新手指引和该提示不同时展示，且没有提示信息时不展示
        if(this.data.showGuide==false && hasInfo!=0){
          this.setData({
            showMSG: true
          })
        }
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
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.openid
    }).get().then(res=>{
      console.log(res)
      this.setData({
        healthVal: res.data[0].credit
      })
      console.log(this.data.healthVal)
    })
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

  },

})
