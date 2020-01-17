// 热门推荐
(function(){

     var hotBox = tools.getById('hot');
     var ul = tools.getByTag(hotBox,'ul')[0];
    //  console.log(hotBox,ul);

    tools.ajax({method:'get',url:'data/hot.json'},function(data){
        data = eval(data);   //返回值为JSON，在页面使用时，JSON数组没办法直接使用，所以转成JSON对象
        // console.log(data);

        var str = '';
        for(var i = 0; i < data.length; i++){
            
            if(i%2 == 0){
                str += '<li class="f1 cli">';
            }else{
                str += '<li class="f1">';
            }
         
            str += '<a href="'+data[i].http+'"><img src="'+data[i].url+'" alt=""></a>'


           str += ' <p>'+data[i].title+'</p>'


            str += '</li>';

        }
         ul.innerHTML = str;
    })
})()