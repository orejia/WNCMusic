Page({
  data:{
    poster: "https://orejia.cn/image/此生惟你.jpg",
    playing:true
  },
  animation_control: function(e){
    // console.log("click img.");
    // console.log(e);
    if(this.data.playing){
      this.setData({
        playing:false
      })
    }
    else{
      this.setData({
        playing: true
      })
    }
  }
})