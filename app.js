//app.js
App({
  onLaunch: function () {
    
  },
  loadSongs: function () {
    var songs = new Array();

    var song_01 = new Object();
    song_01.title = '南山忆'
    song_01.epname = '《半城烟沙》';
    song_01.singer = '许嵩';
    song_01.coverImgUrl = 'https://orejia.cn/image/001.jpg';
    song_01.src = "https://orejia.cn/audio/001.mp3";
    songs.push(song_01);

    var song_02 = new Object();
    song_02.title = '庐州月'
    song_02.epname = '《寻雾启示》';
    song_02.singer = '许嵩';
    song_02.coverImgUrl = 'https://orejia.cn/image/002.jpg';
    song_02.src = "https://orejia.cn/audio/002.mp3";
    songs.push(song_02);

    var song_03 = new Object();
    song_03.title = '有何不可'
    song_03.epname = '《自定义》';
    song_03.singer = '许嵩';
    song_03.coverImgUrl = 'https://orejia.cn/image/003.jpg';
    song_03.src = "https://orejia.cn/audio/003.mp3";
    songs.push(song_03);

    return songs;
  }
})