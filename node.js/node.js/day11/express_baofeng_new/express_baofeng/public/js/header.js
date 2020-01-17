(function(){
    var header = tools.getById('header');
    
    window.onscroll = function(){
        var st = document.documentElement.scrollTop ||document.body.scrollTop;
        if(st >600){
            header.style.width = 100+'%';
            header.style.position = 'fixed';
            header.style.top = 0;
        }else if(st<=600){
            header.style.position = 'relative';
        }
    }


})()