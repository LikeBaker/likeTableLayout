// pages/tablayout/tablayout.js
Component({
  /**
   * 组件的属性列表
   */
  properties: { 
   
  },

  /**
   * 组件的初始(内部)数据
   */
  data: {
    title: ["总览", "详情"],

    animation: "",

    //屏幕宽度 px
    screenWidth:"",

    //微信规定的屏幕宽度750 rpx
    wxScreenWidth:750,

    //指示器滑动范围宽度
    indicatorLayoutWidth:200,

    //滑动状态：滑动到左边(1)、滑动到右边(2)
    scrollStatus:1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperTrans: function (e) {

      console.log(e.detail.dx);

      var that = this;

      //todo 存在dx绝对值大于屏幕宽度的情况，会导致indicator移动到固定边界外，该情况真机是否也存在？
      // swipter位移 中间变量
      var dx;
      if (e.detail.dx >= 0)
        if (that.data.scrollStatus == 2)
          dx = that.data.screenWidth;
        else
          dx = e.detail.dx;
      else if (that.data.scrollStatus == 1)
        dx = 0
      else
        dx = that.data.screenWidth + e.detail.dx;

      //计算指示器位移状态
      if (dx == that.data.screenWidth) {
        that.setData({ scrollStatus: 2 });
      } else if (dx == 0) {
        that.setData({ scrollStatus: 1 });
      }

      //indicator与swipter之间移动比例
      var scale = that.data.indicatorLayoutWidth / that.data.wxScreenWidth;
      //indicator 位移
      var ds = dx * scale / 2;

      this.transIndicator(ds);
    },

    /**
     * indicator 平移动画
     */
    transIndicator(x) {
      let option = {
        duration: 100,
        timingFunction: 'linear'
      };
      this.animation = wx.createAnimation(option);
      this.animation.translateX(x).step();
      this.setData({
        animation: this.animation.export()
      })
    },
  },

  lifetimes: {
    attached() {
      // 初始化数据
      var that = this;
      that.setData({ screenWidth: wx.getSystemInfoSync().screenWidth });
    }
  },

})
