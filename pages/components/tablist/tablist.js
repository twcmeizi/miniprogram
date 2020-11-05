const app=getApp()
Component({
   properties: {
      tabs:{
         type:Object,
         value:''
      }
   },
   data: {
      navHeight:'',
      navTop:'',
      tabs:['首页','关注','推荐'],
      currentid:0,
      sheight:'',
      contentList:[]
   },
   methods: {
      changeCurrent(e){
         this.setData({
            currentid:e.currentTarget.dataset.currentid
         })
      },
      changeSwiper(e){
         this.setData({
            currentid:e.detail.current
         })
      },
      requestData(){
         wx.request({
            url: 'https://api.apiopen.top/getSingleJoke?sid=31568341',
            success: (result) => {
              console.log(result.data.result)
              this.setData({
                contentList:result.data.result
              })
              
            }
          })
      }
   },
   lifetimes:{
      
      attached(){
         var that=this,height=''
        wx.getSystemInfo({
            success(res) {
                 height=res.windowHeight - app.globalData.navHeight
                 that.setData({
                     navHeight:app.globalData.navHeight,
                     navTop:app.globalData.menuTop,
                     sheight:height
                 })
            }
          })
          that.requestData();

         
       
      }
   }
})
