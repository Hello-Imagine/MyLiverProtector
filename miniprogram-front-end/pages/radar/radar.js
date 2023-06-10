const app = getApp()

const db = wx.cloud.database()
const records = db.collection('records')



var myDate = new Date()
var yearNow = myDate.getFullYear()
var monthNow = myDate.getMonth() + 1
var dayNow = myDate.getDate()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    drink:0,
    diet:0,
    emotion: 0,
    sport: 0,
    sleep: 0,
    string1: '',
    string2: '',
    year: yearNow,
    month: monthNow,
    day: dayNow
  },

  overview: function(){
    wx.redirectTo({
      url: '../summary/summary',
    })
  },



  return: function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },

  bindKeyInput1: function (e) {
    this.setData({
      year: parseInt(e.detail.value)
    })
  },

  bindKeyInput2: function (e) {
    this.setData({
      month: parseInt(e.detail.value)
    })
  },

  bindKeyInput3: function (e) {
    this.setData({
      day: parseInt(e.detail.value)
    })
  },

  search: function(){
    this.read()
  },

  read: function(){
    db.collection('records')
    .where({
      _openid : app.globalData.openid,
      day: this.data.day,
      month: this.data.month,
      year: this.data.year
    })
    .get().then(res => {
      this.setData({
        string1: "",
        string2: ""
      })
      console.log(this.data.year,this.data.month,this.data.day)
      console.log(res.data[0])
      if(res.data[0] == null){
        this.setData({
          total: 0,
          diet: 0,
          sport: 0,
          sleep: 0,
          drink: 0,
          emotion: 0
        })
        const mData = [
          {title: "饮食", score : 0, full: 10},
          {title: "运动", score : 0, full: 10},
          {title: "睡眠", score : 0, full: 10},
          {title: "饮酒", score : 0, full: 10},
          {title: "情绪", score : 0, full: 10},
          {title: "综合", score : 0, full: 10}
        ]
        this.init(mData)
      }
      else{
        this.setData({
          total: Math.ceil((res.data[0].total + 132) / 232 * 100),
          diet:Math.ceil((res.data[0].diet + 27) / 42 * 10),
          sport:Math.ceil((res.data[0].sport + 15) / 30 * 10),
          sleep:Math.ceil((res.data[0].sleep + 30) / 45 * 10),
          drink:Math.ceil(10 + res.data[0].drink / 10),
          emotion:Math.ceil((res.data[0].emotion + 10) / 15 * 10)
        })
        if(this.data.emotion >= 8){
          this.setData({
            string1: this.data.string1 + " 情绪"
          })
        }else{
          this.setData({
            string2: this.data.string2 + " 情绪"
          })
        }
        if(this.data.drink >= 8){
          this.setData({
            string1: this.data.string1 + " 饮酒"
          })
        }else{
          this.setData({
            string2: this.data.string2 + " 饮酒"
          })
        }
        if(this.data.sleep >= 8){
          this.setData({
            string1: this.data.string1 + " 睡眠"
          })
        }else{
          this.setData({
            string2: this.data.string2 + " 睡眠"
          })
        }
        if(this.data.sport >= 8){
          this.setData({
            string1: this.data.string1 + " 运动"
          })
        }else{
          this.setData({
            string2: this.data.string2 + " 运动"
          })
        }
        if(this.data.diet >= 8){
          this.setData({
            string1: this.data.string1 + " 饮食"
          })
        }else{
          this.setData({
            string2: this.data.string2 + " 饮食"
          })
        }

        const mData = [
          {title: "饮食", score : Math.ceil((res.data[0].diet + 27) / 42 * 10), full: 10},
          {title: "运动", score : Math.ceil((res.data[0].sport + 15) / 30 * 10), full: 10},
          {title: "睡眠", score : Math.ceil((res.data[0].sleep + 30) / 45 * 10), full: 10},
          {title: "饮酒", score : Math.ceil(10 + res.data[0].drink / 10), full: 10},
          {title: "情绪", score : Math.ceil((res.data[0].emotion + 10) / 15 * 10), full: 10},
          {title: "综合", score : Math.ceil((res.data[0].total + 132) / 232 * 10), full: 10}
        ]
        this.init(mData)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.read()
  },

  getRatio(){
    let systemInfo = wx.getSystemInfoSync();
    let ratio = 750 / systemInfo.windowWidth;
    return ratio;
  },

  init(mData){
    const L_RADIUS = 180 / this.getRatio();         //大圆半径
    const LINE_WIDTH  = 2 / this.getRatio();        //线宽
    const query = wx.createSelectorQuery();
    query.select('#canvas')
      .fields({ node: true, size: true })
     .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio               //获取用户尺寸
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        const canvasH = canvas.height;
        const canvasW = canvas.width;

        ctx.clearRect(0, 0, canvasW, canvasH);          //清空画布
        ctx.save();
        ctx.translate(canvasW / 2 / dpr, canvasH / 2 / dpr);        //重新映射canvas的（0,0），使得canvas的坐标原点位于canvas的中心位
        const mCount =  mData.length;                   //多边形的边数
        const sAngle = (90 / mCount / 180) * Math.PI;
        let rotateAngle = mCount % 2 === 0 ? 0 : sAngle * (mCount % 4 === 3 ? -1 : 1);
        const lCoordinates = this.getCoordinatesByRadius(L_RADIUS, mCount, -rotateAngle);
        this.renderBorder(ctx, "#FCF7AC", LINE_WIDTH, L_RADIUS, -rotateAngle, mCount, "#fff");
        this.renderLinkLine(ctx, 0, 0, lCoordinates, "black", LINE_WIDTH);
        this.drawText(ctx, lCoordinates, mData, "black", dpr);
        this.drawRadar(ctx, mData, L_RADIUS, -rotateAngle, 'rgba(252, 247, 172, 0.7)');
        // ctx.draw();
     })
  
  },

  //获取多边形坐标
  getCoordinatesByRadius(mRadius, mCount, rotateAngle = 0){
    const mAngle = (Math.PI * 2) / mCount;
    let coordinates = [];
    for(let i = 1; i <= mCount + 1; i++){
      let x = mRadius * Math.cos(mAngle * (i - 1) + rotateAngle);
      let y = mRadius * Math.sin(mAngle * (i - 1) + rotateAngle);
      coordinates.push([x, y]);
    }
    return coordinates;
  },

  //绘制边框
  renderBorder(ctx, color, lineWidth, radius, rotateAngle, mCount, background){
    let coordinates = this.getCoordinatesByRadius(radius, mCount, rotateAngle);
    ctx.beginPath();
    coordinates.forEach((coordinate, index) => {
      if (index == 0){
        ctx.moveTo(coordinate[0], coordinate[1]);
      }else{
        ctx.lineTo(coordinate[0],coordinate[1]);
      }
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    if(background){
      ctx.fillStyle = background;
      ctx.fill();
    }
    ctx.closePath();
  },

  //绘制连接线
  renderLinkLine(ctx, centerX,centerY, coordinates, color, lineWidth){
    coordinates.forEach((coordinate, index) => {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(coordinate[0], coordinate[1]);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      ctx.closePath();
    });
  },

  //绘制雷达图
  drawRadar(ctx, mData, lRadius, rotateAngle = 0, color){
    const mCount = mData.length;
    let radius = [];
    mData.forEach((item, index) => {
      radius.push((item.score / item.full) * lRadius);
    })
    radius.push((mData[0].score / mData[0].full) * lRadius);
    const mAngle = (Math.PI * 2) / mCount;
    let coordinates = [];
    for(let i = 1; i <= mCount + 1; i++){
      let x = radius[i - 1] * Math.cos(mAngle * (i - 1) + rotateAngle);
      let y = radius[i - 1] * Math.sin(mAngle * (i - 1) + rotateAngle);
      coordinates.push([x, y]);
    }
    ctx.beginPath();
    coordinates.forEach((coordinate, index) => {
      if(index == 0){
        ctx.moveTo(coordinate[0], coordinate[1]);
      }else{
        ctx.lineTo(coordinate[0], coordinate[1]);
      }
    });
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  },

  //绘制文字
  drawText(ctx, coordinates, mData,  color, dpr){
    const moveDistance = 1 ;
    ctx.font = "12px sans-serif"
    ctx.fillStyle = color;
    coordinates.forEach((coordinate, index) => {
      if(mData[index]){
        let x = coordinate[0];
        let y = coordinate[1];
        if(x < 0){
          x -= moveDistance * 24;
        }else{
          x += moveDistance * 1;
        }
        if(y < 0){
          y -= moveDistance * 2;
        }else if(y > 0){
          y += moveDistance * 6;
        }
        let text = mData[index].title;
        let point = mData[index].score;
        ctx.fillText(text, x, y);
        ctx.fillText(point, x + 7, y + 12);
      }
    });
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