
// 猜你喜欢js
(function () {

    var likeBox = tools.getById('like');
    var ul = tools.getByTag(likeBox, 'ul')[0];

    tools.ajax({method: 'get',url: 'data/like.json'},function (data) {
        data = eval(data); //返回值为JSON，在页面使用时，JSON数组没办法直接使用，所以转成JSON对象
        //console.log(data);
        var str = '';
        for (var i = 0; i < data.length; i++) {

            if (i % 3 == 0) {
                str += '<li class="cli f1">';
            } else {
                str += '<li class="f1">';
            }
            str += ' <a href="' + data[i].http + '"><img src="' + data[i].src + '" alt=""></a>';

            str += ' <div class="like-left f1"><a href="">' + data[i].title + '</a><p>' + data[i].message + '</p> </div>';

            str += '<div class="like-right f4">' + data[i].grade + '</div>';

            str += '</li>';
        }
        ul.innerHTML = str;
    })
})()