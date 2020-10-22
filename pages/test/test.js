// pages/test/test.js
Page({
  data: {
    tabs: [],
    activeTab: 0,
    windowHeight: '',
    windowWidth:'',
    contentList:[]
  },
  onShareAppMessage: function (e) {
    
    return {
      title: '自定义转发标题',
      path: '/test/test'
    }
  },
  onLoad() {
    const that = this
    var windowHeight = '',left=''
    wx.getSystemInfo({
      success(res) {
        console.log(res)
        let height=res.windowHeight
        windowHeight = height
        left=(res.screenWidth - 50)/2
      }
    })
    // zenjia test 
    let query = wx.createSelectorQuery();
    query.select('.weui-tabs-bar__content').boundingClientRect();
    query.exec((res) => {console.log(res)
      // let listHeight = res[0].height; // 获取list高度
        // wx.getSystemInfo({
        //   success: function (height) {
        //     that.setData({
        //       scrollHeight: parseInt(height.windowHeight) - 64 - listHeight 
        //     });
        //   }
        // });
    })
    const titles = ['推荐', '音乐', '风景', '祝福', '生活', '开心']
    // const tabs = titles.map(item => ({
    //   title: item
    // }))
    that.requestData(1,10);
   
    this.setData({
      tabs:titles,
      windowHeight,
      left
      
    })
  },
  onReady() {
    //this.videoContext = wx.createVideoContext('myVideo')
  },
  requestData(page,count) {
    if(!count){
      count=10
    }
    wx.request({
      url: 'https://api.apiopen.top/getJoke?page='+page+'&count='+count+'&type=video',
      success: (result) => {
        console.log(result.data.result)
        result.data.result.forEach(n => {
          n.isPlaying = false;
        })
        this.setData({
          contentList:result.data.result
        })
        console.log(this.data.contentList)
      }
    })
  },
  
  gotoDetail(e){
    wx.navigateTo({
      url: '../testdetail/testdetail?sid='+e.currentTarget.dataset.sid,
    })
  },

  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index,
      contentList:[]
    }) 
    console.log(index)
    this.requestData(e.detail.index+1,10)
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index,
      contentList:[]
    })
    console.log(index)
    this.requestData(e.detail.index+1,10)
  },
  handleClick(e) {
    // wx.navigateTo({
    //   url: './webview',
    // })
  },
  onPullDownRefresh(){
    this.requestData(1,20)
  },
  refresh(e){
   
    wx.request({
      url: 'https://api.apiopen.top/getJoke?page='+1+'&count='+5+'&type=video',
      success: (result) => {
        console.log(result.data.result)
       var data=this.data.contentList.concat(result.data.result)
        this.setData({
          contentList:data
        })
        
      }
    })
  }
})