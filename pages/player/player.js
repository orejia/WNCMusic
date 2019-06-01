//获取app实例数据
const app = getApp();
var i = 0;
const backgroundAudioManager = wx.getBackgroundAudioManager();

Page({
  data: {
    songs: []
  },
  onLoad: function () {
    var songArray = app.loadSongs();
    this.setData({ songs: app.loadSongs() });
    //console.log(this.data.songs);
  },
  play: function () {
    //console.log(this.data.songs);
    var songs = this.data.songs;
    backgroundAudioManager.title = songs[i].title;
    backgroundAudioManager.epname = songs[i].epname; //专辑名
    backgroundAudioManager.singer = songs[i].singer;
    backgroundAudioManager.coverImgUrl = songs[i].coverImgUrl;
    backgroundAudioManager.src = songs[i].src;// 设置后自动播放
  },
  pause: function () {
    backgroundAudioManager.pause();
  },
  before: function () {
    console.log("上一首");
    i = i ? --i : (this.data.songs.length - 1);
    console.log(this.data.songs[i]);
    console.log(i);
    this.play();
  },
  next: function () {
    console.log("下一首");

    i++;
    i %= 3;
    console.log(this.data.songs[i]);
    console.log(i);
    this.play();
  }
})