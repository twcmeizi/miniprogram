// pages/testdetail/testdetail.js
Page({


   data: {
      url:'',
      windowHeight:'',
      sid:''
   },
   onShow(){
      this.videoContext = wx.createVideoContext('myVideo')
      this.videoContext.requestFullScreen({ direction: 90 });
   },

   onLoad: function (options) {
     console.log(options.sid)
     var windowHeight=''
     wx.getSystemInfo({
      success(res) {
        windowHeight = res.windowHeight
      }
    })
     wx.request({
      url: 'https://api.apiopen.top/getSingleJoke?sid='+options.sid,
      success: (result) => {
        console.log(result.data.result.video)
      
        this.setData({
         url:result.data.result.video,
         windowHeight:windowHeight,
         sid:options.sid
        })
      //   console.log(this.data.contentList)
      }
    })
   },

   onReady() {
     
    },
   onShareAppMessage(res) {
      return {
        title: '自定义转发标题',
        path: '/testdetail/testdetail?sid='+this.data.sid
      }
    }

})