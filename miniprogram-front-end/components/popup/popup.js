Component({
  options: {
    multipleSlots: true
  },

  properties: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    link: {
      type: String
    },
    content: {
      type: String
    }
  },

  data: {
    flag: true
  },

  methods: {
    hidePopup:function(){
      this.setData({
        flag: !this.data.flag
      })
    },
    showPopup(){
      this.setData({
        flag: !this.data.flag
      })
    },
    _success(){
      this.triggerEvent("success")
    }
  }
})