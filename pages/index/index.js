Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:["title1","title2","title3", "title4"],

    swiperheight:0
  },

  onReady: function (options) {
    // Do some initialize when page load.
    console.log("onLoad");
    var that = this;
    that.setData({ swiperheight:1000})
  },
})
