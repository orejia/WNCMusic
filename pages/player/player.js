//获取app实例数据
const app = getApp();
const backgroundAudioManager = wx.getBackgroundAudioManager();
const songs_info = wx.getStorageSync("songs_info");
Page({
  data: {
    song:{},
    windowWidth:0,
    windowHeight:0
  },
  onLoad: function (e) {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
          that.setData({
            windowWidth:res.windowWidth,
            windowHeight:res.windowHeight
          })

      }
    });
    console.log("%s %s", that.data.windowHeight, that.data.windowWidth);
    var song_id = e.song_id;
    var tmp = JSON.parse(songs_info);
    for(var i=0;i<tmp.length;i++){
      if(i == song_id -1){
        that.setData({
          song:tmp[i]
        })
      }
    }
  },
  play: function () {
    var song = this.data.song;
    // console.log(song);
    backgroundAudioManager.title = song.title;
    backgroundAudioManager.epname = song.epname; //专辑名
    backgroundAudioManager.singer = song.singer;
    backgroundAudioManager.coverImgUrl = song.coverImgUrl;
    backgroundAudioManager.src = song.src;// 设置后自动播放
  },
  pause: function () {
    backgroundAudioManager.pause();
  }
  // before: function () {
  //   console.log("上一首");
  //   i = i ? --i : (this.data.songs.length - 1);
  //   console.log(this.data.songs[i]);
  //   console.log(i);
  //   this.play();
  // },
  // next: function () {
  //   console.log("下一首");

  //   i++;
  //   i %= 3;
  //   console.log(this.data.songs[i]);
  //   console.log(i);
  //   this.play();
  // }
})