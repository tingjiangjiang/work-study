(function(){
  var vip = tools.getById('vip');
  var btnPrev = tools.getByClass(vip,'btn-prev')[0];
  var btnNext = tools.getByClass(vip,'btn-next')[0];
  var ul = tools.getByTag(vip,'ul')[0];

  var step = 0;
  btnNext.onclick = function(){
      step++;
      if(step==7){
          step = 6;
      }
      ul.style.left = -step*214+'px';
  }
  btnPrev.onclick = function(){
    step--;
    if(step==-1){
        step = 0;
    }
    ul.style.left = -step*214+'px';
}



})()