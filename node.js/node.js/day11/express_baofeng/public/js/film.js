// 电影榜的js
(function(){
   var filmBox = tools.getById('film');
   var ul = tools.getByTag(filmBox,'ul') [0];
//    console.log(filmBox,ul)
   tools.ajax({method:'get',url:'data/ranking.json'},function(data){
      data = eval(data);
    //   console.log(data)
    var str = '';
    for (var i = 0; i < data.length; i++){
        str += '<li>';
         if(i == 0){
            str += '<div class="summary con">';
         }else{
            str += '<div class="summary">';
         }
         
         str += '<i>'+(i+1)+'</i><span>'+data[i].title+'</span><b>'+data[i].grade+'</b></div>';


        if(i == 0){
            str += '<div class="detail show">';
        }else{
            str += '<div class="detail">';
        }
         str += '<a href="#"><img src="'+data[i].src+'"alt=""><span><i>'+(i+1)+'</i>'+data[i].title+'</span></a></div>';

        str += '</li>';
    }
         ul.innerHTML = str;
       
        //  鼠标移入特效


        var lis = tools.getByTag(ul,'li');
        var details = tools.getByClass(ul,'detail');
        var summarys = tools.getByClass(ul,'summary');
        for(var i = 0; i < lis.length; i++){
            lis[i].onmouseover = function(){
                for(var i = 0; i < details.length; i++){
                    console.log(i);
                    details[i].className = 'detail';
                    summarys[i].className = 'summary';
                }
                tools.getByClass(this,'detail')[0].className = 'detail show';
                tools.getByClass(this,'summary')[0].className = 'summary con';
            }
        }
   })
})()