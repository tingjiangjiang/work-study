// 评论的js
(function(){

    var commentBox = tools.getById('comment');
    var ul = tools.getByTag(commentBox,'ul')[0];
    var inputtext = tools.getByTag(commentBox,'textarea')[0];
    var reflash = tools.getByClass(commentBox,'comment-head')[0];
    // console.log(commentBox,ul);
    
    tools.ajax({method:'get',url:'data/discuss.json'},function(data){
         data = eval(data);
        //  console.log(data); 

        var str = '';
        for(var i = 0; i < data.length; i++){
            str += '<li>';
 str += '<div class="comment-heat-bot-top"><img src="'+data[i].url+'" alt=""><p class="comment-heat-bot-top-right"><p>'+data[i].userName+'</p><p class="time">'+data[i].time+'</p></p></div>';
            


      str += '<div class="comment-heat-bot-center">'+data[i].message+'</div>';

      str += '<div class="comment-heat-bot-foot"><i></i><span>'+data[i].praise+'</span></div>';
            str += '</li>';            
        }
        ul.innerHTML = str;
    })

    inputtext.onkeyup = function(){
        var val = inputtext.value;
        var l = 140-val.length;
        if(val.length>=140){
            val.length=140;
        }
        reflash.innerHTML = ' <i></i><span>评论<b>(共1018条)</b></span><b>还可以输入<strong>'+l+'</strong>字</b>';
    }


})()