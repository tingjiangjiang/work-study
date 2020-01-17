(function () {
    var nav = tools.getById('nav');
    var lis = tools.getByTag(nav, 'li');
    var sort = tools.getById('sort');
    var lis1 = tools.getByTag(sort, 'li');
    var most = tools.getByClass(sort ,'most-list')[0];
    var mostItem = tools.getByTag(most,'p');

    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            for (var j = 0; j < lis.length; j++) {
                lis[j].className = '';
            }
            this.className = 'active';
        }
        lis1[i].onclick = function () {
            for (var j = 0; j < lis1.length; j++) {
                lis1[j].className = '';
            }
            this.className = 'active';
        }
    }
    for (var i = 0; i < mostItem.length; i++){
        mostItem[i].onclick = function(){
            for (var j = 0; j < mostItem.length; j++) {
                mostItem[j].className = '';
            }
            this.className = 'living';
        }
    }
})()