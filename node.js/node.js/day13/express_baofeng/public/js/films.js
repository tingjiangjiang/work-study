(function () {
    var filmsBox = tools.getById('films');
    var ul = tools.getByTag(filmsBox, 'ul')[0];
    var ul1 = tools.getByTag(filmsBox,'ul')[1];
    tools.ajax({ method: 'get', url: 'data/films.json' }, function (data) {
        //  console.log(data);
        var film = JSON.parse(data).films;
        console.log(film);
        var str = '';

        for (var i = 0; i < film.length; i++) {
            var s1 = parseInt(film[i].grade * 10 / 10);
            var s2 = parseInt(film[i].grade * 10 % 10);
            if(i%5==0){
               str += '<li class = "first">'
               }else{
                str += '<li>';
               }
            str += '<a href="' + film[i].http + '"><img src="' + film[i].url + '"></a>';

            str += '<div class="txt"><div class="left"> <p class="titled"><a href="' + film[i].http + '">' + film[i].title + '</a></p><p class="message">' + film[i].message + '</p> </div><div class="score"><span>' + s1 + '</span><i>.' + s2 + '</i></div> </div>';

            var cls = '';
            switch (film[i].type) {
                case 1: cls = 'vip-only'; break;
                case 2: cls = 'vip-free'; break;
                case 3: cls = 'vip-discount'; break;

            }
            str += '<div class="film-type">' + film[i].txt + '</div><div class="type ' + cls + '"></div>'
         str += '</li>';
        }
        ul.innerHTML = str;
        ul1.innerHTML = str;
    })


})()