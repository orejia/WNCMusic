//获取app实例数据
const app = getApp();
const backgroundAudioManager = wx.getBackgroundAudioManager();
const songs_info = wx.getStorageSync("songs_info");
Page({
  data: {
    song:{},  /*当前歌曲信息 */
    // player_width:0,
    // player_height:0,
    // player_left:0,
    // player_top:0,

    init_flag:false,
    poster: "",
    playing_img: "../../images/play2.png", 
    pause_img: "../../images/pause2.png", 
    playing: false
  },
  onLoad: function (e) {
    var that = this;

    /*获取当前音乐信息 */
    var song_id = e.song_id;
    var tmp = JSON.parse(songs_info);
    for(var i=0;i<tmp.length;i++){
      if(i == song_id -1){
        that.setData({
          song:tmp[i],
          poster:tmp[i].coverImgUrl
        })
      }
    }

    var song = that.data.song;
    // console.log(song);
    backgroundAudioManager.title = song.title;
    backgroundAudioManager.epname = song.epname; //专辑名
    backgroundAudioManager.singer = song.singer;
    backgroundAudioManager.coverImgUrl = song.coverImgUrl;
    // backgroundAudioManager.src = song.src;// 设置后自动播放
    // backgroundAudioManager.paused = true;
  },

  play: function () {
    backgroundAudioManager.play();
  },

  pause: function () {
    backgroundAudioManager.pause();
  },

  /****动画的播放与暂停*****/
  animation_control: function (e) {
    var that = this;
    if (that.data.playing) {
      console.log("playing...");
      that.setData({
        playing: false
      })

      backgroundAudioManager.pause();
    }
    else {
      console.log("playing...");
      that.setData({
        playing: true
      })
      if(!that.data.init_flag){
        that.setData({
          init_flag:true
        })
        backgroundAudioManager.src = that.data.song.src;
      }
      backgroundAudioManager.play();
    }
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