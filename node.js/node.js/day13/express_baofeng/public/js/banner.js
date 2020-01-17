// 自执行函数，避免全局变量与其他js文件的变量冲突
(function(){
    var nav = tools.getById('nav');
    var lis = tools.getByTag(nav,'li');
    var banner = tools.getById('banner');
    var imgList = tools.getByClass(banner,'img-list')[0];
    var imgs = tools.getByTag(imgList,'li');  //获取到的li
    var btnPrev = tools.getByClass(banner,'btn-prev')[0];
    var btnNext = tools.getByClass(banner,'btn-next')[0];
    var  focusList = tools.getByClass(banner,'focus-list')[0];
    var  focusItems = tools.getByTag(focusList,'li'); //获取focus-list下面的li
     
    for(var i = 0 ;i < lis.length; i++){
        lis[i].onclick = function(){
            for(var j = 0 ; j < lis.length; j++){
                lis[j].className ='';
            }
            this.className = 'active';
        }
    }
    /* 封装切换图片的核心方法 */

    function changImg(a){/* a表示当前要现实的图片的索引 */
        /* 把所有图片先隐藏 */
     for(var i = 0; i <imgs.length; i++ ){
            // imgs[i].style.opacity = 0;
            // imgs[i].style.filter = 'alpha=(opacity = 100)';
            tools.bufferMove(imgs[i],{opacity:0});
            /*把缩略图active去掉 */
            focusItems[i].className = '';
     }
     tools.bufferMove(imgs[a],{opacity:100});
    /* 缩略图切换 */
    focusItems[a].className = 'active';
    }
    
    var step = 0;
    var timer = null;
    function autoplay(){
        timer=setInterval(function(){
            step++;
            if(step == 9){
                step=0;
            }
            changImg(step);
        },2000)
    
    }
    autoplay();
    // setTimeout(function(){
    //     changImg(1);
    // },2000)
   /* 鼠标移入整个banner图时停止自动切换，移出时继续切换 */
   banner.onmouseenter = function(){
    clearInterval(timer);
   }
   banner.onmouseleave = function(){
    autoplay();
   }


   /* 点击箭头的时候切换下一张和上一张 */
   btnNext.onclick = function(){
       step++;
       if(step ==imgs.length){
           step = 0;
       }
       changImg(step);
   }
   btnPrev.onclick = function(){
    step--;
    if(step ==-1){
        step = imgs.length;
    }
    changImg(step);
}

/* 移入缩略图的时候切换到对应的图片 */
for(var i = 0 ;i < focusItems.length ; i++){
    focusItems[i].index = i;
    focusItems[i].onmouseenter = function(){
        step = this.index;
        changImg(step);
    }
}

})()

