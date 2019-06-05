// pages/tablayout/tablayout.js
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: { 
      titles:{
        type:Array,
        value: [],
      }
  },

  /**
   * 组件的初始(内部)数据
   */
  data: {

    titleIndex: 0,

    animation: "",

    //屏幕宽度 px
    screenWidth:"",

    //微信规定的屏幕宽度750 rpx
    wxScreenWidth:750,

    //指示器滑动范围宽度，单位宽度
    indicatorLayoutWidth:100,

    //滑动状态：滑动到左边(1)、滑动到右边(2)
    scrollStatus:1,

    changeIndex:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTitle:function(e) {

      var that = this;

      console.log("click");
      that.setData({
        changeIndex:2
      })
    },

    swiperChange:function(e) {

      console.log("swiperChange");
      console.log(e.detail.curr);

      var that = this;

      e.detail.current = that.changeIndex;
    },

    swiperTrans:function (e) {

      // console.log(e.detail.dx);

      var that = this;

      //todo 存在dx绝对值大于屏幕宽度的情况，会导致indicator移动到固定边界外，该情况真机是否也存在？
      // swipter位移 中间变量
      var dx;
      if (e.detail.dx >= 0)
        if (that.data.scrollStatus == 2)
          dx = that.data.screenWidth * that.data.titleIndex;
        else
          dx = e.detail.dx + that.data.screenWidth * that.data.titleIndex;
      else if (that.data.scrollStatus == 1)
        dx = 0
      else
        dx = e.detail.dx + that.data.screenWidth * that.data.titleIndex;

      // console.log("dx " + dx);

      //indicator与swipter之间移动比例
      var scale = (that.data.indicatorLayoutWidth / that.data.wxScreenWidth).toFixed(2);//保留两位小数，否则indicator有误差
      // console.log("scale " + scale);
      //indicator 位移
      var ds = dx * scale;
      // console.log("ds " + ds);

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

    swiperAnimationfinish: function(e) {
      // console.log("e.detail.dx " + e.detail.current);//current:当前选中页面 0 ，1， 2

      var that = this;
      that.setData({
        titleIndex: e.detail.current
      });

      //计算指示器位移状态
      if (that.data.titleIndex == (that.data.titles.length-1)) {
        // console.log("move to the right")
        that.setData({ scrollStatus: 2 });
      } else if (that.data.titleIndex == 0) {
        // console.log("move to the left")
        that.setData({ scrollStatus: 1 });
      }
    }
  },

  lifetimes: {
    attached() {
      // 初始化数据
      var that = this;
      that.setData({ screenWidth: wx.getSystemInfoSync().screenWidth });
    }
   
  },

})
