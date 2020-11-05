//app.js
App({
  onLaunch: function () {
    console.log(wx.getMenuButtonBoundingClientRect())
    var menu=wx.getMenuButtonBoundingClientRect();

    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        this.globalData.navHeight=result.statusBarHeight+menu.height+(menu.top -result.statusBarHeight)*2;
        this.globalData.menuTop=menu.top,
        this.globalData.navWidth=menu.left-10
      },
    })
    console.log(this.globalData.navHeight)
  },
  globalData: {
    userInfo: null,
    navHeight:'',
    menuTop:'',
    navWidth:''
  }
})