//获取app实例数据
const app = getApp();
const backgroundAudioManager = wx.getBackgroundAudioManager();
const songs_info = wx.getStorageSync("songs_info");
Page({

  data: {
    song: {},
    /*当前歌曲信息 */
    // player_width:0,
    // player_height:0,
    // player_left:0,
    // player_top:0,
    default_song: {

    },

    init_flag: false,
    poster: "",
    playing_img: "../../images/play.png",
    pause_img: "../../images/pause.png",
    playing: false,
    ended:false,
    paused:true
  },
  onHide: function() {
    console.log("player页 隐藏.....");
  },
  onUnload: function() {
    backgroundAudioManager.stop();
    console.log("player页 卸载.....");
  },
  onLoad: function(e) {
    console.log("test...");
    console.log("入参 %s", e.id);
    if (e.id == "abc") {
      // backgroundAudioManager.title = "未知歌曲";
      // backgroundAudioManager.epname = "未知专辑"; //专辑名
      // backgroundAudioManager.singer = "未知歌手";
      // backgroundAudioManager.coverImgUrl = "https://orejia.cn/image/童年.jpg";
      // console.log("默认 %d",e.song_id);
      e.song_id = 10; //默认歌曲
    }

    var that = this;

    /*获取当前音乐信息 */
    var song_id = e.song_id;
    var tmp = JSON.parse(songs_info);
    for (var i = 0; i < tmp.length; i++) {
      if (i == song_id - 1) {
        that.setData({
          song: tmp[i],
          poster: tmp[i].coverImgUrl
        })
      }
    }

    var song = that.data.song;
    console.log(song);
    backgroundAudioManager.title = song.title;
    backgroundAudioManager.epname = song.epname; //专辑名
    backgroundAudioManager.singer = song.singer;
    backgroundAudioManager.coverImgUrl = song.coverImgUrl;
    // backgroundAudioManager.src = song.src;// 设置后自动播放
    // backgroundAudioManager.paused = true;

    /*注册背景音乐变化事件*/
    backgroundAudioManager.onPlay(this.audioPlay); //播放
    backgroundAudioManager.onEnded(this.audioEnded);//线束
  },

  //播放结束回调
  audioEnded: function () {
    console.log('audio ended');
    this.setData({
      playing:false,
      ended:true
    })
  },

  // play: function() {
  //   let is_ended = this.data.ended;
  //   if(is_ended){

  //   }
  //   backgroundAudioManager.play();
  // },

  // pause: function() {
  //   backgroundAudioManager.pause();
  //   this.setData({
  //     paused:true
  //   })
  // },



  /****动画的播放与暂停*****/
  animation_control: function(e) {
    var that = this;
    if (that.data.playing) {
      // console.log("playing...");
      that.setData({
        paused:true,
        playing: false
      })
      backgroundAudioManager.pause();
    } else {
      console.log("playing...");

        that.setData({
          paused: false,
          playing: true
        })
        if(that.data.ended){
          this.setData({
            ended:false
          })
          backgroundAudioManager.src = that.data.song.src;
        }

      if (!that.data.init_flag) {
        if(!that.data.ended){
        that.setData({
          init_flag: true
        })
        }
        backgroundAudioManager.src = that.data.song.src;
      }
      backgroundAudioManager.play();
    }
  },
  to_index: function(e) {
    var flag = e.currentTarget.dataset.flag;
    console.log(flag);
    wx.navigateTo({
      url: '/pages/index/index?id=player'
    })
  }
})
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