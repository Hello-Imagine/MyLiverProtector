const app = getApp()

const db = wx.cloud.database()

var myDate = new Date()
var yearNow = myDate.getFullYear()
var monthNow = myDate.getMonth() + 1
var dayNow = myDate.getDate()

Page({
  data: {
    name: '',
    sex: 0,
    gender: 'man',
    totalday: 0,
    credit: 0,
    judge: 0,
    canClose: '',
    deviceWidth:0,
    deviceHeight:0
  },

  onLoad:function(){
    this.read();
  },

  read:function(){
    db.collection('user')
    .where({
      _openid: app.globalData.openid
    })
    .get().then(res =>{
      this.setData({
        name: res.data[0].name,
        sex: res.data[0].sex,
        totalday: res.data[0].totalday,
        credit: res.data[0].credit
      })
    
      this.setCanvas(this.data.credit, this.data.totalday, this.data.name, this.data.sex);

    })
  },

  

  return: function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },

  setCanvas:function(credit, totalday, name, sex){
    if(sex == 1){
      this.setData({
        gender: 'woman'
      })
    }

    if(credit >= 90){
      this.setData({
        judge: 1
      })
    }else if(credit >= 80){
      this.setData({
        judge: 2
      })
    }else{
      this.setData({
        judge: 3
      })
    }


    const query = wx.createSelectorQuery();
    query.select('#myCanvas')
    .fields({ node: true, size: true })
    .exec((res) => {
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')

      canvas.width = 600
      canvas.height = 1000
      
      // ctx.moveTo(0, 0)
      // ctx.lineTo(600, 0)
      // ctx.lineTo(600, 1000)
      // ctx.lineTo(0, 1000)
      // ctx.fillStyle = '#f6f3ec'
      // ctx.fill()

      const image1 = canvas.createImage()
      image1.onload = () => {
        ctx.drawImage(image1, 0, 0, 600, 793.6)
      }
      image1.src = 'https://test-1305816403.cos.ap-chengdu.myqcloud.com/' + this.data.gender + this.data.judge + '.jpg'

      const image2 = canvas.createImage()
      image2.onload = () => {
        ctx.drawImage(image2, 0, 796, 150, 197.97)
      }
      image2.src = 'https://test-1305816403.cos.ap-chengdu.myqcloud.com/liverP.png'
      
      ctx.font = "28px sans-serif"
      ctx.font_weight = "bold"
      ctx.fillStyle = "rgb(132,111,96)"
      ctx.fillText('护肝使者'+this.data.name, 200, 860)
      ctx.fillText('已经守护肝宝宝'+this.data.totalday+'天啦!', 200 , 910)
      ctx.fillText("————"+yearNow+'年'+monthNow+'月'+dayNow+'日', 240, 960)
      console.log(myDate)
      



      

    })
  },

  getRatio(){
    let systemInfo = wx.getSystemInfoSync();
    let ratio = 750 / systemInfo.windowWidth;
    return ratio;
  },

  async saveImg(){
    const query = wx.createSelectorQuery();
    const canvasObj = await new Promise((resolve, reject) => {
      query.select('#myCanvas')
        .fields({ node: true, size: true })
        .exec(async (res) => {
          resolve(res[0].node);
        })
    });
    console.log(canvasObj);
    wx.canvasToTempFilePath({
      canvas: canvasObj, //现在的写法
      success: (res) => {
        console.log(res);
        this.setData({ canClose: true });
        //保存图片
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '已保存到相册',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
          },
          complete(res) {
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    }, this)
  }
 

})
