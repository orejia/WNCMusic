var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

// const app = getApp();
var songArray = new Array();

Page({
  data: {
    tabs: ["音乐", "文章", "功能"],
    music:[],
    search_results:[],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

    inputShowed: false,
    inputVal: "",
    inputValueChanged: false
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    const songs_info = wx.getStorageSync("songs_info");
    songArray = JSON.parse(songs_info);
    // console.log(songArray);
    var tmp = new Array();
    for(var i = 0; i < songArray.length; i++){
      tmp.push(songArray[i]);
    }
    that.setData({
      music:tmp
    })
  },
  onShow:function(){
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
/*搜索框*/
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });

    // var results = wx.getStorageSync("input_item");
    var name = e.detail.value;
    var tmp_results = new Array();
    for (var i=0;i<songArray.length;i++){
      var song_title = songArray[i].title;
      if(song_title.indexOf(name) > -1){
        tmp_results.push(songArray[i]);
      }
    }
    this.setData({
      search_results:tmp_results
    });
  }
});