//所有可播放音乐的图标和URL地址
const audios = [
  {
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/1.png",
    "name":"八音盒",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/Music.wav",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/2.png",
    "name": "鸟鸣",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/Bird.wav",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/3.png",
    "name":"雷声",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/thunder1.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/4.png",
    "name":"雨滴",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/Rain.aac",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/5.png",
    "name":"流水",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/brook1.mp3",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/6.png",
    "name": "山林",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/summer_hill2.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/7.png",
    "name":"海岸",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/summer_beach1.mp3",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/8.png",
    "name":"郊游",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/mountain_children.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/9.png",
    "name": "蟋蟀",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/cricket.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/10.png",
    "name":"微波",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/small_wave.mp3",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/11.png",
    "name":"森林",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/forest.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/12.png",
    "name":"风",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/wind.mp3",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/17.png",
    "name":"江南雨",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E6%B1%9F%E5%8D%97%E9%9B%A8.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/20.png",
    "name":"儿时",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E5%84%BF%E6%97%B6.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/14.png",
    "name":"古筝",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E5%8F%A4%E7%AD%9D.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/19.PNG",
    "name":"布谷",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E5%B8%83%E8%B0%B7.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/27.PNG",
    "name":"悠扬",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E6%82%A0%E6%89%AC.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/18.PNG",
    "name":"晨曦",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E6%99%A8%E6%9B%A6.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/21.png",
    "name":"桃花落",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E6%A1%83%E8%8A%B1%E8%90%BD.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/15.png",
    "name":"流年",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E6%B5%81%E5%B9%B4.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/16.png",
    "name":"笛声",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/%E7%AC%9B%E5%A3%B0.mp3",
    "type":"放松"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/5.png",
    "name":"流落",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/duster.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/33.png",
    "name":"劳动",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/brooming1.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/31.png",
    "name":"风铃",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/door_bell.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/35.png",
    "name":"沐浴",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/in_a_bath.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/32.png",
    "name":"风雪行",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/walking_in_snowstorm.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/34.png",
    "name":"秋天街头",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/walking_on_a_fall_street.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/7.png",
    "name":"冲刷",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/washstand.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/4.png",
    "name":"滴落",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/waterdrops.mp3",
    "type":"减压"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/23.PNG",
    "name":"柔和",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/lightMusic.wav",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/27.PNG",
    "name":"空净",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/lightMusic%20(2).wav",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/30.png",
    "name":"轻缓",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/lightMusic%20(3).wav",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/25.PNG",
    "name":"优美",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/lightMusic%20(4).wav",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/26.PNG",
    "name":"温柔",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/lightMusic%20(5).wav",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/8.png",
    "name":"静谧",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/lightMusic%20(6).wav",
    "type":"助眠"
},
{
    "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/28.png",
    "name":"空灵",
    "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/lightMusic%20(7).wav",
    "type":"助眠"
}
]
//初始推荐歌单
var recommended = [{
  "img":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/23.PNG",
  "name":"打卡获得歌单",
  "src":"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/audio/Music.wav"
}]
//自动播放
const audio = wx.createInnerAudioContext()
audio.autoplay = false
//是否存在今日用户心情或睡眠分数
var hasCredit = false

Page({
  data: {
    //导航栏
    tabs:['推荐','放松','减压','助眠'],
    current: 0,

    //提示模块
    showMSG: false,
    today_msg:"",
    today_title:"",

    //当前是否有音乐正在播放
    isPlay: false,

    //轮播图资源
    swiperImgs:[
      {img:"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/swiper1.jpg",url:"./swiperDisplay1/swiperdisplay1"},
      {img:"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/swiper2.jpg",url:"./swiperDisplay2/swiperdisplay2"},
      {img:"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/swiper3.jpg",url:"./swiperDisplay3/swiperdisplay3"},
      {img:"https://liverprotector-1305433999.cos.ap-nanjing.myqcloud.com/images/relax/swiper4.jpg",url:"./swiperDisplay4/swiperdisplay4"}
    ],

    //所有可播放音乐的图标和URL地址
    dataList:[],
  },
  //导航栏
  tabSelect:function(e){
    var dataList = [] //清空
    var current = e.currentTarget.dataset.id

    if(current==0){
      var selected = recommended
      for(var i=0; i<selected.length; i++){
        dataList.push(selected[i])
      }
    } 
    if(current==1){
      for(var i=0; i<audios.length; i++){
        if(audios[i].type=='放松'){
          dataList.push(audios[i])
        }
      }
    }
    if(current==2){
      for(var i=0; i<audios.length; i++){
        if(audios[i].type=='减压'){
          dataList.push(audios[i])
        }
      }
    }
    if(current==3){
      for(var i=0; i<audios.length; i++){
        if(audios[i].type=='助眠'){
          dataList.push(audios[i])
        }
      }
    }

    this.setData({
      current:current,
      dataList: dataList
    })
  },
  //确认
  confirm: function(){
    this.setData({
      showMSG: false
    })
  },
  //停止播放音乐
  stop(){
    audio.stop()
    this.setData({
      isPlay: false
    })

    console.log("音乐已经停止播放")
  },
  //开始播放音乐
  click(res){
    var index=res.currentTarget.dataset.id
    var music= this.data.dataList[index]
    
    //正在播放时再点击图标播放音乐
    audio.src = music.src
    audio.loop = true
    audio.play()
    this.setData({
      isPlay: true
    })

    console.log("开始播放音乐索引为："+index)
  },
  onReady (e) {
    
  },
  audioPlay () {
    audio.play()
    
  },
  audioPause () {
    audio.pause()
  },
  audio14 () {
    audio.seek(14)
  },
  audioStart () {
    audio.seek(0)
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    const db = wx.cloud.database()
    var mydate=new Date()
    var year=mydate.getFullYear()
    var month=mydate.getMonth()+1
    var day=mydate.getDate()
    
    this.setData({
      dataList: recommended
    })
    
    //根据用户分数生成最新推荐歌单
    db.collection('records').where({
      _openid: getApp().globalData.openid,
      year: year,
      month: month,
      day: day
    }).get().then(res=>{
      console.log(res.data)

      if(!res.data.length){
        return
      }

      var random = day%2 //每天推荐不同音乐
      var selected = []  //推荐歌单
      var msg=""         //推荐消息
      hasCredit = true   //用户已打卡

      if(res.data[0].emotion<0){
        msg += "根据主人的心情宝宝列出了以下推荐歌单和方法：\n"
        msg += "听听大自然和儿时的声音，主人会不会想起美好的事情呢？\n"
        msg += "主人可以看看清华学霸减压方法集噢~ \n"
        for(var i=0; i<audios.length; i++){
          if(audios[i].type=="减压" && i%2 ==random){
            selected.push(audios[i])
          }
        }
      }

      if(res.data[0].sleep<5){
        msg += "\n根据主人的睡眠宝宝情况宝宝有以下建议，有助于睡眠和休息噢：\n"
        msg += "听听有助于睡眠的白噪音和纯音乐~\n"
        msg += "主人可以看看轮播图里藏的10个入睡小妙招、眼罩耳塞专题呢"
        for(var i=0; i<audios.length; i++){
          if(audios[i].type=="助眠" && i%2 ==random){
            selected.push(audios[i])
          }
        }
      }

      recommended = selected
      this.setData({
        today_title: "推荐歌单",
      })

      //用户状况需要改善，展示消息提醒
      if(res.data[0].emotion<0 || res.data[0].sleep<5){
        this.setData({
          showMSG: true,      
          today_msg: msg,
          dataList: selected
        })
      }
      //用户各项情况良好，推荐放松音乐
      else{
        for(var i=0; i<audios.length; i++){
          if(audios[i].type=="放松" && i%3 ==random){
            selected.push(audios[i])
          }
        }
      }
    })
  }
})